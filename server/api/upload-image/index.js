'use strict';

var express = require('express');
var path = require('path');
var controller = require('./upload-image.controller');
var fs = require('fs');
var mime = require('mime');
var uuid = require('uuid');
var multer = require('multer');
var imager = require('multer-imager');

// get rootDir to specify upload folder on client
var rootDir = path.join(__dirname, '../../../');

var multerOptions = multer.diskStorage({
	destination: rootDir+'client/assets/uploads/',
  	filename: function (req, file, cb) {
		console.log(mime.extension(file.mimetype));
    	cb(null, uuid.v4() + '.' + mime.extension(file.mimetype));
		//return file.fieldname + '.' + mime.extension(file.mimetype);
	}
});

var upload = multer({storage: multerOptions});

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/',  upload.single('file'), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
