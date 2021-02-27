var divIdMainBlock = "main-block";
var divIdDataBasic = "div-data-basic";
var divIdDataPass = "div-data-pass";
var divIdDataProblems = "div-data-problems";
var divIdDataUser = "div-data-user";
var btnIdDataBasic = "btn-data-basic";
var btnIdDataPass = "btn-data-pass";
var btnIdDataProblems = "btn-data-problems";
var btnIdUpdate = "update-button";
var btnIdReset = "reset-button";

class User {
    static urlGetCurUser = "http://localhost:8080/api/v1/user-management/current-user-get";
    static urlPutUser = "http://localhost:8080/api/v1/user-management/user-put";
    static curUser;
    static newUser;
    static isInvalid = false;

    constructor(id, userAtr) {
        this._userAtr = userAtr;
        this._id = id;
    }

    get userAtr() {
        return this._userAtr;
    }

    set userAtr(value) {
        this._userAtr = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    static setUserFromRequest() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', User.urlGetCurUser, false);
        xhr.send();

        if (xhr.status !== 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            var user = JSON.parse(xhr.responseText);
            var userAtr = [user.lastname, user.firstname, user.middlename, user.email, user.phoneNumber];
            User.curUser = new User(user.id, userAtr);
            User.newUser = new User(user.id, userAtr.slice());
        }
    }

    isUserEmailFree() {
        var pasInput = document.getElementById("pas-input") ?
            document.getElementById("pas-input").value : null;
        var confPasInput = document.getElementById("conf-pas-input") ?
            document.getElementById("conf-pas-input").value : null;

        var json = JSON.stringify({
            "id": this.id,
            "lastname": this.userAtr[0],
            "firstname": this.userAtr[1],
            "middlename": this.userAtr[2],
            "email": this.userAtr[3],
            "phoneNumber": this.userAtr[4],
            "password": pasInput,
            "passwordConfirm": confPasInput
        });

        var xhr = new XMLHttpRequest();
        xhr.open("PUT", User.urlPutUser, false);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(json);

        if (xhr.status !== 200) {
            return false;
        } else {
            return xhr.responseText;
        }
    }
}

function imgLoad(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img-display').attr('src', e.target.result);

        };
        reader.readAsDataURL(input.files[0]);
    }
}

function openMenuLoadImg() {
    var imgLoad = document.getElementsByName("img")[0];
    imgLoad.click();
}

function isNoDuplicate() {
    var newValue = document.querySelector('.form-update').querySelectorAll('.form-control');
    var updateButton = document.getElementById(btnIdUpdate);
    var resetButton = document.getElementById(btnIdReset);

    var flagIsNoDuplicate = true;
    for (var i = 0; i < User.curUser.userAtr.length; i++) {
        if (newValue[i].value !== User.curUser.userAtr[i]) {
            User.newUser.userAtr[i] = newValue[i].value;
            flagIsNoDuplicate = false;
        }
    }
    updateButton.disabled = flagIsNoDuplicate;
    resetButton.disabled = updateButton.disabled;
}

function addDataUser(btnId) {
    var mainBlock = document.getElementById(divIdMainBlock);

    var divDataUser = document.createElement("div");
    divDataUser.style.textAlign = "center";
    divDataUser.style.display = "inline-block";
    divDataUser.id = divIdDataUser;
    mainBlock.appendChild(divDataUser);

    var userForm = document.createElement("form");
    userForm.method = "get";
    userForm.action = "/api/v1/personal-account";
    userForm.className = "form-update";
    userForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (isValid(userForm) === true) {
            addChangeSucMsg();
            setTimeout(function () {
                e.target.submit();
            }, 1000);
        } else {
            addErrMsg();
        }
    });
    divDataUser.appendChild(userForm);

    var divDataVar = document.createElement("div");
    divDataVar.className = "mb-4";
    divDataVar.style.width = "450px";
    userForm.appendChild(divDataVar);

    var blockTitle = document.createElement("h3");
    divDataVar.appendChild(blockTitle);

    if (btnId === btnIdDataBasic) {
        divDataVar.id = divIdDataBasic;
        blockTitle.innerText = "Основные данные";
        addDataBasic(divDataVar);
    } else {
        divDataVar.id = divIdDataPass;
        blockTitle.innerText = "Пароль";
        addDataPass(divDataVar);
    }

    var btnChange = document.createElement("button");
    btnChange.type = "submit";
    btnChange.id = btnIdUpdate;
    btnChange.className = "btn btn-primary mt-2 mr-1";
    btnChange.disabled = btnId === btnIdDataBasic;
    btnChange.textContent = "Изменить";
    divDataVar.appendChild(btnChange);

    if (btnId === btnIdDataBasic) {
        var btnReset = document.createElement("button");
        btnReset.type = "button";
        btnReset.id = btnIdReset;
        btnReset.className = "btn btn-danger mt-2 ml-1";
        btnReset.disabled = btnChange.disabled;
        btnReset.textContent = "Сбросить";
        btnReset.addEventListener("click", btnResetClick);
        divDataVar.appendChild(btnReset);
    }
}

