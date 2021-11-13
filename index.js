const express= require("express");
var favicon=require("serve-favicon");
var app=express();

app.set("view engine", "ejs");

console.log("__dirname: ",__dirname);

app.use("/resources", express.static(__dirname+"/resources"));

app.use(favicon(__dirname+"/favicon.ico"));

app.get("/ceva",function(req,res){    
    console.log("Am primit o cerere"); 
    res.write("<p style='color:red'>altceva</p>");
    res.end();
});

app.get("/", function(req,res){
    //res.sendFile(__dirname+"/index.html");
    res.render("pages/index");     //calea sa fie relativa la folderul views
});

app.get("/*", function(req, res){
    console.log(req.url)
    res.render("pages" + req.url, function(err, resRender){
        if(err){
            res.status(404).render("pages/404");
            return;
        }
        res.send(resRender);
    });
});

 app.listen(8080);
 console.log("Server pornit!");

