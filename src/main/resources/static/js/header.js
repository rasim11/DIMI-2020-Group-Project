function showLoginMenu() {
    const loginMenu = document.getElementById("form-login-menu");
    loginMenu.style.display = loginMenu.style.display === "block" ? "none" : "block";

    let body = document.querySelector("body");
    if (typeof body.onmouseup !== "function"){
        body.onmouseup = hideLoginMenu.bind(body.onmouseup);
    }
}

function hideLoginMenu(e){
    const div = $("#form-login-menu");
    const mainDiv = $("#div-hidden-login-menu");
    if (!mainDiv.is(e.target)
        && mainDiv.has(e.target).length === 0) {
        div.hide();
    }
}