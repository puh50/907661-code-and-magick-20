'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var WIN_TEXT_X = 20;
var WIN_TEXT_Y = 30;
var FONT_GAP = 15;
var BAR_HEIGHT = 150;
var barWidth = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {

    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }

  }

  return maxElement;
};

var renderWinText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT mono';
  ctx.textBaseLine = 'hanging';

  ctx.fillText(text, x, y);
};

var getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

var renderBar = function (ctx, text, color, i, time, maxTime) {
  ctx.fillStyle = '#000';
  ctx.fillText(text, CLOUD_X + GAP + (GAP + barWidth) * i, CLOUD_Y + FONT_GAP * 1.5 + WIN_TEXT_Y + GAP + BAR_HEIGHT);
  ctx.fillText(time, CLOUD_X + GAP + (GAP + barWidth) * i, CLOUD_Y + FONT_GAP + WIN_TEXT_Y + GAP + BAR_HEIGHT - (BAR_HEIGHT * time) / maxTime - FONT_GAP * 1.5);
  ctx.fillStyle = color;
  ctx.fillRect(CLOUD_X + GAP + barWidth + (GAP + barWidth) * i, CLOUD_Y + (GAP + WIN_TEXT_Y) + BAR_HEIGHT, -barWidth, -((BAR_HEIGHT * time) / maxTime));
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderWinText(ctx, 'Ура Вы победили!', CLOUD_X + WIN_TEXT_X, CLOUD_Y + WIN_TEXT_Y);
  renderWinText(ctx, 'Список результатов:', CLOUD_X + WIN_TEXT_X, CLOUD_Y + FONT_GAP + WIN_TEXT_Y);

  var maxTime = getMaxElement(times);

  var rnd;

  for (var i = 0; i < players.length; i++) {

    rnd = getRandomInt(100) + '%';

    if (players[i] !== 'Вы') {
      renderBar(ctx, players[i], 'hsl(240,' + rnd + ',50%)', i, Math.round(times[i]), maxTime);
    } else {
      renderBar(ctx, players[i], 'rgba(255, 0, 0, 1)', i, Math.round(times[i]), maxTime);
    }

  }

};
