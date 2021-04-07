
var tasksLocation = [];
var map;
$("#show-on-map").on('click' ,function (){
    if(map===undefined) {
        ymaps.ready(init);
    }
});

function init() {
    // Забираем запрос из поля ввода.
    var i = 0;
    var obj;
    for (let task of tasks) {
        ymaps.geocode(task.taskLocation).then(function (res) {
            obj = res.geoObjects.get(0);
            tasksLocation[i]=showResult(obj, task.taskName);
            if(i+1>tasks.length-1){
                createMap();
            }
            i++;
        });
    }

    //createMap(temp);

    function showResult(obj, taskName) {
        var mapContainer = $('#mapForAllTasks'),
            bounds = obj.properties.get('boundedBy'),
            // Рассчитываем видимую область для текущего положения пользователя.
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            ),
            // Сохраняем полный адрес для сообщения под картой.
            address = [obj.getCountry(), obj.getAddressLine()].join(', '),
            // Сохраняем укороченный адрес для подписи метки.
            shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
        // Убираем контролы с карты.
        temp = createPlaceMark(mapState.center, address, taskName);
        console.log("before: " + taskName);

        return temp;
        // Создаём карту.
        // createMap(mapState, request);
        // Выводим сообщение под картой.
    }

    function createPlaceMark(coords, iconText, balloonText) {
        return new ymaps.Placemark(
            coords, {
                iconCaption: balloonText,
                balloonContent: iconText,
            }, {
                preset: 'islands#redDotIconWithCaption'
            });
    }

    function createMap() {
        // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
        map = new ymaps.Map('mapForAllTasks', {
            center: [53.507836, 49.420393],
            zoom: 11,
            /*Для удаления элементов управления карты*/
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        });


        console.log(tasksLocation[0]);
        for (let location = 0; location < tasksLocation.length; location++) {
            map.geoObjects.add(tasksLocation[location]);
            // map.setBounds(tasksLocation[location], {
            //     // Проверяем наличие тайлов на данном масштабе.
            //     checkZoomRange: true
            // });
        }
    }
}
