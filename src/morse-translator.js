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
};

class MorseTranslator {
  constructor() {}

  translate(message) {
    const translations = [...message].map((character) => {
      // Space is a special case used by the morse interpreter, return it as a space.
      if (character === ' ') {
        return ' ';
      }

      const translation = MORSE_DICTIONARY[character.toUpperCase()];

      // Skip characters we don't know
      if (translation === undefined) {
        return '';
      }

      return translation;
    });

    return translations.join('');
  }
}

module.exports = MorseTranslator;
