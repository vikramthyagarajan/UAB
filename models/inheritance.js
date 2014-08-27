var restify = require('restify')
var util = require('util');
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;
	var Schema = mongoose.Schema;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
//  console.log("mongodb is opened");
});



    function AbstractAnimalSchema() {
       	    Schema.apply(this, arguments);

        	    this.add({
            	        name: String
        	    });
    	};

    	util.inherits(AbstractAnimalSchema, Schema);


    var AnimalSchema = new AbstractAnimalSchema();

    	var KittySchema = new AbstractAnimalSchema({
       	    tail_type: String
    	});

    	var DogSchema = new AbstractAnimalSchema({
        	    leg_type: String
    	});

    	var Animal = mongoose.model('Animal', AnimalSchema); // our base model
    	var Dog = Animal.discriminator('Dog', DogSchema); // our derived model (see discriminator)
    	var Kitten = Animal.discriminator('Kitten', KittySchema); // our derived model (see discriminator)


    var mycat = new Kitten({ name: "My Kitten", tail_type: "Long" });
    	mycat.save(function(err, mycat) {
//        	    console.log("kitten is saved"); // no error checking, we're so cool.
        	});

    	var mydog = new Dog({ name: "My dog", leg_type: "Short Legged" });
    	mydog.save(function(err, mydog) {
//        	    console.log("dog is saved");
        	});



    Animal.find(function(err, animals) {
//        	    console.log("all animals: ");
//        	    console.log(animals);
        	});
var server = restify.createServer({ name: 'my-api' });
server.listen(3004, function(){
    console.log("Express server listening on port 3004  in  mode", server.address(),server.port);
});
//    var app = module.exports = express.createServer();
//server.get('/animal', function(req, res) {
//        mongoose.model('Animal').find(function(err,movies)
//        {
//            res.send(movies);
//        })
//    });
//server.get('/animal_by_id/:id', function(req, res) {
//    mongoose.model('Animal').find({_id:req.params.id},function(err,animal) {
//        res.send(animal);
//    })
//
//});