const express = require('express');
const app = express()
app.listen(3000);
app.use(express.json());
let users=[
    {
      id:'1',
      name:"rahul garg"
    },
    {
      id:'2',
      name:"pushpendra"
    },
    {
      id:'3',
      name:"yash"
    }
  ]
  const userrouter=express.Router();
const authrouter=express.Router();
 app.use('/user',userrouter);
app.use('/auth',authrouter);
 userrouter
 .route('/')
 .get(getuser)
 .patch(patchuser)
 .post(postuser)


authrouter
.route('/')
.get(getauthuser)
.post(postauthuser)


function getauthuser(req,res){
  res.sendFile('C:/Users/rahul/OneDrive/Desktop/Practice/back/views/index.html')
  // res.send("hello");
}
function postauthuser(req,res){
 let data=req.body.email;
 console.log(data);
 res.json({
   mess:"user signed up"
  });

}
function getuser(req,res){
res.send(users);
};

function postuser(req,res){
    console.log(req.body);
    // let y="";
    // for(key in req.body){
    //   users[key]=req.body[key];
     
    // }
   
    
     res.json({
    mess:"hellp",
    usersa:req.body
   });
  }

  
  function patchuser(req,res){
    // console.log("req->body->",req.body);
    console.log(req.body.id);
    // console.log(users[req.body.id] );
    // users[req.body.id].name=req.body.id;
    // console.log(users[req.body.id] );

    res.json({
      mess:"this is patch",
      name:users
    });
    // console.log(user);
    }
