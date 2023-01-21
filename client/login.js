
//redirect to signup
const signuplink=document.getElementById("signuplink");

signuplink.onclick=()=>{
    window.location.href="./signup.html"
}




//login

const useremail=document.getElementById("useremail");
const userpassword=document.getElementById("userpassword")

const loginsubmit=document.getElementById("loginsubmit")

loginsubmit.onclick= async()=>{

    let obj={
        email:useremail.value,
        password:userpassword.value
    }

    const res= await fetch(`http://localhost:8080/login`,{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'content-type':'application/json'
        }
    })

    const data=await res.json();
    

    if(data.status=="success"){
        window.location.href="./main.html"
    }else{
         alert("try again")
    }



    useremail.value="";
    userpassword.value="";
}


//{msg: 'login successfull', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiO…5MjZ9.ga6aDT4lIrYOQLLPmd0NTPZpQhL6V6SV44LVMFlcYLQ', status: 'success'}