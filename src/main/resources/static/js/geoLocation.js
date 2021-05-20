const URL_POST_GEOLOCATION = "/api/v1/set-geolocation";
const currentCityProblemId = "current-city-problem";

ymaps.ready(getCurrentLocation);

function getCurrentLocation() {
    if (!$("#geoLocation").text()) {
        console.log("all right");
        ymaps.geolocation.get({
            // Выставляем опцию для определения положения по ip
            provider: 'browser',
            // Карта автоматически отцентрируется по положению пользователя.
            mapStateAutoApply: true
        }).then(function (res) {
            let loc = strVerify(res.geoObjects.get(0).properties.get('text')).trim();
            const xhr = new XMLHttpRequest();
            xhr.open('POST', URL_POST_GEOLOCATION, false);
            xhr.send(loc);
            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
                return null;
            } else {
                $("#geoLocation").text(loc);
                document.getElementById(currentCityProblemId).style.display = "block";
            }
        }, function (e) {
        });
    } else {
        document.getElementById(currentCityProblemId).style.display = "block";
    }
}

function strVerify(str) {
    let temp = str.split(',');
    if (temp.length === 2) {
        return temp[1];
    } else if (temp.length > 2) {
        return temp[2];
    }
}