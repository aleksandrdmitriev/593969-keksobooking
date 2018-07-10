'use strict';

(function () {

  window.debounce = {};

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  window.debounce.removeDebounce = function (fun) {

    return function () {

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    };

  };
})();
