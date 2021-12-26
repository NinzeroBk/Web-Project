const express = require("express");
const fs = require('fs');
const favicon = require("serve-favicon");
const sharp = require("sharp");
const {Client} = require("pg");
const ejs = require("ejs")
const path = require('path');
const sass = require('sass');

var app=express();

var dateAdded_local = "";
var types = [];
var typesCaps = [];

app.set("view engine", "ejs");

console.log("__dirname: ",__dirname);

app.use("/resources", express.static(__dirname+"/resources"));

app.use(favicon(__dirname+"/favicon.ico"));

var client = new Client({user: 'nicolaugeorge', password: 'georgenicolau', database:"WebProject", host: 'localhost', port:5432});

client.connect();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

client.query("select * from unnest(enum_range(null::product_subcategory))", function(errTypes, rezTypes){
    
    for(let elem of rezTypes.rows){
        types.push(elem.unnest);
        
    } 

    for(let i = 0; i < types.length; i++){
        typesCaps[i] = capitalizeFirstLetter(types[i])
    }
})

app.locals.dateAdded = "";
app.locals.typesMenu = types;
app.locals.typesMenuCaps = typesCaps;

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

let nrImgs;
let randNrImgs

app.get("*/animated-gallery.css", function(req, res){
    /*Atentie modul de rezolvare din acest app.get() este strict pentru a demonstra niste tehnici
    si nu pentru ca ar fi cel mai eficient mod de rezolvare*/
    res.setHeader("Content-Type","text/css");//pregatesc raspunsul de tip css
    let sirScss=fs.readFileSync("./resources/scss/animated-gallery.scss").toString("utf-8");//citesc scss-ul cs string
    //iau o culoare aleatoare pentru border
	//console.log(culoareAleatoare);
    //let nrImag= 10+Math.floor(Math.random()*5)*2;  //Math.floor(Math.random()*10) 
    let rezScss=ejs.render(sirScss,{randNrImgs:randNrImgs});// transmit culoarea catre scss si obtin sirul cu scss-ul compilat
    //console.log(rezScss);
    fs.writeFileSync("./resources/temp/animated-gallery.scss",rezScss);//scriu scss-ul intr-un fisier temporar

	let cale_css=path.join(__dirname,"resources","temp","animated-gallery.css");//__dirname+"/temp/galerie-animata.css"
	let cale_scss=path.join(__dirname,"resources","temp","animated-gallery.scss");
	sass.render({file: cale_scss, sourceMap:true}, function(err, rezCompilare) {
		//console.log(rezCompilare);
		if (err) {
            console.log(`eroare: ${err.message}`);
            //to do: css default
            res.end();//termin transmisiunea in caz de eroare
            return;
        }
		fs.writeFileSync(cale_css, rezCompilare.css, function(err){
			if(err){console.log(err);}
		});
		res.sendFile(cale_css);
	});
	//varianta cu pachetul sass
});

app.get(["/","/index","/home"], function(req, res){
    nrImgs=[7,8,9,11]
    randNrImgs = nrImgs[Math.floor(Math.random()*nrImgs.length)];
    console.log(req.url, req.ip);
    res.render("pages/index", {ip:req.ip, staticImgs:obImg.images.slice(0,12), randNrImgs:obImg.images.slice(0,randNrImgs), staticImgs_path:obImg.gallery_path, current_month:months[current_date.getMonth()-1]});
});

app.get(["/history"], function(req, res){
    console.log(req.url, req.ip);
    res.render("pages/history");
});

app.get(["/products"], function(req, res){
    console.log(req.query);
    var condition="";
    if(req.query.type)
        condition += ` and type='${req.query.type}'`;
        console.log(req.query.type)
    client.query(`SELECT * FROM products where 1=1 ${condition}`, function(err, rez){
        if(!err){
            //console.log(rez);
            res.render("pages/products", {products:rez.rows});
        }
        else{
            console.log(err);
        }
    })
});

app.get("/product/:id", function(req, res){
    //console.log(req.params)
    client.query(`select * from products where id=${req.params.id}`, function(err,rez){
        if (!err){
            //console.log(rez);
            res.render("pages/product",{prod:rez.rows[0]});
            
        }
        else{//TO DO curs
        }
    })
})




app.get(["/phones"], function(req, res){
    nrImgs=[7,8,9,11]
    randNrImgs = nrImgs[Math.floor(Math.random()*nrImgs.length)];
    console.log(req.url, req.ip);
    console.log(randNrImgs);
    res.render("pages/phones",{staticImgs:obImg.images.slice(0,12), randNrImgs:obImg.images.slice(0,randNrImgs), staticImgs_path:obImg.gallery_path, current_month:months[current_date.getMonth()-1]});
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

