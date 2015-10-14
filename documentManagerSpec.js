'use strict';

var dMSController = require('./dMSController.js');
require('./schema/userModel.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var Document = mongoose.model('Document');
mongoose.connect('mongodb://localhost:27017/dms');

describe('User', function() {

  it('should validate that new user is unique', function(done) {

  });

  it('should validate that a new user created has a role defined.', function(done) {

  });

  it('should validate that a new user created both first and last names.', function(done) {

  });

  it('should validate that all users are returned when getAllUsers is called', function(done) {

  });

});

describe('Role', function() {

  it('should validate that a new role created has a unique title', function(done) {

  });


  it('should validate that all roles are returned when getAllRoles is called', function(done) {

  });

});

describe('Document', function() {

  it('should validate that a new user document created has a published date defined.', function(done) {

  });

  it('should validate that all documents are returned, limited by a specified number, when getAllDocuments is called.', function(done) {

  });

  it('should validate that all documents are returned in order of their published dates, starting from the most recent when getAllDocuments is called.', function(done) {

  });

});

describe('Search', function() {

  it('validates that all documents, limited by a specified number and ordered by published date, that can be accessed by a specified role, are returned when getAllDocumentsByRole is called.', function(done) {

  });

  it('validates that all documents, limited by a specified number, that were published on a certain date, are returned when getAllDocumentsByDate is called.', function(done) {

  });

});
