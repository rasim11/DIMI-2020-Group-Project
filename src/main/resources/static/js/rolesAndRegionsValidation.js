function isRoleChecked() {
    const selectRoles = document.getElementById("select-roles");

    if (!selectRoles.value) {
        setInvalidFormat(selectRoles, "Роль не выбрана");
        return false;
    }

    if (selectRoles.value !== "Пользователь") {
        const selectRegion = document.getElementById(selectIdRegions);
        if (!selectRegion.value) {
            setInvalidFormat(selectRegion, "Регион не выбран");
            return false;
        }
    }

    return true;
}