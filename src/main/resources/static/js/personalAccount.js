const URL_GET_CUR_USER = SERVER + API + VERSION + USER_MANAGEMENT + CUR_USER_GET;
const URL_PUT_USER = SERVER + API + VERSION + USER_MANAGEMENT + USER_PUT;
const URL_DELETE_USER = SERVER + API + VERSION + USER_MANAGEMENT + USER_DELETE;
const URL_PERSONAL_ACCOUNT = API + VERSION + PERSONAL_ACCOUNT;

const defaultAvatar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUwAAAFMCAYAAACgboVfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTnU1rJkAAAXjUlEQVR4Xu3deYxe1XnHcZaSUBoKjdKq7R9RQysVVV1CRJOWKlUqVfzRRakSRVU8nhl77PHCADHeWG2Dd3uMiw2VAoRAFCCACQFDTExCisCsAUMCxmBTDF5mbCpVEQGakgT3vOZxx5z5zfhdzr33nHO/P+kjJTP3vcs5z/Ngz4znPYaQorL/wBunO5c4m519zsGCDDmNazSudbpdnhBC4okbTtc6bzlqiMWoca+32O0TQkjYuAFzmrPNBk7Odjmn2WMTQsj4cQPjbOdNGyA48Ma7zj/b8hBC6hw3DO45YjigOQ/Y8hFCco5r9g1e86Nzj9nyEkJSjmvmT3nNjeJ92pafEBJ7XMOu8RoY1fmqbQshJJa4xnzca1TEZ6ttFyGk7LgGXOk1JNLBz4ISUnRco53lNR7S93e2vYSQEHFNdcBrMuTnTdtuQkircQ10ptdQqI8vWhkQQsaLa5Zhr3lQXz+zsiCEHBnRLMCRjrdSIaSecU1wotcUwNGcauVDSD3iiv4krwmAVp1i5URInnFFfoZX9ECn/tbKi5A84or6Y16RA6F90sqNkHQjChso0oes9AhJJ6KQgdJYGRISd1yxvu0XL1CRX1hZEhJXXHHe5BUrEIu7rUwJqT6iQIEYnWglS0j5EQUJRM/Kl5By4opujl+EQGIGrZwJKS6i8IBkWVkTEjauuLb4xQZkYq+VOSGdRxQYkKNjreQJaT2ugNZ5BQXk7i4rf0Kajyuc97xCAmrD2oCQ8eOK5eN+8QA1xS/0IGPHFcg7XsEAtWftQchIVKEAeJ+1Cal7XDF81C8OANKfWNuQOsYVwJBXEADG95a1D6lTRCEAaJK1EalDVAEAaI21E8k1bpM/7G86gI78jrUXySluY1d5Gw0gjDuszUgOcRu629tgAGH91NqNpByxsQAKYm1HUozaUADFsvYjKUVtJIByWBuSFKI2EEC5rB1JzFEbh/Jt3frswa6JPQe/PGFiEI1zPfTQQ/JaiJe1JYktbnP4GcsKff3rN8pBV6TFi5ccHN5/QN4PonKytSmJIW5DTvA2CCW46qr1cpBV5emnn5H3iSicYu1Kqo7YHBRIDavY7NixU947KnWStSypIm4D+JNlSfYNDcvBlIKh4f3ymVCJ37T2JWXGLTxfsyyJGkIpevDBH8rnQ+n4mmbZEZuAwGaeMyAHT+oWLbpCPi/KY21MyojaAISzd9+QHDS5mTZthnx+lMPamRQZtfAIp7u7Vw6XnN1zz0a5FiietTUpImrBEY4aJnWi1gTFs/YmIaMWGmFs3HivHCB1dPvtd8g1QrGszUmIqAVGGL29fXJw1J1aKxTL2p10EreQ/PLfgqhBgRFqzVCod63tSTtxC8jbShREDQiMptYOhdpk7U9aiVs4fjC9IGowYGxqDVGoP7QxQJqNWER06MUXt8uBgKNT64lCHWujgBwtYvHQoc2bvy8HAZrT388PuZfNxgEZL2rh0Jlrrv53OQTQmt179sr1RXFsLBAVt0BD/oKhM0uXLpfNj/aoNUah3rHxQI6MW5iPeguFDs2dPVc2Pdq3fPlKudYo1J/ZmCCHIxYJHejvny4bHp1T641i2ZggjagFQvsGBs6XjY4wnnzyR3LdUSwbF/WOW4h3/IVB+2bPmi2bHMVQe4Di2NioZ9wCfNxfELTv1lu/JZsaxdv+0styTxDcWTY+6hexGGjT9u0vyUZGeQYGzpN7g7BsfNQr7sHf8xcC7VMNjGqo/UFYNkbqEffA6/wFQPtU06Jaap8QVH1+SYd4eLRJNSuqN8FR+4WgjreRkm/EQ6NNj255VDYr4tB4fyS1bwjHxkqecQ+4xX9gtE81KeLSNbFH7h2CedvGS34RD4s2qeZEnNYMXin3EGHYeMkr6kHRnq1bn5ONiXg13utd7SXCsDGTR9wDzfEfEO1TDYn4qb1EMDfauEk/4uHQpmX8urakqT1FGDZu0o56MLRPNSHSsW+Iv5oXycZOulEPhfZM7psqmxBpUXuLYH7LRk96EQ+DDqjmQ3pWr14j9xdh2PhJK+7Gb/IfBO1bdPli2XxIk9pjBLPFxlA6EQ+BDqimQ7r4zUbFsjGURtwNv+0/ANr32GOPy6ZD2tReIxwbR/FH3Tzap5oN6evq6pb7jWCOtZEUb8RNo0Oq2ZAHtd8Ix8ZSvFE3jfatXjUoGw15mDZthtx3BHOyjab4Im4WHVJNhryofUc4Np7iiruxj/k3is6pBkNeNm9+QO49gvlHG1PxRNwkOnTrLbfKBkN+1P4jHBtTccTd0F/4N4jOqcZCntT+I6h/snFVfcTNIQDVWMjTzJkDsgYQjo2rauNu5CT/xhCGaizkS9UAgjrNxlZ1ETeFAO666zuyqZCvoaFhWQsIx8ZWNXE3cKJ/Qwijp2eSbCrkq6d3sqwFBPUHNr7Kj7gZBKIaCvlTtYCwbHyVH3UzCEM1E/KnagHBfchGWHkRN4GAVDMhf/fde5+sB4RlY6y8qJtAOKqZUA+qHhCWjbFy4i447N8Awnn++RdkI6EeVE0gPBtnxUddHOE88P0fyEZCPaiaQHg2zoqNu9CZ/oUR1hW8f0+t7dm7T9YFgrvYxlpxERdFYI33e1GNhHpYtXpQ1gXCs7FWXNRFEZZqItSLqguEZ2OtmLgLHPAviPBUA6FeVF2gEL+w8RY+4mIogGog1IuqCxTDxlvYuBOf5V8IxVANhHpRdYHCfNnGXLiIi6AgqoFQL6ouUBwbc+GiLoJi8F1yqLpAcWzMhYk74Ur/AigOP4cJVRco1PM27jqPODkKxL/0wcsv75C1geLYuOs86uQoznPP/Vg2Eerj6We2ytpAcWzcdRZ3osf9E6N4qolQHwzMSuyysdd+xElRAtVEqA8GZjVs7LUfdVIUTzUR6oOvYVbDxl57cSdY458Q5VBNhPpQNYFSfNfGX+sRJ0NJVBOhPlRNoBw2/lqPOhnKcd11X5ONhHpQNYFy2PhrLe6Fn/JPhHKpRkI9qHpAaf7FxmDzESdByVQjoR5UPaA8NgabjzoJyqUaCfWg6gHlsTHYfNRJUK6Z5wzIZkLe5s2bL+sBpbJJ2ETcwRu8F6MiqqGQt8bbLKtaQKman5jixaiIaijkTdUBymfj8OhRL0Y1VEMhb6oOUD4bh0ePejGqsWPHTtlUyNPEiT2yDlA+G4fjxx14j/9CVEs1FvK085VXZA2gEs/aWBw74kWomGos5EntP6pjY3HsqBeheqq5kB+196iOjcWxo16E6qnmQl62vbhd7j2qY2NRxx1wtv8CxGH16jWyyZAPte+o3ICNx9Fxn3zTOxgRUU2GPHTx3fFo2XgcHXUw4jGhq1s2G9Kn9htxsPE4OupgVGvNmisPNdTcufP5mcyM3fntuw79KbPxv/laZlxsPI6OOhjV8ZsK9dE7qU/WBMpn4/GDcZ84zT8Q1VFNhHrp758uawOlO8vG5EjcB7d5B6Ei06fPlA2E+lH1gfLZmByJOgjVUI2Derr88sWyRlAuG5MjUQehGqpxUE+9vZNljaBcNiZHog5CNVTjoJ7mzJ0nawTlsjE5EnUQqjFBNA7qSdUHymdjciTqIFTjtddel82D+lH1gUr8ro3KQ8PyWu+TqJhqHtSPqg1UYreNy0MD8y3vk6iYah7Uy569+2RtoBLv2rjkr+MxmjGTt9itO1UXqI6NSwZmjG666RuyiVAfqi5QHRuXDMwYPfP0M7KJUB+qLlAdG5cMzFipJkJ9qJpAdWxcMjBjpZoI9aFqAtWxccnAjJVqItSHqglU5/CwPN3/BOKgmgj1oWoClfpCY2Be4n0QkVBNhPpQNYFKfasxMDd7H0QkVBOhPlRNoFI/bgzMfd4HEQnVRKiHibyLZJT4hk/EVCOhHjbee5+sCVSLgRkx1Uiohz179sqaQLUYmBGbPWeubCbkT9UDqsfAjJxqJuRP1QKqx8CMnGom5G3TdzfJWkD1GJiRe333HtlUyJeqA8SBgZkA1VTI076hYVkDiAMDMxGquZAftfeIBwMzERs23CkbDPlQ+464MDATopoMeXhh24tyzxEXBmZiVLMhbT09k+VeIz4MzMQ8suVR2XRIl9pnxImBmSDVdEiT2l/Ei4GZKNV8SAu/kSg9DMxEPfnkU7IJkQ61r4gbAzNhqgmRhhf5rniSGJiJU82I+Km9RPwYmImbMqVfNiTipfYRaWBgZkA1JeI0oatb7iHSwMDMwA033CibE/FR+4d0MDAzoZoTcbmX9+lJHgMzI6pJEQ+1Z0hLY2AO+R9Emm7+5s2yUVE9tV9IT2NgbvY/iHR97fobPtCoXRN7PvD/UayLL7501MfUPiFJLzQG5iXeB5GZtVeuHdXEKIZaf2TjtsbAPN37IDKkmhthNf40r9Ye2fjCMY2ITyAzqsERllp35OPQsGxEfRJ5WX/VetnkCEetO/Jh45KBWQeNdyNUTY5w1LojHzYuGZh1oZocYfD1y/zZuGRg1oVqdIQxd96Fcs2RDxuXDMy6UI2OMO7fdL9cc+TDxuWhgfmW/0nkRzU6wlDrjay8a+Py0MC8xfskMqQaHWGo9UZWhm1cvh9xADKjGh1hqPVGVj5ho/L9iAOQmZkzB2Szo3NqvZEPG5MjUQchL9++627Z7OicWm/kw8bkSNRByMvefUOy2dE5td7Ih43JkaiDkB/V7OicWmvkw8bkSNwHd/kHIT+q2dGZbbzHePZsTI7EffA0/yDk57zzviKbHu1T64ysnG1j8oMRByJDqunRPrXGyIeNx9FRByM/qunRnhXLV8o1Rj5sPI6OOhj56Z3UJ5sfrVPri7zYeBwd98n/9Q9GnlTzo3VqbZEXG4+j4z75D/7ByJNqfrTmgtlz5NoiK3NsPOqIFyBDagCgNWpdkRcbi2NHvQj5WXLFEjkE0Dy1rsiLjcWxo16E/OzY+YocAmieWlfkxcbi2HEHfc9/EfKkhgCap9YUWXnBxuL4ES9EhtQQQPPUmiIrx9lIHD/ihciQGgJoDu8SmT8bh0ePejHyowYBmtP44X+1psiHjcOjxx28yX8x8qMGAZozbfpMuabIxts2DpuLOAEyowYBmrNw4eVyTZENm4RNRpwAmVGDAM25/vob5JoiDzYGm486CfKiBgGa8x8P/lCuKfJgY7D5uBf9pX8S5EUNAjRHrSey0WtjsLWIEyEjahCgOWo9kQcbf61HnQz5UIMAzVHriTzY+Gs97sVf9U+GfKhBgOao9UQWHrLx117ECZEJNQjQHLWeSJ+NvfajToo8qEGA5qj1RPps7LUfd5In/JMiD2oQoDlqPZG83Tb2Oos4MTKgBgGaw89h5sfGXedRJ0f61CBAc/inkfmxcdd53Mmu80+O9KlBgOb09E6Wa4pkhfnr+OGICyBxahCgeWpNkSYbc+GiLoJ0bdu2XQ4BNE+tK9JkYy5c3Ek/518E6VIDAK1R64okzbAxFzbiQkiUGgBozYXzL5Jri7TYeAsfd/L/9i+G9HznrrvlAEDr1PoiLTbeiom6INKiGh/t4c3QknesjbZiIi6IRAwN75dNj86p9Ub8bKwVF3eRv/cvivg988xW2egIR607ovZvNtaKjbgwIjZ33oWywRHevqFhuQeIj42z4uMu9jP/4oiTamoUa8kVS+ReIC42zsqJugHEY+vW52QzozxqXxAHG2PlRd0E4qCaF9W49trr5R6hWjbGyou76LH+TaBas2bNlk2L6r2+e6/cM1TiJBtj5UbcCCqwYMEi2aSID98Uqp6Nr/LjLn6ifzMoz+TJU2RTIn5btjwm9xSFO8PGVzURN4QCbdhwp2xApInfq1kuG1vVxd3Eb/g3hbDWDF4pmw156e6ZJPcfwZxpY6vaiBtDB37ykxdkQ6FevnL+rIN79vDNolBsXFUfdzNn+DeH5j366GMHJ3R1y6YBDluxYqWsHzSl28ZVHBE3iHHMnTtfNgXQrA133ClrC6PZmIon7qb+2L9JfBB/ikRRli9dLmsOh3zJxlRcETdaa6/uek0WN1Cka66+RtZjXdl4ijPqhutm0qQ+WchA2W686RuyRmvk9200xRlxw7VwzjnnyoIFYrHxnntl7ebMxlLcUTeeo4vmXyQLE4jd67v3yJrOzPE2kuKOu9GfezeejU33f08WIJAqVec5sHGURtQDpOrVV3fJQgNy0vglLqr+U2RjKJ24m77Df4jUTO2fLgsLyN3DD2+RPZGIp2wMpRXxINF74omnZAEBddV4t1HVK7Gy8ZNm1APFqLu7VxYLgPfddvsdsnci83s2etKMeKBo3HP3RlkYAMYW829VsrGTdtSDVYl/ogiE8fSPnpY9VgUbN+nHPcwi/+HKtuu11+WGA+jcBbNmy74r0W02bvKIeMBS3LvxPrnBAMJr/O1N9WHRbMzkFfWgRVmxfKXcUADlUH1ZBBsv+cU93Db/YUMbGDhPbh6AahT8zzDfsfGSZ8QDB7FgwUK5WQDisHPnK7J3O2FjJe+oB2/XunXr5eYAiFPAH4Q/wUZK3nEPeq334C17ecdOuRkA0qD6ugU/sHFSj7gHfs9bgKZdf931cgMApEX1dzNsjNQraiGOZssjj8qFB5Am1efjsfFRv7iH/yN/MY5GLTiAtKleH8PnbHzUM24B3vEWZExqoQGkT/W7YmOj3lEL4xvef0AuNIA8qL4/ko0L0ohaoCOpBQaQD9X3h9mYIIfjFuW3/UU6klpgAPlYsWKl7H3nszYmyJFxCzPkLdT/UwsMIC+i939u44GoiAU7eB+/cQioBb/3bSyQ8eIvWt+Ufrm4APJyZN/bOCDN5MiFUwsLID9H9P2xNgpIM3ELduLhxVMLCyA/27e/1Oj5T9oYIK3ELdxVDEygPh5++JHN1v6knbiBOawWFkBeJnR1v2dtTzqJWlwAebF2JyGiFhhAHqzNSciohQaQNmtvUkTUggNI0/p1Vx9nrU2Kilp4AGmxdiZlRG0AgDRYG5OysmjBolPURgCI28UXXfoJa2NSZi668OIPqw0BEKflS5d/2tqXVBW1MQDisnbN2s9Yy5Iq4/6k+SG1QQDiwJ8sI8vypcs+ojYKQLX4mmXEURsGoBrWliTmqI0DUC5rR5JC1AYCKAf/gifBqI0EUCxrP5Ji1IYCKIa1HUk53T2Tfqk2F0A41m4kh0ybNuM+tckAOtM3Zepr1mYkpyxbuuI0teEA2rP48iuWWnuRXKM2HkBr1q5Ze4K1FMk9qgAANMfaiNQpvb2T31HFAEDjnR1rnsVXLPmsKgwAH3TZpQv4eiV5P6pAALzP2oSQkahCAerO2oOQ0Vl42UL+ig44c+bMu9zagpDxowoIqAtrA0KaT3//dP51EGpl6tRpw1b+hLSe9euuPl4VFpCbwVWDJ1vZE9JZJk3qe0sVGZC6CV3dv7IyJyRsVMEBqXJ/g/o1K21CisnAwHnfVMUHpGLG9JnPWjkTUk5UIQKxc3+qtAompOS44jtVFSUQm8FVg39jZUtItentnbxFFSlQtb6+qa9bmRISVxq/zUUVLVAFK0tC4g0/u4mqrV2z9tetHAlJI25wfkQVM1CUwVWDf27lR0iaWbp4SZcqbiCU+fMuXGTlRkgemTVr9udVsQPtumDW7AutvAjJM8uWLPuMKn6gWUuXLPuilRMh9cjgqsG/Us0AjGX50mWft/IhpJ5pfEdTNQdwmBuUp1q5EEIORzUL6svKghAyXi67dMHNqoGQv9kXzHnEyoAQ0mq6Jvbwr4dqYP26q4+zLSeEdJqpU6f1qEZDuqZM6Z9t20sIKSrTps34qWpAxK+vb+r/2DYSQsrOxO7eIdWYiEd3d+8btl2EkFjS3z/9CdWwKJ/7W8AO2xZCSOxxDfuvqpFRnHMHzrvAlp8QkmpWr1jVeOfLX6omR/smdve+t3zpMltlQki26Z3U959qCGBs7j86u235CCF1zqRJU+aoIVFnk/umLrDlIYSQ8XPuueefrQZJjubOnT/RHpsQQsJl7Zq1f9o1sWf/hK7uX6nhE6PGvToHBlcN/rU9BiGExJGFly281A2oW6dOnbZfDbCQ3DX+yw3wOxvXtMsTEjjHHPN/BEaVPUQ6E5oAAAAASUVORK5CYII=";
const divIdMainContent = "div-main-content";
const divIdDataBasic = "div-data-basic";
const divIdAvatarMenu = "div-avatar-menu";
const divIdHiddenAvatarMenu = "div-hidden-avatar-menu";
const divIdDataPass = "div-data-pass";
const divIdDataProblems = "div-data-problems";
const divIdDialogWindow = "div-dialog-window";
const btnIdDataBasic = "btn-data-basic";
const btnIdDataPass = "btn-data-pass";
const btnIdDataProblems = "btn-data-problems";
const btnIdUpdate = "update-button";
const btnIdReset = "reset-button";
const btnIdDataAccount = "btn-data-account";
const spanIdErrMsg = "err-msg";
const inputIdPas = "pas-input";
const inputIdConfPas = "conf-pas-input";
const inputIdAvatar = "input-avatar";
const imgIdAvatar = "img-avatar";
const formIdDataAccount = "form-data-account";
const formClassUpdate = "form-update";
let curUser;

