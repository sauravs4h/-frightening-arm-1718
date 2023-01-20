const { Socket } = require("engine.io");
const express=require("express");
const http=require("http");
const {Server}=require("socket.io")

const app=express();

const {connection}=require("./config/db")
const {srout}=require("./routes/signup");
const {lrout}=require("./routes/login")
const {Usermodel}=require("./models/user.model")

app.use("/signup",srout);
app.use("/login",lrout);

const httpserver= http.createServer(app);

app.get("/",(req,res)=>{
    res.send("hello fokes");
})

const io=new Server(httpserver);

io.on("connection",(socket)=>{
    console.log("client is connected");
})


httpserver.listen(8080,async()=>{
    try{
        await connection;
        console.log("conneted with db")

    }
    catch(err){
        console.log("not connected to db")

    }


    console.log("8080 is working")
})