const username=document.getElementById("username");
const useremail=document.getElementById("useremail");
const userpassword=document.getElementById("userpassword");



const submit=document.getElementById("signupsubmit");

submit.onclick= async()=>{
    
    try{
        const res=await fetch(`http://localhost:8080/signup`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                name:username.value,
                email:useremail.value,
                password:userpassword.value
            })
        })
    
     
      let data=await res.json();
      console.log(data)
      alert(data.msg)
      if(data.status="success"){
        window.location.href="./login.html"
      }
     
         
       
        
        
    
        

    }
    catch(err){
        console.log("something is wrong");
        console.log(err)
    }
  
    
}
