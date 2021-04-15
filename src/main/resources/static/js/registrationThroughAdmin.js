const selectIdRegions = "select-regions";
const spanIdErrMsg = "err-msg";
let regions = [];

function loadFormRegistrationThroughAdmin() {
    regions = getAllObjectsFromRequest(URL_GET_ALL_REGIONS);

    const form = document.getElementById("form-reg");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (isValid(form)) {
            e.target.submit();
        }
    });
}

function isValid(form) {
    return (isNoEmpty(form, "input-ctrl") & isRoleChecked()) && isEmailFree();
}

function roleChecked(selectRoles) {
    setValidFormat(selectRoles);

    const selectRegion = document.getElementById(selectIdRegions);
    if (selectRegion) {
        selectRegion.remove();
    }

    if (selectRoles.value !== "USER") {
        const selectRegion = document.createElement("select");
        selectRegion.className = "form-control mb-2";
        selectRegion.id = selectIdRegions;
        selectRegion.name = "region.id";
        selectRegion.addEventListener("change", function () {
            setValidFormat(selectRegion);
        });
        selectRoles.after(selectRegion);

        const selectTitle = document.createElement("option");
        selectTitle.value = "";
        selectTitle.textContent = selectRoles.value === "SOCIAL_WORKER" ? "Регион | Региональный ответственный" : "Регион";
        selectTitle.disabled = true;
        selectTitle.selected = true;
        selectRegion.appendChild(selectTitle);

        for (let i = 0; i < regions.length; i++) {
            if (selectRoles.value === "RESPONSIBLE" && regions[i].responsible) {
                continue;
            }

            const regionName = document.createElement("option");

            if (["SOCIAL_WORKER","DEPUTY"].includes(selectRoles.value)) {
                regionName.textContent = regions[i].responsible ? regions[i].regionName + " | " +
                    regions[i].responsible.lastname + " " +
                    regions[i].responsible.firstname + " " +
                    regions[i].responsible.middlename :
                    regions[i].regionName + " | Не назначен";
            } else {
                regionName.textContent = regions[i].regionName;
            }

            regionName.value = regions[i].id;
            selectRegion.appendChild(regionName);
        }
    }
}

function isEmailFree() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", URL_CHECK_EMAIL_FREE, false);
    xhr.send(document.querySelectorAll('.form-control')[3].value);

    if (xhr.status !== 200) {
        return false;
    } else {
        if (xhr.responseText === "true") {
            return true;

        } else {
            addErrMsg();
            return false;
        }
    }
}

function addErrMsg() {
    const errMsg = document.getElementById(spanIdErrMsg);

    if (!errMsg) {
        const targetElem = document.querySelectorAll('.form-control')[3];

        const spanErrMsg = document.createElement("span");
        spanErrMsg.textContent = "Пользователь с такой электронной почтой уже существует";
        spanErrMsg.style.color = "red";
        spanErrMsg.style.float = "left";
        spanErrMsg.id = spanIdErrMsg;
        targetElem.before(spanErrMsg);
    }
}