class User {
    static IS_INVALID = false;

    constructor(lastname, firstname, middlename, email, phoneNumber, password, passwordConfirm, id, userImage) {
        this.lastname = lastname;
        this.firstname = firstname;
        this.middlename = middlename;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
        this.id = id;
        this.userImage = userImage;
    }
}

function getUserFromRequest() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL_GET_CUR_USER, false);
    xhr.send();

    if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
    } else {
        const user = JSON.parse(xhr.responseText);
        curUser = new User(user.lastname, user.firstname, user.middlename, user.email,
            user.phoneNumber, user.password, user.passwordConfirm, user.id, user.userImage);
    }
}

function putUser() {
    const curValues = document.querySelector('.' + formClassUpdate).querySelectorAll('.form-control');

    let imgAvatar = document.querySelector("#" + imgIdAvatar);
    if (imgAvatar && imgAvatar.src !== curUser.userImage) {
        let inputAvatar = document.getElementById(inputIdAvatar);
        if (inputAvatar.files[0] && inputAvatar.files[0].size > 1048576) {
            imgAvatar.src = compress(imgAvatar).src;
        }
    }

    const userTarget = document.getElementById(divIdDataBasic) ? new User(curValues[0].value, curValues[1].value,
        curValues[2].value, curValues[3].value, curValues[4].value, null, null,
        curUser.id, imgAvatar.src) :
        new User(null, null, null, null, null,
            curValues[0].value, curValues[1].value, curUser.id, null);

    const json = JSON.stringify(userTarget);

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", URL_PUT_USER, false);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.send(json);

    if (xhr.status !== 200) {
        return false;
    } else {
        return xhr.responseText;
    }
}

