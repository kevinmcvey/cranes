'use strict';

const SIGNAL_STATE_DICTIONARY = {
  '.': '1',
  '-': '111',
  'L': '000',
  'W': '0000000',
};

class SignalTranslator {
  constructor() {}

  translate(message) {
    let translation = '';

    for (let index = 0; index < message.length; index += 1) {
      const character = message[index];
      const nextCharacter = message[index + 1];

      const signal = SIGNAL_STATE_DICTIONARY[character.toUpperCase()];

      // Skip unknown morse characters. This shouldn't ever happen, I should probably throw.
      if (signal === undefined) {
        continue;
      }

      translation += signal;

      // Space out dits and dahs
      if (!this.isSpacer(character) && !this.isSpacer(nextCharacter)) {
        translation += '0';
      }
    }

    return translation;
  }

  isSpacer(character) {
    return character === 'L' || character === 'W';
  }
}

module.exports = SignalTranslator;
