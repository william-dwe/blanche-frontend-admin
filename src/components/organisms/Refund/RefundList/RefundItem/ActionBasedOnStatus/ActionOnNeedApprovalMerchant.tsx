import { message } from 'antd';
import React, { useState } from 'react';
import {
  useAcceptRefundRequestMutation,
  useRejectRefundRequestMutation,
} from '../../../../../../app/features/refund/refundApiSlice';
import { IRefundRequest } from '../../../../../../helpers/types';
import { Button } from '../../../../../atoms';
import { ModalConfirm } from '../../../../../molecules';

interface ActionProps {
  refund: IRefundRequest;
}

const ActionOnNeedApprovalAdmin: React.FC<ActionProps> = ({ refund }) => {
  const [isModalAcceptOpen, setIsModalAcceptOpen] = useState(false);
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);
  const [acceptRequest, { isLoading: isAcceptLoading }] =
    useAcceptRefundRequestMutation();
  const [rejectRequest, { isLoading: isRejectLoading }] =
    useRejectRefundRequestMutation();

  const handleOpenModalAccept = () => {
    setIsModalAcceptOpen(true);
  };

  const handleCloseModalAccept = () => {
    setIsModalAcceptOpen(false);
  };

  const handleOpenModalReject = () => {
    setIsModalRejectOpen(true);
  };

  const handleCloseModalReject = () => {
    setIsModalRejectOpen(false);
  };
  const handleAccept = async () => {
    try {
      await acceptRequest(refund.id).unwrap();
      message.success(
        'Accept refund request successfully, next action is to wait for admin approval',
      );
      handleCloseModalAccept();
    } catch (error) {
      const err = error as Error;
      message.error(err.message);
    }
  };

  const handleReject = async () => {
    try {
      await rejectRequest(refund.id).unwrap();
      message.success('Reject refund request successfully');
      handleCloseModalReject();
    } catch (error) {
      const err = error as Error;
      message.error(err.message);
    }
  };
  return (
    <>
      <Button type="primary" ghost onClick={handleOpenModalAccept}>
        Accept
      </Button>
      <Button type="primary" ghost danger onClick={handleOpenModalReject}>
        Reject
      </Button>

      <ModalConfirm
        isModalOpen={isModalRejectOpen}
        title="Reject Refund"
        info="Are you sure you want to reject this refund request?"
        handleOk={handleReject}
        handleCancel={handleCloseModalReject}
        confirmButtonProps={{ danger: true, loading: isRejectLoading }}
        cancelButton={true}
        closable={true}
      />

      <ModalConfirm
        isModalOpen={isModalAcceptOpen}
        title="Accept Refund"
        info="Are you sure you want to accept this refund request?"
        handleOk={handleAccept}
        handleCancel={handleCloseModalAccept}
        cancelButton={true}
        closable={true}
        confirmButtonProps={{ loading: isAcceptLoading }}
      />
    </>
  );
};

export default ActionOnNeedApprovalAdmin;
