const URL_GET_ALL_USER = SERVER + API + VERSION + USER_MANAGEMENT + ALL_USERS_GET;
const URL_DELETE_USER = SERVER + API + VERSION + USER_MANAGEMENT + USER_DELETE;
const URL_GET_ALL_ROLES = SERVER + API + VERSION + ROLE_MANAGEMENT + ALL_ROLES_GET;
const URL_REGISTRATION_THROUGH_ADMIN = API + VERSION + ADMIN_MANAGEMENT + USER_MANAGEMENT + USER_REGISTRATION;

const divClassUser = "div-user";
const divClassFilterActions = "div-filter-actions";
const divClassUserAttribute = "div-user-attribute";
const divClassUserActivity = "div-user-activity";
const divIdMainContent = "div-main-content";
const divIdDataUsers = "div-data-users"
const divIdListUsers = "div-list-users";
const divIdFilterRole = "div-filter-role";
const divIdFilterRegDate = "div-filter-reg-date";
const divIdFiltersActions = "div-filters-actions";
const divIdDataFilters = "div-data-filters";
const btnIdDataUsers = "btn-data-users";
const ulIdFiltersMenu = "ul-filters-menu";
const checkedBtnIdRole = "checked-btn-id-role";
const inputClassHiddenIsActive = "input-hidden-is-active";
const inputIdSearchString = "input-search-string";
const inputIdSearchEmail = "input-search-email";
const inputIdSearchNames = "input-search-names";
const spanIdCountUsers = "span-count-users";
let users;
let roles;

function loadDataUsers() {
    users = getAllObjectsFromRequest(URL_GET_ALL_USER);
    roles = getAllObjectsFromRequest(URL_GET_ALL_ROLES);

    addDataUsers();
    addDataFilters();
}

function addDataFilters() {
    const divMainContent = document.getElementById(divIdMainContent);

    const divDataFilters = document.createElement("div");
    divDataFilters.id = divIdDataFilters;
    divDataFilters.style.display = "inline-block";
    divDataFilters.style.verticalAlign = "top";
    divMainContent.appendChild(divDataFilters);

    const spanFilters = document.createElement("span");
    spanFilters.className = "mb-2";
    spanFilters.style.fontSize = "larger";
    spanFilters.style.display = "block";
    spanFilters.textContent = "Фильтры";
    divDataFilters.appendChild(spanFilters);

    const ulFiltersMenu = document.createElement("ul");
    ulFiltersMenu.id = ulIdFiltersMenu;
    ulFiltersMenu.className = "nav flex-column mb-2";
    ulFiltersMenu.style.minWidth = "max-content";
    divDataFilters.appendChild(ulFiltersMenu);

    for (let i = 0; i < 2; i++) {
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
        divFilter.className = "collapse";
        liFilter.appendChild(divFilter);

        const divFilterRoleBody = document.createElement("div");
        divFilterRoleBody.className = "card card-body";
        divFilterRoleBody.style.background = "none";
        divFilterRoleBody.style.border = "none";
        divFilter.appendChild(divFilterRoleBody);

        const hiddenIsActive = document.createElement("input");
        hiddenIsActive.className = inputClassHiddenIsActive;
        hiddenIsActive.type = "hidden";
        hiddenIsActive.value = "";
        divFilter.appendChild(hiddenIsActive);

        switch (i) {
            case 0:
                btn.setAttribute("data-target", "#" + divIdFilterRole);
                btn.setAttribute("aria-controls", divIdFilterRole);
                spanTitleFilter.textContent = "Роль";
                divFilter.id = divIdFilterRole;

                for (let j = 0; j < roles.length; j++) {
                    const divFilterElement = document.createElement("div");
                    divFilterElement.className = "form-check";
                    divFilterElement.addEventListener("click", isFilterRoleActive.bind(null, divFilter,
                        spanTitleFilter));
                    divFilterRoleBody.appendChild(divFilterElement);

                    const inputCheckedBtn = document.createElement("input");
                    inputCheckedBtn.id = checkedBtnIdRole + j;
                    inputCheckedBtn.className = "form-check-input";
                    inputCheckedBtn.type = "checkbox";
                    divFilterElement.appendChild(inputCheckedBtn);

                    const labelFilterElement = document.createElement("label");
                    labelFilterElement.setAttribute("for", checkedBtnIdRole + j);
                    labelFilterElement.className = "form-check-label";
                    labelFilterElement.style.fontSize = "large";
                    labelFilterElement.textContent = roles[j].name;
                    divFilterElement.appendChild(labelFilterElement);
                }
                break;
            case 1:
                btn.setAttribute("data-target", "#" + divIdFilterRegDate);
                btn.setAttribute("aria-controls", divIdFilterRegDate);
                divFilter.id = divIdFilterRegDate;
                spanTitleFilter.textContent = "Дата регистрации";

                for (let j = 0; j < 2; j++) {
                    const inputRegDate = document.createElement("input");
                    inputRegDate.type = "text";
                    inputRegDate.className = j === 0 ? "form-control mb-2" : "form-control";
                    inputRegDate.min = "2020-01-01";
                    inputRegDate.max = "2100-01-01";
                    inputRegDate.style.width = "100%";
                    inputRegDate.addEventListener("focus", function () {
                        inputRegDate.type = "date";
                    });
                    inputRegDate.addEventListener("blur", isFilterDateActive.bind(null, divFilter,
                        spanTitleFilter));
                    inputRegDate.placeholder = j === 0 ? "От" : "До";
                    divFilterRoleBody.appendChild(inputRegDate);
                }
                break;
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
            btn.textContent = "Применить все";
            btn.addEventListener("click", filtersApplyAll);
        } else {
            btn.className = "btn btn-secondary";
            btn.textContent = "Сбросить все";
            btn.addEventListener("click", filtersResetAll);
        }

        divFiltersActions.appendChild(btn);
    }
}

