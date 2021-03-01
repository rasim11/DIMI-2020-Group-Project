const divClassMainContent = "div-main-content";
const divIdDataBasic = "div-data-basic";
const divIdAvatarMenu = "div-avatar-menu";
const divIdHiddenAvatarMenu = "div-hidden-avatar-menu";
const divIdDataPass = "div-data-pass";
const divIdDataProblems = "div-data-problems";
const divIdDialogWindow = "div-dialog-window";
const btnIdDataBasic = "btn-data-basic";
const btnIdDataPass = "btn-data-pass";
const btnIdDataProblems = "btn-data-problems";
const btnIdUpdate = "update-button";
const btnIdReset = "reset-button";
const btnIdDataAccount = "btn-data-account";
const spanIdErrMsg = "err-msg";
const inputIdPas = "pas-input";
const inputIdConfPas = "conf-pas-input";
const formIdDataAccount = "form-data-account";
const formClassUpdate = "form-update";


class User {
    static URL_SERVER = "http://localhost:8080";
    static URL_GET_CUR_USER = User.URL_SERVER + "/api/v1/user-management/current-user-get";
    static URL_PUT_USER = User.URL_SERVER + "/api/v1/user-management/user-put";
    static URL_DELETE_USER = User.URL_SERVER + "/api/v1/user-management/user-delete";
    static CUR_USER;
    static IS_INVALID = false;

    constructor(lastname, firstname, middlename, email, phoneNumber, password, passwordConfirm, id) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.middlename = middlename;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
        this.id = id;
    }

    static setUserFromRequest() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', User.URL_GET_CUR_USER, false);
        xhr.send();

        if (xhr.status !== 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            const user = JSON.parse(xhr.responseText);
            User.CUR_USER = new User(user.lastname, user.firstname, user.middlename, user.email,
                user.phoneNumber, user.password, user.passwordConfirm, user.id);
        }
    }

    static isUserEmailFree() {
        const curValues = document.querySelector('.' + formClassUpdate).querySelectorAll('.form-control');
        let curValuesArr = [];

        for (let i = 0; i < curValues.length; i++) {
            curValuesArr.push(curValues[i].value);
        }

        if (curValuesArr.length === 5) {
            curValuesArr.push(null);
            curValuesArr.push(null);
        }

        const userTarget = new User(curValuesArr[0], curValuesArr[1], curValuesArr[2], curValuesArr[3], curValuesArr[4],
            curValuesArr[5], curValuesArr[6], User.CUR_USER.id);

        const json = JSON.stringify(userTarget);

        const xhr = new XMLHttpRequest();
        xhr.open("PUT", User.URL_PUT_USER, false);
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
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#img-display').attr('src', e.target.result);

        };
        reader.readAsDataURL(input.files[0]);
    }
}

function openMenuLoadImg(hiddenMenu) {
    hiddenMenu.style.display = "none";
    const imgLoad = document.getElementsByName("img")[0];
    imgLoad.click();
}

function isNoDuplicate() {
    const newValues = document.querySelector('.' + formClassUpdate).querySelectorAll('.form-control');
    const updateButton = document.getElementById(btnIdUpdate);
    const resetButton = document.getElementById(btnIdReset);
    const userAtr = Object.values(User.CUR_USER);

    for (let i = 0; i < newValues.length; i++) {
        if (newValues[i].value !== userAtr[i]) {
            updateButton.disabled = false;
            resetButton.disabled = updateButton.disabled;
            return;
        }
    }
    updateButton.disabled = true;
    resetButton.disabled = updateButton.disabled;
}

