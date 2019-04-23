window.onload = function () {
    var memberForm = document.getElementById("member_form");
    memberForm.onsubmit = main;
    var resetBtn = document.getElementById("reset");
    resetBtn.onclick = clearForm;
    var corpRadioBtn = document.getElementById("corporate");
    corpRadioBtn.onchange = toggleCompanyName;
    var indiRadBtn = document.getElementById("individual");
    indiRadBtn.onchange = toggleCompanyName;
};
function toggleCompanyName() {
}
function clearForm() {
    var spanElements = document.querySelectorAll("#member_form > fieldset > span");
    for (var i = 0; i < spanElements.length; i++) {
        spanElements[i].innerHTML = "*";
    }
    var indRadButton = document.getElementById("individual");
    if (indRadButton.checked) {
        var companyName = document.getElementById("company_name").nextElementSibling;
        companyName.innerHTML = "";
    }
}
function main() {
    var isAllDataValid = true;
    if (isEmpty("email")) {
        isAllDataValid = false;
        var emailSpan = document.getElementById("email").nextElementSibling;
        displayError(emailSpan, "Email is required");
    }
    if (isEmpty("first_name")) {
        isAllDataValid = false;
        var fNameSpan = document.getElementById("first_name").nextElementSibling;
        displayError(fNameSpan, "First name is required");
    }
    if (isEmpty("last_name")) {
        isAllDataValid = false;
        var lNameSpan = document.getElementById("last_name").nextElementSibling;
        displayError(lNameSpan, "Last name is required");
    }
    if (isEmpty("phone")) {
        isAllDataValid = false;
        var phoneSpan = document.getElementById("phone").nextElementSibling;
        displayError(phoneSpan, "Phone number is required");
    }
    if (isEmpty("password")) {
        isAllDataValid = false;
        var pwSpan = document.getElementById("password").nextElementSibling;
        displayError(pwSpan, "Please choose a password");
    }
    if (doPasswordsMatch("password", "verify") != true) {
        isAllDataValid = false;
        var verifySpan = document.getElementById("verify").nextElementSibling;
        displayError(verifySpan, "Passwords must match");
    }
    if (isValidPhone("phone") == true) {
        isAllDataValid = true;
    }
    if (!isAllDataValid) {
        event.preventDefault();
    }
}
function doPasswordsMatch(pwd, pwdVerify) {
    var pwd = document.getElementById("password").value;
    var pwdVerify = document.getElementById("verify").value;
    if (pwd == pwdVerify) {
        return true;
    }
    else {
        return false;
    }
}
function isEmpty(elemId) {
    var inputElem = document.getElementById(elemId);
    if (inputElem.value.trim() == "") {
        return true;
    }
    return false;
}
function displayError(targetElement, errMsg) {
    targetElement.innerText = errMsg;
    targetElement.style.color = "red";
}
function isValidPhone(phone) {
    var phoneReformat = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var number = phone.replace(/\D/g, "");
    return phoneReformat.test(number);
}
