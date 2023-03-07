const express=require('express');
const {usermodel}=require('../model/connection')
const emailchecker=require('./emailvalidator')
const app=express.Router();
app.get('/',(req,res)=>{
    res.render('emailpage');
})
app.post('/',async (req,res)=>{
   var payment_email=req.body.email;
   const paymentemailcheck=emailchecker(payment_email);
   const payment_user=await usermodel.findOne({email:payment_email});
   if(paymentemailcheck){
       if(!payment_user){
        res.render('emailpage',{
            notexitinfo:"User with this email is not registered with us try some other email id"
        })
       }
       else{
        await usermodel.findOneAndUpdate({email:payment_email},{subscribed:true});
        res.redirect('/login')
       }
   }
   else{
res.render('emailpage',{
    notexitinfo:"Please enter a valid email address"
})
   }
})

module.exports=app;