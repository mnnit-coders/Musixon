import { playTrack } from "./player.js";
import { allDetail,allDetail1} from "./mainData.js";
var tar = document.getElementsByClassName('content')[1];
let useremail=document.getElementById('useremail').innerHTML;
var userlikes;
var playlistsongsvar;
let likedsongs=document.getElementById('likedsongs');
var userPlayIcon = Array.from(document.getElementsByClassName('user_play_icon'));

function addToPlayer(){
  userPlayIcon = Array.from(document.getElementsByClassName('user_play_icon'));
  userPlayIcon.forEach((item) => {
    item.addEventListener('click', async (ele) => {
        playTrack(ele.target.id);
        if(document.getElementById('useremail').innerHTML!='Login'){
          try{
              await axios.post('/history',{
                  "id":ele.target.id,
                  "useremail":document.getElementById('useremail').innerHTML
              }).then((res)=>{
                  console.log(res);
                  alert('age')
                  // res.redirect('/login')
              })
          }
          catch(err){
              alert(err.message)
          }
          
      }
      console.log('agge bad gaya')
    })
  })
}

likedsongs.onclick=async function(){await finds()};
async function finds(){
    await axios.post('/getlikesdata',{email:useremail})
    .then(async (res)=>{
        console.log(res.data);
        userlikes=res.data;

        let len=userlikes.length;
        console.log(len)
        tar.innerHTML="";
        tar.innerHTML+=`<h3>Liked songs</h3>`
// console.log(len)
for(let i=0;i<len;i++){
       const info=await allDetail1(userlikes[i]);
        // console.log(info)
            tar.innerHTML+=`<li class="song">
            <div class="image_play">
              <img src="${info.trackImage}" alt=""> 
              <img class="user_play_icon" id="${info.trackLink}" src="../images/play.svg" alt="">
            </div>
               
            <h4>${info.trackTitle}</h4>
            <h5>${info.trackArtists}</h5>
            
            <i class="bi bi-heart-fill" style="color:#e81224;"></i>
            <i class="removelike bi bi-dash-circle" style="font-size:20px" id="${info.trackLink}"></i>
        </li>`
        }
        addToPlayer();
       

    })

   
    
    let removelike=Array.from(document.getElementsByClassName('removelike'))
    removelike.forEach((item,index)=>{
      try{
        item.addEventListener('click',async ()=>{
      await axios.post('/removelike',{
        useremail:useremail,
        url:item.id
      })
      .then(async (res)=>{
        await finds();
        })
      })}
      catch(err){
        alert(err.message)
      }
       })
    
}


let playlistsongs=document.getElementById('playlistsongs');
playlistsongs.onclick=async function(){await playlistdata()};

async function playlistdata(){
    await axios.post('/getexistplaylist',{useremail:useremail})
    .then(async (res)=>{
        console.log(res.data.list);
        let playlistsongsvar=res.data.list;

        let len=playlistsongsvar.length;

console.log(playlistsongsvar)
tar.innerHTML="";
tar.innerHTML+=`<h3>Playlist</h3>`
if(len>0){

  for(let i=0;i<len;i++){
    tar.innerHTML+=`
      
      
      <li class="song">
                            
            <div class="image_play">
              <img class="anchorofplaylist" id="${playlistsongsvar[i].name}" src="../images/playlist${i%2}.png" alt=""> 
            </div>

            <h4 style="font-size: 20px;">${playlistsongsvar[i].name}</h4>
           
            <i class="removeplaylist bi bi-dash-circle" style="font-size:20px" id="${playlistsongsvar[i].name}"></i>
        </li>
      
      `
    }
    let removeplaylist =Array.from(document.getElementsByClassName('removeplaylist'));
    removeplaylist.forEach((item)=>{
        
        try{
         item.addEventListener('click',async (e)=>{
          await axios.post('/removeplaylist',{
            useremail:useremail,
            name:e.target.id
          })
          .then(async (res)=>{
            console.log('entered')
            await playlistdata();
          })
        })
    }
    catch(err){
        alert(err.message)
    }
    })
    let playlistshow=Array.from(document.getElementsByClassName('anchorofplaylist'));
    playlistshow.forEach((item) => {
        item.addEventListener('click', async (ele) => {
            tar.innerHTML="";
            tar.innerHTML+=`<h3>${ele.target.id}</h3>`
           
            for(let i=0;i<len;i++){
                if(playlistsongsvar[i].name==ele.target.id){
                    for(let j=0;j<playlistsongsvar[i].list.length;j++){
                        const info=await allDetail1(playlistsongsvar[i].list[j]);
            tar.innerHTML+=`<li class="song">
                            
            <div class="image_play">
              <img src="${info.trackImage}" alt=""> 
              <img class="user_play_icon" id="${info.trackLink}" src="../images/play.svg" alt="">
            </div>
            <h4>${info.trackTitle}</h4>
            <h5>${info.trackArtists}</h5>
             <i class="removeplaylistsong bi bi-dash-circle" style="font-size:20px" id="${info.trackLink}"></i>
        </li>`
                    }
                }
            } 
            let removeplaylistsong=Array.from(document.getElementsByClassName('removeplaylistsong'))
            removeplaylistsong.forEach((item)=>{
                item.addEventListener('click',async (e)=>{
                    try{
                       await axios.post('/removeplaylistsong',{
                        useremail:useremail,
                        playlist:ele.target.id,
                        songname:e.target.id
                       })
                       .then(async (res)=>{
                        await playlistdata();
                       })
                    }
                    catch(err){
                        console.log(err)
                        alert(err.message)
                    }
                })
            })

            addToPlayer();
        }
    )});

}


    
})
  } 
  
  

