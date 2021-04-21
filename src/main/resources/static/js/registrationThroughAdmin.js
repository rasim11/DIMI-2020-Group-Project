const selectIdRegions = "select-regions";
const selectMunicipalitiesId = "select-municipalities";
const inputAppointmentId = "input-appointment";
const spanIdErrMsg = "err-msg";
let regions = [];
let municipalities = [];

function loadFormRegistrationThroughAdmin() {
    regions = getAllObjectsFromRequest(URL_GET_ALL_REGIONS);
    municipalities = getAllObjectsFromRequest(URL_GET_MUNICIPALITIES);

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

    const inputAppointment = document.getElementById(inputAppointmentId);
    if (inputAppointment) {
        inputAppointment.remove();
    }

    const selectMunicipalities = document.getElementById(selectMunicipalitiesId);
    if (selectMunicipalities) {
        selectMunicipalities.remove();
    }

    if (selectRoles.value !== "USER") {
        let selectRegion;
        if (selectRoles.length > 3) {
            selectRegion = document.createElement("select");
            selectRegion.className = "form-control mb-2";
            selectRegion.id = selectIdRegions;
            selectRegion.name = "region.id";
            selectRegion.addEventListener("change", function () {
                setValidFormat(selectRegion);
            });
            selectRoles.after(selectRegion);

            const selectTitle = document.createElement("option");
            selectTitle.value = "";
            selectTitle.textContent = selectRoles.value !== "RESPONSIBLE" ? "Регион | Региональный ответственный" :
                "Регион";
            selectTitle.disabled = true;
            selectTitle.selected = true;
            selectRegion.appendChild(selectTitle);

            for (let i = 0; i < regions.length; i++) {
                if (selectRoles.value === "RESPONSIBLE" && regions[i].responsible) {
                    continue;
                }

                const regionName = document.createElement("option");

                if (selectRoles.value !== "RESPONSIBLE") {
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

        if (selectRoles.value !== "SOCIAL_WORKER") {
            const inputAppointment = document.createElement("input");
            inputAppointment.type = "text";
            inputAppointment.id = inputAppointmentId;
            inputAppointment.className = "form-control mb-2";
            inputAppointment.placeholder = "Должность";
            inputAppointment.name = "appointment";
            if (selectRoles.length > 3) {
                selectRegion.after(inputAppointment);
            } else {
                selectRoles.after(inputAppointment);
            }

            const selectMunicipalities = document.createElement("select");
            selectMunicipalities.className = "form-control mb-2";
            selectMunicipalities.id = selectMunicipalitiesId;
            selectMunicipalities.name = "municipality.id";
            inputAppointment.after(selectMunicipalities);

            const selectTitle = document.createElement("option");
            selectTitle.value = "";
            selectTitle.textContent = "Муниципалитет";
            selectTitle.disabled = true;
            selectTitle.selected = true;
            selectMunicipalities.append(selectTitle);

            for (let i = 0; i < municipalities.length; i++) {
                const selectEl = document.createElement("option");
                selectEl.value = municipalities[i].id;
                selectEl.textContent = municipalities[i].name;
                selectMunicipalities.append(selectEl);
            }
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