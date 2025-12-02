// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')
const { check, validationResult } = require('express-validator');

router.get('/',function(req, res, next){
    res.render("weather.ejs")
});

router.get('/now',function(req, res, next){

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render("search.ejs")
    }
    else {
        let apiKey = 'f2db079782bdb38071d16072740c2a34'
        let city = req.query.weather_text
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                
        request(url, function (err, response, body) {
            if(err){
                next(err)
            } else {

                var weather = JSON.parse(body)

                if (weather!==undefined && weather.main!==undefined) {
                     var m = `
                        <h1> Weather in: ${weather.name} <\h1>
                        <h2> Currently ${weather.main.temp}℃<\h2>
                        <h2> Humidity: ${weather.main.humidity}<\h2>
                        <h2> Wind: ${weather.wind.speed}mph<\h2>
                    `
                    res.send (m);
                } else {
                    res.send ("No data found");
                }
            } 
    });
    }
});

// Export the router object so index.js can access it
module.exports = router