#! /usr/bin/env node

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/dms');
var dMSController = require('./dMSController.js');

var commandInput = process.argv[1];
var userCommand = commandInput.split('/')[4];
var userArgs = process.argv.slice(2);

var exec = require('child_process').exec;
var child;

if (userCommand === 'createnewuser') {
  if (userArgs.length < 3) {
    console.log("Please fill in all required paramenters")
  } else {
    console.log('show user');
    child = exec(dMSController.createUser(userArgs[0], userArgs[1], userArgs[2]).then(function(user) {
      console.log('new user created!\n', user);
    }));
  }
}

if (userCommand === "getallusers") {
  if (userArgs[0] !== ".") {
    console.log("Wrong format!, correct format is getallusers .");
  } else {
    var child = exec(dMSController.getAllUsers().then(function(users) {
      console.log('View all users:\n', users);
    }));
  }
}

if (userCommand === "createrole") {
  if (userArgs.length !== 1) {
    console.log("Wrong format!, correct format is: createrole rolename");
  } else {
    child = exec(dMSController.createRole(userArgs[0]).then(function(role) {
      console.log("Role created:\n", role)
    }))
  }
}

if (userCommand === "getallroles") {
  if (userArgs[0] !== ".") {
    console.log("Wrong format!, correct format is: getallroles .");
  } else {
    child = exec(dMSController.getAllRoles(userArgs[0]).then(function(roles) {
      console.log("View all roles:\n", roles);
    }));
  }
}

if (userCommand === 'createdocument') {
  if (userArgs.length < 2) {
    console.log("Wrong format, correct format is: createdocument documentname rolename")
  } else {
    console.log('show document');
    child = exec(dMSController.createDocument(userArgs[0], userArgs[1]).then(function(doc) {
      console.log('new document created!\n', doc);
    }));
  }
}

if (userCommand === "getalldocuments") {
  if (userArgs[0] !== ".") {
    console.log("Wrong format!, correct format is: getalldocuments .");
  } else {
    child = exec(dMSController.getAllDocuments(userArgs[0]).then(function(docs) {
      console.log("View all docs:\n", docs);
    }));
  }
}

if (userCommand === "getalldocumentsbyrole") {
  if (userArgs.length < 2) {
    console.log("Wrong format!, correct format is: getalldocumentsbyrole role limit");
  } else {
    child = exec(dMSController.getAllDocumentsByRole(userArgs[0], userArgs[1]).then(function(docs) {
      console.log("View all docs by this role:\n", docs);
    }));
  }
}

if (userCommand === "getalldocumentsbydate") {
  if (userArgs.length < 2) {
    console.log("Wrong format!, correct format is: getalldocumentsbyrole date limit");
  } else {
    child = exec(dMSController.getAllDocumentsByDate(userArgs[0], userArgs[1]).then(function(docs) {
      console.log("View all docs published on this date:\n", docs);
    }));
  }
}
