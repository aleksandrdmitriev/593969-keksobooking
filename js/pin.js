'use strict';

(function () {

  var PIN_WIDTH = 50; // ширина пина пина
  var PIN_HEIGHT = 70; // высота пина

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
})();