function imgLoad(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#' + imgIdAvatar).attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function openMenuLoadImg(hiddenMenu) {
    hiddenMenu.style.display = "none";
    const imgLoad = document.getElementById(inputIdAvatar);
    imgLoad.click();
}

function isNoDuplicate() {
    const newValues = document.querySelector('.' + formClassUpdate).querySelectorAll('.form-control');
    const updateButton = document.getElementById(btnIdUpdate);
    const resetButton = document.getElementById(btnIdReset);
    const userAtr = Object.values(curUser);

    for (let i = 0; i < newValues.length; i++) {
        if (newValues[i].value !== userAtr[i]) {
            updateButton.disabled = false;
            resetButton.disabled = updateButton.disabled;
            return;
        }
    }

    updateButton.disabled = true;
    resetButton.disabled = updateButton.disabled;
}

function addDataUser(btnId) {
    const divMainContent = document.getElementById(divIdMainContent);

    const formDataUser = document.createElement("form");
    formDataUser.method = "get";
    formDataUser.action = URL_PERSONAL_ACCOUNT;
    formDataUser.className = formClassUpdate;
    formDataUser.addEventListener("submit", function (e) {
        e.preventDefault();
        if (isValid(formDataUser) === true) {
            addChangeSucMsg();
            setTimeout(function () {
                e.target.submit();
            }, 1000);
        } else {
            addErrMsg();
        }
    });
    divMainContent.appendChild(formDataUser);

    const divDataVar = document.createElement("div");
    divDataVar.className = "mb-4";
    divDataVar.style.width = "450px";
    divDataVar.style.textAlign = "center";
    formDataUser.appendChild(divDataVar);

    const blockTitle = document.createElement("h3");
    blockTitle.innerText = document.getElementById(btnId).innerText;
    divDataVar.appendChild(blockTitle);

    if (btnId === btnIdDataBasic) {
        divDataVar.id = divIdDataBasic;
        addDataBasic(divDataVar);
    } else {
        divDataVar.id = divIdDataPass;
        addDataPass(divDataVar);
    }

    const btnChange = document.createElement("button");
    btnChange.type = "submit";
    btnChange.id = btnIdUpdate;
    btnChange.className = "btn btn-primary mt-2 mr-1";
    btnChange.disabled = true;
    btnChange.textContent = "Изменить";
    divDataVar.appendChild(btnChange);

    const btnReset = document.createElement("button");
    btnReset.type = "button";
    btnReset.id = btnIdReset;
    btnReset.className = "btn btn-danger mt-2 ml-1";
    btnReset.disabled = btnChange.disabled;
    btnReset.textContent = "Сбросить";
    btnReset.addEventListener("click", btnResetClick);
    divDataVar.appendChild(btnReset);

}

