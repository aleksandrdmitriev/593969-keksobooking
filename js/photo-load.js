'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoLayout = document.querySelector('.ad-form__photo');
  var photoTemplate = document.querySelector('template').content.querySelector('.ad-form__img');

  fileChooser.addEventListener('change', function () {
    for (var i = 0; i < fileChooser.files.length; i++) {
      (function (i) {
        var photoElement = photoTemplate.cloneNode(true);

        var file = fileChooser.files[i];
        var fileName = file.name.toLowerCase();

        var getMatch = function (it) {
          return fileName.endsWith(it);
        };

        var matches = FILE_TYPES.some(getMatch);

        if (matches) {

          var reader = new FileReader();

          var renderImg = function () {
            photoElement.src = reader.result;
            photoLayout.appendChild(photoElement);
          };
          reader.addEventListener('load', renderImg);

          reader.readAsDataURL(file);

        }

      })(i);
    }

  });

})();

