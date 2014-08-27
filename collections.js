var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/test');
var User=mongoose.model('User',{username:String,password:String});
// User.save(function
