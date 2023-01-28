console.log("hello");

let container=document.getElementById("allmessage");

let username;








const room=document.getElementById("roomsoption")





const ws=io();

//join chatroom

window.onload=()=>{
    let roomvalue=room.value
    console.log(roomvalue)
    username = prompt("Please enter your name", "Harry Potter");
    ws.emit("joinchatroom",{roomvalue,username});

    
}

room.onchange=()=>{
    // console.log(room.value)
    let roomvalue=room.value
    console.log(roomvalue)
    ws.emit("joinchatroom",{roomvalue,username});
 }

   // console.log(username)

 





ws.on("message",(msg)=>{
    console.log(msg);
    outputmessage(msg);

    // container.scrollTop=container.scrollHeight;
})

const form=document.getElementById("type_message_form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    const msg=document.getElementById("message");
    //console.log(msg.value);
    ws.emit("chatmsg",msg.value)


    msg.value="";
})



function outputmessage(message){
    //let container=document.getElementById("allmessage");
    //console.log(message)


    const msgdiv=document.createElement("div");
    msgdiv.classList.add('message')

    msgdiv.innerHTML=`<p>${message.username} <span>${message.time}</span></p>
    <p>
        ${message.text}
    </p>`;

    document.getElementById("allmessage").append(msgdiv);
   // console.log(msgdiv)
}