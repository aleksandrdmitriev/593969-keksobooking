'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.debounce = {};

  window.debounce.removeDebounce = function (fun) {

    return function () {

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    };

  };
})();
