const mongoose =require('mongoose')

const bcrypt=require('bcrypt');

const userschema =mongoose.Schema(
    {
    name:{
        type:String,
        required:'true',
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    password:{
        type:String,
        default:""
    },
    likes:{
        type:[String]
    },
    subscribed:{
        type:Boolean,
        default:false
    },
    playlist:{
        type:[{
            name:String,
            list:[String]
        }],
        
    },
    image:{
        type:String,
        default:""
    },
    flag:{
        type:Boolean,
        default:false
    },
    history:{
        type:[String],
        default:[]
    }
});

const googleschema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    
})


userschema.pre('save',async function(){
    let salt=await bcrypt.genSalt();
    console.log(salt);
    let hash=await bcrypt.hash(this.password,salt);
    this.password=hash;
})
module.exports={userschema,googleschema};


