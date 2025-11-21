// Create a new router
const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

router.get('/login', function (req, res, next) {
    res.render('login.ejs')
})

router.post('/loggedin', function (req, res, next) {
    let sqlquery = "SELECT password_hash FROM users WHERE username='" + req.body.username + "'"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
    
        // Compare the password supplied with the password in the database
        if (result[0] !== undefined) {
             bcrypt.compare(req.body.password, result[0].password_hash, function(err, result) {
            if (err) {
                res.send(err.message)
            }
            else if (result == true) {
                res.send("Logged in")
                let sqlquery = "INSERT INTO audit (username, password, successful) VALUES (?,?,?)"
                db.query(sqlquery, [req.body.username, req.body.password, 1])
            }
            else {
                res.send("Incorrect password")
                let sqlquery = "INSERT INTO audit (username, password, successful) VALUES (?,?,?)"
                db.query(sqlquery, [req.body.username, req.body.password, 0])
            }
            })
        }
    });
})

router.get('/audit', function (req, res, next) {
    let sqlquery = "SELECT * FROM audit"; // query database to get all the audit logs
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("audit.ejs", {logins: result})
    });
})

router.post('/registered', function (req, res, next) {
    // saving data in database
    const plainPassword = req.body.password
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        // Store hashed password in your database.
        let sqlquery = "INSERT INTO users (username, first_name, last_name, email, password_hash) VALUES (?,?,?,?,?)"
        // execute sql query
        let newrecord = [req.body.username, req.body.first, req.body.last, req.body.email, hashedPassword]
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                next(err)
            }
            else
                result = 'Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email + 'Your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword
                res.send(result)
        })
    })                                                                          
}); 

router.get('/list', function (req, res, next) {
    let sqlquery = "SELECT username, first_name, last_name, email FROM users"; // query database to get all the users
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("user_list.ejs", {users: result})
    });
})

// Export the router object so index.js can access it
module.exports = router
