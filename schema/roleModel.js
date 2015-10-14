'use strict';

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var roleSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: {
      unique: true
    },
    unique: true
  },
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});
mongoose.model('Role', roleSchema);
