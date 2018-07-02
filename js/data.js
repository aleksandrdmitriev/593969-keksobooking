'use strict';

(function () {

  var NUMBER_OF_OBJECTS = 8;
  var TITLE_ARRAY = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
  var CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
  var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_ARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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

  var getRandomArrayItem = function (array) {

    return array[Math.floor(Math.random() * array.length)];
  };

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
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

  // Создание массива фэйковых данных
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

  window.mockData = createMockData();
})();
