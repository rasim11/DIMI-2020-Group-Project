const LOCAL_URL_PERSONAL_ACCOUNT = API + VERSION + PERSONAL_ACCOUNT;
const LOCAL_URL_USER_PROFILE = API + VERSION + USER_MANAGEMENT + USER_GET + BY_ID;

const divIdMainContent = "div-main-content";
const filterResolvedTaskId = "filter-resolved-task";
const filterRegDateId = "filter-reg-date";
const filterActualTaskId = "filter-actual-task";
const filterUserRoleId = "filter-user-role";
const divIdDataBasic = "div-data-basic";
const divEmployeesId = "div-employees";
const divIdFiltersActions = "div-filters-actions";
const divIdAvatarMenu = "div-avatar-menu";
const divIdHiddenAvatarMenu = "div-hidden-avatar-menu";
const divIdDataPass = "div-data-pass";
const divIdDialogWindow = "div-dialog-window";
const divIdDataResponsible = "div-data-responsible";
const divDataEmployeesId = "div-data-employees";
const divEmpClass = "div-emp";
const btnIdDataBasic = "btn-data-basic";
const btnIdDataPass = "btn-data-pass";
const btnDataEmployeesId = "btn-data-employees";
const btnDeleteId = "btn-delete";
const btnConfirmAccountId = "btn-confirm-account";
const btnIdUpdate = "update-button";
const btnIdDataAccount = "btn-data-account";
const btnIdDataResponsible = "btn-data-responsible";
const spanIdErrMsg = "err-msg";
const spanIdCountUsers = "span-count-users";
const inputIdPas = "pas-input";
const inputIdConfPas = "conf-pas-input";
const inputIdAvatar = "input-avatar";
const imgIdAvatar = "img-avatar";
const formDataAccountId = "form-data-account";
const formClassUpdate = "form-update";
const divEmpAttrClass = "div-emp-attribute";
const divListEmployeesId = "div-list-employees";
const divPageNumbersId = "div-page-numbers";
const divFiltersClass = "div-filters";
const filterSearchStringId = "filter-search-string";
const filterCriterionId = "filter-criterion";
const filterSortId = "filter-sort";
const checkedBtnRoleId = "checked-btn-role";
let curUser;
let curUserJson;
let selectedPage;
let selectedPageId;
let defaultFilters = new Map();

class User {
    constructor(lastname, firstname, middlename, email, phoneNumber, password, passwordConfirm, id, userImage) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.middlename = middlename;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
        this.id = id;
        this.userImage = userImage;
    }
}

function getUserFromRequest() {
    curUserJson = getAllObjectsFromRequest(URL_GET_CUR_USER);

    curUser = new User(curUserJson.lastname, curUserJson.firstname, curUserJson.middlename, curUserJson.email,
        curUserJson.phoneNumber, curUserJson.password, curUserJson.passwordConfirm,
        curUserJson.id, curUserJson.userImage);
}

function putUser() {
    const curValues = document.querySelector('.' + formClassUpdate).querySelectorAll('.form-control');

    let imgAvatar = document.querySelector("#" + imgIdAvatar);
    if (imgAvatar && imgAvatar.src !== curUser.userImage) {
        let inputAvatar = document.getElementById(inputIdAvatar);
        if (inputAvatar.files[0] && inputAvatar.files[0].size > 1048576) {
            imgAvatar.src = compress(imgAvatar).src;
        }
    }

    const userTarget = document.getElementById(divIdDataBasic) ? new User(curValues[0].value, curValues[1].value,
        curValues[2].value, curValues[3].value, curValues[4].value, null, null,
        curUser.id, imgAvatar.src) :
        new User(null, null, null, null, null,
            curValues[0].value, curValues[1].value, curUser.id, null);

    const json = JSON.stringify(userTarget);

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", URL_PUT_USER, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(json);

    if (xhr.status !== 200) {
        return false;
    } else {
        return xhr.responseText;
    }
}

function imgLoad(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#' + imgIdAvatar).attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function openMenuLoadImg(hiddenMenu) {
    hiddenMenu.style.display = "none";
    const imgLoad = document.getElementById(inputIdAvatar);
    imgLoad.click();
}

function isNoDuplicate() {
    const newValues = document.querySelector('.' + formClassUpdate).querySelectorAll('.form-control');
    const updateButton = document.getElementById(btnIdUpdate);
    const userAtr = Object.values(curUser);

    for (let i = 0; i < newValues.length; i++) {
        if (newValues[i].value !== userAtr[i]) {
            updateButton.disabled = false;
            return;
        }
    }

    updateButton.disabled = true;
}

function addDataUser(btnId) {
    const divMainContent = document.getElementById(divIdMainContent);

    const formDataUser = document.createElement("form");
    formDataUser.method = "get";
    formDataUser.action = LOCAL_URL_PERSONAL_ACCOUNT;
    formDataUser.className = formClassUpdate + " form-data";
    formDataUser.style.width = "600px";
    formDataUser.style.margin = "auto";
    formDataUser.style.textAlign = "center";
    formDataUser.addEventListener("submit", function (e) {
        e.preventDefault();
        if (isValid(formDataUser) === "") {
            addChangeSucMsg(btnIdUpdate);
            setTimeout(function () {
                e.target.submit();
            }, 1000);
        } else {
            addErrMsg();
        }
    });
    divMainContent.appendChild(formDataUser);

    const divDataVar = document.createElement("div");
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
    btnChange.className = "btn btn-primary mt-2";
    btnChange.disabled = true;
    btnChange.textContent = "Изменить";
    divDataVar.appendChild(btnChange);
}

