const express = require('express');
const con = require('./connection');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/home.html');
});

app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/registration.html');
});

app.get('/search',(req,res)=>{
    res.sendFile(__dirname + '/search.html');
});

app.post('/register',(req,res)=>{

    var name = req.body.name;
    var city = req.body.city;
    var phone_number = req.body.phone_number;
    var blood_type = req.body.blood_type;
    var rh_factor = req.body.rh_factor;
    var address = req.body.address;

    console.log(blood_type);
    con.connect((error)=>{
        var sql= "INSERT INTO donors(name, city, phone_number, blood_type, rh_factor,address) Values ?";
        var values = [
            [name, city, phone_number, blood_type, rh_factor,address]
        ]
        con.query(sql,[values],(error)=>{
            if(error){
                res.send("user already exits or check the inputs.")
            };
            res.sendFile(__dirname+"/success.html");
        })
    })
});

app.post('/search',(req,res)=>{

    var city=req.body.city;
    var blood_type =req.body.blood_type;
    var rh_factor =req.body.rh_factor;

    con.connect((error)=>{
        var sql= "Select * from donors Where city=? AND blood_type=? AND rh_factor=?";
        con.query(sql,[city,blood_type,rh_factor],(error,result)=>{
            if(error){
                res.send("error")
            };
            res.send(result);
        })
    })
})

app.listen(3000,function(req,res){
    console.log("Server is listening on port 3000");
});