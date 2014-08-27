//var express=require('express');
//var http=require('http');
//var path = require('path');
//var url =require("url");
//
//var app = express();
//var bodyParser = require('body-parser');
var auth={
    authenticate: function(role){
        return function(req,res,next){
            if(!req.session.user){
                req.flash('error','login required');
                res.redirect('/login');
                return;

            }

            if(role && req.session.user.role !=role){
                req.flash('error','not authorised to view page');
            }
        }

    }
};
var fs = require('fs');
//var app = express();
//app.use(express.bodyParser);
//server.use(restify.authorizationParser());
//server.use(restify.dateParser());
//server.use(restify.queryParser());
//server.use(restify.jsonp());
//
//server.use(restify.bodyParser());
//server.use(restifyValidator);
//server.use(restify.gzipResponse());
//server.use(passport.initialize());
//server.use(restify.conditionalRequest());


var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
    // Create your schemas and models here.
});


//app.use(function(req, res, next) {
//    if (something && req.path !== '/')
//        return res.redirect('/');
//    next();
//});
//
//app.get('/', function(req, res, next) {
//    if (something)
//        return res.sendfile('/index.html', { root: __dirname + '/..' });
//    next();
//});

//app.get('/first_endpoint', function(req,res){
//    res.send("Hello World");
//    return res
//
//});

//app.use(express.static(...));

mongoose.connect('mongodb://localhost/test');

var movieSchema = new mongoose.Schema({
    title: String
    , rating: String
    , pass: String
    , releaseYear: Number
    , hasCreditCookie: Boolean
});

var transactionSchema = new mongoose.Schema({
    title: { type: String }
    , type: String
    , subtype: String
    , points: Number
   });

// Compile a 'Movie' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Movies' for these documents.
var Movie = mongoose.model('Movie', movieSchema);
var Transaction = mongoose.model('Transaction',transactionSchema);

var thor = new Movie({
    title: 'Raja Hindustani'
    , rating: 'PG-13'
    , pass: '1234'
    , releaseYear: '2010'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
    , hasCreditCookie: true
});

var tran = new Transaction({
    title: 'Client Acquisition'
    , type: 'Business Result'
    , subtype: 'Additive'
    , points: '0'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
});
thor.save(function(err, thor) {
    if (err) return console.error(err);

//    console.dir(thor);
});

tran.save(function(err, thor) {
    if (err) return console.error(err);

//    console.dir(thor);
});

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();
var mongo1=require('mongoose');
var fs=require('fs');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){

  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


app.configure('production', function(){
  app.use(express.errorHandler());
});
app.all('/admin/*', auth.authenticate('admin'));
app.get('/users', function(req,res,next)
{


////    res.send({name:'vandana'})
//    res.render('index',{title:'My App'})
//    res.render({title:'My App'});
////    res.send('Hello world')
});

app.get('/login', function(req, res) {
    res.sendfile('login.html');
});
app.post('/new', function(req,res){
    new user({
        name:req.body.name
    }).save(function(err,doc){

        })
    res.send(req.body.name)
});

app.get('/showuser', function(req, res) {
    mongoose.model('Movie').find(function(err,movies)
    {
        res.send(movies);
    })
});
app.get('/second_endpoint/:my_param', function(req,res){
    res.send("My Parameter is"+req.params.my_param+"!");

});
app.get('/showmoviebyid/:id', function(req, res) {
    mongoose.model('Movie').find({_id:req.params.id},function(err,movies) {
        res.send(movies);
    })

});

app.get('/authenticate_id/:name', function(req, res) {
    mongoose.model('Movie').find({title:req.params.name},function(err,movies) {
        res.send(movies);
    })

});
// Routes

//app.get('/', routes.index);

app.listen(3002, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});



//var server = restify.createServer([...]);
////
//var restifyRoutes = require('restify-routes');
//restifyRoutes.set(server, __dirname + '/routes');