function addDataBasic(divDataBasic) {
    let divMainHiddenMenu = document.createElement("div");
    divMainHiddenMenu.id = divIdHiddenAvatarMenu;
    divMainHiddenMenu.className = "mb-4";
    divDataBasic.appendChild(divMainHiddenMenu);

    let inputAvatar = document.createElement("input");
    inputAvatar.type = "file";
    inputAvatar.id = inputIdAvatar;
    inputAvatar.accept = "image/jpeg,image/jpg,image/png,image/bmp";
    inputAvatar.style.display = "none";
    inputAvatar.addEventListener("change", imgLoad.bind(null, inputAvatar));
    divDataBasic.appendChild(inputAvatar);

    let imgUserAvatar = document.createElement("img");
    imgUserAvatar.id = imgIdAvatar;
    imgUserAvatar.className = "img-user-profile";
    imgUserAvatar.src = curUser.userImage;
    imgUserAvatar.style.cursor = "pointer";
    imgUserAvatar.addEventListener("click", showAvatarMenu);
    imgUserAvatar.addEventListener("load", isNoDuplicateAvatar);
    divMainHiddenMenu.appendChild(imgUserAvatar);

    let divHiddenMenu = document.createElement("div");
    divHiddenMenu.className = "img-hidden-menu";
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
                imgUserAvatar.src = "/img/default-user.png";
                inputAvatar.value = "";
                divHiddenMenu.style.display = "none";
            });
        }

        divHiddenMenu.appendChild(hiddenBtn);
    }

    const userAtr = Object.values(curUser);
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
        inputPas.style.paddingRight = "35px";
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

        const btnPas = document.createElement("button");
        btnPas.type = "button";
        btnPas.style.outline = "none";
        btnPas.className = "pas-control";
        btnPas.addEventListener("click", showPas.bind(null, btnPas, inputPas.id));
        divPass.appendChild(btnPas);
    }
}

function addDataAccount() {
    const divMainContent = document.getElementById(divIdMainContent);

    const formDataAccount = document.createElement("form");
    formDataAccount.id = formDataAccountId;
    formDataAccount.method = "post";
    formDataAccount.action = "/logout";
    formDataAccount.style.textAlign = "center";
    formDataAccount.style.width = "450px";
    formDataAccount.className = "form-data";
    formDataAccount.style.margin = "auto";
    formDataAccount.onsubmit = function (e) {
        e.preventDefault();

        deleteObject(URL_DELETE_USER + "/" + curUser.email, false);
        addChangeSucMsg(btnDeleteId);

        setTimeout(function () {
            e.target.submit();
        }, 1000);
    };
    divMainContent.append(formDataAccount);

    const blockTitle = document.createElement("h3");
    blockTitle.innerText = document.getElementById(btnIdDataAccount).innerText;
    formDataAccount.append(blockTitle);

    const divStatusAccount = document.createElement("div");
    divStatusAccount.style.textAlign = "start";
    formDataAccount.append(divStatusAccount);

    const titleStatusAccount = document.createElement("h5");
    titleStatusAccount.textContent = "Статус аккаунта";
    divStatusAccount.append(titleStatusAccount);

    const spanStatusAccount = document.createElement("span");
    spanStatusAccount.textContent = curUserJson.isAccountConfirmed ? "Аккаунт успешно подтверждён!" :
        "Аккаунт не подтверждён и в скором времени будет удалён!";
    spanStatusAccount.style.display = "block";
    divStatusAccount.append(spanStatusAccount);

    if (!curUserJson.isAccountConfirmed) {
        const spanDeleteTime = document.createElement("span");
        spanDeleteTime.className = "mb-3";
        spanDeleteTime.style.display = "block";
        divStatusAccount.append(spanDeleteTime);

        const regDate = +new Date(curUserJson.regDate);
        showRemainingTime(spanDeleteTime, regDate);

        const spanResendLink = document.createElement("span");
        spanResendLink.className = "mb-2";
        spanResendLink.style.display = "block";
        spanResendLink.textContent = "Вы можете запросить повторную отправку ссылки для подтверждения аккаунта." +
            " Она будет отправлена на адрес электронной почты указанный при регистрации.";
        divStatusAccount.append(spanResendLink);

        const btnResendLink = document.createElement("button");
        btnResendLink.type = "button";
        btnResendLink.className = "btn btn-primary";
        btnResendLink.textContent = "Отправить ссылку повторно";
        btnResendLink.onclick = function () {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', URL_GENERATE_URL_CONFIRM_ACCOUNT, false);
            xhr.send();

            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
                return null;
            }

            addChangeSucMsg(btnConfirmAccountId);
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        }
        divStatusAccount.append(btnResendLink);
    }

    const hr = document.createElement("hr");
    formDataAccount.append(hr);

    const divDeleteAccount = document.createElement("div");
    divDeleteAccount.style.textAlign = "start";
    formDataAccount.append(divDeleteAccount);

    const titleDeleteAccount = document.createElement("h5");
    titleDeleteAccount.textContent = "Удаление аккаунта";
    titleDeleteAccount.style.textAlign = "start";
    divDeleteAccount.append(titleDeleteAccount);

    const blockText = document.createElement("span");
    blockText.textContent = "Вы можете удалить свой аккаунт. После этого все данные будут безвозвратно утрачены.";
    blockText.className = "mb-2";
    blockText.style.textAlign = "start";
    blockText.style.display = "block";
    divDeleteAccount.append(blockText);

    const btnDelete = document.createElement("button");
    btnDelete.type = "submit";
    btnDelete.className = "btn btn-danger";
    btnDelete.textContent = "Удалить";
    divDeleteAccount.append(btnDelete);
}

