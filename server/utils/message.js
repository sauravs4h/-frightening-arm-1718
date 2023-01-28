const moment=require("moment");

function formatefunction(username,text){
    return{
        username,
        text,
        time:moment().format('h:mm a')
    }
}


module.exports={formatefunction}