function addDataUsers() {
    const divMainContent = document.getElementById(divIdMainContent);

    const divDataUsers = document.createElement("div");
    divDataUsers.id = divIdDataUsers;
    divDataUsers.style.display = "inline-block";
    divDataUsers.style.marginRight = "80px";
    divDataUsers.style.minWidth = "450px";
    divMainContent.appendChild(divDataUsers);

    const blockTitle = document.createElement("h3");
    blockTitle.style.textAlign = "center";
    blockTitle.innerText = document.getElementById(btnIdDataUsers).innerText;
    divDataUsers.appendChild(blockTitle);

    const divSearchString = document.createElement("div");
    divSearchString.className = "search-string";
    divDataUsers.appendChild(divSearchString);

    const inputSearchString = document.createElement("input");
    inputSearchString.id = inputIdSearchString;
    inputSearchString.type = "text";
    inputSearchString.className = "form-control";
    inputSearchString.style.width = "100%";
    inputSearchString.placeholder = "Введите критерий поиска";
    inputSearchString.addEventListener("input", filterSearchStringActive.bind(null, inputSearchString));
    divSearchString.appendChild(inputSearchString);

    const btnClearSearchString = document.createElement("button");
    btnClearSearchString.type = "button";
    btnClearSearchString.style.outline = "none";
    btnClearSearchString.className = "clear-search-string";
    btnClearSearchString.addEventListener("click", function () {
        inputSearchString.value = "";
        filterSearchStringInactive();
    });
    divSearchString.appendChild(btnClearSearchString);

    const divSearchBar = document.createElement("div");
    divSearchBar.className = "mb-2";
    divDataUsers.appendChild(divSearchBar);

    const divSearchCriterion = document.createElement("div");
    divSearchBar.appendChild(divSearchCriterion);

    const labelSearchCriterion = document.createElement("label");
    labelSearchCriterion.textContent = "Критерий поиска:";
    labelSearchCriterion.style.fontSize = "14px";
    divSearchCriterion.appendChild(labelSearchCriterion);

    for (let i = 0; i < 2; i++) {
        const label = document.createElement("label");
        label.style.fontSize = "14px";
        label.className = "ml-2";
        divSearchCriterion.appendChild(label);

        label.innerHTML = i === 0 ?
            "<input id='" + inputIdSearchEmail + "' type='radio' name='searchCriterion' checked " +
            "style='vertical-align: middle'> Email |" :
            "<input id='" + inputIdSearchNames + "' type='radio' name='searchCriterion' " +
            "style='vertical-align: middle'> ФИО";
    }

    addListUsers();
}

