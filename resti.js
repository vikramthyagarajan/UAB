var restify = require('restify')
//    , userSave = require('save')('Movie')
//
var server = restify.createServer({ name: 'my-api' })
//
//server.listen(8080, function () {
//    console.log('%s listening at %s', server.name, server.url)
//})
//
////var server = restify.createServer({ name: 'my-api' })
//
server.listen(3004, function () {
    console.log('%s listening at %s', server.name, server.url)
})

//server
//    .use(restify.fullResponse())
//    .use(restify.bodyParser())
//
//server.get('/user', function (req, res, next) {
//    userSave.find({}, function (error, users) {
//        res.send(users)
//    })
//})



var server = module.exports = restify.createServer({
    name : 'test-api'
    , version : '0.0.1-dev'
});

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


var client = restify.createJsonClient({
    url: 'http://localhost:3004'
    , versions : '0.0.1-dev'
});
client.basicAuth('panosru', '123123');



