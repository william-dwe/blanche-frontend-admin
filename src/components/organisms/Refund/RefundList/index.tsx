import React from 'react';
import { useGetRefundListQuery } from '../../../../app/features/refund/refundApiSlice';
import { useAppSelector } from '../../../../app/hooks';
import FilterStatus from '../../FilterStatus';
import RefundItem from './RefundItem';
import style from './index.module.scss';
import { Card } from '../../../atoms';
import { ItemNotFound } from '../../../molecules';

const limit = 10;

const values = [
  'All',
  'Waiting Merchant Approval',
  'Need Approval',
  'Closed',
  'Canceled By User',
  'Rejected',
  'Refunded',
  'Waiting Buyer Approval',
];

const RefundList: React.FC = () => {
  const params = useAppSelector((state) => state.params);

  const { data } = useGetRefundListQuery({
    ...params.search,
    limit,
  });

  return (
    <Card className={style.refund__list}>
      <FilterStatus values={values} />
      <div className={style.refund__list__body}>
        {data?.refund_requests.length !== 0 ? (
          data?.refund_requests.map((item, index) => (
            <RefundItem refund={item} key={index} />
          ))
        ) : (
          <ItemNotFound
            title="You dont have any refund request"
            body="Refund will appear if when you have a refund."
          />
        )}
      </div>
    </Card>
  );
};

export default RefundList;
