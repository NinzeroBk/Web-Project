const express= require("express");
var app=express();
console.log("__dirname: ",__dirname);
app.get("/ceva",function(req,res){    
    console.log("Am primit o cerere"); 
   res.write("<p style='color:red'>altceva</p>");
     res.end();})
app.get("/", function(req,res){    res.sendFile(__dirname+"/index.html");});
 app.listen(8070);
 console.log("Server pornit!");

