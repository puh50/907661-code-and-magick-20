'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];

var getRandomValue = function (array) {
  var randomValue = Math.floor(Math.random() * array.length);
  return array[randomValue];
};

var createWizards = function (count) {
  for (var i = 0; i < count; i++) {
    var wizard = {
      name: getRandomValue(FIRST_NAME) + ' ' + getRandomValue(LAST_NAME),
      coatColor: getRandomValue(COAT_COLOR),
      eyesColor: getRandomValue(EYES_COLOR)
    };
    wizards.push(wizard);
  }
};
createWizards(5);

var renderWizard = function (wizard) {
  var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var templateCloned = wizardTemplate.cloneNode(true);

  var wizardName = templateCloned.querySelector('.setup-similar-label');
  var wizardCoat = templateCloned.querySelector('.wizard-coat');
  var wizardEyes = templateCloned.querySelector('.wizard-eyes');

  wizardName.textContent = wizard.name;
  wizardCoat.style.fill = wizard.coatColor;
  wizardEyes.style.fill = wizard.eyesColor;

  return templateCloned;
};

var setupSimilarList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();
for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}
setupSimilarList.appendChild(fragment);

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');