function addDataUser(btnId) {
    const divMainContent = document.querySelector('.' + divClassMainContent);

    const formDataUser = document.createElement("form");
    formDataUser.method = "get";
    formDataUser.action = "/api/v1/personal-account";
    formDataUser.className = formClassUpdate;
    formDataUser.addEventListener("submit", function (e) {
        e.preventDefault();
        if (isValid(formDataUser) === true) {
            addChangeSucMsg();
            setTimeout(function () {
                e.target.submit();
            }, 1000);
        } else {
            addErrMsg();
        }
    });
    divMainContent.appendChild(formDataUser);

    const divDataVar = document.createElement("div");
    divDataVar.className = "mb-4";
    divDataVar.style.width = "450px";
    divDataVar.style.textAlign = "center";
    formDataUser.appendChild(divDataVar);

    const blockTitle = document.createElement("h3");
    blockTitle.innerText = document.getElementById(btnId).innerText;
    divDataVar.appendChild(blockTitle);

    if (btnId === btnIdDataBasic) {
        divDataVar.id = divIdDataBasic;
        addDataBasic(divDataVar);
    } else {
        divDataVar.id = divIdDataPass;
        addDataPass(divDataVar);
    }

    const btnChange = document.createElement("button");
    btnChange.type = "submit";
    btnChange.id = btnIdUpdate;
    btnChange.className = "btn btn-primary mt-2 mr-1";
    btnChange.disabled = true;
    btnChange.textContent = "Изменить";
    divDataVar.appendChild(btnChange);

    const btnReset = document.createElement("button");
    btnReset.type = "button";
    btnReset.id = btnIdReset;
    btnReset.className = "btn btn-danger mt-2 ml-1";
    btnReset.disabled = btnChange.disabled;
    btnReset.textContent = "Сбросить";
    btnReset.addEventListener("click", btnResetClick);
    divDataVar.appendChild(btnReset);

}

function addDataBasic(divDataBasic) {
    let divMainHiddenMenu = document.createElement("div");
    divMainHiddenMenu.id = divIdHiddenAvatarMenu;
    divMainHiddenMenu.className = "mb-4";
    divDataBasic.appendChild(divMainHiddenMenu);

    let imgUserAvatar = document.createElement("img");
    imgUserAvatar.id = "img-display";
    imgUserAvatar.src = "/img/user-default.png";
    imgUserAvatar.style.cursor = "pointer";
    imgUserAvatar.addEventListener("click", showAvatarMenu);
    divMainHiddenMenu.appendChild(imgUserAvatar);

    let divHiddenMenu = document.createElement("div");
    divHiddenMenu.className = "dropdown-content";
    divHiddenMenu.id = divIdAvatarMenu;
    divMainHiddenMenu.appendChild(divHiddenMenu);

    for (let i = 0; i < 2; i++) {
        let hiddenBtn = document.createElement("button");
        hiddenBtn.type = "button";

        if (i === 0) {
            hiddenBtn.className = "btn btn-outline-primary mt-1 mb-1";
            hiddenBtn.textContent = "Выбрать новое изображение";
            hiddenBtn.addEventListener("click", openMenuLoadImg.bind(null, divHiddenMenu));
        } else {
            hiddenBtn.className = "btn btn-outline-danger mb-1";
            hiddenBtn.textContent = "Удалить текущее изображение";
            hiddenBtn.addEventListener("click", function () {
                let inputSrcImg = document.getElementsByName("img")[0];
                imgUserAvatar.src = "/img/user-default.png";
                inputSrcImg.value = "";
                divHiddenMenu.style.display = "none";
            });
        }

        divHiddenMenu.appendChild(hiddenBtn);
    }

    let inputAvatar = document.createElement("input");
    inputAvatar.type = "file";
    inputAvatar.name = "img";
    inputAvatar.accept = "image/jpeg,image/jpg,image/png";
    inputAvatar.style.display = "none";
    inputAvatar.addEventListener("change", imgLoad.bind(null, inputAvatar));
    divDataBasic.appendChild(inputAvatar);

    const userAtr = Object.values(User.CUR_USER);
    for (let i = 0; i < 5; i++) {
        let inputDataBasic = document.createElement("input");
        inputDataBasic.type = "text";
        inputDataBasic.className = "form-control mb-2";
        inputDataBasic.style.width = "100%";
        inputDataBasic.value = userAtr[i];
        inputDataBasic.addEventListener("input", isNoDuplicate);

        switch (i) {
            case 0:
                inputDataBasic.placeholder = "Фамилия";
                inputDataBasic.addEventListener("input", checkInvalidFormat.bind(null,
                    inputDataBasic, /^[A-z|А-я]+$/));
                break;
            case 1:
                inputDataBasic.placeholder = "Имя";
                inputDataBasic.addEventListener("input", checkInvalidFormat.bind(null,
                    inputDataBasic, /^[A-z|А-я]+$/));
                break;
            case 2:
                inputDataBasic.placeholder = "Отчество";
                inputDataBasic.addEventListener("input", checkInvalidFormat.bind(null,
                    inputDataBasic, /^[A-z|А-я]+$/));
                break;
            case 3:
                inputDataBasic.placeholder = "Адрес электронной почты";
                inputDataBasic.addEventListener("input", checkInvalidFormat.bind(null,
                    inputDataBasic, /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/));
                break;
            case 4:
                inputDataBasic.placeholder = "Номер телефона";
                inputDataBasic.addEventListener("input", checkInvalidFormat.bind(null,
                    inputDataBasic, /^(8|\+7)\d{10}$/));
                break;
        }
        divDataBasic.appendChild(inputDataBasic);
    }

    if (User.IS_INVALID === true) {
        addErrMsg();
    }
}

