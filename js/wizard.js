'use strict';

(function () {
  var FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setup = document.querySelector('.setup');

  // Coat-color changing by clicking on it
  var coat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardCoatClickHandler = function () {
    coat.style.fill = window.util.getRandomValue(COAT_COLOR);
  };

  coat.addEventListener('click', wizardCoatClickHandler);

  // Eyes-color changing by clicking on it
  var eyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardEyesClickHandler = function () {
    eyes.style.fill = window.util.getRandomValue(EYES_COLOR);
  };

  eyes.addEventListener('click', wizardEyesClickHandler);

  // Fireball-color changing by clicking on it
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');
  var fireballInput = setup.querySelector('.setup-fireball-wrap input[name="fireball-color"]');
  var wizardFireballClickHandler = function () {
    fireballWrap.style.background = window.util.getRandomValue(FIREBALL_COLOR);
    fireballInput.value = fireballWrap.style.background;
  };

  fireballWrap.addEventListener('click', wizardFireballClickHandler);

  window.wizard = {
    list: [],
    create: function (count) {
      for (var i = 0; i < count; i++) {
        var wizard = {
          name: window.util.getRandomValue(FIRST_NAME) + ' ' + window.util.getRandomValue(LAST_NAME),
          coatColor: window.util.getRandomValue(COAT_COLOR),
          eyesColor: window.util.getRandomValue(EYES_COLOR)
        };
        window.wizard.list.push(wizard);
      }
    },
    render: function (wizard) {
      var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
      var templateCloned = wizardTemplate.cloneNode(true);

      var wizardName = templateCloned.querySelector('.setup-similar-label');
      var wizardCoat = templateCloned.querySelector('.wizard-coat');
      var wizardEyes = templateCloned.querySelector('.wizard-eyes');

      wizardName.textContent = wizard.name;
      wizardCoat.style.fill = wizard.coatColor;
      wizardEyes.style.fill = wizard.eyesColor;

      return templateCloned;
    }
  };
})();
