const emailval=require('email-validator')


function emailchecker(email){
    return emailval.validate(email);
}

module.exports=emailchecker;