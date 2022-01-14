'use strict';

const CenteredHtml = require('./centered-html');
const Crane = require('./crane');
const Light = require('./light');

const IMAGE_WIDTH = 4032;
const IMAGE_HEIGHT = 2548;
const IMAGE_ASPECT_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;

window.onload = () => {
  new CenteredHtml('background', IMAGE_ASPECT_RATIO);
  new CenteredHtml('lights', IMAGE_ASPECT_RATIO);

  const leftCrane1 = new Crane('lights', [
    { cx: 874, cy: 1088, r: 25, state: 'off' },
    { cx: 1124, cy: 1078, r: 25, state: 'on' },
    { cx: 1233, cy: 1080, r: 25, state: 'off' },
  ]);

  const leftCrane2 = new Crane('lights', [
    { cx: 1100, cy: 1120, r: 25, state: 'off' },
    { cx: 1284, cy: 1046, r: 25, state: 'on' },
    { cx: 1368, cy: 1081, r: 25, state: 'on' },
  ]);

  const midCrane = new Crane('lights', [
    { cx: 1936, cy: 1160, r: 25, state: 'off' },
    { cx: 2018, cy: 1196, r: 25, state: 'off' },
  ]);

  const rightCrane = new Crane('lights', [
    { cx: 3492, cy: 1344, r: 25, state: 'off' },
    { cx: 3225, cy: 1361, r: 25, state: 'off' },
  ]);

  setInterval(function() {
    leftCrane1.toggle();
  }, 1000);

  setInterval(function() {
    leftCrane2.toggle();
  }, 1300);

  setInterval(function() {
    midCrane.toggle();
  }, 900);

  setInterval(function() {
    rightCrane.toggle();
  }, 2000);

  // Prevent the window from scrolling on mobile
  window.addEventListener('touchmove', (e) => { e.preventDefault(); }, { passive: false });
};
