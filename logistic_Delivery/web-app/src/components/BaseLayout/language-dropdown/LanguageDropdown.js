import React, { useContext, useEffect, useState } from 'react';
import './LanguageDropdown.scss';
import { setLanguage } from 'utils/i18n';

//component antd
import { Dropdown, Menu } from 'antd';

//icon antd
import { GlobalOutlined, CheckOutlined } from '@ant-design/icons';

//icon ensign
import vietnam from '../../../assets/img/icon-ensign/vietnam.png';
import england from '../../../assets/img/icon-ensign/england.png';
import japan from '../../../assets/img/icon-ensign/japan.png';

//utils
import Context from 'utils/Context';

export default function LanguageDropdown() {
  const context = useContext(Context);

  const [language, setLang] = useState('');

  const overlay = () => (
    <Menu
      mode="vertical"
      theme="light"
      className="language-dropdown"
      onClick={({ key }) => {
        setLanguage(key);
      }}
    >
      <Menu.Item key="en">
        <div className="language-item">
          <div>
            <img
              style={{ marginRight: '8px' }}
              src={england}
              alt="icon ensign"
              loading="lazy"
            />
            English
          </div>
          <CheckOutlined
            style={{
              color: '#04d182',
              display: language === 'en' ? '' : 'none',
            }}
          />
        </div>
      </Menu.Item>
      <Menu.Item key="vi">
        <div className="language-item">
          <div>
            <img
              style={{ marginRight: '8px' }}
              src={vietnam}
              alt="icon ensign"
              loading="lazy"
            />
            Vietnam
          </div>
          <CheckOutlined
            style={{
              color: '#04d182',
              display: language === 'vi' ? '' : 'none',
            }}
          />
        </div>
      </Menu.Item>
      {/* <Menu.Item key="ja">
        <div className="language-item">
          <div>
            <img
              style={{ marginRight: '8px' }}
              src={japan}
              alt="icon ensign"
              loading="lazy"
            />
            Japan
          </div>
          <CheckOutlined
            style={{
              color: '#04d182',
              display: language === 'ja' ? '' : 'none',
            }}
          />
        </div>
      </Menu.Item> */}
    </Menu>
  );

  useEffect(() => {
    //check xem web đang ở chuyên đổi ngôn ngữ nào, mặc định là tiếng việt
    const lang = sessionStorage.getItem('language')
      ? JSON.parse(sessionStorage.getItem('language'))
      : 'vi';
    console.log(lang);
    setLang(lang);
  }, []);

  return (
    <Dropdown overlay={overlay} trigger={['click']} placement="bottomRight">
      <div
        style={{
          marginRight: 25,
          cursor: 'pointer',
          fontWeight: 600,
          color: '#5ecba1',
        }}
      >
        <GlobalOutlined className="icon-global" /> Ngôn ngữ
      </div>
    </Dropdown>
  );
}
