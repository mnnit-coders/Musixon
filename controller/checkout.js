const express=require('express');
const {usermodel}=require('../model/connection');
var crypto = require("crypto");
const checkout=express.Router();
checkout.post("/",(req,res)=>{

    let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
     var expectedSignature = crypto.createHmac('sha256', process.env.key_secret)
                                     .update(body.toString())
                                     .digest('hex');
     if(expectedSignature === req.body.razorpay_signature)
     {
       res.redirect('/paymentsuccess');
     }
     else{
        res.render('404',{
            info:"payment is fake"
        })
     }
     });

     module.exports=checkout;