'use strict';

const AudioContextSingleton = require('./audio-context-singleton');
const BoundingBox = require('./bounding-box');
const CenteredHtml = require('./centered-html');
const Controller = require('./controller');
const Crane = require('./crane');
const Light = require('./light');
const MorseBuffer = require('./morse-buffer');
const MorseStreamer = require('./morse-streamer');
const Oscillator = require('./oscillator');

const { IMAGE_WIDTH, IMAGE_HEIGHT, MORSE_INTERVAL_MS } = require('./constants');
const IMAGE_ASPECT_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;

const BACKGROUND_DIV_ID = 'background';
const CANVAS_ID = 'lights';

function constructLights(canvas, blobs) {
  return blobs.map((blob) => {
    return new Light(canvas, blob.cx, blob.cy, blob.r, blob.state);
  });
}

window.onload = () => {
  new CenteredHtml(BACKGROUND_DIV_ID, IMAGE_ASPECT_RATIO);
  new CenteredHtml(CANVAS_ID, IMAGE_ASPECT_RATIO);

  const canvas = document.getElementById(CANVAS_ID);
  const controller = new Controller(canvas);

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
      { cx: 3492, cy: 1344, r: 25, state: 'on' },
      { cx: 3225, cy: 1361, r: 25, state: 'on' },
    ]
  );

  const leftMorseBuffer1 = new MorseBuffer();
  const leftMorseStreamer1 = new MorseStreamer(leftMorseBuffer1, MORSE_INTERVAL_MS);
  const leftOscillator1 = new Oscillator(AudioContextSingleton, 659.25);
  const leftBox1 = new BoundingBox({ x: 868, y: 1083 }, { x: 1176, y: 1288 });
  const leftCrane1 = new Crane('left_1', controller, leftCrane1Lights, leftOscillator1, leftMorseStreamer1, 950, leftBox1);

  const leftMorseBuffer2 = new MorseBuffer();
  const leftMorseStreamer2 = new MorseStreamer(leftMorseBuffer2, MORSE_INTERVAL_MS);
  const leftOscillator2 = new Oscillator(AudioContextSingleton, 523.25);
  const leftBox2 = new BoundingBox({ x: 1178, y: 1040 }, { x: 1380, y: 1288 });
  const leftCrane2 = new Crane('left_2', controller, leftCrane2Lights, leftOscillator2, leftMorseStreamer2, 900, leftBox2);

  const centerMorseBuffer = new MorseBuffer();
  const centerMorseStreamer = new MorseStreamer(centerMorseBuffer, MORSE_INTERVAL_MS);
  const centerOscillator = new Oscillator(AudioContextSingleton, 440);
  const centerBox = new BoundingBox({ x: 1880, y: 1153 }, { x: 2022, y: 1270 });
  const centerCrane = new Crane('center', controller, centerCraneLights, centerOscillator, centerMorseStreamer, 1000, centerBox);

  const rightMorseBuffer = new MorseBuffer();
  const rightMorseStreamer = new MorseStreamer(rightMorseBuffer, MORSE_INTERVAL_MS);
  const rightOscillator = new Oscillator(AudioContextSingleton, 349.23);
  const rightBox = new BoundingBox({ x: 3222, y: 1326 }, { x: 3498, y: 1602 });
  const rightCrane = new Crane('right', controller, rightCraneLights, rightOscillator, rightMorseStreamer, 1100, rightBox);

  controller.registerCranes([leftCrane1, leftCrane2, centerCrane, rightCrane]);

  window.canvas = canvas;

  // TODO: Test on safari whether I can move this Audio initializer elsewhere.
  window.addEventListener('mouseup', (e) => {
    console.log(e);
    console.log(canvas);
    leftOscillator1.start();
    leftOscillator2.start();
    centerOscillator.start();
    rightOscillator.start();
  });

  // TODO: Silence and pause if move to a different tab

  // Prevent the window from scrolling on mobile
  window.addEventListener('touchmove', (e) => { e.preventDefault(); }, { passive: false });
};