function addDataResponsible() {
    const divMainContent = document.getElementById(divIdMainContent);

    const divDataResponsible = document.createElement("div");
    divDataResponsible.id = divIdDataResponsible;
    divDataResponsible.style.width = "600px";
    divDataResponsible.style.textAlign = "center";
    divDataResponsible.className = "form-data";
    divDataResponsible.style.margin = "auto";
    divMainContent.appendChild(divDataResponsible);

    const divInternalCont = document.createElement("div");
    divInternalCont.className = "internal-cont";
    divDataResponsible.appendChild(divInternalCont);

    const blockTitle = document.createElement("h3");
    blockTitle.innerText = document.getElementById(btnIdDataResponsible).innerText;
    divInternalCont.appendChild(blockTitle);

    if (curUserJson.region.responsible === null) {
        blockTitle.innerText += " не назначен";
        return;
    }

    let imgResponsibleAvatar = document.createElement("img");
    imgResponsibleAvatar.src = curUserJson.region.responsible.userImage;
    imgResponsibleAvatar.className = "mb-4 img-user-profile";
    divInternalCont.appendChild(imgResponsibleAvatar);

    const responsibleNames = document.createElement("h4");
    responsibleNames.className = "mb-4";
    responsibleNames.innerText = curUserJson.region.responsible.lastname + " " +
        curUserJson.region.responsible.firstname + " " +
        curUserJson.region.responsible.middlename;
    divInternalCont.appendChild(responsibleNames);

    for (let i = 0; i < 6; i++) {
        const pUserAtr = document.createElement("p");
        switch (i) {
            case 0:
                let regDate = new Date(curUserJson.region.responsible.regDate);
                pUserAtr.textContent = "Дата регистрации: " +
                    ("0" + (regDate.getDate())).slice(-2) + "." +
                    ("0" + (regDate.getMonth() + 1)).slice(-2) + "." +
                    regDate.getFullYear();
                break;
            case 1:
                pUserAtr.textContent = "Электронная почта: " + curUserJson.region.responsible.email;
                break;
            case 2:
                pUserAtr.textContent = "Номер телефона: " + curUserJson.region.responsible.phoneNumber;
                break;
            case 3:
                pUserAtr.textContent = "Решённых проблем: " + curUserJson.region.responsible.tasksCount;
                break;
            case 4:
                pUserAtr.textContent = "Регион: " + curUserJson.region.regionName;
                break;
            case 5:
                pUserAtr.textContent = "Проблемы пользователя";

                const aUserProblems = document.createElement("a");
                aUserProblems.href = "/api/v1/main-page?otherUserTasks=true&userId=" +
                    curUserJson.region.responsible.id;
                divInternalCont.appendChild(aUserProblems);
                aUserProblems.appendChild(pUserAtr);
                continue;
        }
        divInternalCont.appendChild(pUserAtr);
    }
}

function loadDataBasic() {
    getUserFromRequest();

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
        case btnIdDataAccount:
            divTarget = document.getElementById(formDataAccountId);
            break;
        case btnIdDataResponsible:
            divTarget = document.getElementById(divIdDataResponsible);
            break;
        case btnDataEmployeesId:
            divTarget = document.getElementById(divDataEmployeesId);
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
        case btnIdDataAccount:
            addDataAccount();
            break;
        case btnIdDataResponsible:
            addDataResponsible();
            break;
        case btnDataEmployeesId:
            addEmpContent();
            break;
    }
}

function changeContent(btn) {
    const divMainContent = document.getElementById(divIdMainContent);
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
        return "empty";
    }

    return putUser();
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
}

function addChangeSucMsg(btnId) {
    const formDataUser = document.querySelector('.' + formClassUpdate);
    const formDataAccount = document.getElementById(formDataAccountId);

    const textChangeSucMsg = document.createElement("h4");
    textChangeSucMsg.style.textAlign = "center";

    let targetForm;
    if (btnId === btnIdUpdate) {
        targetForm = formDataUser;
        textChangeSucMsg.textContent = "Данные успешно изменены!";
    } else if (btnId === btnDeleteId) {
        targetForm = formDataAccount;
        textChangeSucMsg.textContent = "Аккаунт успешно удалён!";
    } else {
        targetForm = formDataAccount;
        textChangeSucMsg.textContent = "Ссылка успешно отправлена!";
    }

    targetForm.innerHTML = "";

    targetForm.appendChild(textChangeSucMsg);
}

