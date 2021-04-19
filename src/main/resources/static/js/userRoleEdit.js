const selectIdRoles = "select-roles";
const selectIdRegions = "select-regions";
const selectMunicipalitiesId = "select-municipalities";
const inputAppointmentId = "input-appointment";
const btnChangeId = "btn-change";

let roles = [];
let regions = [];
let rolesNames = [];
let municipalities = [];
let targetUserId;
let targetUserRole;
let targetUserRegionId;
let targetUserMunicipalityId = "";
let targetUserAppointment;

function loadFormUserRoleEdit() {
    roles = getAllObjectsFromRequest(URL_GET_ALL_ROLES);
    regions = getAllObjectsFromRequest(URL_GET_ALL_REGIONS);
    municipalities = getAllObjectsFromRequest(URL_GET_MUNICIPALITIES);

    for (let i = 0; i < roles.length; i++) {
        rolesNames[i] = getRoleName(roles[i]);
    }

    let elem = document.getElementById("input-user-id");
    targetUserId = elem.value;
    elem.remove();

    elem = document.getElementById("input-cur-role-name");
    targetUserRole = elem.value;
    elem.remove();

    elem = document.getElementById("input-appointment");
    targetUserAppointment = elem.value;
    elem.remove();

    elem = document.getElementById("input-municipality");
    if (elem) {
        targetUserMunicipalityId = elem.value;
        elem.remove();
    }

    elem = document.getElementById("input-region-id");
    if (elem) {
        targetUserRegionId = elem.value;
        elem.remove();
    }

    addBegData();

    elem = document.getElementById(selectIdRegions);
    if (elem) {
        targetUserRegionId = elem.value;
    }

    const form = document.getElementById("form-user-role-edit");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (isRoleChecked()) {
            e.target.submit();
        }
    });
}

function addBegData() {
    addRolesSelect();
    roleChecked(document.getElementById(selectIdRoles), true);
}

function addRolesSelect() {
    const targetElement = document.getElementById("input-phone-number");

    const selectRoles = document.createElement("select");
    selectRoles.id = selectIdRoles;
    selectRoles.name = "role";
    selectRoles.className = "form-control mb-2";
    selectRoles.addEventListener("change", roleChecked.bind(null, selectRoles, false));
    selectRoles.addEventListener("change", isNoDuplicate);
    targetElement.after(selectRoles);

    const selectRolesTitle = document.createElement("option");
    selectRolesTitle.value = "";
    selectRolesTitle.textContent = "Роль";
    selectRolesTitle.disabled = true;
    selectRoles.appendChild(selectRolesTitle);

    for (let i = 0; i < roles.length; i++) {
        const optionRole = document.createElement("option");
        optionRole.value = roles[i];
        optionRole.textContent = rolesNames[i];
        selectRoles.appendChild(optionRole);

        if (optionRole.value === targetUserRole) {
            optionRole.selected = true;
        }
    }
}

function roleChecked(selectRoles, isFirstLoad) {
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
        const selectRegion = document.createElement("select");
        selectRegion.className = "form-control mb-2";
        selectRegion.id = selectIdRegions;
        selectRegion.name = "region.id";
        selectRegion.addEventListener("change", function () {
            setValidFormat(selectRegion);
        });
        selectRegion.addEventListener("change", isNoDuplicate);
        selectRoles.after(selectRegion);

        const selectTitle = document.createElement("option");
        selectTitle.value = "";
        selectTitle.textContent = selectRoles.value !== "RESPONSIBLE" ? "Регион | Региональный ответственный" :
            "Регион";
        selectTitle.selected = true;
        selectTitle.disabled = true;
        selectRegion.appendChild(selectTitle);

        for (let i = 0; i < regions.length; i++) {
            const regionName = document.createElement("option");

            if (selectRoles.value !== "RESPONSIBLE") {
                if (regions[i].id.toString() === targetUserRegionId && isFirstLoad) {
                    selectTitle.selected = false;
                    regionName.selected = true;
                }
                regionName.textContent = regions[i].responsible ? regions[i].regionName + " | " +
                    regions[i].responsible.lastname + " " +
                    regions[i].responsible.firstname + " " +
                    regions[i].responsible.middlename :
                    regions[i].regionName + " | Не назначен";
            } else {
                if (regions[i].responsible) {
                    if (regions[i].responsible.id.toString() === targetUserId && isFirstLoad) {
                        selectTitle.selected = false;
                        regionName.selected = true;
                    } else if (regions[i].responsible.id.toString() !== targetUserId) {
                        continue;
                    }
                }
                regionName.textContent = regions[i].regionName;
            }

            regionName.value = regions[i].id;
            selectRegion.appendChild(regionName);
        }

        if (selectRoles.value !== "SOCIAL_WORKER") {
            const inputAppointment = document.createElement("input");
            inputAppointment.type = "text";
            inputAppointment.id = inputAppointmentId;
            inputAppointment.className = "form-control mb-2";
            inputAppointment.placeholder = "Должность";
            inputAppointment.name = "appointment";
            inputAppointment.value = isFirstLoad ? targetUserAppointment : "";
            inputAppointment.oninput = isNoDuplicate;
            selectRegion.after(inputAppointment);

            const selectMunicipalities = document.createElement("select");
            selectMunicipalities.className = "form-control mb-2";
            selectMunicipalities.id = selectMunicipalitiesId;
            selectMunicipalities.name = "municipality.id";
            selectMunicipalities.onchange = isNoDuplicate;
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

                if (selectEl.value === targetUserMunicipalityId && isFirstLoad) {
                    selectTitle.selected = false;
                    selectEl.selected = true;
                }
            }
        }
    }
}

function isNoDuplicate() {
    const selectRoles = document.getElementById(selectIdRoles);
    const selectRegion = document.getElementById(selectIdRegions);
    const inputAppointment = document.getElementById(inputAppointmentId);
    const selectMunicipalities = document.getElementById(selectMunicipalitiesId);

    const btn = document.getElementById(btnChangeId);
    if (selectRoles.value === "USER") {
        btn.disabled = selectRoles.value === targetUserRole;
    } else if (selectRoles.value === "SOCIAL_WORKER") {
        btn.disabled = selectRoles.value === targetUserRole && selectRegion.value === targetUserRegionId;
    } else {
        btn.disabled = selectRoles.value === targetUserRole && selectRegion.value === targetUserRegionId &&
            inputAppointment.value === targetUserAppointment && selectMunicipalities.value === targetUserMunicipalityId;
    }
}