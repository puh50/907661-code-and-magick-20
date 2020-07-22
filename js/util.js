'use strict';

(function () {
  window.util = {
    getRandomValue: function (array) {
      var randomValue = Math.floor(Math.random() * array.length);
      return array[randomValue];
    }
  };
})();
