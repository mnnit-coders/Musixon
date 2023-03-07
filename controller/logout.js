const express=require('express');
const app=express.Router();
const cookieParser = require('cookie-parser');
const expresssession=require('express-session')
app.use(cookieParser());
app.use(expresssession({secret:'oh no'}))

app.get('/',(req,res)=>{
    req.session.destroy();
    res.clearCookie('login');
    res.clearCookie('helo');
    res.clearCookie('hello');
    res.redirect('/main');
})

module.exports=app;