function addListUsers() {
    const divDataUsers = document.getElementById(divIdDataUsers);

    const divListUsers = document.createElement("div");
    divListUsers.id = divIdListUsers;
    divDataUsers.appendChild(divListUsers);

    const preData = document.createElement("form");
    preData.className = "mb-2";
    preData.action = URL_REGISTRATION_THROUGH_ADMIN;
    preData.method = "get";
    divListUsers.appendChild(preData);

    const btnAddUser = document.createElement("button");
    btnAddUser.type = "submit";
    btnAddUser.className = "btn btn-outline-success";
    btnAddUser.textContent = "Добавить";
    preData.appendChild(btnAddUser);

    const spanCountUsers = document.createElement("span");
    spanCountUsers.id = spanIdCountUsers;
    spanCountUsers.style.float = "right";
    spanCountUsers.style.transform = "translateY(25%)";
    spanCountUsers.textContent = "Всего пользователей: " + users.length;
    preData.appendChild(spanCountUsers);

    const hrElement = document.createElement("hr");
    divListUsers.appendChild(hrElement);

    for (let i = 0; i < users.length; i++) {
        const divUser = document.createElement("div");
        divUser.className = divClassUser + " mb-4";
        divListUsers.appendChild(divUser);

        const imgUserAvatar = document.createElement("img");
        imgUserAvatar.src = users[i].userImage;
        divUser.appendChild(imgUserAvatar);

        const divUserAttribute = document.createElement("div");
        divUserAttribute.className = divClassUserAttribute + " mr-4 ml-4";
        divUserAttribute.style.display = "inline-block";
        divUserAttribute.style.verticalAlign = "middle";
        divUser.appendChild(divUserAttribute);

        for (let j = 0; j < 4; j++) {
            const spanUserAttribute = document.createElement("span");
            spanUserAttribute.style.display = "block";
            switch (j) {
                case 0:
                    spanUserAttribute.textContent = "ФИО: " + users[i].lastname + " " + users[i].firstname + " " +
                        users[i].middlename;
                    break;
                case 1:
                    spanUserAttribute.textContent = "Email: " + users[i].email;
                    break;
                case 2:
                    spanUserAttribute.textContent = "Роль: " + users[i].role.name;
                    break;
                case 3:
                    let regDate = new Date(users[i].regDate);
                    spanUserAttribute.textContent = "Дата регистрации: " +
                        ("0" + (regDate.getDate())).slice(-2) + "." +
                        ("0" + (regDate.getMonth() + 1)).slice(-2) + "." +
                        regDate.getFullYear();
                    break;
            }

            divUserAttribute.appendChild(spanUserAttribute);
        }

        const hiddenRegDate = document.createElement("input");
        hiddenRegDate.type = "hidden";
        hiddenRegDate.value = users[i].regDate;
        divUserAttribute.appendChild(hiddenRegDate);

        const divUserActivity = document.createElement("div");
        divUserActivity.className = divClassUserActivity;
        divUserActivity.style.display = "inline-block";
        divUserActivity.style.verticalAlign = "middle";
        divUserActivity.style.float = "right";
        divUser.appendChild(divUserActivity);

        for (let j = 0; j < 2; j++) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.style.display = "block";
            btn.style.width = "100%";

            if (j === 0) {
                btn.className = "btn btn-outline-primary mb-4";
                btn.textContent = "Изменить роль";
            } else {
                btn.className = "btn btn-outline-danger";
                btn.textContent = "Удалить";
                btn.addEventListener("click", deleteUser.bind(null, divUser, divUserAttribute, spanCountUsers));
            }

            divUserActivity.appendChild(btn);
        }
    }
}

function getAllObjectsFromRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
        return null;
    } else {
        return JSON.parse(xhr.responseText);
    }
}

function deleteUser(divUser, divUserAttribute, spanCountUsers) {
    const email = divUserAttribute.querySelectorAll("span")[1].innerText.split(" ");

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", URL_DELETE_USER + "/" + email[email.length - 1], true);
    xhr.send();

    divUser.remove();

    let newCount = spanCountUsers.innerText.split(" ");
    newCount[newCount.length - 1] = (Number(newCount[newCount.length - 1]) - 1).toString();
    spanCountUsers.textContent = newCount.join(" ");
}