function addDataBasic(divDataBasic) {
    let divMainHiddenMenu = document.createElement("div");
    divMainHiddenMenu.id = divIdHiddenAvatarMenu;
    divMainHiddenMenu.className = "mb-4";
    divDataBasic.appendChild(divMainHiddenMenu);

    let inputAvatar = document.createElement("input");
    inputAvatar.type = "file";
    inputAvatar.id = inputIdAvatar;
    inputAvatar.accept = "image/jpeg,image/jpg,image/png,image/bmp";
    inputAvatar.style.display = "none";
    inputAvatar.addEventListener("change", imgLoad.bind(null, inputAvatar));
    divDataBasic.appendChild(inputAvatar);

    let imgUserAvatar = document.createElement("img");
    imgUserAvatar.id = imgIdAvatar;
    imgUserAvatar.src = curUser.userImage;
    imgUserAvatar.style.cursor = "pointer";
    imgUserAvatar.addEventListener("click", showAvatarMenu);
    imgUserAvatar.addEventListener("load", isNoDuplicateAvatar);
    divMainHiddenMenu.appendChild(imgUserAvatar);

    let divHiddenMenu = document.createElement("div");
    divHiddenMenu.className = "dropdown-content";
    divHiddenMenu.id = divIdAvatarMenu;
    divMainHiddenMenu.appendChild(divHiddenMenu);

    for (let i = 0; i < 2; i++) {
        let hiddenBtn = document.createElement("button");
        hiddenBtn.type = "button";

        if (i === 0) {
            hiddenBtn.className = "btn btn-outline-primary mt-1 mb-1";
            hiddenBtn.textContent = "Выбрать новое изображение";
            hiddenBtn.addEventListener("click", openMenuLoadImg.bind(null, divHiddenMenu));
        } else {
            hiddenBtn.className = "btn btn-outline-danger mb-1";
            hiddenBtn.textContent = "Удалить текущее изображение";
            hiddenBtn.addEventListener("click", function () {
                imgUserAvatar.src = defaultAvatar;
                inputAvatar.value = "";
                divHiddenMenu.style.display = "none";
            });
        }

        divHiddenMenu.appendChild(hiddenBtn);
    }

    const userAtr = Object.values(curUser);
    for (let i = 0; i < 5; i++) {
        let inputDataBasic = document.createElement("input");
        inputDataBasic.type = "text";
        inputDataBasic.className = "form-control mb-2";
        inputDataBasic.style.width = "100%";
        inputDataBasic.value = userAtr[i];
        inputDataBasic.addEventListener("input", isNoDuplicate);

        switch (i) {
            case 0:
                inputDataBasic.placeholder = "Фамилия";
                inputDataBasic.addEventListener("input", checkInvalidFormat.bind(null,
                    inputDataBasic, /^[A-z|А-я]+$/));
                break;
            case 1:
                inputDataBasic.placeholder = "Имя";
                inputDataBasic.addEventListener("input", checkInvalidFormat.bind(null,
                    inputDataBasic, /^[A-z|А-я]+$/));
                break;
            case 2:
                inputDataBasic.placeholder = "Отчество";
                inputDataBasic.addEventListener("input", checkInvalidFormat.bind(null,
                    inputDataBasic, /^[A-z|А-я]+$/));
                break;
            case 3:
                inputDataBasic.placeholder = "Адрес электронной почты";
                inputDataBasic.addEventListener("input", checkInvalidFormat.bind(null,
                    inputDataBasic, /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/));
                break;
            case 4:
                inputDataBasic.placeholder = "Номер телефона";
                inputDataBasic.addEventListener("input", checkInvalidFormat.bind(null,
                    inputDataBasic, /^(8|\+7)\d{10}$/));
                break;
        }
        divDataBasic.appendChild(inputDataBasic);
    }

    if (User.IS_INVALID === true) {
        addErrMsg();
    }
}

