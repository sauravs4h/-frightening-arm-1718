const users=[];
//console.log(users)
//join user to chat

function userjoin(id,username,room){
    const user={id,username,room}

    users.push(user);

    return user;
}

//get current user

function getcurrentuser(id){
    console.log(users)
    return users.find(user => user.id ===id);
}

//leave the user

function userleave(id){
    const index=users.findIndex(user => user.id ==id);
    if(index!==-1){
        return users.splice(index,1);
    }
    
}

function getuserroom(room){
    return users.filter(user => user.room==room);
}

module.exports={
    userjoin,
    getcurrentuser,
    userleave,
    getuserroom
};
