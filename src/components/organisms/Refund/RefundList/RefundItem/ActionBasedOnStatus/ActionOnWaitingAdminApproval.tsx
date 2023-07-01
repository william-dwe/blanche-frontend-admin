import React from 'react';
import { Button } from '../../../../../atoms';

const ActionOnNeedApprovalMerchant: React.FC = () => {
  return (
    <Button type="primary" ghost danger disabled>
      Waiting for seller approval
    </Button>
  );
};

export default ActionOnNeedApprovalMerchant;
