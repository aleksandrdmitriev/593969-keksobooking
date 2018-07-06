'use strict';

(function () {

  // Перевод типа жилья на русский язык
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

  window.popupAdvert = document.querySelector('.popup');

  // Закрытие объявления
  window.onCloseButtonClick = function () {
    window.popupAdvert.parentNode.removeChild(window.popupAdvert);
    event.stopPropagation();
  };

  // Создание объявления
  window.createAdvert = function (dataArrayItem) {
    window.popupAdvert = document.querySelector('.popup');
    if (window.popupAdvert !== null) {
      window.onCloseButtonClick();
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

    window.popupAdvert = document.querySelector('.popup');
    var buttonClose = window.popupAdvert.querySelector('.popup__close');

    buttonClose.addEventListener('click', window.onCloseButtonClick, false);
    document.addEventListener('keydown', window.onCloseButtonClick);
  };
})();
