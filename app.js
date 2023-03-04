var express= require('express');
var bodyparser=require("body-parser");
var app=express();
var mysql= require('mysql');
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended:true}))




var con= mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'123456789',
        database:'join_us'
        
    }
);
app.get('/', function(req, res)
{
    
    //find count of uers in db

    var q="select count(*) as count from users";
    con.query(q, function(err, result)
    {
        if (err) throw (err);
       var count=(result[0].count);
      res.render("home", {data:count});


    });
   
  
}
);


app.post("/register", function(req, res){
    
    var person={
        email:req.body.email
    };
    con.query("insert into users set ?", person, function(err, result){
        if (err) throw err;
        console.log(result);
    });
    res.redirect("/")
});







app.listen(8080, function() {
    console.log("server running on 8080");
});
