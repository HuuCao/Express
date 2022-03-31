import { Row } from 'antd';
import React from 'react';
import styles from './balanceItem.module.scss';
import { formatNumber } from 'utils';
export default function BalanceItem(props) {
  return (
    <div
      className={styles['balance-item']}
      style={{
        backgroundImage: `linear-gradient(to right, ${props.colorFrom}, ${props.colorTo})`,
      }}
    >
      <Row className={styles['title']}>{props.title}</Row>
      <Row className={styles['icon']}>{props.icon}</Row>
      <Row className={styles['price']}>{formatNumber(props.price)}</Row>
    </div>
  );
}
