const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    message = message.toUpperCase();
    key = key.toUpperCase();
    let encryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const messageChar = message[i];
      const keyChar = key[keyIndex % key.length];

      if (messageChar >= 'A' && messageChar <= 'Z') {
        const encryptedChar = String.fromCharCode(((messageChar.charCodeAt(0) - 65 + keyChar.charCodeAt(0) - 65) % 26) + 65);
        encryptedMessage += encryptedChar;
        keyIndex++;
      } else {
        encryptedMessage += messageChar;
      }
    }

    return this.isDirect ? encryptedMessage : encryptedMessage.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();
    let decryptedMessage = '';
    let keyIndex = 0;

    for (let i = 0; i < encryptedMessage.length; i++) {
      const encryptedChar = encryptedMessage[i];
      const keyChar = key[keyIndex % key.length];

      if (encryptedChar >= 'A' && encryptedChar <= 'Z') {
        const decryptedChar = String.fromCharCode(((encryptedChar.charCodeAt(0) - 65 - (keyChar.charCodeAt(0) - 65) + 26) % 26) + 65);
        decryptedMessage += decryptedChar;
        keyIndex++;
      } else {
        decryptedMessage += encryptedChar;
      }
    }

    return this.isDirect ? decryptedMessage : decryptedMessage.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
