'use strict';

(function () {

  var MAIN_PIN_X_INIT = 570;
  var MAIN_PIN_Y_INIT = 375;

  window.map = {};

  window.map.MAIN_PIN_WIDTH = 62; // ширина главного пина в неактивном состоянии
  window.map.MAIN_PIN_HEIGHT = 84; // высота главного пина в неактивном состоянии
  var TOP_LIMIT = 130; // верхняя граница перетаскивания пина
  var BOTTOM_LIMIT = 630; // нижняя граница перетаскивания пина
  window.map.realData = [];
  var ERROR_BOX_TIMEOUT = 5000;
  window.map.NUMBER_OF_SPLICED_ELEMENTS = 5;
  var FILTER_ARRAY = ['#housing-type', '#housing-price', '#housing-rooms', '#housing-guests', '#housing-features'];


  // Запуск приложения
  var appActivate = function () {

    // Скачивание массива с сервера
    window.backend.load(onSuccess, window.map.onError);

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
        x: Number(mainPin.style.left.replace(/[^-0-9]/gi, '')) + window.map.MAIN_PIN_WIDTH / 2,
        y: Number(mainPin.style.top.replace(/[^-0-9]/gi, '')) + window.map.MAIN_PIN_HEIGHT
      };

      return addressCoords;

    };

    document.querySelector('#address').value = calculateAdвress().x + ', ' + calculateAdвress().y;
    document.querySelector('#address').setAttribute('readonly', 'readonly');
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
        if (window.pin.updatedData !== undefined) {
          window.card.createAdvert(window.pin.updatedData[index]);
        } else {
          window.card.createAdvert(window.map.splicedData[index]);
        }

        return;
      }
      target = target.parentNode;
    }
  };
  mapElement.addEventListener('click', onMapElementClick, false);

  var clearButton = document.querySelector('.ad-form__reset'); //  находит кнопку "Очистить"

  // Очистка
  window.map.onClearButtonClick = function () {
    var adForm = document.querySelector('.ad-form');

    window.form.resetInvalidBorder(window.form.getInvalidFields());

    adForm.reset();

    appDeactivate();

    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

    var pinListElement = document.querySelector('.map__pins');
    var pinElements = pinListElement.querySelectorAll('.map__pin');
    for (var i = 1; i < pinElements.length; i++) {
      pinElements[i].parentNode.removeChild(pinElements[i]);
    }

    document.removeEventListener('click', window.map.onClearButtonClick, false);

    mainPin.style.top = (MAIN_PIN_Y_INIT) + 'px';
    mainPin.style.left = (MAIN_PIN_X_INIT) + 'px';

    document.querySelector('#address').value = MAIN_PIN_X_INIT + window.map.MAIN_PIN_WIDTH / 2 + ', ' + (MAIN_PIN_Y_INIT + window.map.MAIN_PIN_HEIGHT);
    window.card.popupAdvert = document.querySelector('.popup');
    if (window.card.popupAdvert) {
      window.card.onCloseButtonClick();
    }

  };
  clearButton.addEventListener('click', window.map.onClearButtonClick, false);

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
        top: TOP_LIMIT - window.map.MAIN_PIN_HEIGHT,
        bottom: BOTTOM_LIMIT - window.map.MAIN_PIN_HEIGHT,
        left: mapPinParent.offsetLeft - window.map.MAIN_PIN_WIDTH / 2,
        right: mapPinParent.offsetWidth - window.map.MAIN_PIN_WIDTH / 2
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

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  //  Получение массива реальных данных

  var onSuccess = function (realDataArray) {
    window.map.realData = realDataArray;
    window.map.splicedData = window.map.realData.splice(0, window.map.NUMBER_OF_SPLICED_ELEMENTS);
    window.pin.createPins(window.map.splicedData);

    // Вешаем обработчики фильтров

    window.pin.showFiltered = window.debounce.removeDebounce(window.pin.showFiltered);

    document.querySelector('#housing-type').addEventListener('change', window.pin.showFiltered);
    document.querySelector('#housing-price').addEventListener('change', window.pin.showFiltered);
    document.querySelector('#housing-rooms').addEventListener('change', window.pin.showFiltered);
    document.querySelector('#housing-guests').addEventListener('change', window.pin.showFiltered);
    document.querySelector('#housing-features').addEventListener('change', window.pin.showFiltered);
  };

  // Сообщение об ошибке

  window.map.onError = function (errorMessage) {
    var errorMessageElement = document.createElement('div');
    errorMessageElement.style = 'z-index: 3; margin: 0 auto; text-align: center; background-color: rgba(255, 50, 0, 0.7); top: 200px; left: 50%; transform: translateX(-50%); box-shadow: 0 0 50px rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 50, 0, 0.7); border-radius: 20px';
    errorMessageElement.style.position = 'fixed';
    errorMessageElement.style.padding = '50px 50px';
    errorMessageElement.style.fontfamily = 'Arial';
    errorMessageElement.style.color = 'white';
    errorMessageElement.style.fontSize = '60px';
    errorMessageElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorMessageElement);
    setTimeout(function () {
      errorMessageElement.parentNode.removeChild(errorMessageElement);
    }, ERROR_BOX_TIMEOUT);
  };

})();
