const express = require("express");
const fs = require('fs');
const favicon = require("serve-favicon");
const sharp = require("sharp");
const {Client} = require("pg");

var app=express();

app.set("view engine", "ejs");

console.log("__dirname: ",__dirname);

app.use("/resources", express.static(__dirname+"/resources"));

app.use(favicon(__dirname+"/favicon.ico"));

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
current_date = new Date();

function generate_imgs(){
    var buffer_img = fs.readFileSync(__dirname+"/resources/json/static-gallery.json").toString("utf-8");
    obImg = JSON.parse(buffer_img);

    for (let img of obImg.images){
        let aux=img.file_path.split(".");
        let img_name = aux[0];
        let img_extension = aux[1];
        let small_width = 200;
        let small_height = 280;
        let med_width = 350;
        let med_height = 490;

        img.small = `${obImg.gallery_path}/${img_name}-${small_width}.webp`
        img.med = `${obImg.gallery_path}/${img_name}-${med_width}.webp`
        img.large = `${obImg.gallery_path}/${img_name}.png`
        if(!fs.existsSync(img.small))
            sharp(__dirname + "/" + img.large).resize(small_width, small_height).toFile(__dirname + "/" + img.small);
            sharp(__dirname + "/" + img.large).resize(med_width, med_height).toFile(__dirname + "/" + img.med);
    }
}

generate_imgs();



app.get(["/","/index","/home"], function(req, res){
    console.log(req.url, req.ip);
    res.render("pages/index", {ip:req.ip, staticImgs:obImg.images.slice(0,12), staticImgs_path:obImg.gallery_path, current_month:months[current_date.getMonth()-1]});
});

app.get(["/history"], function(req, res){
    console.log(req.url, req.ip);
    res.render("pages/history");
});

app.get(["/phones"], function(req, res){
    console.log(req.url, req.ip);
    res.render("pages/phones",{staticImgs:obImg.images.slice(0,12), staticImgs_path:obImg.gallery_path, current_month:months[current_date.getMonth()-1]});
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

