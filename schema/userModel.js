'use strict';

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    index: {
      unique: true
    },
    unique: true
  },
  lastname: {
    type: String,
    required: true,
    index: {
      unique: true
    },
    unique: true
  },
  username: {
    type: String,
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  role_name: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }]
});

mongoose.model('User', userSchema);
