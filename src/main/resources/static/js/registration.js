function isUserAgreement() {
    var userAgreement = document.getElementById("userAgreement");
    var registrationButton = document.getElementById("registrationButton");

    registrationButton.disabled = !userAgreement.checked;
}