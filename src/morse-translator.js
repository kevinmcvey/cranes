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

class MorseTranslator {
  constructor() {}

  translate(message) {
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
}

module.exports = MorseTranslator;
