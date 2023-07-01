import { Divider } from 'antd';
import React from 'react';
import { AddVoucherPage } from '../../../components';
import style from './index.module.scss';

const AddVoucher: React.FC = () => {
  return (
    <div className={style.add__voucher__page}>
      <div className={style.add__voucher__page__header}>
        <h3 className={style.add__voucher__page__header__title}>
          Create Voucher
        </h3>
        <p className={style.add__voucher__page__header__subtitle}>
          Increase your sales by creating a voucher for your marketplace store.
        </p>
      </div>
      <Divider />
      <AddVoucherPage />
    </div>
  );
};

export default AddVoucher;
