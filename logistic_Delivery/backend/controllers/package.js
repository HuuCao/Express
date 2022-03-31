const { validator, mappingInputData } = require("../common/utils");
const {
  initialPackage,
  changePackage,
  descriptorCreatePackage,
  descriptorChangePackage,
} = require("../configs/FormDataDefine/package");
const {
  createPackage,
  updatePackage,
  getPackageByStatus,
  reWareHouse,
  addPackageError,
  updateStatusPackage,
  updatesrclinkPackage,
  updateCodReceivedPackage,
  getPackageSuccess,
  getPackageErrorByWhId,
  getPackageByShipmentId,
  delPackageByPackageId,
  getPackageByShipperId,
  getPackageByWarehouseId,
  getPackageDoneCodByShipperId,
  updateAccounteenConfirmPackage,
  getPackageDoneCodByWarehouseId,
  getAllCustomerPreparingByWarehouseId,
  getAllPkgByReceiverId,
  getShippmentBrokenByWarehouseId,
  getPKGBrokenByShipmentAndWarehouseId,
  getPKGDoneByShipmentAndWarehouseId,
  getPKGReturningByShipmentAndWarehouseId,
  createPackageInShipment
} = require("../services/package");

module.exports.getPackageByStatus = async (req, res, next) => {
  try {
    getPackageByStatus(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.createPackage = async (req, res, next) => {
  try {
    let body = mappingInputData(initialPackage, req.body);
    await validator(descriptorCreatePackage, body);
    createPackage(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.updatePackage = async (req, res, next) => {
  try {
    let body = mappingInputData(changePackage, req.body);
    await validator(descriptorChangePackage, body);
    updatePackage(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.reWareHouse = async (req, res, next) => {
  try {
    reWareHouse(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.addPackageError = async (req, res, next) => {
  try {
    addPackageError(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.updateStatusPackage = async (req, res, next) => {
  try {
    updateStatusPackage(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.updatesrclinkPackage = async (req, res, next) => {
  try {
    updatesrclinkPackage(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.updateCodReceivedPackage = async (req, res, next) => {
  try {
    updateCodReceivedPackage(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getPackageSuccess = async (req, res, next) => {
  try {
    getPackageSuccess(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getPackageErrorByWhId = async (req, res, next) => {
  try {
    getPackageErrorByWhId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getPackageByShipmentId = async (req, res, next) => {
  try {
    getPackageByShipmentId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.deletePackageByPackageId = async (req, res, next) => {
  try {
    delPackageByPackageId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getPackageByShipperId = async (req, res, next) => {
  try {
    getPackageByShipperId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getPackageDoneCodByShipperId = async (req, res, next) => {
  try {
    getPackageDoneCodByShipperId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getpackagedonecodbywarehouseid = async (req, res, next) => {
  try {
    getPackageDoneCodByWarehouseId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getPackageByWarehouseId = async (req, res, next) => {
  try {
    getPackageByWarehouseId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getallpackagewarehousebystatus = async (req, res, next) => {
  try {
    getallpackagewarehousebystatus(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.updateaccounteenconfirmpackage = async (req, res, next) => {
  try {
    updateAccounteenConfirmPackage(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getAllCustomerPreparingByWarehouseId = async (
  req,
  res,
  next
) => {
  try {
    getAllCustomerPreparingByWarehouseId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getAllPkgByReceiverId = async (req, res, next) => {
  try {
    getAllPkgByReceiverId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getShippmentBrokenByWarehouseId = async (req, res, next) => {
  try {
    getShippmentBrokenByWarehouseId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getPKGBrokenByShipmentAndWarehouseId = async (
  req,
  res,
  next
) => {
  try {
    getPKGBrokenByShipmentAndWarehouseId(req, res, next);
  } catch (e) {
    next(e);
  }
};

module.exports.getPKGDoneByShipmentAndWarehouseId = async (req, res, next) => {
  try {
    getPKGDoneByShipmentAndWarehouseId(req, res, next);
  } catch (e) {
    next(e);
  }
};


module.exports.getPKGReturningByShipmentAndWarehouseId= async (req, res, next) => {
	try {
		getPKGReturningByShipmentAndWarehouseId(req, res, next);
	} catch (e) {
	  next(e);
	}
  };

  


module.exports.createPackageInShipment = async (req, res, next) => {
	try {
		createPackageInShipment(req, res, next);
	} catch (e) {
	  next(e);
	}
  };
