var restify = require('restify')
var server = module.exports = restify.createServer({
    name : 'test-api'
    , version : '0.0.1-dev'
});
var passport = require('passport') , LocalStrategy = require('passport-local').Strategy;
var escape=require('escape-html');

// Middlewares
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser({ mapParams : false }));
server.use(restify.urlEncodedBodyParser());
server.use(restify.bodyParser({ mapParams : false }));
server.use(restify.throttle({
    burst : 100
    , rate : 50
    , ip : true
    , overrides : {

    }
}));
server.use(passport.initialize());
server.use(passport.session());
server.listen(3004, function () {
    console.log('%s listening at %s', server.name, server.url)
});

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');
var User=mongoose.model('User',{username:String,password:String});
var user1=new User({username:"vikram@ptotem.com",password:"test"});
user1.save();
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: escape(username) }, function(err, user) {
      if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        // if (!user.validPassword(password)) {
        //   return done(null, false, { message: 'Incorrect password.' });
        // }
        return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(name, done) {
    User.findOne({username:name}, function(err, user) {
      done(err, user);
    });
});

// console.log(passport);
server.get('/',restify.serveStatic({
  directory:'./views',
  default:'index.html'
}));
server.get('/login',passport.authenticate('local'),function(req,res){
  res.send("done!");
  // req.get
  // if(req.isAuthenticated())
  // else
  //   console.log('boohoo');
  // console.log('stating');
  // passport.authenticate('local',function(err,user){
  //   console.log('starting');
  //   if(err)
  //     console.log('err');
  //   if(user)
  //     console.log('use');
  // })(req,res);
  // console.log('stopping');
    // function(err,user,info){
    // console.log(err);
    // console.log(user);
    // console.log(info);
  // });
  // res.send('sdfs');
  // res.send('index.html');
}
);

