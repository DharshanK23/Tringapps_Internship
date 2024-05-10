var express = require("express");
var mysql=require("mysql");
var app = express();

app.use(express.json());

const db=mysql.createConnection({
    user:"root",
    host:"localhost",  
    password:"#Dharshan237",
    database:"user",
});

app.listen(3000, () => {
    console.log("Listening on port.....");  
});