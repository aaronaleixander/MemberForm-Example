/**
 * Window onloads
 * This method resets all textboxes and error messages.
 */
window.onload = function() {
    var memberForm = document.getElementById("member_form");
        memberForm.onsubmit = main;

    var resetBtn = document.getElementById("reset");
        resetBtn.onclick = clearForm;

    // Radio button check change
    var corpRadioBtn = document.getElementById("corporate");
    corpRadioBtn.onchange = toggleCompanyName;

    var indiRadBtn = document.getElementById("individual");
    indiRadBtn.onchange = toggleCompanyName;
}


function toggleCompanyName() {
    // alert("x");
}


function clearForm() {
    // Textboxes cleared becasue reset button type is reset.
    var spanElements = document.querySelectorAll("#member_form > fieldset > span");
    for ( var i = 0; i < spanElements.length; i++ ) {
        spanElements[i].innerHTML = "*";
    }

    // Removes * if individual is checked.
    var indRadButton = (<HTMLInputElement> document.getElementById("individual"));
    if(indRadButton.checked) {
        var companyName = document.getElementById("company_name").nextElementSibling;
        companyName.innerHTML = "";
    }
}

function main() {
    var isAllDataValid:boolean = true; // Set boolean variable.
    if(isEmpty("email")){
        isAllDataValid = false; 
        var emailSpan = <HTMLElement> document.getElementById("email").nextElementSibling; // get email span.
        displayError(emailSpan, "Email is required"); // display message method.
    }

    if(isEmpty("first_name")){
        isAllDataValid = false; 
        var fNameSpan = <HTMLElement> document.getElementById("first_name").nextElementSibling; // get first name span.
        displayError(fNameSpan, "First name is required"); // display message method.
    }

    if(isEmpty("last_name")){
        isAllDataValid = false; 
        var lNameSpan = <HTMLElement> document.getElementById("last_name").nextElementSibling; // get last name span.
        displayError(lNameSpan, "Last name is required"); // display message method.
    }

    if(isEmpty("phone")){
        isAllDataValid = false; 
        var phoneSpan = <HTMLElement> document.getElementById("phone").nextElementSibling; // get phone number span.
        displayError(phoneSpan, "Phone number is required"); // display message method.
    }

    if(isEmpty("password")){
        isAllDataValid = false; 
        var pwSpan = <HTMLElement> document.getElementById("password").nextElementSibling; // get password span.
        displayError(pwSpan, "Please choose a password"); // display message method.
    }

    if (doPasswordsMatch( "password", "verify") != true) {
        isAllDataValid = false;
        var verifySpan = <HTMLElement> document.getElementById("verify").nextElementSibling;
        displayError(verifySpan, "Passwords must match");
    } 

if ( isValidPhone("phone") == true)  {
        isAllDataValid = true;
    }


    if (!isAllDataValid) {
        event.preventDefault();
    }
}

function doPasswordsMatch( pwd:string , pwdVerify:string) : boolean {
    var pwd = (<HTMLInputElement>document.getElementById("password")).value;
    var pwdVerify = (<HTMLInputElement>document.getElementById("verify")).value;
    if(pwd == pwdVerify) {
        return true
    } else {
        return false;
    }
}

/**
 *  Checks if the value of an  HTMLInputElement is empty. White space ignored.
 * @param elemId The id of an HTMLInputElement -- Input Element
 */
function isEmpty ( elemId:string ) : boolean {
    var inputElem = ( <HTMLInputElement> document.getElementById(elemId));
    if (inputElem.value.trim() == "") {
        return true;
    }
    return false;
}

/**
 * Displays error as the innerText for the target element.
 * @param targetElement Element to Display msg in
 * @param errMsg Actual error message text.
 */
function displayError(targetElement:HTMLElement, errMsg:string) {
    targetElement.innerText = errMsg;
    targetElement.style.color = "red";
}

/**
 * Validates a phone number for a US format.
 * @param phone The phone number to validate.
 */
function isValidPhone(phone:string) :boolean {
    var phoneReformat = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var number = phone.replace(/\D/g, "");
    return phoneReformat.test(number); // all valid
}

