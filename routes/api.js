// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')
const { check, validationResult } = require('express-validator');

router.get('/books', function (req, res, next) {

    // All the querys to parse
    let filters = []

    if (req.query.search) {
        // Pushes into filters to be added to sql query
        filters.push("name LIKE '%" + req.sanitize(req.query.search) + "%'")
    }

    if (req.query.minprice) {
        filters.push("price > " + req.sanitize(req.query.minprice))
    }

    if (req.query.max_price) {
        filters.push("price < " + req.sanitize(req.query.max_price))
    }

    let clause = filters.length ? ' WHERE ' + filters.join(' AND ') : '';

    if (req.query.sort) {
        // Checks if sort is valid
        if (req.query.sort == "name" || req.query.sort == "price") {
            // Specify the api which order to use
            if (req.query.order) {
                clause += (" ORDER BY " + req.sanitize(req.query.sort) + " " + req.sanitize(req.query.order))
            } else {
                // Default order would be ASC
                clause += (" ORDER BY " + req.sanitize(req.query.sort) + " ASC")
            }
        }
    }

    let sqlquery = `SELECT * FROM books ${clause}`;

     console.log(sqlquery)

    // Execute the sql query
    db.query(sqlquery, (err, result) => {
        // Return results as a JSON object
        if (err) {
            res.json(err)
            next(err)
        }
        else {
            res.json(result)
        }
    })
})

// Export the router object so index.js can access it
module.exports = router
