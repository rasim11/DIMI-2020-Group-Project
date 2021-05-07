const btnSaveId = "btn-save";
const spanDesignatedUsersId = "span-designated-users";
const spanUnassignedUsersId = "span-unassigned-users";
const divDesignatedUsersId = "div-designated-users";
const divUnassignedUsersId = "div-unassigned-users";
const divUsersId = "div-users";
const divUserClass = "div-user";
const divUserAttrClass = "div-user-attr";
const selectStatusName = "status";
const selectPriorityName = "priority";
const inputSearchNamesId = "input-search-names";
const inputSearchStringId = "input-search-string";
const maxCountUsers = 10;
let defaultAssignmentUser = [];


function assignmentUser(divIdUserData) {
    const divUserData = document.getElementById(divIdUserData);
    const divDesignatedUsers = document.getElementById(divDesignatedUsersId);

    const inputEmail = divUserData.querySelector("input");
    inputEmail.name = "email";

    divDesignatedUsers.append(divUserData);
    calculateCount(spanDesignatedUsersId, 1);
    calculateCount(spanUnassignedUsersId, -1);

    const btn = divUserData.querySelector("button");
    btn.textContent = "X";
    btn.title = "Снять";
    btn.className = "btn btn-outline-danger";
    btn.onclick = function () {
        dismissUser(divIdUserData);
        isNoDuplicate();
        sortSocialWorkers(false);
    };
}

function dismissUser(divIdUserData) {
    const divUserData = document.getElementById(divIdUserData);
    const divDesignatedUsers = document.getElementById(divUnassignedUsersId);

    const inputEmail = divUserData.querySelector("input");
    inputEmail.name = "";

    divDesignatedUsers.append(divUserData);
    calculateCount(spanDesignatedUsersId, -1);
    calculateCount(spanUnassignedUsersId, 1);

    const btn = divUserData.querySelector("button");
    btn.textContent = "✓";
    btn.title = "Назначить";
    btn.className = "btn btn-outline-success";
    btn.onclick = function () {
        assignmentUser(divIdUserData);
        isNoDuplicate();
        sortSocialWorkers(true);
    };
}

function calculateCount(spanId, count) {
    let spanCountUsers = document.getElementById(spanId);
    let newCount = spanCountUsers.innerText.split(": ");
    newCount[newCount.length - 1] = (Number(newCount[newCount.length - 1]) + count).toString();
    spanCountUsers.textContent = newCount.join(": ");
}

function setDefaultValue() {
    const inputEmails = document.getElementById(divDesignatedUsersId).querySelectorAll("input");
    for (let i = 0; i < inputEmails.length; i++) {
        defaultAssignmentUser[i] = inputEmails[i].value;
    }

    sortSocialWorkers(true);
    sortSocialWorkers(false);

    let divDesignatedUsersLength = document.querySelectorAll("#" + divDesignatedUsersId + "> *").length;
    let divUnassignedUsersLength = document.querySelectorAll("#" + divUnassignedUsersId + "> *").length;

    if (divDesignatedUsersLength + divUnassignedUsersLength > maxCountUsers) {
        if (divDesignatedUsersLength !== 0) {
            activationScrollBar(divDesignatedUsersId, maxCountUsers, divUserClass);
            document.getElementById(divUnassignedUsersId).style.maxHeight =
                document.getElementById(divDesignatedUsersId).style.maxHeight;
        } else {
            activationScrollBar(divUnassignedUsersId, maxCountUsers, divUserClass);
            document.getElementById(divDesignatedUsersId).style.maxHeight =
                document.getElementById(divUnassignedUsersId).style.maxHeight;
        }
    }
}

function isNoDuplicate() {
    const btnSave = document.getElementById(btnSaveId);

    const inputEmails = document.getElementById(divDesignatedUsersId).querySelectorAll("input");
    if (inputEmails.length !== defaultAssignmentUser.length) {
        btnSave.disabled = false;
        return;
    }

    for (let i = 0; i < inputEmails.length; i++) {
        if (!defaultAssignmentUser.includes(inputEmails[i].value)) {
            btnSave.disabled = false;
            return;
        }
    }
}

