const express=require('express');
const {usermodel}=require('../model/connection')



const alreadyexist=express.Router();
alreadyexist.get('/',(req,res)=>{
    res.render('alreadyexist')
})


const checksubscription=express.Router();
checksubscription.post('/',async (req,res)=>{
    const data_sub=await usermodel.findOne({email:req.body.email});
        res.send(data_sub.subscribed);
    })


module.exports={alreadyexist,checksubscription}