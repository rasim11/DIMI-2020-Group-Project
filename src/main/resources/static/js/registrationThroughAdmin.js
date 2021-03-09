const selectIdRegion = "select-region";


function isValid(form) {
    if (isNoEmpty(form, "input-ctrl")) {
        return isRoleChecked();
    } else {
        isRoleChecked();
        return false;
    }
}

function isRoleChecked() {
    const selectRoles = document.getElementById("select-roles");

    if (!selectRoles.value) {
        return false;
    }

    return true;
}

function roleChecked(selectRoles){
    if (selectRoles.value === "1"){
        const selectRegion = document.getElementById(selectIdRegion);
        if (selectRegion){
            selectRegion.remove();
        }
    } else {
        if(document.getElementById(selectIdRegion))
        {
            return;
        }

        const selectRegion = document.createElement("select");
        selectRegion.className = "form-control mb-2";
        selectRegion.id = selectIdRegion;
        selectRoles.after(selectRegion);

        const selectTitle = document.createElement("option");
        selectTitle.value = "";
        selectTitle.textContent = "Регион";
        selectTitle.disabled = true;
        selectTitle.selected = true;
        selectRegion.appendChild(selectTitle);
    }
}