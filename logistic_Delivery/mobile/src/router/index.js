import LoginScreen from "../screens/login-screen"
import RegisterScreen from "../screens/register-screen"

//shipper screen
import MainShipperScreen from "../screens/shipper-screen/list-package"
import WalletShipperScreen from "../screens/shipper-screen/wallet"
import DeliveryStatusScreen from "../screens/shipper-screen/delivery-status"
import PackageDetailShipperScreen from "../screens/shipper-screen/package-detail"
import ListPackageByShipmentIdScreen from "../screens/qrcode-screen/list-package-by-shipment-id"
import ListPackageShipperScreen from "../screens/qrcode-screen/list-package-shipper-screen"
//admin screen
import MainWarehouseScreen from "../screens/warehouse-screen/main"
import ListWalletWarehouseScreen from "../screens/warehouse-screen/list-wallet"
import WalletDetailWarehouseScreen from "../screens/warehouse-screen/wallet-detail"
import ListReturnPackageScreen from "../screens/warehouse-screen/list-return-package"
import ImportWarehouseScreen from "../screens/warehouse-screen/import"
import PackageDetailWarehouseScreen from "../screens/warehouse-screen/package-detail"
import DeliveryListWarehouseScreen from "../screens/warehouse-screen/delivery-list"
import ListShipperWarehouseScreen from "../screens/warehouse-screen/list-shipper"
import ListPackageScreen from "../screens/warehouse-screen/list-package"
//common screen
import PackageDeliveryScreen from "../screens/package-delivery-screen"
import QrcodeScreen from "../screens/qrcode-screen"
import SuccsessDeliveryScreen from "../screens/success-delivery-sceen"
//auth
import Auth from "../auth/auth"

export const ROUTER = [
  {
    key: 0,
    name: "Auth",
    component: Auth,
    options: {headerShown: false},
  },
  {
    key: 1,
    name: "LoginScreen",
    component: LoginScreen,
    options: {headerShown: false},
    headerLeftVisible: true,
  },
  {
    key: 2,
    name: "RegisterScreen",
    component: RegisterScreen,
    options: {headerShown: false},
  },
  {
    key: 4,
    name: "PackageDeliveryScreen",
    component: PackageDeliveryScreen,
    options: {
      title: "Giao hoặc trả hàng",
    },
  },
  {
    key: 5,
    name: "SuccsessDeliveryScreen",
    component: SuccsessDeliveryScreen,
    options: {headerShown: false},
  },
  {
    key: 6,
    name: "WalletDetailWarehouseScreen",
    component: WalletDetailWarehouseScreen,
    options: {
      title: "Ví tiền",
    },
  },
  {
    key: 7,
    name: "DeliveryStatusScreen",
    component: DeliveryStatusScreen,
  },
  {
    key: 8,
    name: "ImportWarehouseScreen",
    component: ImportWarehouseScreen,
    options: {
      title: "Danh sách shipment",
    },
  },
  {
    key: 9,
    name: "PackageDetailWarehouseScreen",
    component: PackageDetailWarehouseScreen,
    options: {
      title: "Chi tiết kiện hàng",
    },
  },
  {
    key: 10,
    name: "DeliveryListWarehouseScreen",
    component: DeliveryListWarehouseScreen,
    options: {
      title: "Đơn cần giao",
    },
  },
  {
    key: 11,
    name: "ListShipperWarehouseScreen",
    component: ListShipperWarehouseScreen,
    options: {
      title: "Chọn shipper",
    },
  },
  {
    key: 12,
    name: "MainShipperScreen",
    component: MainShipperScreen,
    options: {title: "Danh sách đơn hàng", animationEnabled: false},
    headerRight: true,
    headerRightMove: "WalletShipperScreen",
    headerRightIcon: "money",
    headerLeftVisible: true,
    iconLogout: true,
  },
  {
    key: 14,
    name: "QrcodeScreen",
    component: QrcodeScreen,
    options: {title: "Quét mã"},
  },
  {
    key: 15,
    name: "WalletShipperScreen",
    component: WalletShipperScreen,
    options: {title: "Ví tiền"},
  },
  {
    key: 16,
    name: "MainWarehouseScreen",
    component: MainWarehouseScreen,
    options: {
      title: "Thủ kho",
      animationEnabled: false,
    },
    headerLeftVisible: true,
    headerRight: true,
    iconLogout: true,
  },
  {
    key: 17,
    name: "WalletWarehouseScreen",
    component: ListWalletWarehouseScreen,
    options: {
      title: "Danh sách ví tiền",
    },
  },
  {
    key: 18,
    name: "ListReturnPackageScreen",
    component: ListReturnPackageScreen,
    options: {
      title: "Danh sách hàng trả về",
    },
  },
  {
    key: 19,
    name: "PackageDetailShipperScreen",
    component: PackageDetailShipperScreen,
    options: {
      title: "Chi tiết kiện hàng",
    },
  },
  {
    key: 20,
    name: "ListPackageScreen",
    component: ListPackageScreen,
    options: {
      title: "Danh sách kiện hàng shipment",
    },
  },
  {
    key: 21,
    name: "ListPackageByShipmentIdScreen",
    component: ListPackageByShipmentIdScreen,
    options: {
      title: "Danh sách kiện hàng shipment",
    },
  },
  {
    key: 22,
    name: "ListPackageShipperScreen",
    component: ListPackageShipperScreen,
    options: {
      title: "Danh sách kiện hàng shipment",
    },
  },
]
