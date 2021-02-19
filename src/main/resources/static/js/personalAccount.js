function imgLoad(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img-display').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function openMenuLoadImg() {
    var imgLoad = document.getElementsByName("img")[0];
    imgLoad.click();
}

function isNoDuplicate() {
    var newValue = document.querySelector('.form-update').querySelectorAll('.form-control');
    var oldValue = document.querySelector('.form-update').querySelectorAll('.old-form-control');
    var updateButton = document.getElementById("updateButton");

    for (var i = 0; i < oldValue.length; i++) {
        if (newValue[i].value !== oldValue[i].value) {
            updateButton.disabled = false;
            return;
        }
    }
    updateButton.disabled = true;
}

function selectFirstPoint() {
    var btnBasicData = document.getElementById("btn-basic-data");
    btnBasicData.style.backgroundColor = "#f1f1f1";
    btnBasicData.style.color = "#007bff";

    var divPass = document.getElementById("div-data-pass");
    var divProblems = document.getElementById("div-list-problems");
    divPass.style.display = "none";
    divProblems.style.display = "none";

    var point = document.getElementsByName("point")[0];
    point.value = "basicData";
}

function selectPoint(btnFirst) {
    var btnSecond, btnThird, divFirst, divSecond, divThird;
    var updateButton = document.getElementById("updateButton");
    var point = document.getElementsByName("point")[0];
    if (btnFirst.id === "btn-basic-data") {
        btnSecond = document.getElementById("btn-pass");
        btnThird = document.getElementById("btn-active-problems");
        divFirst = document.getElementById("div-data-basic");
        divSecond = document.getElementById("div-data-pass");
        divThird = document.getElementById("div-list-problems");
        updateButton.style.display = "block";
        isNoDuplicate();
        point.value = "basicData";

    } else if (btnFirst.id === "btn-pass") {
        btnSecond = document.getElementById("btn-basic-data");
        btnThird = document.getElementById("btn-active-problems");
        divFirst = document.getElementById("div-data-pass");
        divSecond = document.getElementById("div-data-basic");
        divThird = document.getElementById("div-list-problems");
        updateButton.style.display = "block";
        updateButton.disabled = false;
        point.value = "pass";
    } else {
        btnSecond = document.getElementById("btn-pass");
        btnThird = document.getElementById("btn-basic-data");
        divFirst = document.getElementById("div-list-problems");
        divSecond = document.getElementById("div-data-basic");
        divThird = document.getElementById("div-data-pass");
        updateButton.style.display = "none";
        point.value = "";
    }

    btnFirst.style.backgroundColor = "#f1f1f1";
    btnFirst.style.color = "#007bff";
    btnSecond.style.backgroundColor = "";
    btnSecond.style.color = "";
    btnThird.style.backgroundColor = "";
    btnThird.style.color = "";

    divFirst.style.display = "block";
    divSecond.style.display = "none";
    divThird.style.display = "none";
}

function isNoEmptyPersAcc() {
    var divFirst = document.getElementById("div-data-basic");
    var divSecond = document.getElementById("div-data-pass");
    var formElements = document.querySelector('.form-update').querySelectorAll('.form-control');
    if (divFirst.style.display === "block") {
        for (var i = 0; i < 5; i++) {
            if (!formElements[i].value) {
                setInvalidFormat(formElements[i], "Заполните обязательное поле");
            }
        }

        for (var i = 0; i < 5; i++) {
            if (!formElements[i].checkValidity()) {
                return false;
            }
        }
        return true;
    } else if (divSecond.style.display === "block") {
        for (var i = 5; i < formElements.length; i++) {
            if (!formElements[i].value) {
                setInvalidFormat(formElements[i], "Заполните обязательное поле");
            }
        }

        for (var i = 5; i < formElements.length; i++) {
            if (!formElements[i].checkValidity()) {
                return false;
            }
        }
        return true;
    }
}

function infoMsg() {
    var email = document.getElementsByName("email")[0];
    var oldEmail = document.getElementsByName("oldEmail")[0];
    var msgErr = document.getElementById("msg-err");
    var msgInfo = document.getElementById("msg-info");


    if (email.value !== oldEmail.value) {
        msgErr.textContent = "";
        msgInfo.style.display = "block";
    } else {
        msgInfo.style.display = "none";
    }
}