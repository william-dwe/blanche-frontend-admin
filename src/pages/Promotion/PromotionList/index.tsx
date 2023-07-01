import React from 'react';
import { PromotionList } from '../../../components';
import style from './index.module.scss';

const Promotion: React.FC = () => {
  return (
    <div className={style.Promotion__page}>
      <div className={style.promotion__page__header}>
        <h3 className={style.promotion__page__header__title}>
          Promotion Banner List
        </h3>
      </div>
      <PromotionList />
    </div>
  );
};

export default Promotion;
