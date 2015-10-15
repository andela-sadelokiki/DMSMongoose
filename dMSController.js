'use strict';

require('./schema/userModel.js');
require('./schema/roleModel.js');
require('./schema/documentModel.js');
var mongoose = require('mongoose');
var User = mongoose.model('User'),
  Role = mongoose.model('Role'),
  Document = mongoose.model('Document');

module.exports = {

  //Method finds or creates a role, creates a User and assigns role to created User
  createUser: function(first, last, role) {
    return Role.findOne({
      title: role
    }).then(function(foundRole) {
      if (!foundRole || foundRole === {} || foundRole === []) {
        return Role.create({
          title: role
        });
      } else {
        return foundRole;
      }
    }).then(function(foundRole) {
      return User.create({
        firstname: first,
        lastname: last,
        role_name: foundRole
      }).then(function(doc) {
        return doc;
      });
    });
  },

  //Method returns all created users
  getAllUsers: function() {

    return User.find({}, function(err, users) {
      if (err) {
        return err;
      }
      return users;
    });
  },

  //Method creates a role
  createRole: function(title) {
    return Role.create({
      title: title
    }, function(err, newRole) {
      if (err) {
        return err;
      }
      return newRole;
    });
  },

  //Method returns all created roles
  getAllRoles: function() {
    return Role.find({}, function(err, roles) {
      if (err) {
        return err;
      }
      return roles;
    });
  },

  /*Method finds or creates a role, creates a document,
  and assigns the role as permitted role to access the document
  */
  createDocument: function(title, accessedBy) {
    var dateCreated = new Date();
    var currentDate = dateCreated.getDate();
    var currentMonth = dateCreated.getMonth();
    var currentYear = dateCreated.getFullYear();
    var publishedOn = currentDate + '-' + currentMonth + '-' + currentYear;

    return Role.findOne({
      title: accessedBy
    }).then(function(foundRole) {
      if (!foundRole || foundRole === {} || foundRole === []) {
        return Role.create({
          title: accessedBy
        });
      } else {
        return foundRole;
      }
    }).then(function(foundRole) {
      return Document.create({
        title: title,
        createdOn: publishedOn,
        rolesWithAccess: foundRole
      }).then(function(doc) {
        return doc;
      });
    });
  },

  //Method gets all the documents
  getAllDocuments: function() {
    return Document.find({}, function(err, documents) {
      if (err) {
        return err;
      }
      return documents;
    });
  },

  /*Method gets all documents based on roles that have access
  to the document and the limit specified
  */
  getAllDocumentsByRole: function(role, limit) {
    return Role.find({
      title: role
    }).then(function(role) {
      return Document.find({
        rolesWithAccess: role[0]._id
      }).limit(limit).then(function(documents) {
        return documents;
      });
    });
  },

  /*Method gets all documents based on date created that have
  access to the document and the limit specified
  */
  getAllDocumentsByDate: function(date, limit) {
    return Document.find({
      createdOn: date
    }).limit(limit).then(function(documents) {
      return documents;
    });
  },

};
