'use strict';

const AudioContextSingleton = require('./audio-context-singleton');
const CenteredHtml = require('./centered-html');
const Crane = require('./crane');
const Light = require('./light');
const MorseBuffer = require('./morse-buffer');
const MorseStreamer = require('./morse-streamer');
const Oscillator = require('./oscillator');

const IMAGE_WIDTH = 4032;
const IMAGE_HEIGHT = 2548;
const IMAGE_ASPECT_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;

const BACKGROUND_DIV_ID = 'background';
const CANVAS_ID = 'lights';

const MORSE_INTERVAL_MS = 100;

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

  const morseBuffer = new MorseBuffer();
  const morseStreamer = new MorseStreamer(morseBuffer, MORSE_INTERVAL_MS);

  const oscillator = new Oscillator(AudioContextSingleton, 641); // 300 sounds nice too

  window.addEventListener('mouseup', () => {
    oscillator.start();
  });

  window.oscillator = oscillator;

  // TODO: Make it possible to delay a callback. That way audio and visual can sync without
  //       using setTimeout which is not great.
  morseStreamer.registerCallback((bit) => {
    if (bit === '1') {
      setTimeout(() => { leftCrane1.on(); }, 16);
      oscillator.setGain(0.1);
    } else if (bit === '0') {
      setTimeout(() => { leftCrane1.off(); }, 16);
      oscillator.setGain(0.0);
    }
  });

  // TODO: Silence and pause if move to a different tab

  // Prevent the window from scrolling on mobile
  window.addEventListener('touchmove', (e) => { e.preventDefault(); }, { passive: false });
};
