const express=require('express');
const {usermodel}=require('../model/connection')



const addtoexistingplaylist=express.Router();
addtoexistingplaylist.post('/',async (req,res)=>{
    try {
        let exist_usermail=req.body.useremail;
    let existdatas=await usermodel.findOne({email:exist_usermail});
    let exlist=existdatas.playlist;
    let songname=req.body.songname;
    let playlistname=req.body.list_name;
    let listdata;
    let flag=true;
    let n=existdatas.playlist.length;
    let index;
    for(let i=0;i<n;i++){
        if(playlistname==existdatas.playlist[i].name){
           listdata=existdatas.playlist[i].list;
           index=i;
           break;
        }
    }
    for(let i=0;i<existdatas.playlist[index].list.length;i++){
        if(songname==existdatas.playlist[index].list[i]){
            flag=false;
            break;
        }
        
    }
    if(flag==true){
        existdatas.playlist[index].list.push(songname);
        await usermodel.updateOne({email:exist_usermail},{playlist:existdatas.playlist});
    }
    res.send('done')
    } catch (error) {
        console.log(error.message)
    }
    
})

const createnewplaylist=express.Router();
createnewplaylist.post('/',async (req,res)=>{
    try{
    let playlist_name=req.body.playlist_name;
    let song_url=req.body.song_url;
    let data_playlist=await usermodel.findOne({email:req.body.useremail})
    let list=data_playlist.playlist;
    let sizeofplaylists=list.length;
    let flag=true;
    for(let i=0;i<sizeofplaylists;i++){
    if(playlist_name==list[i].name){
        flag=false
        break;
    }
}
    if(flag==false){
        res.send({
            flag:false
        })
    }
    else{
        list.push({name:playlist_name,list:song_url});
        await usermodel.updateOne({email:req.body.useremail},{playlist:list});
    res.send({
        flag:true
    })
    }
    }
    catch(e){
        console.log(e.message)
        console.log('error at create playlist')
    }
})




const getexistingplaylists=express.Router();
getexistingplaylists.post('/',async (req,res)=>{
    let exist_usermail=req.body.useremail;
    let existdata=await usermodel.findOne({email:exist_usermail});
    let elist=existdata.playlist;
    res.send({
        list:elist
    })
})


const removeplaylist=express.Router();
removeplaylist.post('/',async (req,res)=>{
    let useremail=req.body.useremail;
    let playlistname=req.body.name;
    const play_user=await usermodel.updateOne({email:useremail},{$pull:{playlist:{name:playlistname}}});
    console.log(play_user);
    res.send({
        flag:"done"
    })
})


const removeplaylistsong=express.Router();
removeplaylistsong.post('/',async (req,res)=>{
    let useremail=req.body.useremail;
    let playlist__name=req.body.playlist;
    let songnames=req.body.songname;
    console.log(playlist__name)
    const detail=await usermodel.findOne({email:useremail});
    let playlists=detail.playlist;
    // console.log(playlists)
    for(let i=0;i<playlists.length;i++){
        if(playlists[i].name==playlist__name){
            for(let j=0;j<playlists[i].list.length;j++){
                if(playlists[i].list[j]==songnames){
                    // delete playlists[i].list[j]
                    playlists[i].list.splice(j,1);
                }
            }
        }
    }
   const updatedetail=await usermodel.updateOne({email:useremail},{playlist:playlists})
   console.log(updatedetail)
    res.send({
        flag:'done'
    })
})

module.exports={addtoexistingplaylist,createnewplaylist,getexistingplaylists,removeplaylist,removeplaylistsong};