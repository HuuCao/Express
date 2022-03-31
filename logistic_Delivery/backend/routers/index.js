const express = require("express");

module.exports = express
  .Router()
  .use("/auth", require("./auth"))
  .use("/shipment", require("./shipments"))
  .use("/package", require("./package"))
  .use("/users", require("./users"))
  .use("/images", express.static(__dirname + "/../assets/productImages"))
  .use("/assets", express.static(__dirname + "/../assets/"))
  .use("/companies", require("./companies"))
  .use("/warehouse", require("./warehouse"))
  .use("/shipper", require("./shipper"))
  .use("/reason", require("./reason"))
  .use("/cusreceiver", require("./cus_receiver"))
  .use("/roles", require("./roles"))
  .use("/order", require("./order"))
  .use("/shipping", require("./shipping_partner"))
  .use("/statistical", require("./statistical"))
  .use("/debit", require("./debit"))
  .use("/promotion", require("./promotion"))
  .use("/card", require("./card_io"))
  .use("/price", require("./effort_price"));
