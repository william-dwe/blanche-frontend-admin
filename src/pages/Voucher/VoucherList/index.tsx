import React from 'react';
import { VoucherList } from '../../../components';
import style from './index.module.scss';

const Voucher: React.FC = () => {
  return (
    <div className={style.voucher__page}>
      <div className={style.voucher__page__header}>
        <h3 className={style.voucher__page__header__title}>Voucher List</h3>
      </div>
      <VoucherList />
    </div>
  );
};

export default Voucher;
