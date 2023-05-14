let submitButton = document.getElementById("registr");
let email = document.getElementById("email");
let password = document.getElementById("password");
let emailMessage = email.parentNode.querySelector("p");
let passMessage = password.parentNode.querySelector("p");

submitButton.setAttribute("disabled", "");
submitButton.style.backgroundColor = "#868686";

function FormValidator(){
    if (password.value != "" && email.value != ""){
        submitButton.removeAttribute("disabled");
        submitButton.style.backgroundColor = "#ffffff";
    } else {
        submitButton.setAttribute("disabled", "");
        submitButton.style.backgroundColor = "#868686";
    }
}