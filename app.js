require('dotenv').config();
const express = require("express");
const request = require("request");
const bodyparser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/singup.html");
});
app.post("/",function(req,res){/*singup button*/
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.inputEmail;
  const requestdata = {
    members: [{
      email_address:email,
      status: "subscribed",
      merge_fields:{
          FNAME:fname,
          LNAME:lname
      }
    }]
  };
  const Senddata = JSON.stringify(requestdata);
  console.log(Senddata);
  const url = "https://us10.api.mailchimp.com/3.0/lists/d3db0d2a9d";
  const option = {
    method:"POST",
    auth:process.env.auth
  }
  const request = https.request(url,option,function(response){
    if(response.statusCode == 200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
  })
  request.write(Senddata);
  request.end();
});
app.post("/failure.html",function(req,res){/*failture page redirect*/
    res.redirect("/");
})
app.listen(process.env.PORT || 3000 ,function(){/*Server Start*/
  console.log("Server is started");
});
