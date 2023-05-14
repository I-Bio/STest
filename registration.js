let submitButton = document.getElementById("registr");
let firstName = document.getElementById("first_name");
let lastName = document.getElementById("last_name");
let email = document.getElementById("email");
let group = document.getElementById("group");
let fpassword = document.getElementById("password");
let lpassword = document.getElementById("lpassword");
let fNameMessage = firstName.parentNode.querySelector("p");
let lNameMessage = lastName.parentNode.querySelector("p");
let emailMessage = email.parentNode.querySelector("p");
let groupMessage = group.parentNode.querySelector("p");
let fpassMessage = fpassword.parentNode.querySelector("p");
let lpassMessage = lpassword.parentNode.querySelector("p");

submitButton.setAttribute("disabled", "");

function FormChecker() {
    console.log("отработал");
    if (fpassword.value != "" &&
        lpassword.value != "" &&
        firstName.value != "" &&
        lastName.value != "" &&
        email.value != "")
        //group.value != "")
    {
        submitButton.removeAttribute("disabled");
    } else {
        console.log(fNameMessage);
        if (firstName.value == "") fNameMessage.textContent = "Нужно ввести имя";
            else if (fNameMessage.textContent == "Нужно ввести имя") fNameMessage.textContent = "";
        if (lastName.value == "") lNameMessage.textContent = "Нужно ввести фамилию";
            else if (lNameMessage.textContent == "Нужно ввести фамилию") lNameMessage.textContent = "";
        if (email.value == "") emailMessage.textContent = "Нужно ввести почту";
            else if (emailMessage.textContent == "Нужно ввести почту") emailMessage.textContent = "";
        if (group.value == "") groupMessage.textContent = "Нужно выбрать группу";
            else groupMessage.textContent = "";
        if (fpassword.value == "") fpassMessage.textContent = "Нужно придумать пароль";
            else fpassMessage.textContent = "";
        if (lpassword.value == "") lpassMessage.textContent = "Нужно повторить пароль";
            else if(lpassMessage.textContent == "Нужно повторить пароль") lpassMessage.textContent = "";
        submitButton.setAttribute("disabled", "");
    }
}

function ValidateEmail(){
    const regexMail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (regexMail.test(email.value)){
        emailMessage.textContent = "";
    } else {
        emailMessage.textContent = "Неправильная почта";
    }
}

function ValidateName(){
    const regexName = /[А-Я]/i;

    if (regexName.test(firstName.value)){
        fNameMessage.textContent = "";
    } else {
        fNameMessage.textContent = "Используйте кириллицу"
    }

    if (regexName.test(lastName.value)){
        lNameMessage.textContent = "";
    } else {
        lNameMessage.textContent = "Используйте кириллицу"
    }
}

function ValidatePass(){
    let val1 = fpassword.value;
    let val2 = lpassword.value;
    console.log(lpassMessage);

    if (val1 != val2){
        lpassword.classList.remove("valid");
        lpassword.classList.add("invalid");

        lpassMessage.textContent = "Пароль не совпадает";
    }else {
        lpassword.classList.remove("invalid");
        lpassword.classList.add("valid");

        lpassMessage.textContent = "";
    }
}