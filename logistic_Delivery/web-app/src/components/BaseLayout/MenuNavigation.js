import React, { useContext, useEffect } from 'react';

import { Link, useRouteMatch } from 'react-router-dom';
import { translate } from 'utils/i18n';
import Context from 'utils/Context';
import { ROUTES } from 'consts';

//router
import { useHistory, useLocation } from 'react-router-dom';

//component
import Permission from 'components/Permission';

//component antd
import { Menu, Layout } from 'antd';

//icon antd
import {
  HomeOutlined,
  SlidersOutlined,
  ShoppingCartOutlined,
  AreaChartOutlined,
  BankOutlined,
  UserOutlined,
  SearchOutlined,
  GroupOutlined,
  TagsOutlined,
  FormOutlined,
  PieChartOutlined,
  DollarOutlined,
} from '@ant-design/icons';

import { PERMISSIONS } from 'consts/permissions';
import { Struck } from './icon';

const { Sider } = Layout;
export default (props) => {
  const context = useContext(Context);
  const routeMatch = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  if (location.pathname == '/login') return null;

  const rootSubmenuKeys = ['report', 'manager'];
  const [openKeys, setOpenKeys] = React.useState([]);

  const onOpenChange = (keys) => {
    console.log(keys);
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      localStorage.removeItem('openKey');
      setOpenKeys(keys);
    } else {
      localStorage.setItem('openKey', latestOpenKey);
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const MENUS = [
    {
      path: ROUTES.HOME,
      title: translate('Home'),
      permissions: [],
      icon: <HomeOutlined />,
    },
    {
      path: ROUTES.OVERVIEW,
      title: translate('Overview'),
      permissions: [],
      icon: <PieChartOutlined />,
    },

    {
      path: ROUTES.ORDERS,
      title: translate('Shipments'),
      permissions: [
        PERMISSIONS.VIEW_ALL_SHIPMENTS,
        PERMISSIONS.VIEW_SHIPMENT_OWNER,
      ],
      icon: <ShoppingCartOutlined />,
    },
    // {
    //   path: ROUTES.PROCESSING,
    //   title: translate('Processing'),
    //   permissions: [PERMISSIONS.VIEW_PROCESSING_PACKAGE],
    //   icon: <SlidersOutlined />,
    // },
    // {
    //   path: 'report',
    //   title: translate('Report'),
    //   permissions: [PERMISSIONS.VIEW_SUCCESS_PKG],
    //   icon: <AreaChartOutlined />,
    //   menuItems: [
    //     {
    //       path: ROUTES.PKG_COD_REFUND,
    //       title: translate('PKG Cod Refund'),
    //       permissions: [],
    //     },
    //     {
    //       path: ROUTES.COMPANY_DEBIT,
    //       title: translate('Company Debit'),
    //       permissions: [],
    //     },

    //     {
    //       path: ROUTES.INVENTORY,
    //       title: translate('PKG Inventory'),
    //       permissions: [PERMISSIONS.VIEW_INVENTORY_WAREHOUSE],
    //     },
    //   ],
    // },
    {
      title: translate('Warehouse'),
      permissions: [PERMISSIONS.VIEW_SUCCESS_PKG],
      icon: <GroupOutlined />,
      path: ROUTES.WAREHOUSES,
    },
    {
      path: ROUTES.DEBIT_NOTE,
      title: translate('Debit note'),
      permissions: [PERMISSIONS.VIEW_SHIPPER_WAREHOUSE],
      icon: <DollarOutlined />,
    },

    // {
    //   path: ROUTES.PROMOTION,
    //   title: translate('Promotion'),
    //   permissions: [],
    //   icon: <TagsOutlined />,
    // },

    {
      path: ROUTES.USERS,
      icon: <UserOutlined />,
      title: translate('User'),
      permissions: [PERMISSIONS.VIEW_ALL_USERS],
      // menuItems: [
      //   {
      //     path: ROUTES.USERS,
      //     title: translate('Users'),
      //     permissions: [PERMISSIONS.VIEW_ALL_USERS],
      //   },
      //   {
      //     path: ROUTES.CUSTOMERS,
      //     title: translate('Customers'),
      //     permissions: [PERMISSIONS.VIEW_CUSTOMER_ONLY],
      //   },
      // ],
    },
    {
      path: ROUTES.TABLE_PRICE,
      title: translate('Price formula'),
      permissions: [],
      icon: <TagsOutlined />,
    },
    {
      path: ROUTES.CUSTOMERS,
      title: translate('Customer'),
      permissions: [PERMISSIONS.VIEW_CUSTOMER_ONLY],
      icon: <FormOutlined />,
    },

    {
      path: ROUTES.SHIPPING_PARTNER,
      title: translate('Shipping'),
      permissions: [],
      icon: (
        <span
          role="img"
          aria-label="form"
          class="anticon anticon-form ant-menu-item-icon"
          style={{ alignItems: 'center' }}
        >
          <Struck />
        </span>
      ),
    },
    // {
    //   path: ROUTES.USERS,
    //   title: translate('Users'),
    //   permissions: [PERMISSIONS.VIEW_ALL_USERS],
    //   icon: <UserOutlined />,
    // },
    // {
    //   path: ROUTES.COMPANIES,
    //   title: translate('Companies'),
    //   permissions: [PERMISSIONS.VIEW_ALL_COMPANIES],
    //   icon: <DatabaseOutlined />,
    // },
    // {
    //   path: ROUTES.WAREHOUSES,
    //   title: translate('Warehouses'),
    //   permissions: [PERMISSIONS.VIEW_ALL_WAREHOUSE],
    //   icon: <BankOutlined />,
    // },
    // {
    //   path: ROUTES.CUSTOMERS,
    //   title: translate('Customers'),
    //   permissions: [PERMISSIONS.VIEW_CUSTOMER_ONLY],
    //   icon: <UserSwitchOutlined />,
    // },
    // {
    //   path: ROUTES.SETTING_PRICE,
    //   title: translate('Setting Price'),
    //   permissions: [PERMISSIONS.VIEW_SET_PRICE],
    //   icon: <SettingOutlined />,
    // },
  ];

  useEffect(() => {
    if (localStorage.getItem('openKey'))
      setOpenKeys([localStorage.getItem('openKey')]);
  }, []);

  const _renderMenuItem = (_menu) => (
    <Permission permissions={_menu.permissions} key={_menu.path}>
      {_menu.menuItems ? (
        <Menu.SubMenu
          key={_menu.path}
          icon={_menu.icon}
          title={<span style={{ fontWeight: 500 }}>{_menu.title}</span>}
        >
          {_menu.menuItems.map((e) => (
            <Menu.Item key={e.path} icon={e.icon}>
              <Link to={e.path} style={{ fontWeight: 500 }}>
                {translate(e.title)}
              </Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ) : (
        <Menu.Item icon={_menu.icon} key={_menu.path}>
          <Link
            to={_menu.path}
            // target={_menu.title === 'Search' && '_blank'}
            style={{ fontWeight: 500 }}
          >
            {translate(_menu.title)}
          </Link>
        </Menu.Item>
      )}
    </Permission>
  );

  return (
    <Sider
      style={{
        backgroundColor: '#050c42',
        boxShadow: '0 1px 4px -1px rgb(0 0 0 / 15%)',
        width: '50px',
        minWidth: '50px',
        maxWidth: '50px',
      }}
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      defaultCollapsed
    >
      <div
        style={{
          display: props.collapsed ? 'none' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70px',
          backgroundColor: '#050c42',
          color: 'red',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          fontSize: '24px',
          fontWeight: '700',
          zIndex: 40,
          boxShadow: 'rgb(0 0 0 / 2%) 0px 2px 2px, rgb(0 0 0 / 2%) 0px 1px 0px',
          marginBottom: '15px',
        }}
      >
        {/* {translate('delivery')} */}
        BaoBao Express
      </div>
      <Menu
        onClick={(e) => {
          let isOpenKey = false;
          MENUS.map((element) => {
            if (element.menuItems) {
              element.menuItems.map((value) => {
                if (value.path == e.key) isOpenKey = true;
              });
            }
          });
          !isOpenKey && localStorage.removeItem('openKey');
        }}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        selectedKeys={routeMatch.path}
        style={{
          position: 'sticky',
          top: 85,
        }}
      >
        {MENUS.map(_renderMenuItem)}
        {/* <div
          style={{
            // position: 'fixed',
            // bottom: 40,
            // left: props.collapsed ? 5 : 60,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '18px',
            cursor: 'pointer',
            marginBottom: 25,
            marginTop: 15,
          }}
          onClick={() => {
            context.dispatch({
              name: ACTION.LOGOUT,
            })
            history.push(ROUTES.LOGIN)
          }}
        >
          <LogoutOutlined style={{ fontSize: '20px', marginBottom: 10 }} />
          <div style={{ display: props.collapsed ? 'none' : '' }}>
            {translate('Sign out')}
          </div>
        </div> */}
      </Menu>
    </Sider>
  );
};
