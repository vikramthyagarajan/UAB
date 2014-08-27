
var circle = require('./inheritance.js');


server.get('/animal', function(req, res) {
    mongoose.model('Animal').find(function(err,movies)
    {
        res.send(movies);
    })
});
server.get('/animal_by_id/:id', function(req, res) {
    mongoose.model('Animal').find({_id:req.params.id},function(err,animal) {
        res.send(animal);
    })

});
server.get('/animal_by_id/:id', function(req, res) {
    mongoose.model('Animal').find({_id:req.params.id},function(err,animal) {
        res.send(animal);
    })

});