const cry = require("crypto-js");

const encrypt = (data) => {
  return cry.AES.encrypt(
    data,
    process.env.HMAC_TOKEN_KEY
  ).toString();
};

const decrypt = (data) => {
  var bytes = cry.AES.decrypt(data, process.env.HMAC_TOKEN_KEY);
  return bytes.toString(cry.enc.Utf8)==""?false:bytes.toString(cry.enc.Utf8);
};

module.exports = {
  encrypt:encrypt,
  decrypt:decrypt
}



