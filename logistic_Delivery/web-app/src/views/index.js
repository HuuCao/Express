import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { ROUTES } from 'consts';

//components
import BaseLayout from 'components/BaseLayout';
import Authentication from 'components/Authentication';

import { translate } from 'utils/i18n';
import { PERMISSIONS } from 'consts/permissions';

//views
import Order from './Order';
import CreateShipment from './CreateOrder';
import PageNotFound from './404';
import Login from './Login';
import Information from './Information';
import Users from './Users';
import DetailUser from './DetailUser';
import Warehouses from './Warehouses';
import Customers from './Customers';
import DebitNote from './DebitNote';
import DetailDebitNote from './DetailDebitNote';
import AccountSetting from './AccountSetting';
import ShippingPartner from './ShippingPartner';
import CreateShippingPartner from './CreateShippingPartner';
import TablePrice from './TablePrice';
import TablePriceCreatePage from './TablePrice/tabelPriceCreatePage';
import SearchBill from './Search';
import CreateWarehouseExport from './createWarehouse/createExport';
import CreateWarehouseImport from './createWarehouse/createImport';
import UpdateImportWarehouse from './UpdateWarehouse/updateImportWarehouse';
import UpdateExportWarehouse from './UpdateWarehouse/updateExportWarehouse';
import OrderList from './UpdateWarehouse/orderList';
import UpdateOrders from './UpdateOrders';

const DEFINE_ROUTER = [
  {
    path: ROUTES.LOGIN,
    Component: () => <Login />,
    exact: true,
    title: translate('Login to Delivery'),
  },
  // {
  //     path: ROUTES.HOME,
  //     Component: () => <Home />,
  //     permissions: [],
  //     exact: true,
  //     title: translate('Home'),
  // },
  {
    path: ROUTES.OVERVIEW,
    Component: () => <Information />,
    permissions: [],
    exact: true,
    title: translate('Overview'),
  },
  {
    path: ROUTES.ORDERS,
    Component: () => <Order />,
    permissions: [
      PERMISSIONS.VIEW_ALL_SHIPMENTS,
      PERMISSIONS.VIEW_SHIPMENT_OWNER,
    ],
    exact: true,
    title: translate('Shipments'),
  },
  {
    path: ROUTES.ORDERS_UPDATE,
    Component: () => <UpdateOrders />,
    permissions: [],
    exact: true,
    title: translate('Update orders'),
  },
  {
    path: ROUTES.CREATE_SHIPMENT,
    Component: () => <CreateShipment />,
    permissions: [PERMISSIONS.CREATE_EDIT_SHIPMENT],
    exact: true,
    title: translate('Create Shipments'),
  },
  {
    path: ROUTES.DETAIL_DEBIT_NOTE,
    Component: () => <DetailDebitNote />,
    permissions: [PERMISSIONS.VIEW_DEBIT_NOTE],
    exact: true,
    title: translate('Detail Debit Note'),
  },
  {
    path: ROUTES.DEBIT_NOTE,
    Component: () => <DebitNote />,
    permissions: [PERMISSIONS.VIEW_DEBIT_NOTE],
    exact: true,
    title: translate('Debit Note'),
  },
  {
    path: ROUTES.ACCOUNT_SETTING,
    Component: () => <AccountSetting />,
    permissions: [],
    exact: true,
    title: translate('Account Setting'),
  },
  {
    path: ROUTES.CUSTOMERS,
    Component: () => <Customers />,
    permissions: [PERMISSIONS.VIEW_CUSTOMER_ONLY],
    exact: true,
    title: translate('Customer & Debit Note'),
  },
  {
    path: ROUTES.HOME,
    Component: () => <SearchBill />,
    permissions: [],
    exact: true,
    title: translate('Home'),
  },
  {
    path: ROUTES.CREATE_WAREHOUSE_EXPORT,
    Component: () => <CreateWarehouseExport />,
    permissions: [],
    exact: true,
    title: 'Tạo phiếu xuất kho',
  },
  {
    path: ROUTES.CREATE_WAREHOUSE_IMPORT,
    Component: () => <CreateWarehouseImport />,
    permissions: [],
    exact: true,
    title: 'Tạo phiếu xuất kho',
  },
  {
    path: ROUTES.USERS,
    Component: () => <Users />,
    permissions: [PERMISSIONS.VIEW_ALL_USERS],
    exact: true,
    title: translate('Users'),
  },
  {
    path: ROUTES.DETAIL_USER,
    Component: () => <DetailUser />,
    permissions: [],
    exact: true,
    title: translate('Detail User'),
  },
  {
    path: ROUTES.WAREHOUSES,
    Component: () => <Warehouses />,
    permissions: [PERMISSIONS.VIEW_ALL_WAREHOUSE],
    exact: true,
    title: translate('Warehouses'),
  },
  {
    path: ROUTES.SHIPPING_PARTNER,
    Component: () => <ShippingPartner />,
    permissions: [],
    exact: true,
    title: translate('Shipping partner'),
  },
  {
    path: ROUTES.CREATE_SHIPPING_PARTNER,
    Component: () => <CreateShippingPartner />,
    permissions: [],
    exact: true,
    title: translate('Create shipping partner'),
  },
  {
    path: ROUTES.CUSTOMERS,
    Component: () => <Customers />,
    permissions: [PERMISSIONS.VIEW_CUSTOMER_ONLY],
    exact: true,
    title: translate('Customers'),
  },
  {
    path: ROUTES.TABLE_PRICE,
    Component: () => <TablePrice />,
    permissions: [PERMISSIONS.VIEW_SET_PRICE],
    exact: true,
    title: translate('Setting Price'),
  },
  {
    path: ROUTES.CREATE_TABLE_PRICE,
    Component: () => <TablePriceCreatePage />,
    permissions: [PERMISSIONS.VIEW_SET_PRICE],
    exact: true,
    title: translate('Setting Price'),
  },
  {
    path: ROUTES.UPDATE_TABLE_PRICE,
    Component: () => <TablePriceCreatePage type="update" />,
    permissions: [PERMISSIONS.VIEW_SET_PRICE],
    exact: true,
    title: translate('Setting Price'),
  },
  {
    path: ROUTES.UPDATE_WAREHOUSE_IMPORT,
    Component: () => <UpdateImportWarehouse />,
    permissions: [],
    exact: true,
    title: 'Cập nhật phiếu nhập kho',
  },
  {
    path: ROUTES.UPDATE_WAREHOUSE_EXPORT,
    Component: () => <UpdateExportWarehouse />,
    permissions: [],
    exact: true,
    title: 'Cập nhật phiếu xuất kho',
  },
  {
    path: ROUTES.ORDER_LIST,
    Component: () => <OrderList />,
    permissions: [],
    exact: true,
    title: 'Danh sách đơn hàng',
  },
];

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true}>
        <Redirect to={ROUTES.HOME} />
      </Route>
      {DEFINE_ROUTER.map(({ Component, ...rest }, index) => (
        <Route {...rest} key={index}>
          <Authentication {...rest}>
            <BaseLayout>
              <Component />
            </BaseLayout>
          </Authentication>
        </Route>
      ))}
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);