function addDataPass(divDataPass) {
    for (let i = 0; i < 2; i++) {
        let divPass = document.createElement("div");
        divPass.className = "pas mb-2";
        divPass.style.width = "100%";
        divDataPass.appendChild(divPass);

        const inputPas = document.createElement("input");
        inputPas.type = "password";
        inputPas.className = "form-control";
        inputPas.addEventListener("input", checkPassEmpty);

        if (i === 0) {
            inputPas.id = inputIdPas;
            inputPas.placeholder = "Новый пароль";
            inputPas.addEventListener("input", checkPassFormat);
        } else {
            inputPas.id = inputIdConfPas;
            inputPas.placeholder = "Повторите новый пароль";
            inputPas.addEventListener("input", checkPassConfirm.bind(null, inputPas));
        }
        divPass.appendChild(inputPas);

        const aPas = document.createElement("a");
        aPas.href = "#";
        aPas.className = "pas-control";
        aPas.addEventListener("click", showPas.bind(null, aPas, inputPas.id));
        divPass.appendChild(aPas);
    }
}

function addDataProblems() {
    const divMainContent = document.querySelector('.' + divClassMainContent);

    const divDataProblems = document.createElement("div");
    divDataProblems.style.display = "inline-block";
    divDataProblems.style.width = "450px";
    divDataProblems.id = divIdDataProblems;
    divMainContent.appendChild(divDataProblems);

    const textProblem = document.createElement("span");
    textProblem.textContent = document.getElementById(btnIdDataProblems).innerText;
    divDataProblems.appendChild(textProblem);
}

function addDataAccount() {
    const divMainContent = document.querySelector('.' + divClassMainContent);

    const formDataAccount = document.createElement("form");
    formDataAccount.id = formIdDataAccount;
    formDataAccount.style.display = "inline-block";
    formDataAccount.style.textAlign = "center";
    formDataAccount.method = "post";
    formDataAccount.action = "/logout";
    formDataAccount.className = "mb-4";
    formDataAccount.style.width = "450px";
    formDataAccount.addEventListener("submit", function (e) {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", User.URL_DELETE_USER + "/" + User.CUR_USER.id, false);
        xhr.send();

        addChangeSucMsg();
        setTimeout(function () {
            e.target.submit();
        }, 1000);
    });
    divMainContent.appendChild(formDataAccount);

    const blockTitle = document.createElement("h3");
    blockTitle.innerText = document.getElementById(btnIdDataAccount).innerText;
    formDataAccount.appendChild(blockTitle);

    const blockText = document.createElement("p");
    blockText.textContent = "Вы можете удалить свой аккаунт. При этом все данные будут безвозвратно потеряны. " +
        "Также будут удалены все проблемы, созданные данным пользователем.";
    blockText.style.fontSize = "20px";
    blockText.style.textAlign = "start";
    formDataAccount.appendChild(blockText);

    const btnDelete = document.createElement("button");
    btnDelete.type = "submit";
    btnDelete.className = "btn btn-danger";
    btnDelete.textContent = "Удалить";
    formDataAccount.appendChild(btnDelete);
}

