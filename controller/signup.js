const express = require('express');
const jwt=require('jsonwebtoken')
const bodyParser=require('body-parser')
const bcrypt=require('bcrypt');
const emailchecker=require('./emailvalidator')
const {usermodel}=require('../model/connection');
const sendemail=require('./emailsender');
const cookieParser = require('cookie-parser');
const path=require('path')
const url=require('url')
var crypto = require("crypto");
const passport=require('passport')
const googlestrategy=require('passport-google-oauth20')
const expresssession=require('express-session')
const hbs=require('hbs')
const Razorpay=require('razorpay');
require('dotenv').config()
const app = express()
app.use(express.json());
app.use(express.static(path.join(__dirname,'../views')));
app.use(express.static(path.join(__dirname,'../views/css')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.listen(3000);
var {protectroute,authprotect}=require('../middlewares/protectroute')
const jwt_key=process.env.jwt_key
app.set('view engine','hbs');
const hbs_url=path.join(__dirname,'../views/html')
const partial_url=path.join(__dirname,'../views/partials')
app.set('views',hbs_url)
hbs.registerPartials(partial_url)


var googlelogindata={
    flag:false
};




// forgot password route---------------------------------------------------------
const forgetroute=require('./forgotpassword')
app.use('/forgotpassword',forgetroute);


// logout route--------------->>>
const logoutroute=require('./logout');
app.use('/logout',logoutroute)

// checksubscription route placed in otherroute file---------------------->>>>
const {checksubscription}=require('./otherroutes')
app.use('/checksubscription',checksubscription);


// playlist section ------------------------>>>
const {getexistingplaylists}=require('./playlist');
app.use('/getexistplaylist',getexistingplaylists)

const {addtoexistingplaylist}=require('./playlist');
app.use('/addtoexistingplaylist',addtoexistingplaylist)

const {createnewplaylist}=require('./playlist');
app.use('/createnewplaylist',createnewplaylist);

const {removeplaylist}=require('./playlist')
app.use('/removeplaylist',removeplaylist)

const {removeplaylistsong}=require('./playlist')
app.use('/removeplaylistsong',removeplaylistsong)

// history section------------------->>>
const {history}=require('./history')
app.use('/history',history)
const {gethistory}=require('./history')
app.use('/gethistory',gethistory);
const {removehistory}=require('./history')
app.use('/removehistory',removehistory)


// already exist-------------------------->>>
const {alreadyexist}=require('./otherroutes');
app.use('/alreadyexist',alreadyexist)

// setting section----------------------->>
const {changename}=require('./setting')
app.use('/changename',changename)


const {changepasswordroute}=require('./setting');
app.use('/changepassword',changepasswordroute);

// liked section---------------------->>>
const {likeroute}=require('./likes');
app.use('/likes',likeroute)
const {getlikesdata}=require('./likes')
app.use('/getlikesdata',getlikesdata)
const{removelike}=require('./likes')
app.use('/removelike',removelike)

// payment section rendering------------------------------->>>
const paymentroute=express.Router();
app.use('/payment',paymentroute)
paymentroute
.route('/')
.get(getpayment)
function getpayment(req,res){
  res.render('subscription')
}

// paymentsuccess route-------------->>>
const paymentsuccess=require('./paymentsuccess');
app.use('/paymentsuccess',paymentsuccess)



// checkout route---------------------->>>>
const checkout=require('./checkout')
app.use('/checkout',checkout)


// order creation section=----------------------->>>
const {createorderroute}=require('./order')
app.use('/createorder',createorderroute)

    
// signup route------------------->
const signuprouter=express.Router();
app.use('/signup',signuprouter)
signuprouter
.route('/')
.get(authprotect,getsignup)
.post(authprotect,postsignup)

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
        var {email} = req.body;
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
            const userdataatdb=await usermodel.findOne({email:email});
            if(userdataatdb==null){
                sendemail(email,"Your verification code is ",null);
                res.redirect('/otp/signup');
                return;
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
app.use('/otp',otproute)
otproute
.route('/signup')
.get(authprotect,getotp)
.post(authprotect,postotp)

function getotp(req,res,next){
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
            info:"error in getting otp"
        })
    }
}

// otproute
// .route('/google')
// .get(getotp)
// .post(postgoogle)

// async function postgoogle(req,res){
//     try {
//         if(req.body.otp==value){
//          let googleuser=await usermodel.create(google_userdata);
//          res.redirect('/login')
//         } 
//         else{
//             res.render('otp',{
//                 info:"Please Enter correct otp"
//             })
//         }
//     }catch(error){  res.render('error',{
//         info:"error in getting otp"
//     })
//     }
// }

