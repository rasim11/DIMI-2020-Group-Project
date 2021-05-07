const LOCAL_URL_PERSONAL_ACCOUNT = API + VERSION + PERSONAL_ACCOUNT;
const LOCAL_URL_USER_PROFILE = API + VERSION + USER_MANAGEMENT + USER_GET + BY_ID;

const defaultAvatar = "data:image/png;base64,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";
const divIdMainContent = "div-main-content";
const filterResolvedTaskId = "filter-resolved-task";
const filterRegDateId = "filter-reg-date";
const filterActualTaskId = "filter-actual-task";
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
const btnIdUpdate = "update-button";
const btnIdDataAccount = "btn-data-account";
const btnIdDataResponsible = "btn-data-responsible";
const spanIdErrMsg = "err-msg";
const spanIdCountUsers = "span-count-users";
const inputIdPas = "pas-input";
const inputIdConfPas = "conf-pas-input";
const inputIdAvatar = "input-avatar";
const imgIdAvatar = "img-avatar";
const formIdDataAccount = "form-data-account";
const formClassUpdate = "form-update";
const divEmpAttrClass = "div-emp-attribute";
const divListEmployeesId = "div-list-employees";
const divPageNumbersId = "div-page-numbers";
const divFiltersClass = "div-filters";
const filterSearchStringId = "filter-search-string";
const filterCriterionId = "filter-criterion";
const filterSortId = "filter-sort";
let curUser;
let curUserJson;
let selectedPage;
let selectedPageId;
let defaultFilters = [];

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
        switch (isValid(formDataUser)) {
            case "":
                addChangeSucMsg();
                setTimeout(function () {
                    e.target.submit();
                }, 1000);
                break;
            case "err":
                addErrMsg();
                break;
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
                imgUserAvatar.src = defaultAvatar;
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
    formDataAccount.id = formIdDataAccount;
    formDataAccount.style.textAlign = "center";
    formDataAccount.method = "post";
    formDataAccount.action = "/logout";
    formDataAccount.style.width = "450px";
    formDataAccount.className = "form-data";
    formDataAccount.style.margin = "auto";
    formDataAccount.addEventListener("submit", function (e) {
        e.preventDefault();

        deleteObject(URL_DELETE_USER + "/" + curUser.email, false);
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
    blockText.textContent = "Вы можете удалить свой аккаунт. После этого все данные будут безвозвратно утрачены.";
    blockText.style.fontSize = "20px";
    blockText.style.textAlign = "start";
    formDataAccount.appendChild(blockText);

    const btnDelete = document.createElement("button");
    btnDelete.type = "submit";
    btnDelete.className = "btn btn-danger";
    btnDelete.textContent = "Удалить";
    formDataAccount.appendChild(btnDelete);
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
                pUserAtr.textContent = "Актуальные проблемы";

                const aProblemsActual = document.createElement("a");
                aProblemsActual.href = "#";
                divInternalCont.appendChild(aProblemsActual);
                aProblemsActual.appendChild(pUserAtr);
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
            divTarget = document.getElementById(formIdDataAccount);
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

function addChangeSucMsg() {
    const formDataUser = document.querySelector('.' + formClassUpdate);
    const formDataAccount = document.getElementById(formIdDataAccount);

    const textChangeSucMsg = document.createElement("h4");
    textChangeSucMsg.style.textAlign = "center";

    let targetForm;
    if (formDataUser) {
        targetForm = formDataUser;
        textChangeSucMsg.textContent = "Данные успешно изменены!";
    } else if (formDataAccount) {
        targetForm = formDataAccount;
        textChangeSucMsg.textContent = "Аккаунт успешно удалён!";

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
            defaultFilters[2] = selectSearchCriterion.value;

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

        for (let j = 0; j < 6; j++) {
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
                    let regDate = new Date(employees[i].regDate);
                    spanUserAttribute.textContent = "Дата регистрации: " +
                        ("0" + (regDate.getDate())).slice(-2) + "." +
                        ("0" + (regDate.getMonth() + 1)).slice(-2) + "." +
                        regDate.getFullYear();
                    break;
                case 4:
                    spanUserAttribute.textContent = "Решённых проблем: " + employees[i].tasksCount;
                    break;
                case 5:
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
    spanFilters.className = "mb-2";
    spanFilters.style.fontSize = "larger";
    spanFilters.style.display = "block";
    spanFilters.textContent = "Фильтры";
    divDataFilters.appendChild(spanFilters);

    const ulFiltersMenu = document.createElement("ul");
    ulFiltersMenu.className = "nav flex-column mb-2";
    ulFiltersMenu.style.minWidth = "max-content";
    divDataFilters.appendChild(ulFiltersMenu);

    for (let i = 0; i < 3; i++) {
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
                btn.setAttribute("data-target", "#" + filterActualTaskId);
                btn.setAttribute("aria-controls", filterActualTaskId);
                spanTitleFilter.textContent = "Актуальных проблем";
                divFilter.id = filterActualTaskId;
                break;
            case 1:
                btn.setAttribute("data-target", "#" + filterResolvedTaskId);
                btn.setAttribute("aria-controls", filterResolvedTaskId);
                divFilter.id = filterResolvedTaskId;
                spanTitleFilter.textContent = "Решённых проблем";
                break;
            case 2:
                btn.setAttribute("data-target", "#" + filterRegDateId);
                btn.setAttribute("aria-controls", filterRegDateId);
                divFilter.id = filterRegDateId;
                spanTitleFilter.textContent = "Дата регистрации";
                break;
        }

        for (let j = 0; j < 2; j++) {
            const inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.className = j === 0 ? "form-control mb-2" : "form-control";
            inputElement.style.width = "100%";
            inputElement.placeholder = j === 0 ? "От" : "До";
            divFilterBody.appendChild(inputElement);

            if (i === 2) {
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
                    switch (allFilters[iLocal].id) {
                        case filterActualTaskId:
                        case filterResolvedTaskId:
                        case filterRegDateId:
                            const inputs = allFilters[iLocal].querySelectorAll("input");
                            for (let jLocal = 0; jLocal < inputs.length; jLocal++) {
                                inputs[jLocal].value = "";
                                inputs[jLocal].type = "text";
                                setValidFormat(inputs[jLocal]);
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
        if (key <= 0) {
            switch (allFilters[i].id) {
                case filterSearchStringId:
                case filterCriterionId:
                case filterSortId:
                    filtersValues[i] = allFilters[i].value ? allFilters[i].value : "null";
                    break;
            }
        }

        if (key >= 0) {
            switch (allFilters[i].id) {
                case filterActualTaskId:
                case filterResolvedTaskId:
                    let inputValues = allFilters[i].querySelectorAll("input");
                    filtersValues[i] = !inputValues[0].value && !inputValues[1].value ? "null" :
                        (inputValues[0].value ? inputValues[0].value : "0") + "|" +
                        (inputValues[1].value ? inputValues[1].value : "maxLong");
                    break;
                case filterRegDateId:
                    let inputs = allFilters[i].querySelectorAll("input");
                    filtersValues[i] = !inputs[0].value && !inputs[1].value ? "null" :
                        (inputs[0].value ? inputs[0].value : inputs[0].min) + "|" +
                        (inputs[1].value ? inputs[1].value : inputs[1].max);
                    break;
            }
        }
    }

    return filtersValues;
}

function getUrlWithFilters() {
    let url = URL_GET_EMPLOYEES + "/" + curUserJson.email;
    url += curUserJson.region ? "/" + curUserJson.region.id : "/-1";

    for (let i = 0; i < defaultFilters.length; i++) {
        url += "/" + defaultFilters[i];
    }

    return url + "/" + selectedPage + "/" + curUserJson.role;
}

function updateListEmployees() {
    const data = getAllObjectsFromRequest(getUrlWithFilters());
    const divDataEmployees = document.getElementById(divDataEmployeesId);
    document.getElementById(divListEmployeesId).remove();

    addListEmployees(divDataEmployees, data.employees, data.employeesCount);
    addNumberPage(data.pageCount);
    setDivUserAtrWidth();
}