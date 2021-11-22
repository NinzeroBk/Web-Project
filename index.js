const express = require("express");
var favicon = require("serve-favicon");
const {Client} = require("pg");
var app=express();

app.set("view engine", "ejs");

console.log("__dirname: ",__dirname);

app.use("/resources", express.static(__dirname+"/resources"));

app.use(favicon(__dirname+"/favicon.ico"));

app.get(["/","/index","/home"], function(req, res){
    console.log(req.url, req.ip);
    res.render("pages/index", {ip:req.ip});
});

app.get(["/history"], function(req, res){
    console.log(req.url, req.ip);
    res.render("pages/history", {ip:req.ip});
});

app.get("/*.ejs", function(req, res){
    res.status(403).render("pages/403")
});

app.get("/*", function(req, res){
    console.log(req.url, req.ip)
    res.render("pages" + req.url, function(err, resRender){
            if(err.message.includes("Failed to lookup")){
                res.status(404).render("pages/404");
                return;
            }
        res.send(resRender);
    });
});

 app.listen(8080);
 console.log("Server pornit!");

