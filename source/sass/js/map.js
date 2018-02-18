ymaps.ready(init);
  var myMap,
      myPlacemark;

  function init(){
      myMap = new ymaps.Map("yandex-map", {
          center: [59.93897806, 30.32313550],
          zoom: 15
      });

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Мишка'
      }, {
        iconLayout: 'default#image',
        iconImageHref: '../img/icon-map-pin.svg',
        iconImageSize: [66, 101],
        iconImageOffset: [-35, -95]
      });

      myMap.geoObjects.add(myPlacemark);
}
