'use strict';

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var documentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  createdOn: {
    type: String
  },
  rolesWithAccess: [{
    type: Schema.Types.ObjectId,
    ref: 'Roles'
  }],
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },

});

documentSchema.pre('save', function(done) {
  var now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  done();
});

mongoose.model('Document', documentSchema);
