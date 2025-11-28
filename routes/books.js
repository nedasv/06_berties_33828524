// Create a new router
const express = require("express")
const router = express.Router()

const { check, validationResult } = require('express-validator');

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('../users/login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}

router.get('/search',function(req, res, next){
    res.render("search.ejs")
});

router.get('/search-result', [check('search_text').notEmpty()], function (req, res, next) {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render("search.ejs")
    }
    else {
        //searching in the database
        let sqlquery = "SELECT * FROM books WHERE name LIKE '%" + req.query.search_text + "%'"; // query database to get all books with name that contains the keyword using "like"
        console.log(sqlquery)
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err)
            }
            res.render("searchresult.ejs", {availableBooks: result})
        });
    }
});

router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT * FROM books"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("list.ejs", {availableBooks: result})
    });
});

router.get('/addbook', redirectLogin, function(req, res, next){
    res.render('addbook.ejs')
});

router.post('/bookadded', [check('name').notEmpty().isLength({min: 1, max: 100}), check('price').isFloat({min: 0})], function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('addbook.ejs')
    }
    else {
        // saving data in database
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)"
        // execute sql query
        let newrecord = [req.sanitize(req.body.name), req.body.price]
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                next(err)
            }
            else
                res.send(' This book is added to database, name: '+ req.sanitize(req.body.name) + ' price '+ req.body.price)
        })
    }
}) 

router.get('/bargainbooks',function(req, res, next){
    // Query the database to get books priced lessed than 20
     let sqlquery = "SELECT * FROM books WHERE price < 20";
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("bargainbooks.ejs", {availableBooks: result})
    });
});



// Export the router object so index.js can access it
module.exports = router