function addDataBasic(divDataBasic) {
    var elemDataBasic = [];

    var i = 0;
    elemDataBasic[i] = document.createElement("img");
    elemDataBasic[i].id = "img-display";
    elemDataBasic[i].className = "mb-4";
    elemDataBasic[i].src = "/img/user-default.png";
    elemDataBasic[i].style.cursor = "pointer";
    elemDataBasic[i].addEventListener("click", openMenuLoadImg);
    divDataBasic.appendChild(elemDataBasic[i]);

    i++;
    elemDataBasic[i] = document.createElement("input");
    elemDataBasic[i].type = "file";
    elemDataBasic[i].name = "img";
    elemDataBasic[i].accept = "image/jpeg,image/jpg,image/png";
    elemDataBasic[i].style.display = "none";
    elemDataBasic[i].addEventListener("change", imgLoad.bind(null, elemDataBasic[2]));
    divDataBasic.appendChild(elemDataBasic[i]);

    var iBegin = elemDataBasic.length;
    for (i = iBegin; i < iBegin + 5; i++) {
        elemDataBasic[i] = document.createElement("input");
        elemDataBasic[i].type = "text";
        elemDataBasic[i].className = "form-control mb-2";
        elemDataBasic[i].style.width = "100%";
        elemDataBasic[i].value = User.newUser.userAtr[i - iBegin];
        elemDataBasic[i].addEventListener("input", isNoDuplicate);

        switch (i) {
            case iBegin:
                elemDataBasic[i].placeholder = "Фамилия";
                elemDataBasic[i].addEventListener("input", checkInvalidFormat.bind(null,
                    elemDataBasic[i], /^[A-z|А-я]+$/));
                break;
            case iBegin + 1:
                elemDataBasic[i].placeholder = "Имя";
                elemDataBasic[i].addEventListener("input", checkInvalidFormat.bind(null,
                    elemDataBasic[i], /^[A-z|А-я]+$/));
                break;
            case iBegin + 2:
                elemDataBasic[i].placeholder = "Отчество";
                elemDataBasic[i].addEventListener("input", checkInvalidFormat.bind(null,
                    elemDataBasic[i], /^[A-z|А-я]+$/));
                break;
            case iBegin + 3:
                elemDataBasic[i].placeholder = "Адрес электронной почты";
                elemDataBasic[i].addEventListener("input", checkInvalidFormat.bind(null,
                    elemDataBasic[i], /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/));
                break;
            case iBegin + 4:
                elemDataBasic[i].placeholder = "Номер телефона";
                elemDataBasic[i].addEventListener("input", checkInvalidFormat.bind(null,
                    elemDataBasic[i], /^(8|\+7)\d{10}$/));
                break;
        }
        divDataBasic.appendChild(elemDataBasic[i]);
    }

    if (User.isInvalid === true) {
        addErrMsg();
    }
}

function addDataPass(divDataPass) {
    var elemDataPass = [];

    for (var i = 0; i < 2; i++) {
        elemDataPass[i] = document.createElement("div");
        elemDataPass[i].className = "pas mb-2";
        elemDataPass[i].style.width = "100%";
        divDataPass.appendChild(elemDataPass[i]);

        var inputPas = document.createElement("input");
        inputPas.type = "password";
        inputPas.className = "form-control";

        if (i === 0) {
            inputPas.id = "pas-input";
            inputPas.placeholder = "Новый пароль";
            inputPas.addEventListener("input", checkPassFormat);
        } else {
            inputPas.id = "conf-pas-input";
            inputPas.placeholder = "Повторите новый пароль";
            inputPas.addEventListener("input", checkPassConfirm.bind(null, inputPas));
        }
        elemDataPass[i].appendChild(inputPas);

        var aPas = document.createElement("a");
        aPas.href = "#";
        aPas.className = "pas-control";
        aPas.addEventListener("click", showPas.bind(null, aPas, inputPas.id));
        elemDataPass[i].appendChild(aPas);
    }
}