function isFilterDateActive(divFilter, spanTitleFilter) {
    const divFilterElements = divFilter.querySelector(".card").querySelectorAll("input");

    for (let i = 0; i < divFilterElements.length; i++) {
        if (divFilterElements[i].value) {
            if (divFilter.querySelector("." + divClassFilterActions)) {
                return;
            }

            addFilterActions(spanTitleFilter, divFilter);
            return;
        } else {
            divFilterElements[i].type = "text";
        }
    }

    filterInactive(divFilter, spanTitleFilter);
}

function isFilterRoleActive(divFilter, spanTitleFilter) {
    const checkedBtn = divFilter.querySelector(".card").querySelectorAll("input");

    for (let i = 0; i < checkedBtn.length; i++) {
        if (checkedBtn[i].checked) {
            if (divFilter.querySelector("." + divClassFilterActions)) {
                return;
            }

            addFilterActions(spanTitleFilter, divFilter);
            return;
        }
    }

    filterInactive(divFilter, spanTitleFilter);
}

function addFilterActions(spanTitleFilter, divFilter) {
    spanTitleFilter.style.color = "#007bff";

    const divFilterActions = document.createElement("div");
    divFilterActions.className = divClassFilterActions;
    divFilter.appendChild(divFilterActions);

    for (let j = 0; j < 2; j++) {
        const btn = document.createElement("button");
        btn.type = "button";

        if (j === 0) {
            btn.className = "btn btn-primary mr-1";
            btn.textContent = "Применить";
            btn.addEventListener("click", filterActive.bind(null, divFilter));
        } else {
            btn.className = "btn btn-secondary";
            btn.textContent = "Сбросить";
            btn.style.float = "right";
            btn.addEventListener("click", filterInactive.bind(null, divFilter, spanTitleFilter));
        }

        divFilterActions.appendChild(btn);
    }
}

function filterActive(divFilter) {
    divFilter.querySelector("." + inputClassHiddenIsActive).value = "on";

    removeListUsers();

    switch (divFilter.id) {
        case divIdFilterRole:
            filterRoleActive(divFilter);
            break;
        case divIdFilterRegDate:
            filterRegDateActive(divFilter);
            break;
    }

    anotherFiltersActive(divFilter);
}

function filterInactive(divFilter, spanTitleFilter) {
    let target = divFilter.querySelector("." + divClassFilterActions);

    if (target) {
        spanTitleFilter.style.color = "black";
        divFilter.removeChild(target);

        removeListUsers();

        divFilter.querySelector("." + inputClassHiddenIsActive).value = "";
        const divFilterElements = divFilter.querySelector(".card").querySelectorAll("input");
        switch (divFilter.id) {
            case divIdFilterRole:
                for (let i = 0; i < divFilterElements.length; i++) {
                    divFilterElements[i].checked = false;
                }
                break;
            case divIdFilterRegDate:
                for (let i = 0; i < divFilterElements.length; i++) {
                    divFilterElements[i].type = "text";
                    divFilterElements[i].value = "";
                }
                break;
        }

        anotherFiltersActive(divFilter);
    }
}

function anotherFiltersActive(divFilter) {
    const divFilters = document.querySelectorAll(".collapse");

    for (let i = 0; i < divFilters.length; i++) {
        let filterActivity = divFilters[i].querySelector("." + inputClassHiddenIsActive);
        if (divFilters[i] !== divFilter && filterActivity.value) {
            switch (i) {
                case 0:
                    filterRoleActive(divFilters[i]);
                    break;
                case 1:
                    filterRegDateActive(divFilters[i]);
                    break;
            }
        }
    }

    filterSearchStringActive(document.getElementById(inputIdSearchString));

}

