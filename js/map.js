'use strict';

var NUMBER_OF_OBJECTS = 8;
var TITLE_ARRAY = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
var CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FILTER_ARRAY = ['#housing-type', '#housing-price', '#housing-rooms', '#housing-guests', '#housing-features'];
var X_MIN = 300;
var X_MAX = 900;
var Y_MIN = 130;
var Y_MAX = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 20;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_X_INIT = 603;
var PIN_Y_INIT = 408;
var BUNGALO_PRICE_MIN = 0;
var FLAT_PRICE_MIN = 1000;
var HOUSE_PRICE_MIN = 5000;
var PALACE_PRICE_MIN = 10000;

var getRandomArrayItem = function (array) {

  return array[Math.floor(Math.random() * array.length)];
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array [i];
    array [i] = array[j];
    array[j] = temp;
  }

  return array;
}

function getRandomInt(min, max) {

  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function getRandomItems(n) {

  return Math.floor(Math.random() * (n + 1));
}

var createMockData = function () {
  var mockDataArray = [];
  for (var i = 1; i <= NUMBER_OF_OBJECTS; i++) {
    var x = getRandomInt(X_MIN, X_MAX);
    var y = getRandomInt(Y_MIN, Y_MAX);
    var featuresNewArray = shuffleArray(FEATURES_ARRAY);
    var randomItems = getRandomItems(FEATURES_ARRAY.length);
    var mockDataObject = {
      author: {
        avatar: 'img/avatars/user0' + [i] + '.png'
      },

      offer: {
        title: getRandomArrayItem(TITLE_ARRAY),
        address: x + ', ' + y,
        price: getRandomInt(PRICE_MIN, PRICE_MAX),
        type: getRandomArrayItem(TYPE_ARRAY),
        rooms: getRandomInt(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomInt(GUESTS_MIN, GUESTS_MAX),
        checkin: getRandomArrayItem(CHECKIN_ARRAY),
        checkout: getRandomArrayItem(CHECKOUT_ARRAY),
        features: featuresNewArray.slice(1, randomItems),
        description: null,
        photos: shuffleArray(PHOTOS_ARRAY),
      },

      location: {
        x: x,
        y: y,
      }
    };
    mockDataArray.push(mockDataObject);
  }


  return mockDataArray;
};

var mockData = createMockData();

var createPins = function (dataArray) {
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

var getHousingType = function (arrayItem) {
  switch (arrayItem) {
    case 'palace':

      return 'Дворец';

    case 'flat':

      return 'Квартира';

    case 'bungalo':

      return 'Бунгало';

    default:

      return 'Дом';
  }
};

var createAdvert = function (dataArrayItem) {
  var popupAdvert = document.querySelector('.popup');
  if (popupAdvert !== null) {
    onCloseButtonClick();
  }

  var advertParentElement = document.querySelector('.map');
  var advertNextElement = document.querySelector('.map__filters-container');
  var advertTemplate = document.querySelector('template')
    .content.querySelector('.map__card');

  var advertElement = advertTemplate.cloneNode(true);

  advertElement.querySelector('.popup__avatar').src = dataArrayItem.author.avatar;
  advertElement.querySelector('.popup__title').textContent = dataArrayItem.offer.title;
  advertElement.querySelector('.popup__text--address').textContent = dataArrayItem.offer.address;
  advertElement.querySelector('.popup__text--price').textContent = dataArrayItem.offer.price + '₽/ночь';
  advertElement.querySelector('.popup__type').textContent = getHousingType(dataArrayItem.offer.type);
  advertElement.querySelector('.popup__text--capacity').textContent = dataArrayItem.offer.rooms + ' комнаты для ' + dataArrayItem.offer.guests + ' гостей';
  advertElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataArrayItem.offer.checkin + ', выезд до ' + dataArrayItem.offer.checkout;
  advertElement.querySelector('.popup__features');

  var featuresElement = advertElement.querySelector('.popup__features');
  while (featuresElement.firstChild) {
    featuresElement.removeChild(featuresElement.firstChild);
  }

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < dataArrayItem.offer.features.length; i++) {
    var newFeatureElement = document.createElement('li');
    newFeatureElement.className = 'popup__feature popup__feature--' + dataArrayItem.offer.features[i];
    fragment.appendChild(newFeatureElement);
  }
  featuresElement.appendChild(fragment);

  advertElement.querySelector('.popup__description').textContent = dataArrayItem.offer.description;

  var photosElement = advertElement.querySelector('.popup__photos');
  for (var j = 0; j < dataArrayItem.offer.photos.length; j++) {
    var newPhotoElement = photosElement.querySelector('.popup__photo').cloneNode(true);
    newPhotoElement.src = dataArrayItem.offer.photos[j];
    photosElement.appendChild(newPhotoElement);
  }
  photosElement.removeChild(photosElement.querySelector('.popup__photo'));

  advertParentElement.insertBefore(advertElement, advertNextElement);

  popupAdvert = document.querySelector('.popup');
  var buttonClose = popupAdvert.querySelector('.popup__close');
  function onCloseButtonClick() {
    popupAdvert.parentNode.removeChild(popupAdvert);
    event.stopPropagation();
  }
  buttonClose.addEventListener('click', onCloseButtonClick, false);
};

var appActivate = function () {
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

  document.querySelector('#address').value = PIN_X_INIT + ', ' + PIN_Y_INIT;

  var typeInputElement = adForm.querySelector('#type');
  var priceInputElement = adForm.querySelector('#price');
  var typeInputElementValue = typeInputElement.value;
  function getHousingPrice(ElementValue) {
    switch (ElementValue) {
      case 'palace':

        return PALACE_PRICE_MIN;

      case 'house':

        return HOUSE_PRICE_MIN;

      case 'bungalo':

        return BUNGALO_PRICE_MIN;

      default:

        return FLAT_PRICE_MIN;
    }
  }

  function onChangeType() {
    typeInputElementValue = typeInputElement.value;
    var minPrice = getHousingPrice(typeInputElementValue);
    priceInputElement.setAttribute('min', minPrice);
    priceInputElement.setAttribute('placeholder', minPrice);
  }
  typeInputElement.addEventListener('change', onChangeType, false);

  createPins(mockData);

};

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
var onMainPinMouseup = function () {
  appActivate();
  mainPin.removeEventListener('mouseup', onMainPinMouseup, false);
};
mainPin.addEventListener('mouseup', onMainPinMouseup, false);

var mapElement = document.querySelector('.map');
var onMapElementClick = function (evt) {

  var target = evt.target;
  while (target !== mapElement) {
    if (target.className === 'map__pin') {
      var index = target.getAttribute('data-index');
      createAdvert(mockData[index]);

      return;
    }
    target = target.parentNode;
  }
};
mapElement.addEventListener('click', onMapElementClick, false);
