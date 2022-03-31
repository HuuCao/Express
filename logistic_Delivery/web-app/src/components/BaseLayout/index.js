import React, { useContext, useState } from 'react';

//component antd
import { Layout } from 'antd';

//icon antd
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

//component
import MenuNavigation from './MenuNavigation';
import MenuAccount from './menu-account/MenuAccount';
import LanguageDropdown from './language-dropdown/LanguageDropdown';

//utils
import Context from 'utils/Context';

//router
import { useLocation } from 'react-router-dom';

export default ({ children }) => {
  const context = useContext(Context);
  const location = useLocation();

  //collapsed
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed(!collapsed);
  return (
    <Layout
      style={{
        minHeight: '100vh',
        // width: '100vw',
      }}
    >
      <MenuNavigation collapsed={collapsed} />
      <Layout>
        <Layout.Header
          style={{
            height: 70,
            position: 'sticky',
            top: 0,
            zIndex: 40,
            display: location.pathname == '/login' ? 'none' : '',
            backgroundColor: 'white',
            paddingLeft: 16,
            paddingRight: 16,
            boxShadow:
              'rgb(0 0 0 / 2%) 0px 2px 2px, rgb(0 0 0 / 2%) 0px 1px 0px',
          }}
        >
          <div
            style={{
              paddingTop: 15,
              paddingBottom: 15,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {collapsed ? (
              <MenuUnfoldOutlined
                style={{ fontSize: '20px' }}
                onClick={toggle}
              />
            ) : (
              <MenuFoldOutlined style={{ fontSize: '20px' }} onClick={toggle} />
            )}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LanguageDropdown />
              <MenuAccount />
            </div>
          </div>
        </Layout.Header>
        <Layout.Content
          style={{
            padding: '16px',
            // width: '100%',
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
