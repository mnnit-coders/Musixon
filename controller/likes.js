const express=require('express');
const { remove } = require('lodash');
const {usermodel}=require('../model/connection')

const likeroute=express.Router();
likeroute.post('/',async function postliked(req,res){
    try{
        if(req.body.user_email!=null){
            const user__data=await usermodel.findOne({email:req.body.user_email});
            let len=user__data.likes.length;
            for(let i=0;i<len;i++){
                if(req.body.id==user__data.likes[i]){
                    return;
                }
            }
            const userlike=await usermodel.updateOne({email:req.body.user_email},{$push:{likes:req.body.id}});
        }
    }
    catch(error){
        res.render('error',{
            info:"error occured while posting liked songs"
        })
    }
           
})

const getlikesdata=express.Router();
getlikesdata.post('/',async (req,res)=>{
    try {
        if(req.body.email){
            // console.log(req.body.email)
        const likesdata=await usermodel.findOne({email:req.body.email});
        res.send(likesdata.likes)
        }
    
    } catch (error) {
       res.render('error',{
        info:"error at getlikesdata"
       }) 
    }
})

const removelike=express.Router();
removelike.post('/',async(req,res)=>{
    let user=req.body.useremail;
    let url=req.body.url;
    const userdetail=await usermodel.updateOne({email:user},{$pull:{likes:url}});
    res.send({
        flag:"done"
    })

})

module.exports={likeroute,getlikesdata,removelike}