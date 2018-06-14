var NUMBER_OF_OBJECTS = 8;
var TITLE_ARR = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE_ARR = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_ARR = ['12:00', '13:00', '14:00'];
var CHECKOUT_ARR = ['12:00', '13:00', '14:00'];
var FEATURES_ARR = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARR = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
var mockDataArray = [];

var getRndArrayItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

function shuffleArr(array) {
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

function getRndItems(n) {
  return Math.floor(Math.random() * (n + 1));
}

var createMockData = function (array) {
  for (var i = 1; i <= NUMBER_OF_OBJECTS; i++) {
    var x = getRandomInt(X_MIN, X_MAX);
    var y = getRandomInt(Y_MIN, Y_MAX);
    var featuresNewArr = shuffleArr(FEATURES_ARR);
    var rndItems = getRndItems(FEATURES_ARR.length);
    var advert = {
      author: {
        avatar: 'img/avatars/user0' + [i] + '.png'
      },

      offer: {
        title: getRndArrayItem(TITLE_ARR),
        address: x + ', ' + y,
        price: getRandomInt(PRICE_MIN, PRICE_MAX),
        type: getRndArrayItem(TYPE_ARR),
        rooms: getRandomInt(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomInt(GUESTS_MIN, GUESTS_MAX),
        checkin: getRndArrayItem(CHECKIN_ARR),
        checkout: getRndArrayItem(CHECKOUT_ARR),
        features: featuresNewArr.slice(1, rndItems),
        description: null,
        photos: shuffleArr(PHOTOS_ARR),
      },

      location: {
        x: x,
        y: y,
      }
    };
    mockDataArray[i] = advert;
  }
  return array;
};
createMockData(mockDataArray);
