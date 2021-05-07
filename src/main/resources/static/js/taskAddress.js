let show_map_link = document.getElementById("location");
var request = show_map_link.innerText;
var map;
$("#location").on("click", function () {
    if(map!==undefined){
        map.destroy();
    }
    ymaps.ready(init);
});
function init() {
    // Забираем запрос из поля ввода.
    // Геокодируем введённые данные.
    ymaps.geocode($("#location").val()).then(function (res) {
        var obj = res.geoObjects.get(0);
        showResult(obj);
    });

    function showResult(obj) {
        var mapContainer = $('#map'),
            bounds = obj.properties.get('boundedBy'),
            // Рассчитываем видимую область для текущего положения пользователя.
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            );
        // Убираем контролы с карты.
        // Создаём карту.
        createMap(mapState, request);
        // Выводим сообщение под картой.
    }

    function createMap(state, caption) {
        // Если карта еще не была создана, то создадим ее и добавим метку с адресом.
            map = new ymaps.Map('map',
                {
                    center:state,
                    zoom:13,
                    controls:[]
                },{
                    searchControlProvider: 'yandex#search'
                });
            placemark = new ymaps.Placemark(
                map.getCenter(), {
                    iconCaption: caption,
                    balloonContent: caption,
                }, {
                    preset: 'islands#redDotIconWithCaption'
                });
            map.geoObjects.add(placemark);
        }
}