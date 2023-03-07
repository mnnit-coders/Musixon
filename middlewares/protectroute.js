const jwt=require('jsonwebtoken');
const express=require('express')
function protectroute(req,res,next){
    
    if(!req.cookies.login){
       res.render('main',{
        flag:true
       })
    }
    else{
        next();
    }
}
function authprotect(req,res,next){
    if(!req.cookies.login){
        next();
    }
    else{
        res.redirect('/main');
    }
}
module.exports={protectroute,authprotect}