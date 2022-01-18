'use strict';

const MORSE_DICTIONARY = {
  'A': '.-',
  'B': '-...',
  'C': '-.-.',
  'D': '-..',
  'E': '.',
  'F': '..-.',
  'G': '--.',
  'H': '....',
  'I': '..',
  'J': '.---',
  'K': '-.-',
  'L': '.-..',
  'M': '--',
  'N': '-.',
  'O': '---',
  'P': '.--.',
  'Q': '--.-',
  'R': '.-.',
  'S': '...',
  'T': '-',
  'U': '..-',
  'V': '...-',
  'W': '.--',
  'X': '-..-',
  'Y': '-.--',
  'Z': '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '&': '.-...',
  '\'': '.----.',
  '@': '.--.-.',
  ')': '-.--.-',
  '(': '-.--.',
  ':': '---...',
  ',': '--..--',
  '=': '-...-',
  '!': '-.-.--',
  '.': '.-.-.-',
  '-': '-....-',
  '+': '.-.-.',
  '"': '.-..-.',
  '?': '..--..',
  '/': '-..-.',

  'LETTER_GAP': 'L',
  'WORD_GAP': 'W',
  'OVER': '-.-',
};

const SIGNAL_STATE_DICTIONARY = {
  '.': '1',
  '-': '111',
  'L': '000',
  'W': '0000000',
};

class MorseTranslator {
  constructor() {}

  translateStringToMorse(message) {
    let translation = '';

    for (let index = 0; index < message.length; index += 1) {
      const character = message[index];
      const nextCharacter = message[index + 1];

      const translatedCharacter = MORSE_DICTIONARY[character.toUpperCase()];
      let spacer = '';

      // Skip characters we don't know
      if (translatedCharacter === undefined) {
        continue;
      }

      if (nextCharacter === ' ') {
        spacer = MORSE_DICTIONARY.WORD_GAP;
      } else if (nextCharacter === undefined) {
        // End of string gets the... artistic flourish... of the "OVER" Prosign
        spacer = MORSE_DICTIONARY.WORD_GAP + MORSE_DICTIONARY.OVER;
      } else {
        spacer = MORSE_DICTIONARY.LETTER_GAP;
      }

      translation += (translatedCharacter + spacer);
    }

    return translation;
  }

  translateMorseToSignal(message) {
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

      const lastCharacter = nextCharacter === undefined;

      // Space out dits and dahs
      if (!lastCharacter && !this.isSpacer(character) && !this.isSpacer(nextCharacter)) {
        translation += '0';
      }
    }

    return translation;
  }

  isSpacer(character) {
    return character === 'L' || character === 'W';
  }
}

module.exports = MorseTranslator;
