function showPas(target, elementId) {
    var input = document.getElementById(elementId);

    if (input.getAttribute('type') === 'password') {
        target.classList.add('view');
        input.setAttribute('type', 'text');
    } else {
        target.classList.remove('view');
        input.setAttribute('type', 'password');
    }
}

function isUserAgreement() {
    var userAgreement = document.getElementById("userAgreement");
    var registrationButton = document.getElementById("registrationButton");

    registrationButton.style.display = userAgreement.checked ? "inline" : "none";
}

function validation() {
    var formElements = document.querySelector('.formRegistr').querySelectorAll('.registr');

    for (var i = 0; i < formElements.length; i++) {
        if (!formElements[i].value) {
            setInvalidFormat(formElements[i], "Заполните обязательное поле");
        }
    }

    for (var i = 0; i < formElements.length; i++) {
        if (!formElements[i].checkValidity()) {
            return false;
        }
    }
    return true;
}

function checkInvalidFormat(element, reg) {
    if ((!element.value) || (reg.test(element.value))) {
        setValidFormat(element);
    } else {
        setInvalidFormat(element, "Введено некорректное значение");
    }
}

function setInvalidFormat(element, msg) {
    element.classList.add('customInvalid');
    element.setCustomValidity(msg);
    element.reportValidity();
}

function setValidFormat(element) {
    element.classList.remove('customInvalid');
    element.setCustomValidity("");
}

function checkPassFormat() {
    var pass = document.getElementsByName("password")[0];
    var reg = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_#$%]).{8,20})/;

    if ((!pass.value) || (reg.test(pass.value))) {
        setValidFormat(pass);
        checkPassConfirm(pass);
    } else {
        checkPassConfirm(pass);
        setInvalidFormat(pass, "Пароль должен включать в себя все группы: (0-9), (A-Z), (a-z), (_#$%), длина > 7");
    }
}

function checkPassConfirm(firstPas) {
    var secPas = firstPas.name === "passwordConfirm" ? document.getElementsByName("password")[0] :
        document.getElementsByName("passwordConfirm")[0];

    if (!firstPas.value) {
        setValidFormat(firstPas);
        return;
    }

    if (!secPas.value) {
        setValidFormat(secPas);
        return;
    }

    if (firstPas.value !== secPas.value) {
        setInvalidFormat(firstPas, "Пароли не совпадают");
    } else {
        setValidFormat(firstPas);
        setValidFormat(secPas);
    }
}

function checkInputs() {
    var email = document.getElementsByName("email")[0];
    var password = document.getElementsByName("password")[0];

    if (!email.value) {
        setInvalidFormat(email, "Заполните обязательное поле");
    }

    if (!password.value) {
        setInvalidFormat(password, "Заполните обязательное поле");
        return false;
    }

    return !!email.checkValidity();
}