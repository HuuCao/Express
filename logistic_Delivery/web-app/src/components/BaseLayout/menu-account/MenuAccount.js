import React, { useContext } from 'react';
import './MenuAccount.scss';

//component antd
import { Avatar, Dropdown, Menu, Card } from 'antd';

//icon antd
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';

//router
import { Link, useHistory } from 'react-router-dom';

//img
import avatar from '../../../assets/img/avatar.svg';

//utils
import Context from 'utils/Context';
import { translate } from 'utils/i18n';
import { ROUTES, ACTION } from 'consts';

export default () => {
  const context = useContext(Context);
  const history = useHistory();

  const _onPressMenu = ({ key }) => {
    if (key === ACTION.LOGOUT) {
      context.dispatch({
        name: ACTION.LOGOUT,
      });
      history.push(ROUTES.LOGIN);
    }
  };

  const overlay = (
    <Card
      title={
        <div className="profile-header">
          <img
            src={avatar}
            className="profile-header__avatar"
            alt="avatar user"
            loading="lazy"
          />
          <div className="profile-header__info">
            <h4 className="name">{context.username}</h4>
            <span className="type">{context.role}</span>
          </div>
        </div>
      }
    >
      <Menu onClick={_onPressMenu}>
        <Menu.Item icon={<SettingOutlined />}>
          <Link to={ROUTES.ACCOUNT_SETTING}>{translate('profile')}</Link>
        </Menu.Item>
        <Menu.Item key={ACTION.LOGOUT} icon={<LogoutOutlined />}>
          {translate('sign out')}
        </Menu.Item>
      </Menu>
    </Card>
  );

  return (
    <Dropdown trigger={['click']} overlay={overlay} placement="bottomRight">
      <Avatar
        size="large"
        icon={
          <img
            loading="lazy"
            src={avatar}
            alt="avatar user"
            style={{ objectFit: 'contain' }}
          />
        }
        style={{ cursor: 'pointer' }}
      />
    </Dropdown>
  );
};
