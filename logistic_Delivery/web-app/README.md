Infomation from BE:
Link kiểm tra các API đang khả dụng:
https://docs.google.com/spreadsheets/d/1hQyVD4IIKCpevwJ6_DKcy23nsDlX1hUf4M420dGKlmg/edit#gid=0


nội dung file lấy encypt Hmac với key được lưu ở .env:

const cry = require("crypto-js");

const encrypt = (data) => {
  return cry.AES.encrypt(
    data,
    process.env.HMAC_TOKEN_KEY
  ).toString();
};

HMAC_TOKEN_KEY=viesoftware ( .env )

Trong body sẽ truyền thêm 1 thuộc tính 
body : {
    "encry":"U2FsdGVkX18VZMLV2IPgXk+ydEALEH0XZ8uyelij9gjN/S7GGlXZv48RDdqRzTrUmxe1OMdZ+unV0O7+qYJGw=="
}

<!-- ssh root@119.82.130.212
upak7zDrAzmwbb6
rm -r /var/www/express/build -->
