const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
app.use(express.json());
app.listen(3000);
let user={};
// app.get('/user',(req,res)=>{
// res.send(user);
// });
// app.post('/user',(req,res)=>{
//     console.log(req.body);
//     res.json({
//         message:"data received successfully",
//         user:req.body
//     });
// });
// app.update()
// app.get('/user/:username/:id',(req,res)=>{
//     console.log(req.params.username);
//     console.log(req.params.id);
//     res.send("hello");
// });

const authrouter=express.Router();
const users=express.Router();
app.use('/user',users);
users
.route('/')
.get(getusers)


app.use('/auth',authrouter);
authrouter
.route('/signup')
.get(getsignup)
.post(postsign)


async function getusers(req,res){
    let alluser=await usermodel.findOne({password:'49u2943293'});
    res.json({
        message:'get it',
        data:alluser
    });
    // res.send(alluser);
}
function getsignup(req,res){
    res.sendFile('/public/index.html',{root:__dirname});
}
function postsign(req,res){
    let obj=req.body;
    console.log(obj);
    res.json({
        message:"success",
        data:obj
    });
}

userschema.pre('save',function(){
    let salt=bcrypt.genSalt();
})
const db_link='mongodb+srv://rahul:rahul94631@cluster0.jxlembd.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log("db is connected");
})
.catch(function(err){
    console.log(err);
})

const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});
const usermodel=mongoose.model('usermodel',userschema);
// (async function createuser(){
//     // let user={
//     //     name:"rdahul",
//     //     email:"rgds35640@gmail.com",
//     //     password:"49u2943293"
//     // };
//     // let data = await usermodel.create(user);
//     // console.log(data);

// })();