function btnResetClick() {
    const curValues = document.querySelector('.' + formClassUpdate).querySelectorAll('.form-control');

    let userAtr = [];
    if (document.getElementById(divIdDataBasic)) {
        userAtr = Object.values(curUser);
    } else {
        userAtr.push("");
        userAtr.push("");
    }

    for (let i = 0; i < curValues.length; i++) {
        curValues[i].value = userAtr[i];
        setValidFormat(curValues[i]);
    }

    const errMsg = document.getElementById(spanIdErrMsg);
    if (errMsg) {
        errMsg.remove();
    }

    const imgAvatar = document.getElementById(imgIdAvatar);
    if (imgAvatar) {
        imgAvatar.src = curUser.userImage;
    }

    const updateButton = document.getElementById(btnIdUpdate);
    updateButton.disabled = true;
}

function addDialogWindow(btn) {
    const mainBlock = document.getElementById("main-block");

    const divMainDialogWindow = document.createElement("div");
    divMainDialogWindow.id = divIdDialogWindow;
    divMainDialogWindow.className = "modal-dlg";
    mainBlock.appendChild(divMainDialogWindow);

    const divDialogWindow = document.createElement("div");
    divDialogWindow.style.textAlign = "center";
    divDialogWindow.id = divDynamicWindowId;
    divMainDialogWindow.appendChild(divDialogWindow);

    addCloseBtn(divDialogWindow, divMainDialogWindow);
    const buttonWindowClose = divDialogWindow.querySelector(".close-custom");

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
    btnResetDlg.textContent = "Сбросить";
    btnResetDlg.addEventListener("click", function () {
        buttonWindowClose.click();
        btnResetClick();
        changeContent(btn);
        divVarAdd(btn.id);
    });
    divDialogWindow.appendChild(btnResetDlg);
}

