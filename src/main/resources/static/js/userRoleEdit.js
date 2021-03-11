const selectIdRoles = "select-roles";
const selectIdRegions = "select-regions";

let roles = [];
let regions = [];
let targetUserId;
let targetUserRoleName;
let targetUserRegionId;

function loadFormUserRoleEdit() {
    roles = getAllObjectsFromRequest(URL_GET_ALL_ROLES);
    regions = getAllObjectsFromRequest(URL_GET_ALL_REGIONS);

    let elem = document.getElementById("input-user-id");
    targetUserId = elem.value;
    elem.remove();

    elem = document.getElementById("input-cur-role-name");
    targetUserRoleName = elem.value;
    elem.remove();

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
    const targetElement = document.getElementById("p-phone-number");

    const selectRoles = document.createElement("select");
    selectRoles.id = selectIdRoles;
    selectRoles.name = "role.name";
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
        optionRole.value = roles[i].name;
        optionRole.textContent = optionRole.value;
        selectRoles.appendChild(optionRole);

        if (optionRole.value === targetUserRoleName) {
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

    if (selectRoles.value !== "Пользователь") {
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
        selectTitle.textContent = selectRoles.value === "Соц. работник" ? "Регион | Ответственный" : "Регион";
        selectTitle.selected = true;
        selectTitle.disabled = true;
        selectRegion.appendChild(selectTitle);

        for (let i = 0; i < regions.length; i++) {
            const regionName = document.createElement("option");

            if (selectRoles.value === "Соц. работник") {
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
    }
}

function isNoDuplicate() {
    const selectRoles = document.getElementById(selectIdRoles);
    const selectRegion = document.getElementById(selectIdRegions);

    if (!selectRegion) {
        if (selectRoles.value === targetUserRoleName) {
            setBtnActionsStates(true);
        } else {
            setBtnActionsStates(false);
        }
    } else {
        if (selectRoles.value === targetUserRoleName && selectRegion.value === targetUserRegionId) {
            setBtnActionsStates(true);
        } else {
            setBtnActionsStates(false);
        }
    }
}

function resetBtn() {
    const selectRoles = document.getElementById(selectIdRoles);
    const selectRegion = document.getElementById(selectIdRegions);

    if (selectRegion) {
        selectRegion.remove();
    }
    selectRoles.remove();

    addBegData();
    setBtnActionsStates(true);
}

function setBtnActionsStates(val) {
    const divBtnActions = document.getElementById("div-btn-actions").querySelectorAll("button");
    for (let i = 0; i < divBtnActions.length; i++) {
        divBtnActions[i].disabled = val;
    }
}