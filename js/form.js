'use strict';

(function () {

  var priceMin = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var adForm = document.querySelector('.ad-form');
  var typeInputElement = adForm.querySelector('#type');
  var priceInputElement = adForm.querySelector('#price');

  function onChangeType() {
    var typeInputElementValue = typeInputElement.value;
    priceInputElement.setAttribute('min', priceMin[typeInputElementValue]);
    priceInputElement.setAttribute('placeholder', priceMin[typeInputElementValue]);
  }

  typeInputElement.addEventListener('change', onChangeType, false);

  var timeInInputElement = adForm.querySelector('#timein');
  var timeOutInputElement = adForm.querySelector('#timeout');

  function onChangeTimeIn(evt) {
    timeOutInputElement.value = evt.target.value;
  }

  timeInInputElement.addEventListener('change', onChangeTimeIn, false);

  function onChangeTimeOut(evt) {
    timeInInputElement.value = evt.target.value;
  }

  timeOutInputElement.addEventListener('change', onChangeTimeOut, false);

  var roomsSelect = adForm.querySelector('#room_number'); //  находит поле "Количество комнат"
  var guestSelect = adForm.querySelector('#capacity'); //  находит поле "Количество гостей"
  var roomsSelected = Number(roomsSelect.value); // хранит выбранное значение комнат(number)
  var guestSelected = Number(guestSelect.value); // хранит выбранное значение гостей (number)

  var validateGuests = function () {
    roomsSelected = Number(roomsSelect.value); // хранит выбранное значение комнат(number)
    guestSelected = Number(guestSelect.value); // хранит выбранное значение гостей (number)
    var customMessage = '';
    switch (guestSelected) {
      case (1): {
        if ((roomsSelected < 1) || (roomsSelected === 100)) {
          customMessage = 'Для указанного количества гостей не подходит вариант 100 комнат';
        }
        break;
      }
      case (2): {
        if ((roomsSelected < 2) || (roomsSelected === 100)) {
          customMessage = 'Для указанного количества гостей подходят варианты: 2 комнаты, 3 комнаты';
        }
        break;
      }
      case (3): {
        if ((roomsSelected < 3) || (roomsSelected === 100)) {
          customMessage = 'Для указанного количества гостей подходит вариант: 3 комнаты';
        }
        break;
      }
      case (0): {
        if (roomsSelected !== 100) {
          customMessage = 'Для указанного количества гостей подходит вариант: 100 комнат';
        }
        break;
      }
    }
    roomsSelect.setCustomValidity(customMessage);
  };

  validateGuests();

  roomsSelect.addEventListener('change', validateGuests);
  guestSelect.addEventListener('change', validateGuests);

})();
