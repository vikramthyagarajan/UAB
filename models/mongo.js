var dburl= 'localhost/mongoapp';
var collections= ['users'];
var db= require('mongojs').connect(dburl,collections);
function user(firstname,lastname,email,password){
    this.firstname=firstname;
    this.lastname=lastname;
    this.email=email;
    this.password=password;
}
var user1=new user("Raj","kumari","raj.coc@gmail.com",'12345');
db.users.save(user1,function(err,saveduser){
    if(err || ! saveduser)
    {
        console.log('user not saved');
    }
    else
    {
        console.log('user Saved');
    }

})




//var mongooes=require ('mongooes');
