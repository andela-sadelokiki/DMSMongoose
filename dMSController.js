'use strict';

require('./schema/userModel.js');
require('./schema/roleModel.js');
require('./schema/documentModel.js');
var mongoose = require('mongoose');
var User = mongoose.model('User'),
  Role = mongoose.model('Role'),
  Document = mongoose.model('Document');

module.exports = {

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

  getAllUsers: function() {

    return User.find({}, function(err, users) {
      if (err) {
        return err;
      }
      return users;
    });
  },

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

  getAllRoles: function() {
    return Role.find({}, function(err, roles) {
      if (err) {
        console.log('failed to find', err);
        return err;
      }
      return roles;
    });
  },

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

  getAllDocuments: function() {
    return Document.find({}, function(err, documents) {
      if (err) {
        return err;
      }
      return documents;
    });
  },

  getAllDocumentsByRole: function(role, limit) {
    return Document.find({
      role: role
    }).limit(limit).sort({
      date: 'descending'
    }).then(function(err, documents) {
      if (err) {
        console.log('errrro of life', err);
        return err;
      }
      console.log('docs are here');
      return documents;
    }).catch(function(err) {
      console.log('pls show me', err);
    });
  },

  getAllDocumentsByDate: function(date, limit) {
    return Document.find({
      createdOn: date,
    }, function(err, documents) {
      if (err) {
        return err;
      }
      return documents;
    });
  }

};
