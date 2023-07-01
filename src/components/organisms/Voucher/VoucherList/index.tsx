import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../../atoms';
import FilterStatus from '../../FilterStatus';
import TableVoucher from '../TableVoucher';
import style from './index.module.scss';

const values = ['All', 'On Going', 'Will Come', 'Has Ended'];
const VoucherList: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/vouchers/create');
  };

  return (
    <Card className={style.voucher__list}>
      <div className={style.voucher__list__header}>
        <h6>List Of my Voucher</h6>
        <Button type="primary" size="large" onClick={handleNavigate}>
          Create Coupon
        </Button>
      </div>

      <FilterStatus values={values} />
      <TableVoucher />
    </Card>
  );
};

export default VoucherList;
