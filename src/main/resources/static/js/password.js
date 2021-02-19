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

function checkPassFormat() {
    var pass = document.getElementById("pas-input");
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
    var secPas = firstPas.id === "conf-pas-input" ? document.getElementById("pas-input") :
        document.getElementById("conf-pas-input");

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