function addDataPass(divDataPass) {
    for (let i = 0; i < 2; i++) {
        let divPass = document.createElement("div");
        divPass.className = "pas mb-2";
        divPass.style.width = "100%";
        divDataPass.appendChild(divPass);

        const inputPas = document.createElement("input");
        inputPas.type = "password";
        inputPas.className = "form-control";
        inputPas.addEventListener("input", checkPassEmpty);

        if (i === 0) {
            inputPas.id = inputIdPas;
            inputPas.placeholder = "Новый пароль";
            inputPas.addEventListener("input", checkPassFormat);
        } else {
            inputPas.id = inputIdConfPas;
            inputPas.placeholder = "Повторите новый пароль";
            inputPas.addEventListener("input", checkPassConfirm.bind(null, inputPas));
        }
        divPass.appendChild(inputPas);

        const btnPas = document.createElement("button");
        btnPas.type = "button";
        btnPas.style.outline = "none";
        btnPas.className = "pas-control";
        btnPas.addEventListener("click", showPas.bind(null, btnPas, inputPas.id));
        divPass.appendChild(btnPas);
    }
}

function addDataProblems() {
    const divMainContent = document.getElementById(divIdMainContent);

    const divDataProblems = document.createElement("div");
    divDataProblems.style.display = "inline-block";
    divDataProblems.style.width = "450px";
    divDataProblems.id = divIdDataProblems;
    divMainContent.appendChild(divDataProblems);

    const textProblem = document.createElement("span");
    textProblem.textContent = document.getElementById(btnIdDataProblems).innerText;
    divDataProblems.appendChild(textProblem);
}

