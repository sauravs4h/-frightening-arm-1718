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
                return res.send({status:"try again"})
            }
            
            var token = jwt.sign({ userid: userid }, 'shhhhh');
            return res.send({status:"login successfull",token:token})
            
        });
        

        
    }else{
        return res.send({status:"please signup"})
    }

    


})



module.exports={lrout}