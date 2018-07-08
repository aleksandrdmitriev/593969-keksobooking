'use strict';

(function () {

  var HTTP_STATUS_OK = 200;

  // Загрузка данных
  window.load = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 3000;

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };

  //  Отправка данных

  window.save = function (data, onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobookin';
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_STATUS_OK) {
        onSuccess();
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Данные не отправились за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
