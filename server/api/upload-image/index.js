'use strict';

var express = require('express');
var path = require('path');
var controller = require('./upload-image.controller');
var fs = require('fs');
var mime = require('mime');
var uuid = require('uuid');
var multer = require('multer');
import * as auth from '../../auth/auth.service';

// get rootDir to specify upload folder on client
var rootDir = path.join(__dirname, '../../../');

// TODO: destination as a parameter
var multerOptions = multer.diskStorage({
	destination: rootDir+'client/assets/uploads/',
  	filename: function (req, file, cb) {
    	cb(null, uuid.v4() + '.' + mime.extension(file.mimetype));
	}
});

var upload = multer({storage: multerOptions});

var router = express.Router();

router.post('/',  auth.hasRole('admin'), upload.single('file'), controller.create);

module.exports = router;
