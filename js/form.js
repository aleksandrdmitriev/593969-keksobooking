'use strict';

window.form = {};

(function () {

  var ESC_KEYCODE = 27;

  var priceMin = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var numberOfRooms = {
    one: 1,
    two: 2,
    three: 3,
    any: 100
  };

  var adForm = document.querySelector('.ad-form'); // Находит блок формы объявления
  var successMessage = document.querySelector('.success'); // Находит блок сообщения об успешной отправке объявления
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
        if ((roomsSelected !== numberOfRooms.one) || (roomsSelected === numberOfRooms.any)) {
          customMessage = 'Для указанного количества гостей подходит вариант: 1 комната';
        }
        break;
      }
      case (2): {
        if ((roomsSelected < numberOfRooms.two) || (roomsSelected === numberOfRooms.any)) {
          customMessage = 'Для указанного количества гостей подходят варианты: 2 комнаты, 3 комнаты';
        }
        break;
      }
      case (3): {
        if ((roomsSelected < numberOfRooms.three) || (roomsSelected === numberOfRooms.any)) {
          customMessage = 'Для указанного количества гостей подходит вариант: 3 комнаты';
        }
        break;
      }
      case (0): {
        if (roomsSelected !== numberOfRooms.any) {
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

  //  Закрыть popup по ESC

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  //  Открытие окна с сообщением об отправке формы

  var openPopup = function () {
    successMessage.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  //  Закрытие окна с сообщением об отправке формы

  var closePopup = function () {
    successMessage.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onSuccessForm = function () {
    openPopup();
    successMessage.addEventListener('keydown', onPopupEscPress);
    successMessage.addEventListener('click', closePopup);
    window.map.onClearButtonClick();
  };

  // Находим невалидные поля
  window.form.getInvalidFields = function () {
    var allFields = adForm.querySelectorAll('input:not(.visually-hidden):not([type="checkbox"])');
    var invalidFields = [];

    for (var i = 0; i < allFields.length; i++) {
      if (allFields[i].checkValidity() === false) {
        var field = allFields[i];
        invalidFields.push(field);
      }
    }
    return invalidFields;
  };

  // Отмечаем невалидные поля
  var onSubmitClick = function () {
    var invalidInputs = window.form.getInvalidFields();
    if (invalidInputs) {
      for (var i = 0; i < invalidInputs.length; i++) {
        var invalidInput = invalidInputs[i];
        invalidInput.classList.add('error');
      }
    }
  };

  // Сброс рамок невалидных полей
  window.form.resetInvalidBorder = function (invalidInputs) {
    if (invalidInputs) {
      for (var i = 0; i < invalidInputs.length; i++) {
        var invalidInput = invalidInputs[i];
        invalidInput.classList.remove('error');
      }
    }
  };

  // Отправка формы
  var sendFormButton = document.querySelector('.ad-form__submit');
  sendFormButton.addEventListener('click', onSubmitClick);

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccessForm, window.map.onError);
  });

})();
