const crypto = require('crypto');
// save variables below to environment variables
const algorithm = 'aes-256-ctr';
const password = 'dFeCCasdwww'; 


module.exports = {
  async encrypt(text) {
    let cipher = crypto.createCipher(algorithm, password);
    let crypted = await cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }, 
  async decrypt(text) {
    let decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }
}