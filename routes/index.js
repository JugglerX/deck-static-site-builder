var express = require('express');
var fs = require("fs");
var dir = require('node-dir');
var path = require('path');
var router = express.Router();

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {

	function allowedFiles (file) {
		var whitelist = ['html','ejs'];
		for (var i=0;i<whitelist.length;i++){
		    if (file === whitelist[i]) {
				return true;
			}
		}
	}

	function getFiles (dir, files_){
	    files_ = files_ || [];
	    var files = fs.readdirSync(dir);
	    console.log(files)
	    for (var i in files){
	        var name = dir + '/' + files[i];
	        var fileExtension = files[i].split('.')[1];
	        if (fs.statSync(name).isDirectory()){
	            getFiles(name, files_);
	        } else {
	        	if (allowedFiles(fileExtension) === true && name.split('/').length > 2) {
	            	files_.push(name);
	        	}
	        }
	    }
	    return files_;
	}

    fs.readdir('./library', function (err, files) {
		res.render('index', { files: getFiles('library') }, function(err, html) {
		  	res.send(html);
		});
    })
});

module.exports = router;
