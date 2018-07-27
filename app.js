var express = require("express")

var app = express();
var bodi = require("body-parser");
app.use(bodi.urlencoded({extened:true}))
var mongoose = require('mongoose');

mongoose.connect('mongodb://uditkhanna112:uditkhanna112@ds147391.mlab.com:47391/uditkhanna', (err,db) => {
  if(err){
    return console.log('Unable to connect');
  }

    console.log('Connected');
});

var schema = new mongoose.Schema({
  name: String,
  message:String
})

var mess = mongoose.model("mess",schema);

mess.find({},function(err,ab){
  if(err){
    console.log(err);
  }
  else{
    console.log(ab);
  }
});


app.get("/gallery",function(req,res){
  res.render("gallery.ejs");
});
app.get("/wishes2",function(req,res){
  res.render("wishes2.ejs");  
  
});
app.get("/about",function(req,res){
  res.render("home.ejs");
});
app.get("/wishes",function(req,res){
  res.render("wishes.ejs");
})
app.get("/display",function(req,res){
  mess.find({},function(err,details){
    if(err){
      console.log(err)
    }
    else
  res.render("display.ejs",{arr:details});  
  console.log(details);  
  });
  
});
app.post("/display",function(req,res){
  var name=req.body.name;
  var message=req.body.mess1;
  var newmes={name:name,message:message};
mess.create(newmes,function(err,newly){
  if(err){
    console.log(err);
  }
  else
  {
    res.redirect("/display")
  }
})
  
});


app.use('/assets',express.static('assets'))


var Port = process.env.PORT || 3000;
app.listen(Port);