function isValid() {
    const selectPriority = document.getElementsByName(selectPriorityName)[0];
    if (selectPriority.value === "") {
        setInvalidFormat(selectPriority, "Приоритет не выбран");
        return false;
    }
    return true;
}

function quickSort(objects, low, high, isReverse = false) {
    if (objects.length === 0) {
        return;
    }

    if (low >= high) {
        return;
    }

    let middle = Math.floor(low + (high - low) / 2);
    let backbone = getNumber(objects[middle]);

    let i = low, j = high;
    while (i <= j) {
        if (isReverse) {
            while (getNumber(objects[i]) > backbone) {
                i++;
            }

            while (getNumber(objects[j]) < backbone) {
                j--;
            }
        } else {
            while (getNumber(objects[i]) < backbone) {
                i++;
            }

            while (getNumber(objects[j]) > backbone) {
                j--;
            }
        }

        if (i <= j) {
            let temp = objects[i];
            objects[i] = objects[j];
            objects[j] = temp;
            i++;
            j--;
        }
    }

    if (low < j) {
        quickSort(objects, low, j, isReverse);
    }


    if (high > i) {
        quickSort(objects, i, high, isReverse);
    }
}

function getNumber(obj) {
    let elements = obj.querySelectorAll("span");
    elements = elements[elements.length - 1].innerText.split(": ");
    return Number(elements[elements.length - 1]);
}

function showSortArr(targetDivId, arr) {
    const targetDiv = document.getElementById(targetDivId);
    targetDiv.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {
        targetDiv.append(arr[i]);
    }
}

function sortSocialWorkers(isReverse) {
    let id;
    if (isReverse) {
        id = divDesignatedUsersId;
    } else {
        id = divUnassignedUsersId;
    }

    let socialWorkers = Array.from(document.querySelectorAll("#" + id + "> *"));
    quickSort(socialWorkers, 0, socialWorkers.length - 1, isReverse);
    showSortArr(id, socialWorkers);
}

function filterSearchStringInactiveExt() {
    document.getElementById(inputSearchStringId).value = "";
    filterSearchStringInactive(divUnassignedUsersId, spanUnassignedUsersId, "table");
    filterSearchStringInactive(divDesignatedUsersId, spanDesignatedUsersId, "table");
}

function filterSearchStringActiveExt(inputSearchString) {
    filterSearchStringActive(inputSearchString, divUnassignedUsersId, inputSearchNamesId, spanUnassignedUsersId,
        "table");
    filterSearchStringActive(inputSearchString, divDesignatedUsersId, inputSearchNamesId, spanDesignatedUsersId,
        "table");
}

function setDivUserAtrWidth() {
    const divUsers = document.getElementById(divUsersId);
    const divDesignatedUsers = document.getElementById(divDesignatedUsersId);
    const divUser = document.querySelector("." + divUserClass);

    let maxWidth = parseFloat(window.getComputedStyle(divUsers, null).width) / 2 -
        parseFloat(window.getComputedStyle(divUsers.querySelector("div"), null).paddingRight) -
        parseFloat(window.getComputedStyle(divUser.querySelector("a"), null).width) -
        parseFloat(window.getComputedStyle(divUser.querySelector("a"), null).marginRight) -
        parseFloat(window.getComputedStyle(divUser.querySelector("a"), null).marginLeft) -
        parseFloat(window.getComputedStyle(divUser.querySelector("button"), null).width);
    maxWidth -= divDesignatedUsers.style.maxHeight ? 18 : 0;

    const divUsersAtr = document.querySelectorAll("." + divUserAttrClass);
    for (let i = 0; i < divUsersAtr.length; i++) {
        divUsersAtr[i].style.maxWidth = maxWidth + "px";
    }
}