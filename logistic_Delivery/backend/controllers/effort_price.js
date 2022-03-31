const {
  createEffortPrice,
  updateEffortPrice,
  getAllEffortPrice,
  getOneEffortPrice,
  removeEffortPricePkg,
  removeEffortPrice,
} = require("../services/effort_price");

// Not Check Invalid Data

module.exports.createEffortPrice = async (req, res, next) => {
  try {
    //let body = mappingInputData(init_efforprice, req.body);
    // await validator(descriptorCreateOrder, body);
    // console.log(req.user);

    if (req.user.role != "admin") {
      return res.status(401).send({ success: false, mess: "User Not Found" });
    }

    return createEffortPrice(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getAllEffortPrice = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).send({ success: false, mess: "User Not Found" });
    }
    return getAllEffortPrice(req, res, next);
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.getOneEffortPrice = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).send({ success: false, mess: "User not found" });
    }
    if (req.query.id == undefined)
      return res
        .status(401)
        .send({ success: false, mess: "Id effort price not found" });

    return getOneEffortPrice(req, res, next);
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.updateEffortPrice = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).send({ success: false, mess: "User Not Found" });
    }
    return updateEffortPrice(req, res, next);
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.removeEffortPricePkg = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res
        .status(401)
        .send({ success: false, mess: "Only Permission Admin" });
    }

    return removeEffortPricePkg(req, res, next);
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};

module.exports.removeEffortPrice = async (req, res, next) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).send({ success: false, mess: "User Not Found" });
    }

    return removeEffortPrice(req, res, next);
  } catch (e) {
    res.send({ success: false, mess: "Error: " + e });
  }
};
