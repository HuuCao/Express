const { addPermission,removePermisson } = require("../services/role");

module.exports.addPermission = (req, res, next) => {
  try {
    addPermission(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.removePermisson = (req, res, next) => {
    try {
        removePermisson(req, res, next);
    } catch (e) {
      next(e);
    }
  };
