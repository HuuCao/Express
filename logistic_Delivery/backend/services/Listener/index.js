const fs = require('fs');
const path = require('path');

module.exports = () => {
  fs.readdir(__dirname, (err, files) => {
    files
      .filter(pathfile => pathfile !== "index.js" && pathfile.slice(-3) === ".js")
      .map(pathfile => {
        return require(path.join(__dirname, pathfile))()
      })
  })
}