function filterRoleActive(divFilter) {
    const checkedBtn = divFilter.querySelector(".card").querySelectorAll("input");
    const filterRoles = divFilter.querySelectorAll("label");
    const allUsers = document.querySelectorAll("." + divClassUser);

    let usersCount = 0;
    for (let i = 0; i < allUsers.length; i++) {
        let curRoleSplit = allUsers[i].querySelectorAll("span")[2].innerText.split(":");
        let curRole = curRoleSplit[curRoleSplit.length - 1].trim();

        for (let j = 0; j < checkedBtn.length; j++) {
            let filterRole = filterRoles[j].innerText;

            if (curRole === filterRole) {
                if (!checkedBtn[j].checked) {
                    allUsers[i].remove();
                    usersCount++;
                }
                break;
            }
        }
    }

    calculateUsersCountFilters(usersCount);
}

function filterRegDateActive(divFilter) {
    const divFilterElements = divFilter.querySelector(".card").querySelectorAll("input");
    const allUsers = document.querySelectorAll("." + divClassUser);

    let begRegDate, endRegDate;
    if (!divFilterElements[0].value) {
        begRegDate = divFilterElements[0].min;
        endRegDate = divFilterElements[1].value;
    } else if (!divFilterElements[1].value) {
        begRegDate = divFilterElements[0].value;
        endRegDate = divFilterElements[1].max;
    } else {
        begRegDate = divFilterElements[0].value;
        endRegDate = divFilterElements[1].value;
    }


    let usersCount = 0;
    for (let i = 0; i < allUsers.length; i++) {
        const regDate = allUsers[i].querySelector("input").value;
        if ((begRegDate > regDate) || (regDate > endRegDate)) {
            allUsers[i].remove();
            usersCount++;
        }
    }

    calculateUsersCountFilters(usersCount);
}

function calculateUsersCountFilters(usersCount) {
    let spanCountUsers = document.getElementById(spanIdCountUsers);
    let newCount = spanCountUsers.innerText.split(" ");
    newCount[newCount.length - 1] = (Number(newCount[newCount.length - 1]) - usersCount).toString();
    spanCountUsers.textContent = newCount.join(" ");
}

function filtersResetAll() {
    removeListUsers();
    document.getElementById(divIdDataFilters).remove();
    addDataFilters();
    filterSearchStringActive(document.getElementById(inputIdSearchString));
}

function filtersApplyAll() {
    const divFilters = document.querySelectorAll(".collapse");

    let idActiveFilter;
    for (let i = 0; i < divFilters.length; i++) {
        const filterActions = divFilters[i].querySelector("." + divClassFilterActions);

        if (filterActions) {
            divFilters[i].querySelector("." + inputClassHiddenIsActive).value = "on";
            idActiveFilter = i;
        }
    }

    if (idActiveFilter) {
        filterActive(divFilters[idActiveFilter]);
    }
}

function removeListUsers() {
    document.getElementById(divIdListUsers).remove();
    addListUsers();
}

function filterSearchStringActive(inputSearchString) {
    if (!inputSearchString.value) {
        filterSearchStringInactive();
        return;
    }

    const allUsers = document.querySelectorAll("." + divClassUser);
    const radioNames = document.getElementById(inputIdSearchNames);

    for (let i = 0; i < allUsers.length; i++) {
        const criterionArr = radioNames.checked ?
            allUsers[i].querySelectorAll("span")[0].innerText.split(":") :
            allUsers[i].querySelectorAll("span")[1].innerText.split(" ");
        const criterion = criterionArr[criterionArr.length - 1];
        allUsers[i].style.display = criterion.indexOf(inputSearchString.value) === -1 ? "none" : "block";
    }

    calculateUsersCountSearchString()
}

function filterSearchStringInactive() {
    const allUsers = document.querySelectorAll("." + divClassUser);

    for (let i = 0; i < allUsers.length; i++) {
        allUsers[i].style.display = "block";
    }

    calculateUsersCountSearchString();
}

function calculateUsersCountSearchString() {
    const allUsers = document.querySelectorAll("." + divClassUser);

    let usersCount = 0;
    for (let i = 0; i < allUsers.length; i++) {
        usersCount += allUsers[i].style.display === "block" ? 1 : 0;
    }

    let spanCountUsers = document.getElementById(spanIdCountUsers);
    let newCount = spanCountUsers.innerText.split(" ");
    newCount[newCount.length - 1] = (usersCount).toString();
    spanCountUsers.textContent = newCount.join(" ");
}