function loadBasicData() {
    User.setUserFromRequest();

    const btn = document.getElementById(btnIdDataBasic);
    btn.style.backgroundColor = "#f1f1f1";
    btn.style.color = "#007bff";

    addDataUser(btn.id);
}

function selectData(btn) {
    let divTarget;
    switch (btn.id) {
        case btnIdDataBasic:
            divTarget = document.getElementById(divIdDataBasic);
            break;
        case btnIdDataPass:
            divTarget = document.getElementById(divIdDataPass);
            break;
        case btnIdDataProblems:
            divTarget = document.getElementById(divIdDataProblems);
            break;
        case btnIdDataAccount:
            divTarget = document.getElementById(formIdDataAccount);
            break;
    }

    if (!divTarget) {
        let btnUpdate = document.getElementById(btnIdUpdate);
        if (btnUpdate && !btnUpdate.disabled) {
            addDialogWindow(btn);
            document.getElementById(divIdDialogWindow).classList.add('show');
        } else {
            changeContent(btn);
            divVarAdd(btn.id);
        }
    }
}

function divVarAdd(btnId) {
    switch (btnId) {
        case btnIdDataBasic:
        case btnIdDataPass:
            addDataUser(btnId);
            break;
        case btnIdDataProblems:
            addDataProblems();
            break;
        case btnIdDataAccount:
            addDataAccount();
            break;
    }
}

function changeContent(btn) {
    const divMainContent = document.querySelector('.' + divClassMainContent);
    divMainContent.innerHTML = "";

    const buttons = document.querySelectorAll("nav > button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "";
        buttons[i].style.color = "";
    }

    btn.style.backgroundColor = "#f1f1f1";
    btn.style.color = "#007bff";
}

function isValid(form) {
    if (!isNoEmpty(form)) {
        return false;
    }

    return User.isUserEmailFree() === "";
}

function addErrMsg() {
    const errMsg = document.getElementById(spanIdErrMsg);

    if (!errMsg) {
        const divDataBasic = document.getElementById(divIdDataBasic);
        const targetElem = document.querySelector('.' + formClassUpdate).querySelectorAll('.form-control')[3];

        const spanErrMsg = document.createElement("span");
        spanErrMsg.textContent = "Пользователь с такой электронной почтой уже существует";
        spanErrMsg.style.color = "red";
        spanErrMsg.style.float = "left";
        spanErrMsg.id = spanIdErrMsg;
        divDataBasic.insertBefore(spanErrMsg, targetElem);
    }

    User.IS_INVALID = true;
}

function addChangeSucMsg() {
    const formDataUser = document.querySelector('.' + formClassUpdate);
    const formDataAccount = document.getElementById(formIdDataAccount);

    const divChangeSucMsg = document.createElement("div");
    divChangeSucMsg.className = "mb-4";
    divChangeSucMsg.style.width = "450px";

    const textChangeSucMsg = document.createElement("h3");
    textChangeSucMsg.style.textAlign = "center";
    textChangeSucMsg.className = "text-success";

    let targetForm;
    if (formDataUser) {
        targetForm = formDataUser;
        textChangeSucMsg.textContent = "Данные успешно изменены!";
    } else if (formDataAccount) {
        targetForm = formDataAccount;
        textChangeSucMsg.textContent = "Аккаунт успешно удалён!";

    }
    targetForm.innerHTML = "";

    targetForm.appendChild(divChangeSucMsg);
    divChangeSucMsg.appendChild(textChangeSucMsg);
}

