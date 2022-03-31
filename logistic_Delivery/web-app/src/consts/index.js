export const URL_REG = /(^http:\/\/)|(^https:\/\/)/g;

export const ACTION = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  CLOSE_SESSION: 'CLOSE_SESSION',
  LOADING: 'LOADING',
};

export const ROUTES = {
  HOME: '/home',
  OVERVIEW: '/overview',
  LOGIN: '/login',
  ITEMS: '/items',
  ACCOUNT_SETTING: '/me/setting',
  FORGOT_PASSWORD: '/password/forgot',
  RESET_PASSWORD: '/password/reset',
  ORDERS: '/orders',
  ORDERS_UPDATE: '/orders/update',
  CREATE_SHIPMENT: '/orders/create',
  DETAIL_SHIPMENT: '/shipment/:id',
  DETAIL_PACKAGE: '/package/:packageId',
  USERS: '/users',
  DETAIL_USER: '/users/:idUser',
  CREATE_USER: '/users/create',
  INVOICES: '/invoices',
  DETAIL_INVOICE: '/invoices/:id',
  DIFF_ITEMS: '/items/:janCode',
  SEARCH: '/search',
  TAGGING: '/tagging',
  BILLBOARD: '/billboard',
  LIST_UNTAG: '/list_untag_manual',
  TOOLS: '/tools',
  REPORT: '/report',
  PROMOTION: '/promotion',
  CREATE_PROMOTION: '/promotion/create',
  SHIPPING_PARTNER: '/shipping-partner',
  CREATE_SHIPPING_PARTNER: '/shipping-partner/create',
  CREATE_WAREHOUSE_EXPORT: '/create-warehouse-export',
  CREATE_WAREHOUSE_IMPORT: '/create-warehouse-import',

  //new
  PACKAGES_COD: '/package-cod/:shipmentId',
  PACKAGES: '/packages/:shipmentId',
  WAREHOUSES: '/warehouses',
  COMPANIES: '/companies',
  CUSTOMERS: '/customers',
  INVENTORY: '/inventory',
  COMPANY_DEBIT: '/company-debit',
  PKG_COD_REFUND: '/pkg-cod-refund',
  WAREHOUSE_INPUT: '/warehouse-input',
  WAREHOUSE_INPUT_RE: '/warehouse-input-re',
  DELIVERY: '/delivery',
  WAREHOUSE_INVENTORY: '/warehouse-inventory',
  SETTING_PRICE: '/setting-price',
  PROCESSING: '/processing',
  DETAIL_PROCESSING: '/processing/:id',
  DEBIT_NOTE: '/debit-note',
  SHIPPERS: '/shippers',
  DETAIL_SHIPPER: '/shippers/:idShipper',
  SHIPMENTS_COMPANY_ID: '/shipments/:idCompany',
  DETAIL_COMPANY_DEBIT: '/company-debit/:idShipment',
  DETAIL_DEBIT_NOTE: '/debit-note/:idShipment',

  TABLE_PRICE: '/table-price',
  CREATE_TABLE_PRICE: '/table-price/create',
  UPDATE_TABLE_PRICE: '/table-price/update',
  UPDATE_WAREHOUSE_IMPORT: '/warehouse/update-import',
  UPDATE_WAREHOUSE_EXPORT: '/warehouse/update-export',
  ORDER_LIST: '/warehouse/order-list',
};
export const TAGS = ['CITES', 'DG', 'PDB', 'SDB', 'NEW', 'CDB'];

export const TAGS_COLOR = [
  {
    name: 'CITES',
    index: 0,
    color: 'orange',
  },
  {
    name: 'DG',
    index: 1,
    color: '#ff00008a',
  },
  {
    name: 'PDB',
    index: 2,
    color: 'geekblue',
  },
  {
    name: 'SDB',
    index: 3,
    color: 'blue',
  },
  {
    name: 'NEW',
    index: 5,
    color: 'blue',
  },
  {
    name: 'NEED_EDITOR',
    index: 4,
    color: '#0082ff',
  },
  {
    name: 'CDB',
    index: 6,
    color: 'blue',
  },
];

//Set color component tag
export const STATE_SHIPMENT = {
  CREATING: 'processing',
  CONFIRMING: 'warning',
  CLOSED: 'success',
  CONFIRMED: 'cyan',
  ONPLANE: 'lime',
  GOWAREHOUSE: 'gold',
  PREPARING: 'geekblue',
  SHIPPED: 'volcano',
  ATWAREHOUSE: 'purple',
  WAIT_CONFIRM: 'magenta',
  PROGRESSING: 'orange',
  DONE: 'green',
};

export const STATUS_PACKAGE = {
  1: 'processing',
  2: 'warning',
  3: 'success',
  4: 'cyan',
  5: 'lime',
  6: 'gold',
  7: 'purple',
  8: 'volcano',
};

export const LIST_STATUS_PACKAGE = [
  'WAIT_PLANE',
  'PLANNING',
  'AT_WAREHOUSE',
  'SHIPPING',
  'SHIPPED',
  'NOT_SHIPPED',
  'INVENTORY',
  'NOT_INVENTORY',
];

export const STATE_PACKAGE = {
  WAIT_PLANE: 1, //chờ bay
  PLANNING: 2, //đang bay
  AT_WAREHOUSE: 3, //nhập kho chờ giao
  SHIPPING: 4, //đang giao
  SHIPPED: 5, //đã giao thành công
  NOT_SHIPPED: 6, //không giao thành công
  INVENTORY: 7, // tồn kho
  OUT_INVENTORY: 8, //hàng tồn kho này đã được xử lý, không hiển thị trong tồn kho nữa.
};

export const RECIPE = { KG: 1, KG_VOLUME: 2 };

export const RECIPE_COST = [
  {
    value: RECIPE.KG,
    recipe: 'kg',
  },
  {
    value: RECIPE.KG_VOLUME,
    recipe: 'kg + volume',
  },
];

export const PAGE_SIZE = 20;

export const INVOICE_TYPE = {
  Commercial: 'commercial',
  'Non-commercial': 'noncommercial',
};

export const INVOICE_TYPE_TO_PAYMENT_TERMS = {
  commercial: 'T/T',
  noncommercial: 'Non-Commercial',
};

export const REG_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/g;