function addDataAccount() {
    const divMainContent = document.getElementById(divIdMainContent);

    const formDataAccount = document.createElement("form");
    formDataAccount.id = formIdDataAccount;
    formDataAccount.style.display = "inline-block";
    formDataAccount.style.textAlign = "center";
    formDataAccount.method = "post";
    formDataAccount.action = "/logout";
    formDataAccount.className = "mb-4";
    formDataAccount.style.width = "450px";
    formDataAccount.addEventListener("submit", function (e) {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", URL_DELETE_USER + "/" + curUser.email, false);
        xhr.send();

        addChangeSucMsg();
        setTimeout(function () {
            e.target.submit();
        }, 1000);
    });
    divMainContent.appendChild(formDataAccount);

    const blockTitle = document.createElement("h3");
    blockTitle.innerText = document.getElementById(btnIdDataAccount).innerText;
    formDataAccount.appendChild(blockTitle);

    const blockText = document.createElement("p");
    blockText.textContent = "Вы можете удалить свой аккаунт. При этом все данные будут безвозвратно потеряны. " +
        "Также будут удалены все проблемы, созданные данным пользователем.";
    blockText.style.fontSize = "20px";
    blockText.style.textAlign = "start";
    formDataAccount.appendChild(blockText);

    const btnDelete = document.createElement("button");
    btnDelete.type = "submit";
    btnDelete.className = "btn btn-danger";
    btnDelete.textContent = "Удалить";
    formDataAccount.appendChild(btnDelete);
}

