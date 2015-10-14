'use strict';

require('./schema/userModel.js');
require('./schema/roleModel.js');
require('./schema/documentModel.js');
var mongoose = require('mongoose');
var User = mongoose.model('User'),
  Role = mongoose.model('Role'),
  Document = mongoose.model('Document');
