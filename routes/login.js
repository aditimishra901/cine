const router =require("express").Router();
const Candidate = require("../models/User.js");
const Admin = require("../models/Admin.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//LOGIN


router.post("/", function (req,res) {

  const email =req.body.email ;
  const password = req.body.password;
  console.log(password)
  

   Candidate.findOne({email: email}).then(user => {
        
     bcrypt.compare(password, user.password) // to compare the stored and entered password, returning because this will give us a promise
     .then(equal=>{  //will get a true or false
       if(!equal){
         return res.json({auth:false, message:"wrong password"})
    } 

    //create and assign token


    const token = jwt.sign({_id:user._id}, "secret");
   
    res.json({auth:true, token:token, userId:user._id.toString() , message:'User logged in', username:user.name, userRole:user.isAdmin})

})
.catch((err) => {
  res.json({"response":"something went wrong"})
 });
 
}).then(Admin.findOne({email:email}).then(user =>{
  console.log(user);
  if( password === user.password)
  {
    
    const token = jwt.sign({_id:user._id}, "secret");
   
    res.json({auth:true, token:token, userId:user._id.toString() , message:'is admin', username:user.name, userRole:true})
  }
  else{
    return res.json({auth:false, message:"wrong password"})
  }


}))
.catch(err => {res.json({auth:false, message:"user not found"})});
});
module.exports = router;