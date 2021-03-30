// function resetChecked() {
//     var inProgress = document.getElementById("inProgress");
//     var solved = document.getElementById("solved");
//     var resolved = document.getElementById("resolved");
//     var canceled = document.getElementById("canceled");
//     var textStatus = document.getElementById("textStatus");
//     var btnReset = document.getElementById("btnReset");
//
//     inProgress.checked = false;
//     solved.checked = false;
//     resolved.checked = false;
//     canceled.checked = false;
//     textStatus.className = "";
//     btnReset.style.display = "none";
// }
//
// function atLeastOneChecked() {
//     var inProgress = document.getElementById("inProgress");
//     var solved = document.getElementById("solved");
//     var resolved = document.getElementById("resolved");
//     var canceled = document.getElementById("canceled");
//     var textStatus = document.getElementById("textStatus");
//     var btnReset = document.getElementById("btnReset");
//
//
//     if (inProgress.checked || solved.checked || resolved.checked || canceled.checked) {
//         textStatus.className = "text-primary";
//         btnReset.style.display = "inline";
//     } else {
//         textStatus.className = "";
//         btnReset.style.display = "none";
//     }
// }
//
// function setWidth() {
//     var mainCont = document.getElementById("mainCont");
//     var sidebarMenu = document.getElementById("sidebarMenu");
//     var mainTable = document.getElementById("mainTable");
//
//     mainTable.style.width = parseFloat(window.getComputedStyle(mainCont, null).width) -
//         parseFloat(window.getComputedStyle(sidebarMenu, null).width) - parseFloat(mainTable.style.marginLeft) +
//         "px";
// }

function setFilterParam() {
    document.getElementById("ch0").checked = document.getElementById("checkbox0").checked;
    document.getElementById("ch1").checked = document.getElementById("checkbox1").checked;
    document.getElementById("ch2").checked = document.getElementById("checkbox2").checked;
    document.getElementById("ch3").checked = document.getElementById("checkbox3").checked;
    document.getElementById("da1").value = document.getElementById("date1").value
    document.getElementById("da2").value = document.getElementById("date2").value
}

function resetChecked() {
    document.getElementById("checkbox0").checked = false;
    document.getElementById("checkbox1").checked = false;
    document.getElementById("checkbox2").checked = false;
    document.getElementById("checkbox3").checked = false;
    document.getElementById("date1").value = "";
    document.getElementById("date2").value = "";
}