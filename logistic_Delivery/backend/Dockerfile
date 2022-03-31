FROM node:12

WORKDIR /app

COPY . /app

RUN openssl genrsa -out configs/accessTokenPrivateKey.pem 2048
RUN openssl genrsa -out configs/refreshTokenPrivateKey.pem 2048

RUN openssl rsa -in configs/accessTokenPrivateKey.pem -pubout -outform PEM -out configs/accessTokenPublicKey.pem
RUN openssl rsa -in configs/refreshTokenPrivateKey.pem -pubout -outform PEM -out configs/refreshTokenPublicKey.pem
RUN mkdir -p /app/assets/productImages/
RUN mkdir -p /app/assets/invoiceFile/

RUN npm i

CMD ["npm", "start"]