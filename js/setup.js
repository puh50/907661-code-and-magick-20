'use strict';
(function () {
  window.wizard.create(4);

  var setupSimilarList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  window.wizard.list.forEach(function (item) {
    fragment.appendChild(window.wizard.render(item));
  });
  setupSimilarList.appendChild(fragment);

  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');

  // Open/Close settings window
  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var openPopupClickHandler = function () {
    setup.classList.remove('hidden');
  };

  var openPopupEnterHandler = function (evt) {
    if (evt.code === 'Enter') {
      setup.classList.remove('hidden');
    }
  };

  var setupClose = setup.querySelector('.setup-close');
  var closePopupClickHandler = function () {
    setup.classList.add('hidden');
    setupClose.removeEventListener('click', closePopupClickHandler);
  };

  var closePopupEscHandler = function (evt) {
    if (evt.code === 'Escape') {
      setup.classList.add('hidden');
      document.removeEventListener('keydown', closePopupEscHandler);
    }
  };

  var closePopupEnterHandler = function (evt) {
    if (evt.code === 'Enter') {
      setup.classList.add('hidden');
    }
  };

  var userNameField = setup.querySelector('.setup-user-name');
  userNameField.addEventListener('focus', function () {
    document.removeEventListener('keydown', closePopupEscHandler);
  });

  userNameField.addEventListener('blur', function () {
    document.addEventListener('keydown', closePopupEscHandler);
  });

  setupOpen.addEventListener('click', openPopupClickHandler);
  setupOpen.addEventListener('keydown', openPopupEnterHandler);
  setupClose.addEventListener('click', closePopupClickHandler);
  setupClose.addEventListener('keydown', closePopupEnterHandler);
  document.addEventListener('keydown', closePopupEscHandler);
})();
