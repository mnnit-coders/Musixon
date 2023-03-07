const mongoose =require('mongoose')
const emailval=require('email-validator')
require('dotenv').config('../')
const {userschema,googleschema}=require('./schema')
mongoose.connect(process.env.mongo_connect)
.then(function(db){
  console.log("db is connected");
})
.catch(function(err){
  console.log(err);
})

const usermodel=mongoose.model('usermodel',userschema);
const googlemodel=mongoose.model('googlemodel',googleschema)
module.exports={usermodel,googlemodel}