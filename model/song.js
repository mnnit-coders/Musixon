const mongoose =require('mongoose')
const songSchema = new mongoose.Schema({
    name:{
        type:String
    },
    imageUrl:{
        type:String
    },
    savaan_url:{
        type:String
    },
    media_url:{
        type:String
    },
    artist:{
        type:String
    },
    preview_url:{
        type:String
    },
    duration:{
        type:String
    },
    music_id:{
        type:String
    },
    album_url:{
        type:String
    },
    lyrics_snippet:{
        type:String
    },
    release_date:{
        type:String
    }
})

module.exports=mongoose.model('Song',songSchema);