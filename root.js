var express = require('express');
var router = express.Router();

const user = require('../models/user');
const mongoose = require('mongoose');
//const client = require('../models/client');
const client = require('../models/client');

var globalClient = [];


var db = mongoose.connection;


router.get('/', function(err,req, res, next) {


  return res.render('root', {title: "root"});
});


router.get('/index', function(req, res, next) {

      db.collection('client').find().toArray(function (err, result) {
      if (err) return console.log(err);

      for (var i=0 ; i < result.length; i++){
       globalClient.push(result[i].name);
      }

      res.render('index.ejs', {client: result}) ;

    })




});






router.get('/test', function(req, res, next) {

  return res.render('test', { title: 'Test' });
});


router.get('/index/test', function(req, res, next) {
  //  res.send('The tag name is' + req.params.name);

  //console.log(globalClient);

  res.send('What is up ' + globalClient[15] + ' !');

});




router.post('/addname', function(req, res, next) {

  if (req.body.username && req.body.password) {

      // create object with form inputs
      var userData = {
        username: req.body.username,
        password: req.body.password
      };
      // use schema's `create` method to insert document into Mongo
      user.create(userData, function (error, user) {



      if (error) {

          console.log("error");
          return next(error);

        } else {
          console.log("saved");


           res.redirect('/index');
           return;
          }
      });

    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
})


module.exports = router;