function btnResetClick() {
    const curValues = document.querySelector('.' + formClassUpdate).querySelectorAll('.form-control');

    let userAtr = [];
    if (document.getElementById(divIdDataBasic)) {
        userAtr = Object.values(User.CUR_USER);
    } else {
        userAtr.push("");
        userAtr.push("");
    }

    for (let i = 0; i < curValues.length; i++) {
        curValues[i].value = userAtr[i];
        setValidFormat(curValues[i]);
    }

    User.IS_INVALID = false;

    const errMsg = document.getElementById(spanIdErrMsg);
    if (errMsg) {
        errMsg.remove();
    }

    const updateButton = document.getElementById(btnIdUpdate);
    const resetButton = document.getElementById(btnIdReset);
    updateButton.disabled = true;
    resetButton.disabled = updateButton.disabled;
}

function addDialogWindow(btn) {
    const mainBlock = document.getElementById("main-block");

    const divMainDialogWindow = document.createElement("div");
    divMainDialogWindow.id = divIdDialogWindow;
    divMainDialogWindow.className = "modal-dlg";
    mainBlock.appendChild(divMainDialogWindow);

    const divDialogWindow = document.createElement("div");
    divDialogWindow.style.textAlign = "center";
    divMainDialogWindow.appendChild(divDialogWindow);

    const buttonWindowClose = document.createElement("button");
    buttonWindowClose.className = "close-custom";
    buttonWindowClose.title = "Закрыть";
    buttonWindowClose.innerText = "X";
    buttonWindowClose.addEventListener("click", function () {
        divMainDialogWindow.classList.remove('show');
        setTimeout(function () {
            document.getElementById(divIdDialogWindow).remove();
        }, 1000);
    });
    divDialogWindow.appendChild(buttonWindowClose);

    const windowTitle = document.createElement("h3");
    windowTitle.className = "text-white";
    windowTitle.innerText = "Предупреждение";
    divDialogWindow.appendChild(windowTitle);

    const windowText = document.createElement("p");
    windowText.className = "text-white";
    windowText.textContent = "Вы изменили некоторые данные. Хотите ли вы применить изменения?";
    divDialogWindow.appendChild(windowText);

    const btnUpdateDlg = document.createElement("button");
    btnUpdateDlg.type = "button";
    btnUpdateDlg.className = "btn btn-success mr-1";
    btnUpdateDlg.textContent = document.getElementById(btnIdUpdate).innerText;
    btnUpdateDlg.addEventListener("click", function () {
        buttonWindowClose.click();
        document.getElementById(btnIdUpdate).click();
    });
    divDialogWindow.appendChild(btnUpdateDlg);

    const btnResetDlg = document.createElement("button");
    btnResetDlg.type = "button";
    btnResetDlg.className = "btn btn-danger ml-1";
    btnResetDlg.textContent = document.getElementById(btnIdReset).innerText;
    btnResetDlg.addEventListener("click", function () {
        buttonWindowClose.click();
        document.getElementById(btnIdReset).click();
        changeContent(btn);
        divVarAdd(btn.id);
    });
    divDialogWindow.appendChild(btnResetDlg);
}

function checkPassEmpty() {
    const inputPass = document.getElementById(inputIdPas);
    const inputConfPass = document.getElementById(inputIdConfPas);
    const btnUpdate = document.getElementById(btnIdUpdate);
    const btnReset = document.getElementById(btnIdReset);

    btnUpdate.disabled = !inputPass.value && !inputConfPass.value;
    btnReset.disabled = btnUpdate.disabled;
}

function showAvatarMenu() {
    const loginMenu = document.getElementById(divIdAvatarMenu);
    loginMenu.style.display = loginMenu.style.display === "inline-block" ? "none" : "inline-block";

    let body = document.querySelector("body");
    if (typeof body.onmouseup !== "function") {
        body.onmouseup = hideAvatarMenu.bind(body.onmouseup);
    }
}

function hideAvatarMenu(e) {
    const div = $("#" + divIdAvatarMenu);
    const mainDiv = $("#" + divIdHiddenAvatarMenu);
    if (!mainDiv.is(e.target)
        && mainDiv.has(e.target).length === 0) {
        div.hide();
    }
}