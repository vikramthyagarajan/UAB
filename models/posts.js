//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//var postScheme=new postScheme({
//    comments: string
//})


//var restify = require('restify');
//var server = restify.createServer({
//    name: 'my webservice'
//});


//var restify = require('restify');
//
//var server = restify.createServer();
//
//server.get('/echo/:name', function (req, res, next) {
//    res.send({name: req.params.name});
//    next();
//});
//
//server.listen(8080, function () {
//    console.log('%s listening at %s', server.name, server.url);
//});




var bunyan = require('bunyan');
var restify = require('restify');

var log = bunyan.createLogger({
    name: 'my_restify_application',
    level: process.env.LOG_LEVEL || 'info',
    stream: process.stdout,
    serializers: bunyan.stdSerializers
});

var server = restify.createServer({
    log: log,
    name: 'my_restify_application'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.throttle({
    burst: 100,
    rate: 50,
    ip: true, // throttle based on source ip address
    overrides: {
        '127.0.0.1': {
            rate: 0, // unlimited
            burst: 0
        }
    }
}));
server.on('after', restify.auditLogger({ log: log }));

server.use(function authenticate(req, res, next) {
    // call redis or something here
    next();
});

// this one will be explained in the next section
server.use(function slowPoke(req, res, next) {
    setTimeout(next.bind(this), parseInt((process.env.SLEEP_TIME || 0), 10));
});

server.post('/echo/:name', function echoParms(req, res, next) {
    req.log.debug(req.params, 'echoParams: sending back all parameters');
    res.send(req.params);
    next();
});

server.listen(8080, function () {
    log.info('%s listening at %s', server.name, server.url);
});

