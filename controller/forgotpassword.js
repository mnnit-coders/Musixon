const express=require('express');
const {usermodel}=require('../model/connection');
const bcrypt=require('bcrypt');
const sendemail=require('./emailsender');
const forgetroute=express.Router();

forgetroute
.route('/')
.get(getforgetpassword)
.post(postpassword)

function getforgetpassword(req,res){
    try {
        res.render('forgot');
    } catch (error) {
        res.render('error',{
            info:`forgot error:${error.message}`
        })
    }
}

async function postpassword(req,res){
    const femail=req.body.email;
    const fpass=req.body.password;
    const cpass=req.body.cpassword;
    try {
        if(femail==""||fpass==""||cpass==""){
        res.render('forgot',{
            info:'All fields are required'
        })
        }
        else{
            const femail=req.body.email;
            const fuserdata=await usermodel.findOne({email:femail});

            if(fuserdata==null){
               res.render('forgot',{
                flag:false,
                info:"User doesn't exist"
               }) 
            }
            else{
                if(fuserdata.flag==true){
                  res.render('forgot',{
                    info:"Password change is not allowed"
                  })
                }
                else{
                const fpass=req.body.password;
                const cpass=req.body.cpassword;
                
                if(fpass!=cpass){
                    res.render('forgot',{
                        flag:false,
                        info:"Password is not matching"
                    })
                }
                else{
                    const salts=await bcrypt.genSalt();
                    const hashs=await bcrypt.hash(fpass,salts);
                    const updata=await usermodel.findOneAndUpdate({email:femail},{password:hashs});
                    sendemail(femail,"You Password has been successfully updated and New password is ",fpass)
                    res.render('forgot',{
                       updated:"Password has Updated Successfully",
                        flag:true,
                        link:"Login"
                    })
                }
                }
                
            }
        }
    } catch (error) {
        console.log(error)
        res.render('error',{
            info:"Forgot Password request is not allowed at present time"
        })
    }
   
}

module.exports=forgetroute;