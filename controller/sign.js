const emailchecker=require('./emailvalidator');
const express=require('express');
const {usermodel}=require('../model/connection')

const sendemail=require('./emailsender')





const signuprouter=express.Router();
signuprouter
.route('/')
.get(getsignup)
.post(postsignup)


var login_userdata;
function getsignup(req,res){
    try {
        res.render('signup')
    } catch (error) {
        res.render('error',{
            info:`signup error:${error.message}`
        })
    }
    
}

async function postsignup(req,res){
    try {
        var name = req.body.yourname;
        var email = req.body.email;
        var password=req.body.password;
        const confirm_password=req.body.confirm_password;
        if((name=="")||(email=="")||(password=="")||(confirm_password=="")){
            res.render('signup',{
                emptyinfo:"All fields are required"
            })
        }
        else{
        if(emailchecker(email)){
        if(confirm_password==password){
            login_userdata={name,email,password,flag:false};
            let userdata_at_db=await usermodel.findOne({email:login_userdata.email});
            if(userdata_at_db==null){
                console.log(login_userdata)
                sendemail(email,"Your verification code is ",null);
                res.redirect('/otp/signup');
            }
            else{
                res.render('signup',{
                    alreadyinfo:"User already exist with Same Email address"
                })
            }  
        }
        else{
        res.render('signup',{
            confirm_passwordinfo:"Password is not matching"
        })
        }
        }
        else{
            res.render('signup',{
                emailinfo:"Enter a valid email address"
            })
        }
    }   
    } catch (error) {
        res.render('signup',{
            emptyinfo:`signup error:${error}`
        })
    }
}
const otproute=express.Router();
otproute
.route('/signup')
.get(getotp)
.post(postotp)

function getotp(req,res){
    try {
        res.render('otp')
    } catch (error) {
        res.render('error',{
            info:"error in getting otp"
        })
    }
   
}
async function postotp(req,res){
try {
        if(req.body.otp==value){
            const {login_userdata}=require('./sign')
            console.log(login_userdata)
            let userdata_at_db=await usermodel.create(login_userdata);
            res.redirect('/login')
           }
           else{
            res.render('otp',{
                info:"Please Enter correct otp"
            })
        }
    } catch (error) {
       
        res.render('error',{
            info:"error in posting otp"
        })
    }
}
module.exports={signuprouter,otproute};