import { playTrack, allPlayButton } from '../js/player.js';

var searchbutton=document.getElementById('searchbutton');
var searchresult = document.getElementById('searchresultbox');
var searchSongArray = Array.from(document.getElementsByClassName('search_play_icon'));



searchbutton.addEventListener('click', async ()=>{
    let searchbar=document.getElementById('searchbar').value;
    console.log(searchbar)
    if(searchbar!=""){
        await axios.get(`https://saavn.me/search/songs?query=${searchbar}&page=1&limit=30`)
        .then((res)=>{
            let searchcontent=res.data.data.results;
            console.log(searchcontent);

            searchresult.innerHTML="";
            
            if(searchcontent.length==0){
                searchresult.innerHTML += `<img src="../images/notfound.gif" alt="Result not found" />`
            }

            for (let j = 0; j < searchcontent.length; j++) {
        
                searchresult.innerHTML += `<li>
                    <div class="image_play">
                        <img src="${searchcontent[j].image[2].link}" alt="">
                        <img class="search_play_icon" id="${searchcontent[j].url}" src="../images/play.svg" alt="">
                    </div>
                    <div>
                    <h5 style="font-size:15px" >${searchcontent[j].name}</h5>
                    <h5>${searchcontent[j].primaryArtists}</h5>
                    </div>
            </li>`
            }
            searchSongArray = Array.from(document.getElementsByClassName('search_play_icon'));
            searchSongArray.forEach((item)=>{
                item.addEventListener('click',async (ele)=>{
                    console.log('007')
                    playTrack(ele.target.id);
                    if(document.getElementById('useremail').innerHTML!='Login'){
                        try{
                            await axios.post('/history',{
                                "id":ele.target.id,
                                "useremail":document.getElementById('useremail').innerHTML
                            }).then((res)=>{
                                console.log(res);
                                swal('age')
                                // res.redirect('/login')
                            })
                        }
                        catch(err){
                            swal(err.message)
                        }
                        
                    }
                    console.log('agge bad gaya')
                })
            })
            searchresult.classList.add("bigbox");
            // swal('done')
        })
        .catch((err)=>{
            swal(err.message)
        })
    }
    else{
        swal('enter something')
    }
})

window.onkeypress=async (e)=>{
    if(e.keyCode==13){
        let searchbar=document.getElementById('searchbar').value;
        console.log(searchbar)
        if(searchbar!=""){
            await axios.get(`https://saavn.me/search/songs?query=${searchbar}&page=1&limit=30`)
            .then((res)=>{
                let searchcontent=res.data.data.results;
                console.log(searchcontent);
    
                searchresult.innerHTML="";
                
                if(searchcontent.length==0){
                    searchresult.innerHTML += `<img src="../images/notfound.gif" alt="Result not found" />`
                }
    
                for (let j = 0; j < searchcontent.length; j++) {
            
                    searchresult.innerHTML += `<li>
                        <div class="image_play">
                            <img src="${searchcontent[j].image[2].link}" alt="">
                            <img class="search_play_icon" id="${searchcontent[j].url}" src="../images/play.svg" alt="">
                        </div>
                        <div>
                        <h5 style="font-size:15px" >${searchcontent[j].name}</h5>
                        <h5>${searchcontent[j].primaryArtists}</h5>
                        </div>
                </li>`
                }
                searchSongArray = Array.from(document.getElementsByClassName('search_play_icon'));
                searchSongArray.forEach((item)=>{
                    item.addEventListener('click',(ele)=>{
                        console.log('007')
                        playTrack(ele.target.id);
                    })
                })
                searchresult.classList.add("bigbox");
                // swal('done')
            })
            .catch((err)=>{
                swal(err.message)
            })
        }
        else{
            swal('enter something')
        }
    }
}

document.addEventListener('click',(e)=>{
    if(e.target.id !== 'searchbutton' && e.target.id !=='searchresultbox'){
        // console.log('closed search');
        searchresult.classList.remove("bigbox");
    }
})