var mongoose = require("mongoose");

module.exports = function() {
  var db = mongoose.connect('mongodb://localhost:27017/dmsmongo');
  return db;
};
