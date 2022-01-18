'use strict';

const CenteredHtml = require('./centered-html');
const Crane = require('./crane');
const Light = require('./light');

const IMAGE_WIDTH = 4032;
const IMAGE_HEIGHT = 2548;
const IMAGE_ASPECT_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;

const BACKGROUND_DIV_ID = 'background';
const CANVAS_ID = 'lights';

// function constructLights(canvasId, blobs) {
function constructLights(canvas, blobs) {
  return blobs.map((blob) => {
    return new Light(canvas, blob.cx, blob.cy, blob.r, blob.state);
  });
}

window.onload = () => {
  new CenteredHtml(BACKGROUND_DIV_ID, IMAGE_ASPECT_RATIO);
  new CenteredHtml(CANVAS_ID, IMAGE_ASPECT_RATIO);

  const canvas = document.getElementById(CANVAS_ID);

  const leftCrane1Lights = constructLights(
    canvas,
    [
      { cx: 874, cy: 1088, r: 25, state: 'off' },
      { cx: 1124, cy: 1078, r: 25, state: 'on' },
      { cx: 1233, cy: 1080, r: 25, state: 'off' },
    ]
  );

  const leftCrane2Lights = constructLights(
    canvas,
    [
      { cx: 1100, cy: 1120, r: 25, state: 'off' },
      { cx: 1284, cy: 1046, r: 25, state: 'on' },
      { cx: 1368, cy: 1081, r: 25, state: 'on' },
    ]
  );

  const centerCraneLights = constructLights(
    canvas,
    [
      { cx: 1936, cy: 1160, r: 25, state: 'off' },
      { cx: 2018, cy: 1196, r: 25, state: 'off' },
    ]
  );

  const rightCraneLights = constructLights(
    canvas,
    [
      { cx: 3492, cy: 1344, r: 25, state: 'off' },
      { cx: 3225, cy: 1361, r: 25, state: 'off' },
    ]
  );

  const leftCrane1 = new Crane('left_1', leftCrane1Lights);
  const leftCrane2 = new Crane('left_2', leftCrane2Lights);
  const centerCrane = new Crane('center', centerCraneLights);
  const rightCrane = new Crane('right', rightCraneLights);

  setInterval(function() {
    leftCrane1.toggle();
  }, 1000);

  setInterval(function() {
    leftCrane2.toggle();
  }, 1300);

  setInterval(function() {
    centerCrane.toggle();
  }, 900);

  setInterval(function() {
    rightCrane.toggle();
  }, 2000);

  // Prevent the window from scrolling on mobile
  window.addEventListener('touchmove', (e) => { e.preventDefault(); }, { passive: false });
};
