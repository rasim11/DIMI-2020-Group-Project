const inputTaskLocationId = "input-task-location";

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
        mapState = {center: mapState.center, zoom: 11};
        mapState.controls = [];
        initMap(mapState);
    }, function (e) {

        // Если местоположение невозможно получить, то просто создаем карту.
        mapState = {
            center: [55.751574, 37.573856],
            zoom: 11
        };
        mapState.controls = [];
        initMap(mapState);
    });
}

function initMap(mapState) {
    var suggestAdress = new ymaps.SuggestView(inputTaskLocationId);
    var count = 0;
    var myPlacemark;
    var adressValue = document.getElementById(inputTaskLocationId);

    var myMap = new ymaps.Map('map', mapState);

    if ($("#" + inputTaskLocationId).val()) {
        var coords = ($("#" + inputTaskLocationId).val());
        ymaps.geocode(coords).then(function (res) {
            var obj = res.geoObjects.get(0);
            showResult(obj);
        })
    }

    document.getElementById(inputTaskLocationId).parentNode.querySelector("ymaps").onclick = function () {
        if (document.getElementById(btnSaveId)) {
            isNoDuplicate();
        }
        setValidFormat(document.getElementById(inputTaskLocationId));

        var coords = ($("#" + inputTaskLocationId).val());
        ymaps.geocode(coords).then(function (res) {
            var obj = res.geoObjects.get(0);
            showResult(obj);
        });
    };

    function showResult(obj) {
        var mapContainer = $('#map'),
            bounds = obj.properties.get('boundedBy');
        // Рассчитываем видимую область для текущего положения пользователя.
        coords = ymaps.util.bounds.getCenterAndZoom(
            bounds,
            [mapContainer.width(), mapContainer.height()]
        );
        console.log(obj.getAdministrativeAreas()[0]);
        // // Сохраняем полный адрес для сообщения под картой.
        address = checkRegionExistence(obj),
            // Сохраняем укороченный адрес для подписи метки.
            shortAddress = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
        console.log(address);
        adressValue.value = address;
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
            //
            //
            // let address = firstGeoObject.getAddressLine();
            // if(region!==firstGeoObject.getAddressLine().split(',')[1].trim()){
            //     address = address.substr(0,address.split(',')[0].length)+','+region+','+address.substr(address.split(',')[0].length+region.length-2,address.length);
            //     // console.log("works: " + address);
            // }
            adressValue.value = checkRegionExistence(firstGeoObject);

            if (document.getElementById(btnSaveId)) {
                isNoDuplicate();
            }
        });
    }

    function checkRegionExistence(sourceAddress) {
        let region = sourceAddress.getAdministrativeAreas()[0];
        let fullAddress = sourceAddress.getAddressLine();
        if (region !== fullAddress.split(',')[1].trim()) {
            fullAddress = fullAddress.substr(0, fullAddress.split(',')[0].length) + ', ' +
                region + fullAddress.substr(fullAddress.split(',')[0].length, fullAddress.length);
        }
        return fullAddress;
    }
}