var tasksLocation = [];
var map;
var taskArr = [];
var globUrl = "/api/v1/task-management/task-get-by-id/";
var mapId;
const currentCityProblemsId = "currentCityProblems";
const geoLocationId = "geoLocation";
// var url =  "/task-management/task-get-by-id/1";

$("#current-city-problem").on('click', function () {
    const city = document.getElementById(geoLocationId).innerText;

    document.getElementById(currentCityProblemsId).querySelector("h5").textContent =
        "Задачи в городе «" + city + "»";
    taskArr = getAllObjectsFromRequest(URL_GET_TASK_BY_CITY + city);
    mapId = "mapForCurrentCityProblems";

    if (map !== undefined) {
        map.destroy();
    }
    ymaps.ready(init);
});
// if (!tasksAll){
//     $("#show-on-map").attributes("disabled",true);
// }
$("#show-on-map").on('click', function () {
    taskArr = tasksAll;
    mapId = "mapForAllTasks";
    if (map !== undefined) {
        map.destroy();
    }
    ymaps.ready(init);
});

$("#location").on("click", function () {
    taskArr = [];
    taskArr[0] = currTask;
    mapId = "mapForCurrentTask";
    if (map !== undefined) {
        map.destroy();
    }
    ymaps.ready(init);
});

function init() {
    // Забираем запрос из поля ввода.

    var i = 0;
    var obj;

    if (taskArr.length > 0) {
        for (let task of taskArr) {
            ymaps.geocode(task.taskLocation).then(function (res) {
                obj = res.geoObjects.get(0);
                var url = globUrl + task.id;
                tasksLocation[i] = showResult(obj, "<a href=" + url + ">" + task.taskName + "</a>", task.taskName);
                if (i + 1 === taskArr.length) {
                    createMap();
                }
                i++;
            });
        }
    }else {
        ymaps.geolocation.get().then(function (res) {
            var mapContainer = $('#' + mapId),
                bounds = res.geoObjects.get(0).properties.get('boundedBy');
            // Рассчитываем видимую область для текущей положения пользователя.
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            );
            map = new ymaps.Map(mapId, {

                center: mapState.center,
                zoom: 11,
                /*Для удаления элементов управления карты*/
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            });
        });
    }

    function showResult(obj, taskNameLink, taskName) {
        var mapContainer = $('#' + mapId),
            bounds = obj.properties.get('boundedBy'),
            // Рассчитываем видимую область для текущего положения пользователя.
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            ),
            // Сохраняем полный адрес для сообщения под картой.
            address = [obj.getAddressLine()].join(', '),
            // Сохраняем укороченный адрес для подписи метки.
            shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
        // Убираем контролы с карты.
        temp = createPlaceMark(mapState.center, taskName, taskNameLink);

        return temp;
    }

    function createPlaceMark(coords, iconText, balloonText) {
        return new ymaps.Placemark(
            coords, {
                iconCaption: iconText,
                balloonContent: balloonText,
            }, {
                preset: 'islands#redDotIconWithCaption'
            });
    }

    function createMap() {
        // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
        let ballons = new ymaps.GeoObjectCollection();
        map = new ymaps.Map(mapId, {
            center: [53.507836, 49.420393],
            zoom: 11,
            /*Для удаления элементов управления карты*/
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        });

        while (tasksLocation.length !== 0) {
            let tempTaskName = tasksLocation[0];
            tasksLocation.splice(0, 1);
            for (let i = 0; i < tasksLocation.length; i++) {
                if (tempTaskName.properties.get('iconCaption').trim() === tasksLocation[i].properties.get('iconCaption').trim()) {
                    let tasksWithSameAddress = tempTaskName.properties.get('balloonContent').trim() + '<br>' + tasksLocation[i].properties.get('balloonContent').trim()
                    tempTaskName.properties.set('balloonContent', tasksWithSameAddress);
                    tasksLocation.splice(i, 1);
                    i--;
                }
            }
            ballons.add(tempTaskName);
        }
        map.geoObjects.add(ballons);
        map.setBounds(ballons.getBounds());
        if (ballons.getLength() === 1) {
            map.setZoom(16);
        }
    }
}
