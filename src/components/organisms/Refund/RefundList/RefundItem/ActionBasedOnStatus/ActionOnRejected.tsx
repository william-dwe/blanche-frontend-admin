import React from 'react';
import { IRefundRequest } from '../../../../../../helpers/types';
import { Button } from '../../../../../atoms';

interface ActionProps {
  refund: IRefundRequest;
}

const ActionOnNeedRejected: React.FC<ActionProps> = ({ refund }) => {
  return (
    <Button type="primary" ghost danger disabled>
      Rejected
    </Button>
  );
};

export default ActionOnNeedRejected;
