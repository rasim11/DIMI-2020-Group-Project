var tasksLocation = [];
var map;
$("#show-on-map").on('click', function () {
    if(map!==undefined) {
        map.destroy();
    }
    ymaps.ready(init);
});

function init() {
    // Забираем запрос из поля ввода.
    var i = 0;
    var obj;
    if (tasks.length>0) {
        for (let task of tasks) {
            ymaps.geocode(task.taskLocation).then(function (res) {
                obj = res.geoObjects.get(0);
                tasksLocation[i] = showResult(obj, task.taskName);
                if (i + 1 === tasks.length) {
                    createMap();
                }
                i++;
            });
        }
    }
    function showResult(obj, taskName) {
        var mapContainer = $('#mapForAllTasks'),
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
        temp = createPlaceMark(mapState.center, address, taskName);

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
            map = new ymaps.Map('mapForAllTasks', {
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
            if (balloons.length === 1) {
                map.setZoom(11);
            }
        }
}
