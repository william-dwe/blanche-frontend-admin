import { Divider } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { AddVoucherPage } from '../../../components';
import style from './index.module.scss';

const DuplicateVoucher: React.FC = () => {
  return (
    <div className={style.add__voucher__page}>
      <div className={style.add__voucher__page__header}>
        <h3 className={style.add__voucher__page__header__title}>
          Create Voucher
        </h3>
        <p className={style.add__voucher__page__header__subtitle}>
          Buyer can use this voucher to buy your product or service at your
          store.
        </p>
      </div>
      <Divider />
      <AddVoucherPage isDuplicate={true} />
    </div>
  );
};

export default DuplicateVoucher;