let historysong=document.getElementById('historysong');
historysong.onclick=async function(){await historydata()};
async function historydata(){
    await axios.post('/gethistory',{email:useremail})
    .then(async (res)=>{
        console.log(res);
        var historysongdata=res.data;

        let len=historysongdata.length;
console.log(len)
tar.innerHTML="";
tar.innerHTML+=`<h3>History</h3>`
for(let i=0;i<len;i++){
    console.log('hanji')
    const info=await allDetail1(historysongdata[i]);
    tar.innerHTML+=`<li class="song">
                            
    <div class="image_play">
              <img src="${info.trackImage}" alt=""> 
              <img class="user_play_icon" id="${info.trackLink}" src="../images/play.svg" alt="">
            </div>   
    <h4>${info.trackTitle}</h4>
    <h5>${info.trackArtists}</h5>
    <i class="removehistory bi bi-dash-circle" style="font-size:20px" id="${info.trackLink}"></i>
    
</li>`
        }
        addToPlayer();
    })



    let removehistory=Array.from(document.getElementsByClassName('removehistory'))
    removehistory.forEach((item,index)=>{
        try{
       item.addEventListener('click',async ()=>{
      await axios.post('/removehistory',{
        useremail:useremail,
        url:item.id
      })
      .then(async (res)=>{
        await historydata();
        })
      })
    }
      catch(err){
        alert(err)
      }
       })
    
}





let setting=document.getElementById('setting');
setting.onclick= function(){ settingfun()};
function settingfun(){
    tar.innerHTML="";
    tar.innerHTML+=`
    <h3 id="info">User Settings</h3>

    <div class="input">
        <h2 style="margin:20px 0px;width:200px">Change Name</h2>
        <input type="text" id="changename" >                      
        <button id="submitname" onclick="changenames()">Submit</button>
    </div>
    <div  style= "display:flex; align-items:center; margin-left:4%;"class="input">
         <h2 style="margin:10px 0px;width:200px"> Change Password</h2>
        <input type="password" id="changepassword" >                      
    </div>
    <div  style= "display:flex; align-items:center; margin-left:4%;"class="input">
       <h2 style="margin:10px 0px;width:200px"> Confirm Password</h2>
        <input type="password" id="confirmpassword">                      
        <button id="submitpassword">Submit</button>
    </div>
   `
let changename=document.getElementById('submitname');
changename.addEventListener('click',async ()=>{
  try{
    if(document.getElementById('changename').value!=''){
      await axios.post('/changename',{
      name:document.getElementById('changename').value,
      email:useremail
  })
  .then((res)=>{
    swal('Names has been updated successfully.Now you can login again')
  })
    }
    else{
      alert('enter the require feild')
    }
  }
  catch(err){
    alert(err.message);
  }
}

)

document.getElementById('submitpassword').addEventListener('click',async ()=>{
  let password=document.getElementById('changepassword').value;
  let confirmpassword=document.getElementById('confirmpassword').value;

if(password==""||confirmpassword==""){
  swal('Please enter the required fields');
}
else if(password!=confirmpassword){
  swal({icon:'error',title:'Oops',text:'Password is not matching'})
}
else{
  try {
    await axios.post('/changepassword',{
      email:useremail,
      password:password
    }).then((res)=>{
  swal({icon:'success',title:'Password Updated',text:'Password has been updated successfully'})
    })
  } catch (error) {
    swal(error.message)
  }
 
}
})
}





