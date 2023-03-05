const express = require ('express')
const mongoose = require ('mongoose')
require('dotenv/config')
const app = express();
const port = 8080;
const  Jwt = require('jsonwebtoken');
const fs = require('fs')
const logger =require("./middleware/logger");
const bodyparser = require('body-parser')
var cookieParser = require('cookie-parser');
var secrete = fs.readFileSync('secret.key');


//parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyparser.json())


//Application_level_middleware
app.use(logger);


//Router_level_middleware
app.use('/routes/member' , require('./routes/member'));
app.use('/routes/med' , require('./routes/med'));


//third_party_middleware
app.use(cookieParser());


//parser_middleware (Built_in_middleware)
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));


app.get('/', function(req, res){
     res.cookie('name', 'express').send('cookie set');
     console.log('Cookies: ', req.cookies);
 });


 app.post('/login', (req, res) => {
    const u = {
        name: "admin",
        username: "admin", 
        password: "123456"
    }
    Jwt.sign({u}, secrete, (err, token )=>{
        if(err){
            res.json({message:"username or pass not correct"})
        }
        res.json({token})
    })
  })
  



mongoose.connect(process.env.db_connect , () =>{
     console.log("connect to database");
})


app.listen(port ,() =>{
    console.log(`Example app listening on port ${port}` )
})