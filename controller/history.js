const express=require('express');
const {usermodel}=require('../model/connection');

const gethistory=express.Router();
gethistory.post('/',async (req,res)=>{
    try {
        if(req.body.email){
        const gethistorydata=await usermodel.findOne({email:req.body.email});
        res.send(gethistorydata.history)
        // console.log(gethistorydata.history)
        }
    
    } catch (error) {
       res.render('error',{
        info:"error at gethistorydata"
       }) 
    }
})



const history=express.Router();

history.post('/',async(req,res)=>{
    try{
        const id=req.body.id;
        const historyemail=req.body.useremail;
        const historyuser=await usermodel.findOne({email:historyemail});
        let lens=historyuser.history.length;
        console.log('done')
        for(let i=0;i<lens;i++){
            if(historyuser.history[i]==id){
                return ;
            }
        }
        var array_history=historyuser.history;
        array_history.unshift(id);
        if(lens>15){
            array_history.pop();
        }
        // console.log("added")
        await usermodel.findOneAndUpdate({email:historyemail},{history:array_history});
    }
    catch(err){
        res.render('error',{
            info:"error occured at posting song for playlist try after some time"
        })
    }
})

const removehistory=express.Router();
removehistory.post('/',async (req,res)=>{
    let user=req.body.useremail;
    let url=req.body.url;
    const userdetail=await usermodel.updateOne({email:user},{$pull:{history:url}});
    console.log('done');
    res.send({
        flag:"done"
    })
})

module.exports={gethistory,history,removehistory};