import React from 'react';
import { Image } from '../../../atoms';
import style from './index.module.scss';

const CardVoucher: React.FC = () => {
  return (
    <div className={style.table__voucher__cv}>
      <Image
        className={style.table__voucher__cv__img}
        src="/assets/png/voucher.png"
        alt=""
        imageClassName={style.table__voucher__cv__img__item}
      />
      <div className={style.table__voucher__cv__info}>
        <p className={style.table__voucher__cv__info__name}>BLANCHE50</p>
        <p className={style.table__voucher__cv__info__desc}>
          Diskon 10% hingga Rp10.000
        </p>
      </div>
    </div>
  );
};

export default CardVoucher;
