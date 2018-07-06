'use strict';

(function () {

  var PIN_WIDTH = 50; // ширина пина пина
  var PIN_HEIGHT = 70; // высота пина
  window.Filter = {
    TYPE: document.querySelector('#housing-type'),
    PRICE: document.querySelector('#housing-price'),
    ROOMS: document.querySelector('#housing-rooms'),
    GUESTS: document.querySelector('#housing-guests'),
    FEATURES: document.querySelector('.map__features')
  };

  // Создание пинов объявлений

  window.createPins = function (dataArray) {
    var pinListElement = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('template')
      .content
      .querySelector('.map__pin');

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < dataArray.length; i++) {
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.setAttribute('style', 'left: ' + (dataArray[i].location.x - PIN_WIDTH / 2) + 'px; top: ' + (dataArray[i].location.y - PIN_HEIGHT) + 'px;');
      pinElement.setAttribute('data-index', i);
      var pinImage = pinElement.firstElementChild;
      pinImage.src = dataArray[i].author.avatar;
      pinImage.alt = dataArray[i].offer.title;
      fragment.appendChild(pinElement);
    }

    pinListElement.appendChild(fragment);
  };

  //  Фильтрация

  window.showFiltered = function () {


    //  функция удаления пинов с карты
    var clearPins = function () {
      var pinListElement = document.querySelector('.map__pins');
      var targetPin = pinListElement.querySelector('.map__pin:not(.map__pin--main)');

      while (targetPin !== null) {
        pinListElement.removeChild(targetPin);
        targetPin = pinListElement.querySelector('.map__pin:not(.map__pin--main)');
      }
    };

    clearPins();

    if (window.popupAdvert) {
      window.onCloseButtonClick();
    }

    // Сортировка по типу
    var sortType = function (element) {
      return (element.offer.type === window.Filter.TYPE.value || window.Filter.TYPE.value === 'any');
    };

    // Сортировка по цене
    var sortPrice = function (element) {

      switch (window.Filter.PRICE.value) {

        case 'low':
          return element.offer.price < 10000;

        case 'middle':
          return element.offer.price > 10000 && element.offer.price < 50000;

        case 'high':
          return element.offer.price > 50000;

        default:
          return true;
      }
    };

    // Сортировка по комнатам
    var sortRooms = function (element) {
      return (element.offer.rooms.toString()) === window.Filter.ROOMS.value || (window.Filter.ROOMS.value === 'any');
    };

    // Сортировка по гостям
    var sortGuests = function (element) {
      return (element.offer.guests.toString()) === window.Filter.GUESTS.value || (window.Filter.GUESTS.value === 'any');
    };

    // //  Сортировка по "плюшкам"
    // var sortFeatures = function (element) {
    //   var checkedElements = window.Filter.FEATURES.querySelectorAll('input[type=checkbox]:checked');

    // //  дописать фильтр по фичам
    // };

    var updatedData = window.realDataCopy.filter(sortType).filter(sortPrice).filter(sortRooms).filter(sortGuests); // .filter(sortFeatures)

    window.createPins(updatedData);

  };


})();

