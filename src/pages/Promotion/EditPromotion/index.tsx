import { Divider } from 'antd';
import React from 'react';
import { AddPromotionPage } from '../../../components';
import style from './index.module.scss';

const EditPromotion: React.FC = () => {
  return (
    <div className={style.add__voucher__page}>
      <div className={style.add__voucher__page__header}>
        <h3 className={style.add__voucher__page__header__title}>
          Edit Promotion Banner
        </h3>
        <p className={style.add__voucher__page__header__subtitle}>
          Edit Promotion Banner to display on the home page
        </p>
      </div>
      <Divider />
      <AddPromotionPage isEdit={true} />
    </div>
  );
};

export default EditPromotion;
