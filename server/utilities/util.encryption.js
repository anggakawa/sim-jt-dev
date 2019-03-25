require('dotenv').config();

const crypto = require('crypto');
// save variables below to environment variables
const algorithm = process.env.ENC_ALGO;
const password = process.env.ENC_PASS;

// need to update the logic using chiperIV
module.exports = {
  encrypt: function (text) {
    let cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }, 
  decrypt: function(text) {
    let decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}