body:
ex : {
"encry":"U2FsdGVkX18VZMLV2IPgXk+ydEALEH0XZ8uyelij9gjN/S7GGlXZv48RDdqRzTrUmxe1OMdZ+unV0O7+qYJGw=="
}


code HMAC CLIENT
const cry = require("crypto-js");

const encrypt = (data) => {
  return cry.AES.encrypt(
    data,
    process.env.HMAC_TOKEN_KEY
  ).toString();
};
