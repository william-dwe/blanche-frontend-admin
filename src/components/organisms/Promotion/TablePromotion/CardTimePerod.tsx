import React from 'react';
import { Tag } from '../../../atoms';
import style from './index.module.scss';

const CardTimePeriod: React.FC = () => {
  return (
    <div className={style.table__voucher__tp}>
      <ul className={style.table__voucher__tp}>
        <li className={style.table__voucher__tp__item}>
          <p className={style.table__voucher__tp__item__desc}>12/12/2020</p>
          <p className={style.table__voucher__tp__item__desc}>12/12/2020</p>
        </li>
        <li className={style.table__voucher__tp__item}>
          <p className={style.table__voucher__tp__item__desc}>12/12/2020</p>
          <p className={style.table__voucher__tp__item__desc}>12/12/2020</p>
        </li>
      </ul>
      <Tag className={style.table__voucher__tp__tag}>Expired</Tag>
    </div>
  );
};

export default CardTimePeriod;