function loadDataBasic() {
    getUserFromRequest();

    const btn = document.getElementById(btnIdDataBasic);
    btn.style.backgroundColor = "#f1f1f1";
    btn.style.color = "#007bff";

    addDataUser(btn.id);
}

function selectData(btn) {
    let divTarget;
    switch (btn.id) {
        case btnIdDataBasic:
            divTarget = document.getElementById(divIdDataBasic);
            break;
        case btnIdDataPass:
            divTarget = document.getElementById(divIdDataPass);
            break;
        case btnIdDataProblems:
            divTarget = document.getElementById(divIdDataProblems);
            break;
        case btnIdDataAccount:
            divTarget = document.getElementById(formIdDataAccount);
            break;
    }

    if (!divTarget) {
        let btnUpdate = document.getElementById(btnIdUpdate);
        if (btnUpdate && !btnUpdate.disabled) {
            addDialogWindow(btn);
            document.getElementById(divIdDialogWindow).classList.add('show');
        } else {
            changeContent(btn);
            divVarAdd(btn.id);
        }
    }
}

function divVarAdd(btnId) {
    switch (btnId) {
        case btnIdDataBasic:
        case btnIdDataPass:
            addDataUser(btnId);
            break;
        case btnIdDataProblems:
            addDataProblems();
            break;
        case btnIdDataAccount:
            addDataAccount();
            break;
    }
}

function changeContent(btn) {
    const divMainContent = document.getElementById(divIdMainContent);
    divMainContent.innerHTML = "";

    const buttons = document.querySelectorAll("nav > button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "";
        buttons[i].style.color = "";
    }

    btn.style.backgroundColor = "#f1f1f1";
    btn.style.color = "#007bff";
}

function isValid(form) {
    if (!isNoEmpty(form)) {
        return false;
    }

    return putUser() === "";
}

function addErrMsg() {
    const errMsg = document.getElementById(spanIdErrMsg);

    if (!errMsg) {
        const divDataBasic = document.getElementById(divIdDataBasic);
        const targetElem = document.querySelector('.' + formClassUpdate).querySelectorAll('.form-control')[3];

        const spanErrMsg = document.createElement("span");
        spanErrMsg.textContent = "Пользователь с такой электронной почтой уже существует";
        spanErrMsg.style.color = "red";
        spanErrMsg.style.float = "left";
        spanErrMsg.id = spanIdErrMsg;
        divDataBasic.insertBefore(spanErrMsg, targetElem);
    }

    User.IS_INVALID = true;
}

function addChangeSucMsg() {
    const formDataUser = document.querySelector('.' + formClassUpdate);
    const formDataAccount = document.getElementById(formIdDataAccount);

    const divChangeSucMsg = document.createElement("div");
    divChangeSucMsg.className = "mb-4";
    divChangeSucMsg.style.width = "450px";

    const textChangeSucMsg = document.createElement("h3");
    textChangeSucMsg.style.textAlign = "center";
    textChangeSucMsg.className = "text-success";

    let targetForm;
    if (formDataUser) {
        targetForm = formDataUser;
        textChangeSucMsg.textContent = "Данные успешно изменены!";
    } else if (formDataAccount) {
        targetForm = formDataAccount;
        textChangeSucMsg.textContent = "Аккаунт успешно удалён!";

    }
    targetForm.innerHTML = "";

    targetForm.appendChild(divChangeSucMsg);
    divChangeSucMsg.appendChild(textChangeSucMsg);
}

