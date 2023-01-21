const express =require ("express");
const {Usermodel}=require("../models/user.model");
const bcrypt = require('bcrypt');
const { Router } = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config()


const lrout= express.Router();

lrout.use(express.json());

lrout.get("/",(req,res)=>{
    res.send("do post")
})

lrout.post("/",async(req,res)=>{
    const {email,password}=req.body;

    const useravailable=await Usermodel.findOne({email});

    

    if(useravailable){
        console.log(useravailable)
        const userid=useravailable._id;
        const userhashpassword=useravailable.password;

        bcrypt.compare(password, userhashpassword, function(err, result) {
            if(err){
                return res.send({msg:"try again",status:"error"})
            }
            
            var token = jwt.sign({ userid: userid }, 'shhhhh');
            return res.send({msg:"login successfull",token:token,status:"success"})
            
        });
        

        
    }else{
        return res.send({msg:"please signup",status:"error"})
    }

    


})



module.exports={lrout}