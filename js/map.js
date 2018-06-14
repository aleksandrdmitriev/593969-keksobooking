var numberOfObjects = 8;
var titleArr = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var typeArr = ['palace', 'flat', 'house', 'bungalo'];
var checkinArr = ['12:00', '13:00', '14:00'];
var checkoutArr = ['12:00', '13:00', '14:00'];
var featuresArr = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photosArr = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
var mockDataArray = [];

var titleRnd = function (){
  return titleArr[Math.floor(Math.random() * titleArr.length)];
};

var typeRnd = function (){
  return typeArr[Math.floor(Math.random() * typeArr.length)];
};

var checkinRnd = function (){
  return checkinArr[Math.floor(Math.random() * checkinArr.length)];
};

var checkoutRnd = function () {
  return checkoutArr[Math.floor(Math.random() * checkoutArr.length)];
};



function shuffleArr(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array [i];
    array [i]= array[j];
    array[j] = temp;
  }
  return array;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max +1 - min)) + min;
};

function getRndItems(n) {
  return Math.floor(Math.random() * (n + 1))
};


var createMockData = function (mockDataArray) {
  for (var i = 1; i <= numberOfObjects; i++){
    var x = getRandomInt(300, 900);
    var y = getRandomInt(130, 630);
    var featuresNewArr = shuffleArr(featuresArr);
//    console.log(featuresNewArr);
    var rndItems = getRndItems(featuresArr.length);
//    console.log(rndItems);
//    featuresNewArr = featuresNewArr.slice(1, rndItems);
//    console.log(featuresNewArr);
    var advert = {
      author: {
        avatar: 'img/avatars/user0' + [i] + '.png'
      },

      offer: {
        title: titleRnd(),
        address: x +', ' + y,
        price: getRandomInt(1000, 1000000),
        type: typeRnd(),
        rooms: getRandomInt(1, 6),
        guests: getRandomInt(1, 20),
        checkin: checkinRnd(),
        checkout: checkoutRnd(),
        features: featuresNewArr.slice(1, rndItems),
        description: null,
        photos: shuffleArr(photosArr),
      },

      location: {
        x: x,
        y: y,
      }
    };
    mockDataArray[i] = advert;
  };
  return mockDataArray;
};
console.log(createMockData(mockDataArray));



