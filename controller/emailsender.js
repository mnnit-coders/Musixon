const nodemailer=require('nodemailer');
require('dotenv').config();
var user_email;
var transport=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:'rg515139@gmail.com',
        pass:process.env.pass
    }
})

value=otp();



function otp(){
    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);
    return val;
}

let cont;
function sendemail(email,content,password){
    user_email=email;
    console.log(user_email)
    mailoption.to=email;
    if(content=="Your verification code is ")
    mailoption.html=`<div><h3 style="color:black">Welcome to Musixon.${content}<b style="color:darkblue">${value}</b></h3>
    </div>`
    else{
        mailoption.subject="Password Updated"
        mailoption.html=`<div><h3 style="color:black">Welcome to Musixon.${content}<h2 style="color:darkblue">${password}</h2></h3>
    </div>`
    }
    // value=otp();
     transport.sendMail(mailoption,(err,info)=>{
        if(err){
          console.log(err);
        }
        else{
            console.log(info.response);
        }
    })
}
var mailoption={
        from:'noreply@gmail.com',
        to:user_email,
        subject:'Verificaton code from Musixon',
        text:`hello your otp is ${value}`,
        html:cont,
        
        
       
}
module.exports=sendemail;