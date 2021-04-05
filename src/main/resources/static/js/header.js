const formLoginMenuId = "form-login-menu";
const divHiddenLoginMenuId = "div-hidden-login-menu";
const divHiddenProblemsMenuId = "div-hidden-problems-menu";
const divProblemsMenuId = "div-problems-menu";

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