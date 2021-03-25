function isNoEmpty(form, elementClassName = "form-control") {
    const formElements = form.querySelectorAll("." + elementClassName);

    for (let i = 0; i < formElements.length; i++) {
        if (!formElements[i].value) {
            setInvalidFormat(formElements[i], "Заполните обязательное поле");
        }
    }

    for (let i = 0; i < formElements.length; i++) {
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
    element.classList.add("customInvalid");
    element.setCustomValidity(msg);
    element.reportValidity();
}

function setValidFormat(element) {
    element.classList.remove("customInvalid");
    element.setCustomValidity("");
}

function isRoleChecked() {
    const selectRoles = document.getElementById("select-roles");

    if (!selectRoles.value) {
        setInvalidFormat(selectRoles, "Роль не выбрана");
        return false;
    }

    if (selectRoles.value !== "USER") {
        const selectRegion = document.getElementById(selectIdRegions);
        if (!selectRegion.value) {
            setInvalidFormat(selectRegion, "Регион не выбран");
            return false;
        }
    }

    return true;
}

function checkEmpty(element) {
    if ((!element.value) || (element.value.trim() !== "")) {
        setValidFormat(element);
    } else {
        setInvalidFormat(element, "Введено некорректное значение");
    }
}