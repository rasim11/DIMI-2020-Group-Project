ymaps.ready(getCurrentLocation);
const URL_POST_GEOLOCATION = "/api/v1/set-geolocation";
function getCurrentLocation() {
    if (!$("#geoLocation").text()){
        console.log("all right");
        ymaps.geolocation.get().then(function (res) {
            let loc = strVerify(res.geoObjects.get(0).properties.get('text')).trim();
            const xhr = new XMLHttpRequest();
            xhr.open('POST', URL_POST_GEOLOCATION, false);
            xhr.send(loc);
            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
                return null;
            }else {
                $("#geoLocation").text(loc);
            }
        }, function (e) {

        });
    }
}
function strVerify(str){
    let temp = str.split(',');
    if (temp.length===2){
        return temp[1];
    }else if (temp.length>2){
        return temp[2];
    }
}