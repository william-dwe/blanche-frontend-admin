import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAcceptRefundRequestMutation,
  useRejectRefundRequestMutation,
} from '../../../../app/features/refund/refundApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button } from '../../../atoms';
import ModalConfirm from '../../ModalConfirm';
import style from './index.module.scss';

const Action: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isModalAcceptOpen, setIsModalAcceptOpen] = useState(false);
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);

  const [accept, { isLoading: isLoadingAccept }] =
    useAcceptRefundRequestMutation();
  const [reject, { isLoading: isLoadingReject }] =
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
      const data = await accept(Number(params.id) || 0).unwrap();
      navigate('/refunds');
      message.success(`Refund request ${data.invoice_code} was accepted`);
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const handleReject = async () => {
    try {
      const data = await reject(Number(params.id) || 0).unwrap();
      navigate('/refunds');
      message.success(`Refund request ${data.invoice_code} was rejected`);
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <div className={style.action}>
      <p>Do you want to accept this request?</p>
      <div className={style.action__group}>
        <Button
          type="primary"
          onClick={handleOpenModalAccept}
          loading={isLoadingAccept}
          ghost
        >
          Accept
        </Button>
        <Button
          type="primary"
          onClick={handleOpenModalReject}
          loading={isLoadingReject}
          ghost
          danger
        >
          Reject
        </Button>
        <ModalConfirm
          isModalOpen={isModalRejectOpen}
          title="Reject Refund"
          info="Are you sure you want to reject this refund request?"
          handleOk={handleReject}
          handleCancel={handleCloseModalReject}
          confirmButtonProps={{ danger: true, loading: isLoadingReject }}
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
          confirmButtonProps={{ loading: isLoadingAccept }}
        />
      </div>
    </div>
  );
};

export default Action;
