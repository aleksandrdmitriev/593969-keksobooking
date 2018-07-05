'use strict';

(function () {

  var PIN_WIDTH = 50; // ширина пина пина
  var PIN_HEIGHT = 70; // высота пина
  var Filter = {
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

  window.showFiltered = function (dataArray) {
    var updatedData = dataArray;

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

    // Сортировка по типу
    var sortType = function (element) {
      return (element.offer.type === Filter.TYPE.value || Filter.TYPE.value === 'any');
    };

    // Сортировка по цене
    var sortPrice = function (element) {

      switch (Filter.PRICE.value) {

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
      return (element.offer.rooms.toString()) === Filter.ROOMS.value || (Filter.ROOMS.value === 'any');
    };

    // Сортировка по гостям
    var sortGuests = function (element) {
      return (element.offer.guests.toString()) === Filter.GUESTS.value || (Filter.GUESTS.value === 'any');
    };

    //  Сортировка по "плюшкам"
    var sortFeatures = function (element) {
      var checkedElements = Filter.FEATURES.querySelectorAll('input[type=checkbox]:checked');

    //  дописать фильтр по фичам
    };

    updatedData = Array.filter(sortType).filter(sortPrice).filter(sortRooms).filter(sortGuests).filter(sortFeatures);

    window.createPins(updatedData);

  };

  // Вешаем обработчики фильтров

  Filter.TYPE.addEventListener('change', window.showFiltered(updatedData));
  Filter.PRICE.addEventListener('change', window.showFiltered(updatedData));
  Filter.ROOMS.addEventListener('change', window.showFiltered(updatedData));
  Filter.ROOMS.addEventListener('change', window.showFiltered(updatedData));
  Filter.GUESTS.addEventListener('change', window.showFiltered(updatedData));
  Filter.ROOMS.addEventListener('change', window.showFiltered(updatedData));
  Filter.FEATURES.addEventListener('change', window.showFiltered(updatedData));

})();

