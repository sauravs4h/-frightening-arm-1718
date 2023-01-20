const express =require ("express");
const {Usermodel}=require("../models/user.model");
const bcrypt = require('bcrypt');


const srout=express.Router();

srout.use(express.json());

srout.get("/",(req,res)=>{
    res.send("hello")
})

srout.post("/",async(req,res)=>{
    const {name,email,password}=req.body;

    const useravailable= await Usermodel.findOne({email});

    if(useravailable){
      return  res.send("user already available please login");
    }
    else{
        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
                return res.send("someting is wrong")
            }
            let user=new Usermodel({name,email,password:hash});
            await user.save();
            return res.send({status:"signup successfull"});
        });

    }
    


})


module.exports={srout};