const loginuser=express.Router();
app.use('/login',loginuser)
loginuser
.route('/')
.get(authprotect,getlogin)
.post(authprotect,logindata)


function getlogin(req,res){
    try{
        res.render('login')
    }
    catch(error){
        res.render('error',{
            info:"error with login page  try after some time"
        })
    }
}

async function logindata(req,res,next){
    try {
    const {email,password}=req.body;
    const data=await usermodel.findOne({email:email});
    const emailcheck=emailchecker(email);
    if(emailcheck){
    if(data){
    const check=bcrypt.compare(password,data.password,(err,result)=>{
     if(err){
         res.render('login',{
            notexitinfo:err.message
         })
     }
     if(result){
         let u_id=data['_id'];
       var token=jwt.sign({payload:u_id},jwt_key);
        res.cookie('login',token,{maxAge:10000000,secure:true,httpOnly:true});
        res.redirect('/main');
       
     }
     else{
       res.render('login',{
        wrongpassword:"Password is wrong"
       })
     }
    })
    
}
else{
    if(googlelogindata.flag=="user exist"){
        console.log("me")
        res.render('login',{
            notexitinfo:"User not exist"
        })
    }
    else{
        res.render('login',{
            notexitinfo:"User not exist"
        })
    }
    
}
    }
    else{
        res.render('login',{
            wrongemail:"Enter a valid email"
        })
    }
    } catch (error) {
        res.render('error',{
            info:error
        })
    }
    
}



const temps=express.Router();
app.use('/main',temps)
temps
.route('/')
.get(protectroute,gettemp)

async function gettemp(req,res){
    if(req.cookies.login){
        let {payload}=await jwt.verify(req.cookies.login,jwt_key);
        let userdetails=await usermodel.findById(payload);
        res.render('main',{
            flag:false,
            username:userdetails.name,
            useremail:userdetails.email
        })
        return;
    }
   
    // console.log(googlelogindata);
    // if(googlelogindata.flag==true){
    //     res.render('main',{
    //         flag:false,
    //         username:googlelogindata.name,
    //         useremail:googlelogindata.email
    //     });
    // }
    // else{
    //     if(req.query.name==undefined){
    //         res.render('main',{
    //             flag:true
    //         })
    //     }
    //     else{
    //         res.render('main',{
    //             flag:false,
    //             username:req.query.name,
    //             useremail:req.query.email_
    //         })
    //     }
    // }
    
    
}















// google signup auth------------------------------------------------------------------------------------------------------>

try {
    app.use(expresssession({
        secret: 'keyboard cat', resave: true, saveUninitialized: true,
        name:"helo",
        keys:['key1','key2']
    }))
    passport.use(new googlestrategy({
        clientID:process.env.clientID,
        clientSecret:process.env.clientSecret,
        callbackURL:"http://localhost:3000/google/callback"
    },(accessToken,refreshToken,profile,done)=>{
        data=profile._json;
        done(null,profile._json.name)
    }))
    app.use(passport.initialize());
    app.use(passport.session())
    
    passport.serializeUser((user,done)=>{
        done(null,user);
    })
    passport.deserializeUser((user,done)=>{
        done(null,user);
    })
    app.get('/googleauth',passport.authenticate("google",{
        scope:["profile","email"]
    }))
    app.get('/fail',(req,res)=>{
        res.render('error',{
            info:"error at google auth"
        })
    })

    
    app.get("/google/callback",passport.authenticate('google',{failureRedirect:'/fail'}),async (req,res,next)=>{
        let u_id=data.email;
            try {
            let google_userdata=u_id;
            const googledata_db=await usermodel.findOne({email:data.email});
            if(googledata_db!=null&&googledata_db.flag==true){
                let token=jwt.sign({payload:googledata_db.id},jwt_key);
                res.cookie('login',token,{maxAge:10000000,secure:true,httpOnly:true});
                res.redirect('/main')
            }
            else if(googledata_db!=null&&googledata_db.flag==false){
                res.redirect('/alreadyexist')
            }
            else{
                // sendemail(data.email,"Your verification code is ",null);
                google_userdata={ email:data.email,name:data.name,image:data.picture,password:"",flag:true};
                const googledata=await usermodel.create(google_userdata);
                let token=jwt.sign({payload:googledata.id},jwt_key);
                res.cookie('login',token,{maxAge:10000000,secure:true,httpOnly:true});
                res.redirect('/main')
            }
                } catch (error) {
                res.render('error',{
                    info:error.message
                })
                }
    })
    
} catch (error) {
    res.render('error',{
        info:"error at google auth"
    })
}