function btnResetClick() {
    const curValues = document.querySelector('.' + formClassUpdate).querySelectorAll('.form-control');

    let userAtr = [];
    if (document.getElementById(divIdDataBasic)) {
        userAtr = Object.values(curUser);
    } else {
        userAtr.push("");
        userAtr.push("");
    }

    for (let i = 0; i < curValues.length; i++) {
        curValues[i].value = userAtr[i];
        setValidFormat(curValues[i]);
    }

    User.IS_INVALID = false;

    const errMsg = document.getElementById(spanIdErrMsg);
    if (errMsg) {
        errMsg.remove();
    }

    if (document.getElementById(divIdDataBasic)) {
        const btnDelAvatar = document.querySelector("#" + divIdAvatarMenu).querySelectorAll("button")[1];
        btnDelAvatar.click();
    }

    const updateButton = document.getElementById(btnIdUpdate);
    const resetButton = document.getElementById(btnIdReset);
    updateButton.disabled = true;
    resetButton.disabled = updateButton.disabled;
}

function addDialogWindow(btn) {
    const mainBlock = document.getElementById("main-block");

    const divMainDialogWindow = document.createElement("div");
    divMainDialogWindow.id = divIdDialogWindow;
    divMainDialogWindow.className = "modal-dlg";
    mainBlock.appendChild(divMainDialogWindow);

    const divDialogWindow = document.createElement("div");
    divDialogWindow.style.textAlign = "center";
    divMainDialogWindow.appendChild(divDialogWindow);

    const buttonWindowClose = document.createElement("button");
    buttonWindowClose.className = "close-custom";
    buttonWindowClose.title = "Закрыть";
    buttonWindowClose.innerText = "X";
    buttonWindowClose.addEventListener("click", function () {
        divMainDialogWindow.classList.remove('show');
        setTimeout(function () {
            document.getElementById(divIdDialogWindow).remove();
        }, 1000);
    });
    divDialogWindow.appendChild(buttonWindowClose);

    const windowTitle = document.createElement("h3");
    windowTitle.className = "text-white";
    windowTitle.innerText = "Предупреждение";
    divDialogWindow.appendChild(windowTitle);

    const windowText = document.createElement("p");
    windowText.className = "text-white";
    windowText.textContent = "Вы изменили некоторые данные. Хотите ли вы применить изменения?";
    divDialogWindow.appendChild(windowText);

    const btnUpdateDlg = document.createElement("button");
    btnUpdateDlg.type = "button";
    btnUpdateDlg.className = "btn btn-success mr-1";
    btnUpdateDlg.textContent = document.getElementById(btnIdUpdate).innerText;
    btnUpdateDlg.addEventListener("click", function () {
        buttonWindowClose.click();
        document.getElementById(btnIdUpdate).click();
    });
    divDialogWindow.appendChild(btnUpdateDlg);

    const btnResetDlg = document.createElement("button");
    btnResetDlg.type = "button";
    btnResetDlg.className = "btn btn-danger ml-1";
    btnResetDlg.textContent = document.getElementById(btnIdReset).innerText;
    btnResetDlg.addEventListener("click", function () {
        buttonWindowClose.click();
        document.getElementById(btnIdReset).click();
        changeContent(btn);
        divVarAdd(btn.id);
    });
    divDialogWindow.appendChild(btnResetDlg);
}

function checkPassEmpty() {
    const inputPass = document.getElementById(inputIdPas);
    const inputConfPass = document.getElementById(inputIdConfPas);
    const btnUpdate = document.getElementById(btnIdUpdate);
    const btnReset = document.getElementById(btnIdReset);

    btnUpdate.disabled = !inputPass.value && !inputConfPass.value;
    btnReset.disabled = btnUpdate.disabled;
}

function showAvatarMenu() {
    const loginMenu = document.getElementById(divIdAvatarMenu);
    loginMenu.style.display = loginMenu.style.display === "inline-block" ? "none" : "inline-block";

    let body = document.querySelector("body");
    if (typeof body.onmouseup !== "function") {
        body.onmouseup = hideAvatarMenu.bind(body.onmouseup);
    }
}

function hideAvatarMenu(e) {
    const div = $("#" + divIdAvatarMenu);
    const mainDiv = $("#" + divIdHiddenAvatarMenu);
    if (!mainDiv.is(e.target)
        && mainDiv.has(e.target).length === 0) {
        div.hide();
    }
}

function compress(inputImgSrc) {
    let width = inputImgSrc.naturalWidth;
    let height = inputImgSrc.naturalHeight;
    const maxWidth = 800;
    const maxHeight = 600;

    if (width > height) {
        if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
        }
    }

    let resImg = new Image();
    let cvs = document.createElement("canvas");

    cvs.width = width;
    cvs.height = height;

    const ctx = cvs.getContext("2d");
    ctx.drawImage(inputImgSrc, 0, 0, width, height);

    resImg.src = cvs.toDataURL("image/jpeg", 1.0);
    return resImg;
}

function isNoDuplicateAvatar() {
    if (document.getElementById(divIdDataBasic)) {
        const updateButton = document.getElementById(btnIdUpdate);
        const resetButton = document.getElementById(btnIdReset);

        const imgAvatar = document.getElementById(imgIdAvatar);
        if (imgAvatar && imgAvatar.src !== curUser.userImage) {
            updateButton.disabled = false;
            resetButton.disabled = updateButton.disabled;
            return;
        }

        updateButton.disabled = true;
        resetButton.disabled = updateButton.disabled;
    }
}