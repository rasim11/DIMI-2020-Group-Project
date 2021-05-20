const formLoginMenuId = "form-login-menu";
const divHiddenLoginMenuId = "div-hidden-login-menu";
const divHiddenProblemsMenuId = "div-hidden-problems-menu";
const divProblemsMenuId = "div-problems-menu";
const spanUserRoleId = "span-user-role";
const divHeaderId = "div-header";
const divFooterId = "div-footer";

function showLoginMenu() {
    const loginMenu = document.getElementById(formLoginMenuId);
    loginMenu.style.display = loginMenu.style.display === "block" ? "none" : "block";

    let body = document.querySelector("body");
    if (!body.onmouseup || body.onmouseup.name !== "bound " + hideLoginMenu.name) {
        body.onmouseup = hideLoginMenu.bind(body.onmouseup);
    }
}

function showProblemsMenu() {
    const problemsMenu = document.getElementById(divProblemsMenuId);
    problemsMenu.style.display = problemsMenu.style.display === "block" ? "none" : "block";

    let body = document.querySelector("body");
    if (!body.onmouseup || body.onmouseup.name !== "bound " + hideProblemsMenu.name) {
        body.onmouseup = hideProblemsMenu.bind(body.onmouseup);
    }
}

function hideLoginMenu(e) {
    const div = $("#" + formLoginMenuId);
    const mainDiv = $("#" + divHiddenLoginMenuId);
    if (!mainDiv.is(e.target)
        && mainDiv.has(e.target).length === 0) {
        div.hide();
    }
}

function hideProblemsMenu(e) {
    const div = $("#" + divProblemsMenuId);
    const mainDiv = $("#" + divHiddenProblemsMenuId);
    if (!mainDiv.is(e.target)
        && mainDiv.has(e.target).length === 0) {
        div.hide();
    }
}

function setHeaderFooterColor() {
    const divHeader = document.getElementById(divHeaderId);
    const divFooter = document.getElementById(divFooterId);
    const spanUserRole = divHeader.querySelector("#" + spanUserRoleId);

    if (spanUserRole) {
        switch (spanUserRole.innerText) {
            case "USER":
                divHeader.className += " color-user-panel";
                break;
            case "SOCIAL_WORKER":
                divHeader.className += " color-social-worker-panel";
                break;
            case "RESPONSIBLE":
                divHeader.className += " color-responsible-panel";
                break;
            case "ADMIN":
                divHeader.className += " color-admin-panel";
                break;
            case "DEPUTY":
                divHeader.className += " color-deputy-panel";
                break;
        }
    } else {
        divHeader.className = " bg-secondary";
    }

    divFooter.className = divHeader.className;
}

function checkUserOnLogout() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL_CHECK_USER_ON_LOGOUT, false);
    xhr.send();

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
        return null;
    } else {
        if (xhr.responseText === "false") {
            setTimeout(function () {
                checkUserOnLogout();
            }, 1000);
        } else if (xhr.responseText === "true") {
            const divHeader = document.getElementById(divHeaderId);

            const formLogout = document.createElement("form");
            formLogout.action = "/logout";
            formLogout.method = "post";
            formLogout.style.display = "none";
            divHeader.append(formLogout);

            const btnLogout = document.createElement("button");
            btnLogout.type = "submit";
            btnLogout.style.display = "none";
            formLogout.append(btnLogout);

            btnLogout.click();
        }
    }
}

