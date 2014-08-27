//var restify = require('restify')
////    , userSave = require('save')('Movie')
////
//var server = restify.createServer({ name: 'my-api' })
//
//
////var server = module.exports = restify.createServer({
////    name : 'test-api'
////    , version : '0.0.1-dev'
////});
//
//var passport = require('passport')
//    , LocalStrategy = require('passport-local').Strategy;
//
//passport.use(new LocalStrategy(
//    function(username, password, done) {
//        User.findOne({ username: username }, function(err, user) {
//            if (err) { return done(err); }
//            if (!user) {
//                return done(null, false, { message: 'Incorrect username.' });
//            }
//            if (!user.validPassword(password)) {
//                return done(null, false, { message: 'Incorrect password.' });
//            }
//            return done(null, user);
//        });
//    }
//));
//
//server.post('/login',
//    passport.authenticate('local', { successRedirect: '/',
//        failureRedirect: '/login',
//        failureFlash: true })
//);
//



//var path = require('path');
//var express = require('express');
//var http = require('http');
//var mongoose = require('mongoose');
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//var mongoose = require('mongoose'),
//    Schema = mongoose.Schema,
//    passportLocalMongoose = require('passport-local-mongoose');
//
//var Account = new Schema({
//    username: String,
//    password: String
//});
//
//Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);

app.get('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/users/' + user.username);
        });
    })(req, res, next);
});