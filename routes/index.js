var express = require('express');
var fs = require("fs");
var path = require('path');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/library/hotel/', function(req, res, next) {
  res.render('hotel/index', { title: 'Express' });
});

router.get('/library/card/', function(req, res, next) {

	var jsonPath = req.path
	console.log(typeof jsonPath)
	console.log(typeof 3)
	
	var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
    ];
    var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

	// Asynchronous read
	fs.readFile('/input.txt', function (err, data) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log("Asynchronous read: " + data.toString());
	});

	// // Synchronous read
	// var data = fs.readFileSync('input.txt');
	// console.log("Synchronous read: " + data.toString());

	// console.log("Program Ended");

	    
	  	res.render('card/card', { drinks: drinks });
	});

module.exports = router;
