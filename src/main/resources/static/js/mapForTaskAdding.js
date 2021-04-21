
ymaps.ready(getCurrentLocation);

function getCurrentLocation() {
    var mapState;
    ymaps.geolocation.get().then(function (res) {
        var mapContainer = $('#map'),
            bounds = res.geoObjects.get(0).properties.get('boundedBy');
            // Рассчитываем видимую область для текущей положения пользователя.
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            );
        mapState={center:mapState.center,zoom: 11};
        mapState.controls=[];
        init(mapState);
    }, function (e) {

        // Если местоположение невозможно получить, то просто создаем карту.
        mapState={
            center: [55.751574, 37.573856],
            zoom: 11
        };
        mapState.controls=[];
        init(mapState);
    });
}
function init(mapState) {
    var suggestAdress = new ymaps.SuggestView('location');
    var count = 0;
    var myPlacemark;

    console.log(mapState);
    var myMap = new ymaps.Map('map',mapState);

    if ($("#location").val()!=''){
        var coords = ($('#location').val());
        ymaps.geocode(coords).then(function (res) {
            var obj = res.geoObjects.get(0);
            showResult(obj);
        })
    }
    $("#check-address").on('click', function () {
        var coords = ($('#location').val());
        ymaps.geocode(coords).then(function (res) {
            var obj = res.geoObjects.get(0);
            showResult(obj);
        })
    });

    function showResult(obj) {
        var mapContainer = $('#map'),
            bounds = obj.properties.get('boundedBy');
            // Рассчитываем видимую область для текущего положения пользователя.
            coords = ymaps.util.bounds.getCenterAndZoom(
            bounds,
            [mapContainer.width(), mapContainer.height()]
        );
        // Россия, Самарская область, Тольятти, Белорусская улица, 31
        // // Сохраняем полный адрес для сообщения под картой.
        address = [obj.getCountry(), obj.getAddressLine()].join(', '),
            // Сохраняем укороченный адрес для подписи метки.
            shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');

        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords.center);
            myPlacemark.properties.set({iconCaption: shortAddress, balloonContent: address});
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords.center);
            // myPlacemark.properties.set(typ, 'поиск...');
            myPlacemark.properties.set({iconCaption: shortAddress, balloonContent: address});
            myMap.geoObjects.add(myPlacemark);
        }
        // Масштабируем карту на область видимости геообъекта.
        myMap.setBounds(bounds, {
            // Проверяем наличие тайлов на данном масштабе.
            checkZoomRange: true
        });
    }



    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        $("#check-address").attr('disabled', true);
        coords = e.get('coords');
        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        // myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });
            var adressValue = document.getElementById("location");
            adressValue.value = firstGeoObject.getAddressLine();
        });
    }
}