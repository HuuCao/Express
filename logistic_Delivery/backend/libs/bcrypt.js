const bcrypt = require('bcrypt');

module.exports.hash = (data) => bcrypt.hashSync(data, bcrypt.genSaltSync());
module.exports.compare = (data, hash) => bcrypt.compareSync(data, hash);