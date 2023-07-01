import React from 'react';
import { Image } from '../../../atoms';
import style from './index.module.scss';

const CardQuota: React.FC = () => {
  return (
    <div className={style.table__voucher__qu}>
      <div className={style.table__voucher__qu__info}>
        <p className={style.table__voucher__qu__info__name}>Used</p>
        <p className={style.table__voucher__qu__info__desc}>0/35</p>
      </div>
    </div>
  );
};

export default CardQuota;
