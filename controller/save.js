const express=require('express');
const Song=require('../model/song')
const axios=require('axios')



const router=express.Router();

let saveSong=async(req,res)=>{
    const {url}=req.body;
    console.log(url);
    
    try {
    const response=await axios.get(`${process.env.SONG_BASE_URL}=${url}`);
    console.log(response.data);
    
    if(!response.data||response.data==null){
        return res.status(200).json({
            data:{}
        });
    }
    else{
        let name=response.data.song?response.data.song:null;
        imageUrl=response.data.image?response.data.image:null;
        savaan_url=response.data.perma_url?response.data.perma_url:null;
        media_url=response.data.media_url?response.data.media_url:null;
        artist=response.data.primary_artists?response.data.primary_artists:null;
        preview_url=response.data.media_preview_url?response.data.media_preview_url:null;
        duration=response.data.duration?response.data.duration:null;
        music_id=response.data.id?response.data.id:null;
        album_url=response.data.album_url?response.data.album_url:null;
        lyrics_snippet=response.data.lyrics_snippet?response.data.lyrics_snippet:null;
        release_date=response.data.release_date?response.data.release_date:null;
        
        let isPresent=await Song.find({savaan_url:url});
        if(isPresent.length==0){
            const dbresponse=await Song.create({ 
                name,
                imageUrl,
                savaan_url,
                media_url,
                artist,
                preview_url,
                duration,
                music_id,
                album_url,
                lyrics_snippet,
                release_date})
        }
        return res.status(200).json({
            data:isPresent
        })
    }
    } catch (error) {
        console.log(error.message);
        return res.status(200).json({
            data:{}
        })        
    }
    
}
router.route('/savesong').post(saveSong);


// saveSong({},{});
module.exports=router;