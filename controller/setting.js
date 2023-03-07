const express=require('express');
const {usermodel}=require('../model/connection')
const bcrypt=require('bcrypt')


const changename=express.Router();
changename.post('/',async (req,res)=>{
    // console.log(req.body)
    let namechangeemail=req.body.email;
    let changedname=req.body.name;
    await usermodel.updateOne({email:namechangeemail},{name:changedname});
    // console.log('chagedname')
    res.send({
        flag:'done'
    })
})



const changepasswordroute=express.Router();
changepasswordroute.post('/',async (req,res)=>{
    let passwordchangeemail=req.body.email;
    let changingpassword=req.body.password;
    const salts=await bcrypt.genSalt();
    const hashpassword=await bcrypt.hash(changingpassword,salts);
    await usermodel.updateOne({email:passwordchangeemail},{password:hashpassword});
    res.send({
        flag:'done'
    })
})
module.exports={changename,changepasswordroute};