window.onload = function(){

    const today = new Date();

    document.getElementById("currentDate")
    .innerHTML =
    today.toLocaleDateString();

    fetch("states.txt")

    .then(response => response.text())

    .then(data => {

        document.getElementById("state")
        .innerHTML = data;
    })

    .catch(error => {

        console.log(error);
    });

    let user =
    getCookie("firstName");

    if(user != ""){

        document.getElementById(
        "welcomeMessage")

        .innerHTML =

        "Welcome back, " + user;
    }

    else{

        document.getElementById(
        "welcomeMessage")

        .innerHTML =

        "Welcome New User";
    }
}

function updateSlider(){

    document.getElementById("salaryValue")
    .innerText =
    document.getElementById("salary").value;
}

function toggleSSN(){

    let ssnField =
    document.getElementById("ssn");

    if(ssnField.type === "password"){

        ssnField.type = "text";
    }

    else{

        ssnField.type = "password";
    }
}

function validateFirstName(){

    let value =
    document.getElementById("firstName").value;

    let error =
    document.getElementById("firstNameError");

    let regex = /^[A-Za-z'-]+$/;

    if(value === ""){

        error.innerHTML = "Required";
    }

    else if(!regex.test(value)){

        error.innerHTML = "Letters only";
    }

    else{

        error.innerHTML = "";
    }
}

function validateLastName(){

    let value =
    document.getElementById("lastName").value;

    let error =
    document.getElementById("lastNameError");

    let regex = /^[A-Za-z'-]+$/;

    if(value === ""){

        error.innerHTML = "Required";
    }

    else if(!regex.test(value)){

        error.innerHTML = "Letters only";
    }

    else{

        error.innerHTML = "";
    }
}

function validateDOB(){

    let dob =
    new Date(document.getElementById("dob").value);

    let today = new Date();

    let age =
    today.getFullYear() - dob.getFullYear();

    let error =
    document.getElementById("dobError");

    if(dob > today){

        error.innerHTML =
        "Future DOB invalid";
    }

    else if(age > 120){

        error.innerHTML =
        "Invalid age";
    }

    else{

        error.innerHTML = "";
    }
}

function validateSSN(){

    let ssn =
    document.getElementById("ssn").value;

    let error =
    document.getElementById("ssnError");

    ssn = ssn.replace(/\D/g,'');

    if(ssn.length > 3 && ssn.length <= 5){

        ssn =
        ssn.slice(0,3) + "-" +
        ssn.slice(3);
    }

    if(ssn.length > 5){

        ssn =
        ssn.slice(0,3) + "-" +
        ssn.slice(3,5) + "-" +
        ssn.slice(5,9);
    }

    document.getElementById("ssn").value =
    ssn;

    if(ssn.length !== 11){

        error.innerHTML =
        "Invalid SSN";
    }

    else{

        error.innerHTML = "";
    }
}

function validateEmail(){

    let email =
    document.getElementById("email").value;

    let error =
    document.getElementById("emailError");

    let regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    email = email.toLowerCase();

    document.getElementById("email").value =
    email;

    if(email === ""){

        error.innerHTML =
        "Email required";
    }

    else if(!regex.test(email)){

        error.innerHTML =
        "Invalid email format";
    }

    else{

        error.innerHTML = "";
    }
}

function validateUserID(){

    let user =
    document.getElementById("userId").value;

    let error =
    document.getElementById("userIdError");

    let regex =
    /^[A-Za-z_][A-Za-z0-9_-]{4,19}$/;

    if(!regex.test(user)){

        error.innerHTML =
        "Invalid User ID";
    }

    else{

        error.innerHTML = "";
    }
}

function validatePasswordStrength(){

    let password =
    document.getElementById("password").value;

    let user =
    document.getElementById("userId").value;

    let error =
    document.getElementById("passwordError");

    let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if(password === user){

        error.innerHTML =
        "Password cannot equal User ID";
    }

    else if(!regex.test(password)){

        error.innerHTML =
        "Need uppercase lowercase and number";
    }

    else{

        error.innerHTML = "";
    }
}

function validatePasswordMatch(){

    let p =
    document.getElementById("password").value;

    let c =
    document.getElementById("confirmPassword").value;

    let error =
    document.getElementById("confirmPasswordError");

    if(p !== c){

        error.innerHTML =
        "Passwords do not match";
    }

    else{

        error.innerHTML = "";
    }
}

function validateZip(){

    let zip =
    document.getElementById("zip").value;

    let error =
    document.getElementById("zipError");

    let regex = /^\d{5}$/;

    if(!regex.test(zip)){

        error.innerHTML =
        "ZIP must be 5 digits";
    }

    else{

        error.innerHTML = "";
    }
}

function reviewForm(){

    let output =

    "<p><strong>Name:</strong> " +

    document.getElementById("firstName").value +

    " " +

    document.getElementById("lastName").value +

    "</p>";

    output +=

    "<p><strong>Email:</strong> " +

    document.getElementById("email").value +

    "</p>";

    output +=

    "<p><strong>User ID:</strong> " +

    document.getElementById("userId").value +

    "</p>";

    output +=

    "<p><strong>Symptoms:</strong> " +

    document.getElementById("symptoms").value +

    "</p>";

    document.getElementById("reviewOutput")
    .innerHTML = output;
}

function validateForm(){

    validateFirstName();

    validateLastName();

    validateDOB();

    validateSSN();

    validateEmail();

    validateUserID();

    validatePasswordStrength();

    validatePasswordMatch();

    validateZip();

    let errors =
    document.getElementsByClassName("error");

    let hasError = false;

    for(let i = 0; i < errors.length; i++){

        if(errors[i].innerHTML !== ""){

            hasError = true;
        }
    }

    if(!hasError){

        document.getElementById("submitBtn")
        .style.display = "inline-block";

        if(document.getElementById("rememberMe").checked){

            let firstName =
            document.getElementById("firstName").value;

            setCookie(
            "firstName",
            firstName,
            2);
        }

        alert("Validation Passed");
    }

    else{

        alert("Fix errors first");
    }
}

function goToThankYou(){

    window.location.href =
    "thankyou.html";
}

function setCookie(name, value, days){

    let date = new Date();

    date.setTime(
    date.getTime() +
    (days*24*60*60*1000));

    let expires =
    "expires=" + date.toUTCString();

    document.cookie =
    name + "=" + value + ";" +
    expires + ";path=/";
}

function getCookie(name){

    let cookieName = name + "=";

    let decodedCookie =
    decodeURIComponent(document.cookie);

    let ca =
    decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++){

        let c = ca[i];

        while(c.charAt(0) == ' '){

            c = c.substring(1);
        }

        if(c.indexOf(cookieName) == 0){

            return c.substring(
            cookieName.length,
            c.length);
        }
    }

    return "";
}
