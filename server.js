 'use strict';
 var app = require('express')();
 var port = process.env.PORT || 3000;
 var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost:27017/dms');

 app.listen(port, function(error) {
   if (error) {
     console.log('an error occured', error);
   }
   console.log('App up and running at:' + port);
 });
