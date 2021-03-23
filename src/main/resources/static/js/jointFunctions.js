const divMainContentId = "div-main-content";
const mainBlockId = "main-block";


function filterSearchStringActive(inputSearchString, divUsersId, inputIdSearchNames, spanIdCountUsers,
                                  displayType) {
    if (!inputSearchString.value) {
        filterSearchStringInactive(divUsersId, spanIdCountUsers, displayType);
        return;
    }

    const allUsers = document.querySelectorAll("#" + divUsersId + "> *");
    const radioNames = document.getElementById(inputIdSearchNames);

    for (let i = 0; i < allUsers.length; i++) {
        const criterionArr = radioNames.checked ?
            allUsers[i].querySelectorAll("span")[0].innerText.split(":") :
            allUsers[i].querySelectorAll("span")[1].innerText.split(" ");
        const criterion = criterionArr[criterionArr.length - 1];
        allUsers[i].style.display = criterion.indexOf(inputSearchString.value) === -1 ? "none" : displayType;
    }

    calculateUsersCountSearchString(divUsersId, spanIdCountUsers, displayType);
}

function filterSearchStringInactive(divUsersId, spanIdCountUsers, displayType) {
    const allUsers = document.querySelectorAll("#" + divUsersId + "> *");

    for (let i = 0; i < allUsers.length; i++) {
        allUsers[i].style.display = displayType;
    }

    calculateUsersCountSearchString(divUsersId, spanIdCountUsers, displayType);
}

function activationScrollBar(divUsersId, maxCountUsers, divUserClass, divLength) {
    const divUsers = document.getElementById(divUsersId);
    const divUser = document.querySelector("." + divUserClass);
    const divUserHeight = parseFloat(window.getComputedStyle(divUser, null).height);

    divUsers.style.height = divLength > maxCountUsers ? maxCountUsers * divUserHeight + "px" :
        "";
}

function calculateUsersCountSearchString(divUsersId, spanIdCountUsers, displayType) {
    const allUsers = document.querySelectorAll("#" + divUsersId + "> *");

    let usersCount = 0;
    for (let i = 0; i < allUsers.length; i++) {
        usersCount += allUsers[i].style.display === displayType ? 1 : 0;
    }

    let spanCountUsers = document.getElementById(spanIdCountUsers);
    let newCount = spanCountUsers.innerText.split(" ");
    newCount[newCount.length - 1] = (usersCount).toString();
    spanCountUsers.textContent = newCount.join(" ");
}

function setMainContentWidth() {
    const mainBlock = document.getElementById(mainBlockId);
    const divMainContent = document.getElementById(divMainContentId);
    const navPanel = mainBlock.querySelector("nav");

    divMainContent.style.width = parseFloat(window.getComputedStyle(mainBlock, null).width) -
        parseFloat(window.getComputedStyle(mainBlock, null).paddingLeft) * 2 - 5 -
        parseFloat(window.getComputedStyle(navPanel, null).width) + "px";
}

function compress(inputImgSrc) {
    let width = inputImgSrc.naturalWidth;
    let height = inputImgSrc.naturalHeight;
    const maxWidth = 640;
    const maxHeight = 480;

    if (width > height) {
        if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
        }
    }

    let resImg = new Image();
    let cvs = document.createElement("canvas");

    cvs.width = width;
    cvs.height = height;

    const ctx = cvs.getContext("2d");
    ctx.drawImage(inputImgSrc, 0, 0, width, height);

    resImg.src = cvs.toDataURL("image/jpeg", 1.0);
    return resImg;
}

function getRoleName(role) {
    switch (role) {
        case "USER":
            return "Пользователь";
        case "SOCIAL_WORKER":
            return "Соц. работник";
        case "RESPONSIBLE":
            return "Ответственный";
        default:
            return "Ошибка";
    }
}