function addDataProblems() {
    var mainBlock = document.getElementById(divIdMainBlock);

    var divDataProblems = document.createElement("div");
    divDataProblems.style.display = "inline-block";
    divDataProblems.style.width = "450px";
    divDataProblems.id = divIdDataProblems;
    mainBlock.appendChild(divDataProblems);

    var textProblem = document.createElement("span");
    textProblem.textContent = "Проблемы";
    divDataProblems.appendChild(textProblem);
}

function unfocusedButtons() {
    var buttons = document.querySelectorAll("nav > button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "";
        buttons[i].style.color = "";
    }
}

function loadBasicData() {
    User.setUserFromRequest();

    var btn = document.getElementById(btnIdDataBasic);
    btn.style.backgroundColor = "#f1f1f1";
    btn.style.color = "#007bff";

    addDataUser(btn.id);
}

function selectData(btn) {
    if (btn.id === btnIdDataBasic) {
        var divDataBasic = document.getElementById(divIdDataBasic);
        if (!divDataBasic) {
            selectDataUser(btn);
            isNoDuplicate();
        }
    } else if (btn.id === btnIdDataPass) {
        var divDataPass = document.getElementById(divIdDataPass);
        if (!divDataPass) {
            selectDataUser(btn);
        }
    } else if (btn.id === btnIdDataProblems) {
        var divDataProblems = document.getElementById(divIdDataProblems);
        if (!divDataProblems) {
            selectDataProblems(btn);
        }
    }
}

function selectDataUser(btn) {
    var divDataUser = document.getElementById(divIdDataUser);
    var divDataProblems = document.getElementById(divIdDataProblems);

    unfocusedButtons();
    btn.style.backgroundColor = "#f1f1f1";
    btn.style.color = "#007bff";

    if (divDataUser) {
        divDataUser.remove();
    }

    if (divDataProblems) {
        divDataProblems.remove();
    }
    addDataUser(btn.id);
}

function selectDataProblems(btn) {
    var divDataUser = document.getElementById(divIdDataUser);

    unfocusedButtons();
    btn.style.backgroundColor = "#f1f1f1";
    btn.style.color = "#007bff";

    if (divDataUser) {
        divDataUser.remove();
    }
    addDataProblems();
}

function isValid(form) {
    if (!isNoEmpty(form)) {
        return false;
    }

    return User.newUser.isUserEmailFree() === "";
}

function addErrMsg() {
    var errMsg = document.getElementById("err-msg");

    if (!errMsg) {
        var divDataBasic = document.getElementById(divIdDataBasic);
        var targetElem = document.querySelector('.form-update').querySelectorAll('.form-control')[3];

        var spanErrMsg = document.createElement("span");
        spanErrMsg.textContent = "Пользователь с такой электронной почтой уже существует";
        spanErrMsg.style.color = "red";
        spanErrMsg.style.float = "left";
        spanErrMsg.id = "err-msg";
        divDataBasic.insertBefore(spanErrMsg, targetElem);
    }

    User.isInvalid = true;
}

function addChangeSucMsg() {
    var userForm = document.querySelector('.form-update');

    var divDataBasic = document.getElementById(divIdDataBasic);
    if (divDataBasic) {
        divDataBasic.remove();
    }

    var divDataPass = document.getElementById(divIdDataPass);
    if (divDataPass) {
        divDataPass.remove();
    }

    var divChangeSucMsg = document.createElement("div");
    divChangeSucMsg.className = "mb-4";
    divChangeSucMsg.style.width = "450px";
    userForm.appendChild(divChangeSucMsg);

    var textChangeSucMsg = document.createElement("h3");
    textChangeSucMsg.textContent = "Данные успешно изменены!";
    textChangeSucMsg.className = "text-success";
    divChangeSucMsg.appendChild(textChangeSucMsg);
}

function btnResetClick() {
    var curValue = document.querySelector('.form-update').querySelectorAll('.form-control');

    for (var i = 0; i < curValue.length; i++) {
        curValue[i].value = User.curUser.userAtr[i];
        User.newUser.userAtr[i] = User.curUser.userAtr[i];
    }

    User.isInvalid = false;

    var errMsg = document.getElementById("err-msg");
    if (errMsg) {
        errMsg.remove();
    }

    var updateButton = document.getElementById(btnIdUpdate);
    var resetButton = document.getElementById(btnIdReset);
    updateButton.disabled = true;
    resetButton.disabled = true;
}