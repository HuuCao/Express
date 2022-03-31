import { combineReducers } from "redux"
import { LoginReducer } from "./login"
import { ListShipmentReducer } from "./list-shipment"
import { ListClientReducer } from "./list-client"
import { ListPackageReducer } from "./list-package"
import { UpdatePackageStatusReducer } from "./update-package-status"
import { ListShipperReducer } from "./list-shipper"
import { ListFilterButtonReducer } from "./filter"
import { UpdatePackageDetailReducer } from "./update-package-detail"
import { UpdateCodReceivedReducer } from "./update-cod-received"
import { fetchPackageDoneReducer } from "./fetch-package-done-by-shipper-id"
import { ReasonReducer } from "./fetch-reason"
import { ListPackageByShipmentIdQrcodeReducer } from "./fetch-package-by-shipment-id-qrcode"
import { fetchWalletDetailShipper } from "./fetch-wallet-detail-shipper"

const rootReducer = combineReducers({
  LoginReducer,
  ListShipmentReducer,
  ListClientReducer,
  ListPackageReducer,
  UpdatePackageStatusReducer,
  ListShipperReducer,
  ListFilterButtonReducer,
  UpdatePackageDetailReducer,
  UpdateCodReceivedReducer,
  fetchPackageDoneReducer,
  ReasonReducer,
  ListPackageByShipmentIdQrcodeReducer,
  fetchWalletDetailShipper
})

export default rootReducer
