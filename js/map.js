'use strict';

(function () {

  var FILTER_ARRAY = ['#housing-type', '#housing-price', '#housing-rooms', '#housing-guests', '#housing-features'];
  var MAIN_PIN_X_INIT = 570;
  var MAIN_PIN_Y_INIT = 375;
  window.MAIN_PIN_WIDTH = 62; // ширина главного пина в неактивном состоянии
  window.MAIN_PIN_HEIGHT = 84; // высота главного пина в неактивном состоянии
  var TOP_LIMIT = 130; // верхняя граница перетаскивания пина
  var BOTTOM_LIMIT = 630; // нижняя граница перетаскивания пина
  window.realData = [];

  // Запуск приложения
  var appActivate = function () {

    // Скачивание массива с сервера
    window.load(onSuccess, window.onError);

    for (var k = 0; k < FILTER_ARRAY.length; k++) {
      document.querySelector(FILTER_ARRAY[k]).removeAttribute('disabled', 'disabled');
    }

    document.querySelector('.ad-form-header').removeAttribute('disabled', 'disabled');

    var elements = document.querySelectorAll('.ad-form__element');
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled', 'disabled');
    }

    var map = document.querySelector('.map');
    map.classList.remove('map--faded');

    var adForm = document.querySelector('.ad-form');
    adForm.classList.remove('ad-form--disabled');

    //  подставляем адрес в форму

    var calculateAdвress = function () {
      mainPin = document.querySelector('.map__pin--main');
      var addressCoords = {
        x: Number(mainPin.style.left.replace(/[^-0-9]/gi, '')) + window.MAIN_PIN_WIDTH / 2,
        y: Number(mainPin.style.top.replace(/[^-0-9]/gi, '')) + window.MAIN_PIN_HEIGHT
      };

      return addressCoords;

    };

    document.querySelector('#address').value = calculateAdвress().x + ', ' + calculateAdвress().y;
  };

  // Возвращает страницу к исходному состоянию
  var appDeactivate = function () {
    for (var l = 0; l < FILTER_ARRAY.length; l++) {
      document.querySelector(FILTER_ARRAY[l]).setAttribute('disabled', 'disabled');
    }

    document.querySelector('.ad-form-header').setAttribute('disabled', 'disabled');

    var elements = document.querySelectorAll('.ad-form__element');
    for (var j = 0; j < elements.length; j++) {
      elements[j].setAttribute('disabled', 'disabled');
    }
  };

  appDeactivate();

  var mainPin = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');
  var onMapElementClick = function (evt) {

    var target = evt.target;
    while (target !== mapElement) {
      if (target.className === 'map__pin') {
        var index = target.getAttribute('data-index');
        window.createAdvert(window.realData[index]);

        return;
      }
      target = target.parentNode;
    }
  };
  mapElement.addEventListener('click', onMapElementClick, false);

  var clearButton = document.querySelector('.ad-form__reset'); //  находит кнопку "Очистить"

  // Очистка
  window.onClearButtonClick = function () {
    var adForm = document.querySelector('.ad-form');
    adForm.reset();
    appDeactivate();
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    var pinListElement = document.querySelector('.map__pins');
    var pinElements = pinListElement.querySelectorAll('.map__pin');
    for (var i = 1; i < pinElements.length; i++) {
      pinElements[i].parentNode.removeChild(pinElements[i]);
    }
    document.removeEventListener('click', window.onClearButtonClick, false);
    mainPin.style.top = (MAIN_PIN_Y_INIT) + 'px';
    mainPin.style.left = (MAIN_PIN_X_INIT) + 'px';
    document.querySelector('#address').value = MAIN_PIN_X_INIT + window.MAIN_PIN_WIDTH / 2 + ', ' + (MAIN_PIN_Y_INIT + window.MAIN_PIN_HEIGHT);
    window.popupAdvert = document.querySelector('.popup');
    if (window.popupAdvert) {
      window.onCloseButtonClick();
    }

  };
  clearButton.addEventListener('click', window.onClearButtonClick, false);

  mainPin = document.querySelector('.map__pin--main'); // нашли элемент который будем перетаскивать

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startLocation = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();
      var mapPinParent = mainPin.offsetParent;

      var shift = {
        x: startLocation.x - moveEvt.clientX,
        y: startLocation.y - moveEvt.clientY
      };

      startLocation = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      //  ограничения, за которые нельзя вытащить главный пин
      var limits = {
        top: TOP_LIMIT - window.MAIN_PIN_HEIGHT,
        bottom: BOTTOM_LIMIT - window.MAIN_PIN_HEIGHT,
        left: mapPinParent.offsetLeft,
        right: mapPinParent.offsetWidth - window.MAIN_PIN_WIDTH
      };

      var calculateNewLocation = function () {
        var newLocation = {
          x: mainPin.offsetLeft - shift.x,
          y: mainPin.offsetTop - shift.y
        };
        if (mainPin.offsetLeft - shift.x > limits.right) {
          newLocation.x = limits.right;
        }
        if (mainPin.offsetLeft - shift.x < limits.left) {
          newLocation.x = limits.left;
        }
        if (mainPin.offsetTop - shift.y > limits.bottom) {
          newLocation.y = limits.bottom;
        }
        if (mainPin.offsetTop - shift.y < limits.top) {
          newLocation.y = limits.top;
        }
        return newLocation;
      };

      var newPinlocation = calculateNewLocation();

      mainPin.style.top = (newPinlocation.y) + 'px';
      mainPin.style.left = (newPinlocation.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      appActivate();
      // window.createPins(window.realData);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  //  Получение массива реальных данных

  var onSuccess = function (realDataArray) {
    window.realData = realDataArray;
    window.realDataCopy = window.realData.slice();
debugger;
    window.createPins(window.realData);

    // Вешаем обработчики фильтров

    window.Filter.TYPE.addEventListener('change', window.showFiltered);
    window.Filter.PRICE.addEventListener('change', window.showFiltered);
    window.Filter.ROOMS.addEventListener('change', window.showFiltered);
    window.Filter.ROOMS.addEventListener('change', window.showFiltered);
    window.Filter.GUESTS.addEventListener('change', window.showFiltered);
    window.Filter.ROOMS.addEventListener('change', window.showFiltered);
    window.Filter.FEATURES.addEventListener('change', window.showFiltered);
  };

  // Сообщение об ошибке

  window.onError = function (errorMessage) {
    var errorMessageElement = document.createElement('div');
    errorMessageElement.style = 'z-index: 100; margin: 0 auto; text-align: center; top: 200px; left: 50%; border: 2px solid rgba(255, 50, 0, 0.7);';
    errorMessageElement.style.position = 'fixed';
    errorMessageElement.style.padding = '30px 30px';
    errorMessageElement.style.fontfamily = 'Arial';
    errorMessageElement.style.color = 'rgba(255, 50, 0, 0.7)';
    errorMessageElement.style.fontSize = '24px';
    errorMessageElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorMessageElement);
  };

})();
