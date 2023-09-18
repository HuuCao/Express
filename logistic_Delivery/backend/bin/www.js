#!/usr/bin/env node
/**
 * Module dependencies.
 */

var app = require("../app");
var http = require("http");
var HTTPS = require("https");
var fs = require("fs");
const os = require("os");
const net = os.networkInterfaces();

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

loadEnviromentBeforListen()
  .then(() => server.listen(port))
  .catch((err) => console.log(err));

server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var host = "Listening on http://localhost";
  var bind = typeof addr === "string" ? "pipe " + addr : ":" + addr.port;
  console.log(host + bind);
}

//read token from file .pem
async function loadEnviromentBeforListen() {
  console.log("Load enviroment...");
  const readFilePromise = (path) =>
    new Promise((resolve, reject) => {
      fs.readFile(path, { encoding: "utf8" }, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });

  const [
    accessTokenPrivateKey,
    refreshTokenPrivateKey,
    accessTokenPublicKey,
    refreshTokenPublicKey,
  ] = await Promise.all([
    readFilePromise(__dirname + "/../configs/accessTokenPrivateKey.pem"),
    readFilePromise(__dirname + "/../configs/refreshTokenPrivateKey.pem"),
    readFilePromise(__dirname + "/../configs/accessTokenPublicKey.pem"),
    readFilePromise(__dirname + "/../configs/refreshTokenPublicKey.pem"),
  ]);

  process.env.HMAC_TOKEN_KEY = "huucao";
  process.env.ACCESS_TOKEN_PRIVATE_KEY = accessTokenPrivateKey;
  process.env.REFRESH_TOKEN_PRIVATE_KEY = refreshTokenPrivateKey;
  process.env.ACCESS_TOKEN_PUBLIC_KEY = accessTokenPublicKey;
  process.env.REFRESH_TOKEN_PUBLIC_KEY = refreshTokenPublicKey;
  process.env.ACCESS_TOKEN_EXPRISE_TIME = 1800;
  process.env.REFRESH_TOKEN_EXPRISE_TIME = 86400;
}

var opsys = process.platform;
if (opsys == "darwin" || opsys == "win32" || opsys == "win64") {
  console.log("Start http on local !");
} else {
  var options = {
    key: fs.readFileSync("/etc/letsencrypt/live/sellapp.baobaoexpress.net/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/sellapp.baobaoexpress.net/cert.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/sellapp.baobaoexpress.net/chain.pem"),
  };

  HTTPS.createServer(options, app).listen(3002);
}
