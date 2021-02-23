function isNoEmpty(form) {
    var formClass = "." + form.classList.item(0);
    var formElements = document.querySelector(formClass).querySelectorAll('.form-control');

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