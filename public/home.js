const validator = require('validator');

let child_container = document.querySelector(".child-container");
let started_btn = document.querySelector(".main-container-form-button")
let email_input = document.querySelector(".main-container-form-input")
const errorSpan = document.querySelector('.error-message');

started_btn.addEventListener('click',()=>{
   const email = email_input.value;
   console.log(email);
   if(email == ''){
        errorSpan.textContent = "*Email is required";
        errorSpan.style.display = "block";
   } else
      if(validator.isEmail(email)){
          console.log("valid email")
   }  else{
         errorSpan.textContent = "*Invalid Email";
         errorSpan.style.display = "block";
  }        

})