'use strict';

var FIRST_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

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
createWizards(4);

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

// Coat-color changing by clicking on it
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardCoatClickHandler = function () {
  wizardCoat.style.fill = getRandomValue(COAT_COLOR);
};

wizardCoat.addEventListener('click', wizardCoatClickHandler);

// Eyes-color changing by clicking on it
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardEyesClickHandler = function () {
  wizardEyes.style.fill = getRandomValue(EYES_COLOR);
};

wizardEyes.addEventListener('click', wizardEyesClickHandler);

// Fireball-color changing by clicking on it
var wizardFireballWrap = setup.querySelector('.setup-fireball-wrap');
var fireballInput = setup.querySelector('.setup-fireball-wrap input[name="fireball-color"]');
var wizardFireballClickHandler = function () {
  wizardFireballWrap.style.background = getRandomValue(FIREBALL_COLOR);
  fireballInput.value = wizardFireballWrap.style.background;
};

wizardFireballWrap.addEventListener('click', wizardFireballClickHandler);

// Validation

var form = setup.querySelector('.setup-wizard-form');
var userNameInput = form.querySelector('.setup-user-name');
userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя должно состоять не более чем из 25 символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;
  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Введите ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});
