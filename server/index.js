const { Socket } = require("engine.io");
const express=require("express");
const http=require("http");
const {Server}=require("socket.io");
const cors = require('cors');
const path=require('path');


const app=express();
app.use(cors());
const {connection}=require("./config/db")
const {srout}=require("./routes/signup");
const {lrout}=require("./routes/login")
const {Usermodel}=require("./models/user.model");

const {formatefunction}=require("./utils/message")

app.use("/signup",srout);
app.use("/login",lrout);

const httpserver= http.createServer(app);


const staticpath=path.join(__dirname,"../client");
console.log(staticpath)

app.use(express.static(staticpath))

// app.get("/",(req,res)=>{
// //    res.sendFile(express.static(staticpath));
// //res.send("hello")

// //    res.send("hello");

// //   res.sendFile(__dirname+'/main/main.html')

// //    res.sendFile(path.join(__dirname, '../client', 'main.html'))

// //  res.sendFile('../client/main.html', {root: __dirname});
// })

const io=new Server(httpserver);

io.on("connection",(socket)=>{
    console.log("client is connected");

    socket.on("joinchatroom",({roomvalue,username})=>{
        console.log(roomvalue,username);

        socket.join(roomvalue);


          //welcome user
    
    socket.emit("message",formatefunction('infochat','welcome to infochat'));

    //broadcast when a user connect

    socket.broadcast.to(roomvalue).emit("message",formatefunction('user',`${username}  is connected`))


    


    })

    // chat message;
    socket.on("chatmsg",(msg)=>{
        //console.log(msg)
        io.emit("message",formatefunction('user',msg));
    })

  
    //Run when client disconnected

    socket.on('disconnect',()=>{
        io.emit('message',formatefunction('user',"a user has left the chat"));
    })
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