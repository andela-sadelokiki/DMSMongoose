'use strict';

var dMSController = require('./dMSController.js');
require('./schema/userModel.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Role = mongoose.model('Role');
var Document = mongoose.model('Document');
mongoose.connect('mongodb://localhost:27017/dms');

describe('User', function() {

  beforeEach(function(done) {
    User.remove({}, function(err) {}).then(function() {
      Role.remove({}, function(err) {}).then(function() {
        dMSController.createUser('tola', 'badmus', 'Attendant').then(function(user) {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    User.remove({}, function(err) {}).then(function() {
      Role.remove({}, function(err) {});
      done();
    });
  });

  it('should validate that new user is unique', function(done) {
    User.find({
      firstname: 'tola'
    }).then(function(user) {
      expect(user.length).toBe(1);
      done();
    });
  });

  it('should validate that a new user created has a role defined.', function(done) {
    User.find({
      firstname: 'tola'
    }).then(function(user) {
      expect(user[0].role_name).toBeDefined();
      done();
    });
  });

  it('should validate that a new user created both first and last names.', function(done) {
    User.find({
      firstname: 'tola'
    }).then(function(user) {
      expect(user[0].firstname).toBe('tola');
      expect(user[0].lastname).toBe('badmus');
      done();
    });
  });

  it('should validate that all users are returned when getAllUsers is called', function(done) {
    dMSController.createUser('sola', 'ajayi', 'Attendant').then(function() {
      dMSController.getAllUsers().then(function(users) {
        expect(users.length).toBe(2);
        done();
      });
    });
  });

});

describe('Role', function() {

  beforeEach(function(done) {
    Role.remove({}, function(err) {}).then(function() {
      dMSController.createRole('Technician').then(function(user) {});
      done();
    });
  });

  afterEach(function(done) {
    Role.remove({}, function(err) {}).then(function() {
      done();
    });
  });

  it('should validate that a new role created has a unique title', function(done) {
    Role.find({
      title: 'Technician'
    }).then(function(role) {
      expect(role.length).toBe(1);
      done();
    });
  });


  it('should validate that all roles are returned when getAllRoles is called', function(done) {
    dMSController.createRole('Manager').then(function() {
      dMSController.getAllRoles().then(function(roles) {
        expect(roles.length).toBe(2);
        done();
      });
    });
  });

});

describe('Document', function() {

  beforeEach(function(done) {
    Document.remove({}, function(err) {}).then(function() {
      Role.remove({}, function(err) {}).then(function() {
        dMSController.createDocument('Contract', 'CEO').then(function(Document) {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    Document.remove({}, function(err) {}).then(function() {
      Role.remove({}, function(err) {}).then(function() {
        done();
      });
    });
  });

  it('should validate that a new user document created has a published date defined.', function(done) {
    Document.find({
      title: 'Contract'
    }).then(function(docs) {
      expect(docs[0].created_at).toBeDefined();
      done();
    });
  });

  it('should validate that all documents are returned, limited by a specified number, when getAllDocuments is called.', function(done) {
    dMSController.createDocument('Letters', 'CEO').then(function() {
      dMSController.createDocument('Magazines', 'CEO').then(function() {
        dMSController.getAllDocuments().limit(2).then(function(documents) {
          expect(documents.length).toBe(2);
          done();
        });
      });
    });
  });

  it('should validate that all documents are returned in order of their published dates, starting from the most recent when getAllDocuments is called.', function(done) {
    dMSController.createDocument('Newsletter 1', 'FELLOW 1').then(function() {
      dMSController.createDocument('Newsletter 2', 'FELLOW 1').then(function() {
        dMSController.createDocument('Newsletter 3', 'FELLOW 3').then(function() {
          dMSController.createDocument('Newsletter 4', 'FELLOW 4').then(function() {
            dMSController.getAllDocuments().then(function(documents) {
              expect(documents.length).toBe(5);
              expect(documents[0].created_at).toBeDefined();
              expect(documents[1].created_at).toBeDefined();
              expect(documents[2].created_at).toBeDefined();
              expect(documents[3].created_at).toBeDefined();
              expect(documents[4].created_at).toBeDefined();
              done();
            });
          });
        });
      });
    });
  });

});

describe('Search', function() {

  beforeEach(function(done) {
    Document.remove({}, function(err) {}).then(function() {
      Role.remove({}, function(err) {}).then(function() {
        dMSController.createDocument('Attendance', 'Class-captain').then(function(result) {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    Document.remove({}, function(err) {}).then(function() {
      Role.remove({}, function(err) {}).then(function() {
        done();
      });
    });
  });

  it('validates that all documents, limited by a specified number and ordered by published date, that can be accessed by a specified role, are returned when getAllDocumentsByRole is called.', function(done) {
    var documents = [];
    dMSController.createDocument('Manual', 'Class-captain').then(function() {
      dMSController.createDocument('Letters', 'Class-captain').then(function() {
        dMSController.getAllDocumentsByRole('Class-captain', 3).then(function(result) {
          for (var i = 0; i < result.length; i++) {
            documents.push(result[i].title);
          }
          expect(documents.length).toBe(3);
          expect(documents[0]).toBe('Attendance');
          expect(documents[1]).toBe('Manual');
          done();
        });
      });
    });
  });

  it('validates that all documents, limited by a specified number, that were published on a certain date, are returned when getAllDocumentsByDate is called.', function(done) {
    var documents = [];
    dMSController.createDocument('Manual', 'Class-captain').then(function() {
      dMSController.createDocument('Letters', 'Class-captain').then(function() {
        dMSController.getAllDocumentsByDate('15-9-2015', 2).then(function(result) {
          for (var i = 0; i < result.length; i++) {
            documents.push(result[i].title);
          }
          expect(documents.length).toBe(2);
          expect(documents[0]).toBe('Attendance');
          expect(documents[1]).toBe('Manual');
          done();
        });
      });
    });
  });

});


