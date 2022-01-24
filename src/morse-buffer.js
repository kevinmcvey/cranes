'use strict';

// TODO: Share with morse-translator
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
  '!': '-.-.--',
  '@': '.--.-.',
  '$': '...-..-',
  '&': '.-...',
  '(': '-.--.',
  ')': '-.--.-',
  '.': '.-.-.-',
  ',': '--..--',
  '_': '..--.-',
  ':': '---...',
  ';': '-.-.-.',
  '=': '-...-',
  '+': '.-.-.',
  '-': '-....-',
  '/': '-..-.',
  '"': '.-..-.',
  '\'': '.----.',
  '?': '..--..',

  'DIT': '1',
  'DAH': '111',
  'DIT_GAP': '0',
  'LETTER_GAP': '000',
  'WORD_GAP': '0000000',
};

class MorseBuffer {
  constructor() {
    this.buffer = '';
    this.index = -1;
  }

  next() {
    this.index += 1;

    // Returns undefined if index is out-of-bounds
    return this.buffer[this.index];
  }

  addToBuffer(character) {
    const morseCharacter = this.translateCharacter(character);

    if (this.buffer.length && this.index < this.buffer.length) {
      const spacer = this.translatePrefixSpacer(character);
      this.buffer += (spacer + morseCharacter);
    } else {
      this.buffer = morseCharacter;
      this.index = -1;
    }
  }

  translateCharacter(character) {
    const codedCharacter = MORSE_DICTIONARY[character.toUpperCase()];

    // Skip characters we don't know
    if (codedCharacter === undefined) {
      return '';
    }

    return [...codedCharacter].map((morseCharacter) => {
      if (morseCharacter === '.') {
        return MORSE_DICTIONARY.DIT;
      } else if (morseCharacter === '-') {
        return MORSE_DICTIONARY.DAH;
      }
    }).join('0');
  }

  translatePrefixSpacer(character) {
    // Space will not be translated as a character, only as a spacer. The result should be 7
    // zeros in a row.
    if (character === ' ') {
      return MORSE_DICTIONARY.WORD_GAP;
    }

    // Do not prefix a spacer if the last character was a space
    if (this.buffer[this.buffer.length - 1] === '0') {
      return '';
    }

    return MORSE_DICTIONARY.LETTER_GAP;
  }

  isKnownCharacter(character) {
    return MORSE_DICTIONARY[character.toUpperCase()] !== undefined || character === ' ';
  }
}

module.exports = MorseBuffer;
