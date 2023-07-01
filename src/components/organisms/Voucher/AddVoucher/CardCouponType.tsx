import React from 'react';
import { Card, Image } from '../../../atoms';
import style from './index.module.scss';

const CardCouponType: React.FC = () => {
  return (
    <Card className={style.form__voucher__item}>
      <div className={style.form__voucher__item__header}>
        <h3 className={style.form__voucher__item__header__title}>
          Voucher Type
        </h3>
      </div>
      <div className={style.form__voucher__item__type}>
        <Image
          className={style.form__voucher__item__type__image}
          src="/assets/png/voucher-merchant.png"
          alt=""
          imageClassName={style.form__voucher__item__type__img}
        />
        <div className={style.form__voucher__item__type__desc}>
          <p>Marketplace Voucher</p>
          <p>
            Marketplace voucher is a voucher that can be used by all user in
            your marketplace.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CardCouponType;
