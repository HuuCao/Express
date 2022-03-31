const {primaryDB} = require('./../models')
module.exports = {
  up: () => {
    return primaryDB.rolePermissions.create( [{
      id:1,
      role_id:1,
      permission_id:1
  }]);
  }
};