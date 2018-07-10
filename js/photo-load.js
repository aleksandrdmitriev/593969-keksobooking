'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoLayout = document.querySelector('.ad-form__photo');
  var photoTemplate = document.querySelector('template')
    .content
    .querySelector('.ad-form__img');

  fileChooser.addEventListener('change', function () {
    debugger;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < fileChooser.files.length; i++) {
      var photoElement = photoTemplate.cloneNode(true);

      var file = fileChooser.files[i];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          photoElement.src = reader.result;

          fragment.appendChild(photoElement);

        });

        reader.readAsDataURL(file);
      }
    }
    photoLayout.appendChild(fragment);

  });
})();