function checkPassEmpty() {
    const inputPass = document.getElementById(inputIdPas);
    const inputConfPass = document.getElementById(inputIdConfPas);
    const btnUpdate = document.getElementById(btnIdUpdate);

    btnUpdate.disabled = !inputPass.value && !inputConfPass.value;
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

function isNoDuplicateAvatar() {
    if (document.getElementById(divIdDataBasic)) {
        const updateButton = document.getElementById(btnIdUpdate);

        const imgAvatar = document.getElementById(imgIdAvatar);
        updateButton.disabled = !(imgAvatar && imgAvatar.src !== curUser.userImage);
    }
}

function addEmpContent() {
    selectedPage = 0;
    selectedPageId = 0;

    const divMainContent = document.getElementById(divIdMainContent);

    const divContent = document.createElement("div");
    divContent.style.width = "max-content";
    divContent.style.marginLeft = "auto";
    divMainContent.append(divContent);

    addDataFilters(divContent);
    addDataEmployees(divContent);
    setDivUserAtrWidth();
}

function addDataEmployees(divContent) {
    const divDataEmployees = document.createElement("div");
    divDataEmployees.id = divDataEmployeesId;
    divDataEmployees.className = "form-data internal-cont";
    divDataEmployees.style.display = "inline-block";
    divDataEmployees.style.minWidth = "450px";
    divContent.prepend(divDataEmployees);

    const blockTitle = document.createElement("h3");
    blockTitle.style.textAlign = "center";
    blockTitle.innerText = document.getElementById(btnDataEmployeesId).innerText;
    divDataEmployees.appendChild(blockTitle);

    const divFilterSearchString = document.createElement("div");
    divDataEmployees.appendChild(divFilterSearchString);

    const divSearching = document.createElement("div");
    divSearching.style.display = "table";
    divSearching.className = "mb-2";
    divSearching.style.width = "100%";
    divFilterSearchString.appendChild(divSearching);

    const divSearchString = document.createElement("div");
    divSearchString.className = "search-string pr-1";
    divSearchString.style.display = "table-cell";
    divSearching.appendChild(divSearchString);

    const inputSearchString = document.createElement("input");
    inputSearchString.id = filterSearchStringId;
    inputSearchString.type = "text";
    inputSearchString.className = "form-control " + divFiltersClass;
    inputSearchString.style.width = "100%";
    inputSearchString.placeholder = "Введите критерий поиска";
    inputSearchString.style.paddingRight = "35px";
    divSearchString.appendChild(inputSearchString);

    const divTableCell = document.createElement("div");
    divTableCell.style.display = "table-cell";
    divTableCell.style.width = "50px";
    divSearching.append(divTableCell);

    const btnClearSearchString = document.createElement("button");
    btnClearSearchString.type = "button";
    btnClearSearchString.style.outline = "none";
    btnClearSearchString.className = "clear-search-string";
    btnClearSearchString.addEventListener("click", function () {
        inputSearchString.value = "";
    });
    divSearchString.appendChild(btnClearSearchString);

    const btnFind = document.createElement("button");
    btnFind.type = "button";
    btnFind.className = "btn btn-primary";
    btnFind.innerHTML =
        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" " +
        "class=\"bi bi-search\"\n + viewBox=\"0 0 16 16\">\n" +
        "            <path\n" +
        "                d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z\"></path>\n" +
        "        </svg>";
    btnFind.onclick = function () {
        selectedPage = 0;
        selectedPageId = 0;
        defaultFilters = getFilterValues(-1);

        updateListEmployees();
    };
    divTableCell.append(btnFind);


    const divViewElements = document.createElement("div");
    divViewElements.className = "mb-4";
    divViewElements.style.display = "table";
    divViewElements.style.width = "100%";
    divViewElements.style.fontSize = "14px";
    divFilterSearchString.appendChild(divViewElements);

    for (let i = 0; i < 2; i++) {
        const divSearchCriterion = document.createElement("div");
        divSearchCriterion.className = i === 0 ? "pr-4" : "";
        divSearchCriterion.style.display = "table-cell";
        divSearchCriterion.style.textAlign = i === 1 ? "right" : "";
        divViewElements.appendChild(divSearchCriterion);

        const spanSearchCriterion = document.createElement("span");
        spanSearchCriterion.textContent = i === 0 ? "Поиск по:" : "Сортировка по:";
        spanSearchCriterion.className = "mr-1";
        divSearchCriterion.appendChild(spanSearchCriterion);

        const selectSearchCriterion = document.createElement("select");
        selectSearchCriterion.id = i === 0 ? filterCriterionId : filterSortId;
        selectSearchCriterion.className = "form-control " + divFiltersClass;
        selectSearchCriterion.style.width = "fit-content";
        selectSearchCriterion.style.display = "inline-block";
        selectSearchCriterion.style.fontSize = "14px";
        selectSearchCriterion.onchange = i === 1 ? function () {
            selectedPage = 0;
            selectedPageId = 0;
            defaultFilters.set(selectSearchCriterion.id, selectSearchCriterion.value);

            updateListEmployees();
        } : null;
        divSearchCriterion.appendChild(selectSearchCriterion);

        for (let j = 0; j < 3; j++) {
            const optionSearchCriterion = document.createElement("option");
            optionSearchCriterion.value = j.toString();

            switch (j) {
                case 0:
                    optionSearchCriterion.textContent = i === 0 ? "ФИО" : "Дата регистрации";
                    break;
                case 1:
                    optionSearchCriterion.textContent = i === 0 ? "Email" : "Актуальные проблемы";
                    break;
                case 2:
                    optionSearchCriterion.textContent = i === 0 ? "Телефон" : "Решённые проблемы";
                    optionSearchCriterion.selected = i === 1;
                    break;
            }
            selectSearchCriterion.appendChild(optionSearchCriterion);
        }

    }

    defaultFilters = getFilterValues(0);
    const data = getAllObjectsFromRequest(getUrlWithFilters());
    addListEmployees(divDataEmployees, data.employees, data.employeesCount);
    addNumberPage(data.pageCount);
}

function addListEmployees(divDataEmployees, employees, employeesCount) {
    const divListEmployees = document.createElement("div");
    divListEmployees.id = divListEmployeesId;
    divDataEmployees.appendChild(divListEmployees);

    const preData = document.createElement("form");
    preData.className = "mb-2";
    preData.action = URL_POST_EMP;
    preData.method = "get";
    preData.style.display = "flex";
    divListEmployees.appendChild(preData);

    const btnAddUser = document.createElement("button");
    btnAddUser.type = "submit";
    btnAddUser.className = "btn btn-outline-success";
    btnAddUser.textContent = "Добавить";
    preData.appendChild(btnAddUser);

    const spanCountUsers = document.createElement("span");
    spanCountUsers.id = spanIdCountUsers;
    spanCountUsers.style.margin = "auto 0 auto auto";
    spanCountUsers.textContent = "Всего подчинённых: " + employeesCount;
    preData.appendChild(spanCountUsers);

    const hrElement = document.createElement("hr");
    divListEmployees.appendChild(hrElement);

    const divUsers = document.createElement("div");
    divUsers.id = divEmployeesId;
    divListEmployees.appendChild(divUsers);

    for (let i = 0; i < employees.length; i++) {
        const divUser = document.createElement("div");
        divUser.className = divEmpClass + " pb-4";
        divUser.style.width = "100%";
        divUsers.appendChild(divUser);

        const aProfile = document.createElement("a");
        aProfile.href = LOCAL_URL_USER_PROFILE + "/" + employees[i].id;
        aProfile.className = "mr-4";
        divUser.appendChild(aProfile);

        const imgUserAvatar = document.createElement("img");
        imgUserAvatar.className = "img-users-list";
        imgUserAvatar.src = employees[i].userImage;
        aProfile.appendChild(imgUserAvatar);

        const divUserAttribute = document.createElement("div");
        divUserAttribute.className = divEmpAttrClass;
        divUserAttribute.style.display = "inline-block";
        divUserAttribute.style.verticalAlign = "middle";
        divUserAttribute.style.overflow = "hidden";
        divUser.appendChild(divUserAttribute);

        for (let j = 0; j < 7; j++) {
            if (j === 3 && curUserJson.role !== "RESPONSIBLE") {
                continue;
            }

            const spanUserAttribute = document.createElement("span");
            spanUserAttribute.style.display = "block";
            switch (j) {
                case 0:
                    spanUserAttribute.textContent = "ФИО: " + employees[i].lastname + " "
                        + employees[i].firstname + " " + employees[i].middlename;
                    break;
                case 1:
                    spanUserAttribute.textContent = "Email: " + employees[i].email;
                    break;
                case 2:
                    spanUserAttribute.textContent = "Номер телефона: " + employees[i].phoneNumber;
                    break;
                case 3:
                    spanUserAttribute.textContent = "Роль: " + getRoleName(employees[i].role);
                    break;
                case 4:
                    let regDate = new Date(employees[i].regDate);
                    spanUserAttribute.textContent = "Дата регистрации: " +
                        ("0" + (regDate.getDate())).slice(-2) + "." +
                        ("0" + (regDate.getMonth() + 1)).slice(-2) + "." +
                        regDate.getFullYear();
                    break;
                case 5:
                    spanUserAttribute.textContent = "Решённых проблем: " + employees[i].tasksCount;
                    break;
                case 6:
                    spanUserAttribute.textContent = "Актуальных проблем: " +
                        getAllObjectsFromRequest(URL_GET_TASKS_BY_WORKER_ID + "/" + employees[i].id);
                    break;
            }
            divUserAttribute.appendChild(spanUserAttribute);
        }
    }
}

function addDataFilters(divContent) {
    const divDataFilters = document.createElement("div");
    divDataFilters.id = divDataFiltersId;
    divDataFilters.style.display = "inline-block";
    divDataFilters.style.verticalAlign = "top";
    divDataFilters.style.marginLeft = "40px";
    divContent.appendChild(divDataFilters);

    const spanFilters = document.createElement("span");
    spanFilters.className = "mb-2 font-weight-bold";
    spanFilters.style.fontSize = "larger";
    spanFilters.style.display = "block";
    spanFilters.textContent = "Фильтры";
    divDataFilters.appendChild(spanFilters);

    const ulFiltersMenu = document.createElement("ul");
    ulFiltersMenu.className = "nav flex-column mb-2";
    ulFiltersMenu.style.minWidth = "max-content";
    divDataFilters.appendChild(ulFiltersMenu);

    for (let i = 0; i < 4; i++) {
        if (i === 0 && curUserJson.role !== "RESPONSIBLE") {
            continue;
        }

        const liFilter = document.createElement("li");
        liFilter.className = "nav-item mb-2";
        ulFiltersMenu.appendChild(liFilter);

        const btn = document.createElement("button");
        btn.className = "btn dropdown-toggle";
        btn.type = "button";
        btn.style.width = "100%";
        btn.style.textAlign = "start";
        btn.setAttribute("data-toggle", "collapse");
        btn.setAttribute("aria-expanded", "false");
        liFilter.appendChild(btn);

        const spanTitleFilter = document.createElement("span");
        spanTitleFilter.style.fontSize = "larger";
        btn.appendChild(spanTitleFilter);

        const divFilter = document.createElement("div");
        divFilter.className = "collapse " + divFiltersClass;
        liFilter.appendChild(divFilter);

        const divFilterBody = document.createElement("div");
        divFilterBody.className = "card card-body";
        divFilterBody.style.background = "none";
        divFilterBody.style.border = "none";
        divFilter.appendChild(divFilterBody);

        switch (i) {
            case 0:
                btn.setAttribute("data-target", "#" + filterUserRoleId);
                btn.setAttribute("aria-controls", filterUserRoleId);
                spanTitleFilter.textContent = "Роль";
                divFilter.id = filterUserRoleId;
                break;
            case 1:
                btn.setAttribute("data-target", "#" + filterActualTaskId);
                btn.setAttribute("aria-controls", filterActualTaskId);
                spanTitleFilter.textContent = "Актуальные проблемы";
                divFilter.id = filterActualTaskId;
                break;
            case 2:
                btn.setAttribute("data-target", "#" + filterResolvedTaskId);
                btn.setAttribute("aria-controls", filterResolvedTaskId);
                divFilter.id = filterResolvedTaskId;
                spanTitleFilter.textContent = "Решённые проблемы";
                break;
            case 3:
                btn.setAttribute("data-target", "#" + filterRegDateId);
                btn.setAttribute("aria-controls", filterRegDateId);
                divFilter.id = filterRegDateId;
                spanTitleFilter.textContent = "Дата регистрации";
                break;
        }

        if (i !== 0) {
            for (let j = 0; j < 2; j++) {
                const inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.className = j === 0 ? "form-control mb-2" : "form-control";
                inputElement.style.width = "100%";
                inputElement.placeholder = j === 0 ? "От" : "До";
                divFilterBody.appendChild(inputElement);

                if (i === 3) {
                    inputElement.min = "2020-01-01";
                    inputElement.max = "2100-01-01";
                    inputElement.addEventListener("focus", function () {
                        inputElement.type = "date";
                    });
                    inputElement.addEventListener("blur", function () {
                        if (!inputElement.value) {
                            inputElement.type = "text";
                        }
                    });
                } else {
                    inputElement.oninput = checkInvalidFormat.bind(null, inputElement, /^\d+$/);
                }
            }
        } else {
            for (let j = 0; j < 2; j++) {
                const divFilterElement = document.createElement("div");
                divFilterElement.className = "form-check";
                divFilterBody.append(divFilterElement);

                const inputCheckedBtn = document.createElement("input");
                inputCheckedBtn.id = checkedBtnRoleId + j;
                inputCheckedBtn.className = "form-check-input";
                inputCheckedBtn.type = "checkbox";
                inputCheckedBtn.value = j === 0 ? "DEPUTY" : "SOCIAL_WORKER";
                divFilterElement.append(inputCheckedBtn);

                const labelFilterElement = document.createElement("label");
                labelFilterElement.setAttribute("for", checkedBtnRoleId + j);
                labelFilterElement.className = "form-check-label";
                labelFilterElement.style.fontSize = "large";
                labelFilterElement.textContent = j === 0 ? getRoleName("DEPUTY") :
                    getRoleName("SOCIAL_WORKER");
                divFilterElement.appendChild(labelFilterElement);
            }
        }
    }

    const divFiltersActions = document.createElement("div");
    divFiltersActions.id = divIdFiltersActions;
    divDataFilters.appendChild(divFiltersActions);

    for (let j = 0; j < 2; j++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.style.display = "block";
        btn.style.width = "100%";

        if (j === 0) {
            btn.className = "btn btn-primary mt-4 mb-2";
            btn.textContent = "Применить";
            btn.onclick = function () {
                selectedPage = 0;
                selectedPageId = 0;
                defaultFilters = getFilterValues(1);

                updateListEmployees();
            };
        } else {
            btn.className = "btn btn-secondary";
            btn.textContent = "Сбросить";
            btn.onclick = function () {
                selectedPage = 0;
                selectedPageId = 0;

                const allFilters = document.querySelectorAll("." + divFiltersClass);
                for (let iLocal = 0; iLocal < allFilters.length; iLocal++) {
                    let inputs;
                    switch (allFilters[iLocal].id) {
                        case filterActualTaskId:
                        case filterResolvedTaskId:
                        case filterRegDateId:
                            inputs = allFilters[iLocal].querySelectorAll("input");
                            for (let jLocal = 0; jLocal < inputs.length; jLocal++) {
                                inputs[jLocal].value = "";
                                inputs[jLocal].type = "text";
                                setValidFormat(inputs[jLocal]);
                            }
                            break;
                        case filterUserRoleId:
                            inputs = allFilters[iLocal].querySelectorAll("input");
                            for (let jLocal = 0; jLocal < inputs.length; jLocal++) {
                                inputs[jLocal].checked = false;
                            }
                            break;
                    }
                }
                defaultFilters = getFilterValues(1);

                updateListEmployees();
            };
        }

        divFiltersActions.appendChild(btn);
    }
}

function setDivUserAtrWidth() {
    let maxWidth = calcDivElementsWidth(divDataEmployeesId, divEmpClass);
    if (!maxWidth) {
        return;
    }

    const divUsersAtr = document.querySelectorAll("." + divEmpAttrClass);
    for (let i = 0; i < divUsersAtr.length; i++) {
        divUsersAtr[i].style.maxWidth = maxWidth + "px";
    }
}

function addNumberPage(pageCount) {
    const divListEmployees = document.getElementById(divListEmployeesId);

    const divPageNumbers = document.createElement("div");
    divPageNumbers.className = "mb-4";
    divPageNumbers.style.textAlign = "center";
    divPageNumbers.id = divPageNumbersId;
    divListEmployees.append(divPageNumbers);

    const maxPageCount = pageCount < 9 ? pageCount : 9;

    const btnSelectedPage = document.createElement("button");
    btnSelectedPage.type = "button";
    btnSelectedPage.className = "btn btn-primary mr-2";
    btnSelectedPage.textContent = (selectedPage + 1).toString();
    divPageNumbers.append(btnSelectedPage);

    let stepPlus = 0, stepMinus = 0;
    for (let i = 1, step = 1; step < maxPageCount; i++) {
        if (selectedPageId + i < maxPageCount) {
            const btnPageNumber = document.createElement("button");
            btnPageNumber.type = "button";
            btnPageNumber.className = "btn btn-outline-primary mr-2";
            btnPageNumber.textContent = (selectedPage + 1 + i).toString();
            btnPageNumber.onclick = function () {
                selectedPage = Number(btnPageNumber.innerText) - 1;

                if (3 < selectedPageId + i && pageCount > maxPageCount) {
                    for (let j = 4, pageId = 4; j > -1; j--, pageId++) {
                        if (selectedPage + j < pageCount) {
                            selectedPageId = pageId;
                            break;
                        }
                    }
                } else {
                    selectedPageId += i;
                }

                updateListEmployees();
            };
            divPageNumbers.append(btnPageNumber);

            step++;
            stepPlus++;
        }

        if (step >= maxPageCount) {
            break;
        }

        if (selectedPageId - i > -1) {
            const btnPageNumber = document.createElement("button");
            btnPageNumber.type = "button";
            btnPageNumber.className = "btn btn-outline-primary mr-2";
            btnPageNumber.textContent = (selectedPage + 1 - i).toString();
            divPageNumbers.prepend(btnPageNumber);
            btnPageNumber.onclick = function () {
                selectedPage = Number(btnPageNumber.innerText) - 1;

                if (5 > selectedPageId - i && pageCount > maxPageCount) {
                    for (let j = 4; j > -1; j--) {
                        if (selectedPage - j > -1) {
                            selectedPageId = j;
                            break;
                        }
                    }
                } else {
                    selectedPageId -= i;
                }

                updateListEmployees();
            };

            step++;
            stepMinus++;
        }
    }

    if (pageCount > maxPageCount) {
        const allPageNumbers = document.querySelectorAll("#" + divPageNumbersId + "> *");

        allPageNumbers[0].textContent = "1";
        allPageNumbers[maxPageCount - 1].textContent = pageCount;

        if (stepPlus < stepMinus) {
            allPageNumbers[1].textContent = Math.floor(calcMediumPageNumber(allPageNumbers[0].innerText,
                allPageNumbers[2].innerText)).toString();
            if (selectedPage + 1 !== allPageNumbers[maxPageCount - 2].innerText) {
                allPageNumbers[maxPageCount - 2].textContent = Math.ceil(calcMediumPageNumber(
                    allPageNumbers[maxPageCount - 1].innerText,
                    allPageNumbers[maxPageCount - 3].innerText)).toString();
            }
        } else if (stepPlus > stepMinus) {
            allPageNumbers[maxPageCount - 2].textContent = Math.ceil(calcMediumPageNumber(
                allPageNumbers[maxPageCount - 1].innerText, allPageNumbers[maxPageCount - 3].innerText)).toString();
            if (selectedPage + 1 !== allPageNumbers[1].innerText) {
                allPageNumbers[1].textContent = Math.floor(calcMediumPageNumber(allPageNumbers[0].innerText,
                    allPageNumbers[2].innerText)).toString();
            }
        } else {
            allPageNumbers[1].textContent = Math.floor(calcMediumPageNumber(allPageNumbers[0].innerText,
                allPageNumbers[2].innerText)).toString();
            allPageNumbers[maxPageCount - 2].textContent = Math.ceil(calcMediumPageNumber(
                allPageNumbers[maxPageCount - 1].innerText, allPageNumbers[maxPageCount - 3].innerText)).toString();
        }
    }
}

function calcMediumPageNumber(val1, val2) {
    return (Number(val1) + Number(val2)) / 2;
}

function getFilterValues(key) {
    const allFilters = document.querySelectorAll("." + divFiltersClass);
    let filtersValues = defaultFilters;

    for (let i = 0; i < allFilters.length; i++) {
        if (allFilters[i].id === filterSortId) {
            filtersValues.set(allFilters[i].id, allFilters[i].value);
            continue;
        }

        if (key <= 0) {
            switch (allFilters[i].id) {
                case filterSearchStringId:
                case filterCriterionId:
                    filtersValues.set(allFilters[i].id, allFilters[i].value);
                    continue;
            }
        }

        if (key >= 0) {
            let inputs, temp;
            switch (allFilters[i].id) {
                case filterActualTaskId:
                case filterResolvedTaskId:
                    inputs = allFilters[i].querySelectorAll("input");
                    temp = !inputs[0].value && !inputs[1].value ? "" :
                        [(inputs[0].value ? inputs[0].value : "0"),
                            (inputs[1].value ? inputs[1].value : "maxLong")];

                    filtersValues.set(allFilters[i].id, temp);
                    break;
                case filterRegDateId:
                    inputs = allFilters[i].querySelectorAll("input");
                    temp = !inputs[0].value && !inputs[1].value ? "" :
                        [(inputs[0].value ? inputs[0].value : inputs[0].min),
                            (inputs[1].value ? inputs[1].value : inputs[1].max)];

                    filtersValues.set(allFilters[i].id, temp);
                    break;
                case filterUserRoleId:
                    inputs = allFilters[i].querySelectorAll("input");
                    temp = [];

                    for (let j = 0; j < inputs.length; j++) {
                        if (inputs[j].checked) {
                            temp.push(inputs[j].value);
                        }
                    }
                    temp = temp.length !== 0 ? temp : "";

                    filtersValues.set(allFilters[i].id, temp);
                    break;
            }
        }
    }

    return filtersValues;
}

function getUrlWithFilters() {
    let url = URL_GET_EMPLOYEES + "?";

    for (let entry of defaultFilters) {
        if (!entry[1]) {
            continue;
        }

        let paramName;
        switch (entry[0]) {
            case filterSearchStringId:
                paramName = "searchString";
                break;
            case filterCriterionId:
                paramName = "criterion";
                break;
            case filterSortId:
                paramName = "sort";
                break;
            case filterActualTaskId:
                paramName = "actualTask";
                break;
            case filterResolvedTaskId:
                paramName = "resolvedTask";
                break;
            case filterRegDateId:
                paramName = "regDate";
                break;
            case filterUserRoleId:
                paramName = "empRoles";
                break;
        }

        url += paramName + "=" + entry[1] + "&";
    }

    return url + "page=" + selectedPage;
}

function updateListEmployees() {
    const data = getAllObjectsFromRequest(getUrlWithFilters());
    const divDataEmployees = document.getElementById(divDataEmployeesId);
    document.getElementById(divListEmployeesId).remove();

    addListEmployees(divDataEmployees, data.employees, data.employeesCount);
    addNumberPage(data.pageCount);
    setDivUserAtrWidth();
}

function showRemainingTime(element, regDate) {
    const curDate = Date.now();

    const dif = Math.abs(curDate - regDate);

    if (dif <= timeBeforeAccountDeletion && document.getElementById(formDataAccountId)) {
        const showDif = timeBeforeAccountDeletion - dif;
        const seconds = Math.floor((showDif / 1000) % 60),
            minutes = Math.floor((showDif / (1000 * 60)) % 60),
            hours = Math.floor((showDif / (1000 * 60 * 60)) % 24);
        const difStr = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

        element.textContent = "Осталось времени до удаления: " + difStr;

        setTimeout(function () {
            showRemainingTime(element, regDate);
        }, 1000);
    } else {
        element.textContent = "Осталось времени до удаления: 00:00:00";
    }
}