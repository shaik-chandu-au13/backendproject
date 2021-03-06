const express = require('express');
const path = require('path');
const app = express();
const db = require('./config/database');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
port = process.env.PORT || 5000;
const User = require('./model/UserSchema');
const cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/")));
app.get('/signup',(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
    // res.sendFile(__dirname + "/style.css")
})
app.post('/register',async (req,res)=>{
    var hashpassword = bcrypt.hashSync(req.body.password,8);
    var user = await User.findOne({email:req.body.email});
    if(user){
        res.status(400).send("user already exist");
    }else{
    User.create({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        password:hashpassword
        
    },(err,user)=>{
        if(err) throw err;
        res.status(200).send('Registration Success')
    })}
})
app.get('/users',(req,res)=>{
    User.find({},(err,user)=>{
        if (err) throw err;
        res.status(200).send(user)

    })
})
app.get("/",(req,res)=>{
    res.send("all okay")
})
app.listen(port,()=>{
    console.log(`listening on ${port}`);
})