import React from 'react';
import { RefundList } from '../../components';
import style from './index.module.scss';

const Refund: React.FC = () => {
  return (
    <div className={style.refund}>
      <div className={style.refund__header}>
        <h3 className={style.refund__header__title}>Refund</h3>
      </div>
      <RefundList />
    </div>
  );
};

export default Refund;
