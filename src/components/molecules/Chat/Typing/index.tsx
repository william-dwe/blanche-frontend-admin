import { SendOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useLazyGetMessageRefundRequestQuery,
  usePostMessageRefundRequestMutation,
} from '../../../../app/features/refund/refundApiSlice';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button, Input } from '../../../atoms';
import style from './index.module.scss';
import { MdRefresh } from 'react-icons/md';

interface TypingProps {
  isClosed: boolean;
}

const Typing: React.FC<TypingProps> = ({ isClosed }) => {
  const [sendMessage, { isLoading }] = usePostMessageRefundRequestMutation();
  const [newMessage, setNewMessage] = useState('');
  const [getMessages, { isFetching }] = useLazyGetMessageRefundRequestQuery();
  const params = useParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!newMessage) return;
    try {
      const body = {
        id: Number(params.id) || 0,
        message: newMessage,
      };
      await sendMessage(body).unwrap();
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    } finally {
      setNewMessage('');
    }
  };

  const handleGetMessages = async () => {
    try {
      await getMessages(Number(params.id) || 0).unwrap();
      message.success('Messages refreshed');
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  return (
    <div className={style.typing}>
      <Button
        icon={<MdRefresh size={32} />}
        className={style.typing__refresh}
        onClick={handleGetMessages}
        loading={isFetching}
        disabled={isClosed}
      />
      <Input
        className={style.typing__input}
        placeholder="Type your response here"
        onChange={onChange}
        value={newMessage}
        onPressEnter={handleSendMessage}
        disabled={isClosed}
      />
      <Button
        onClick={handleSendMessage}
        className={style.typing__btn}
        type="primary"
        shape="circle"
        loading={isLoading}
        disabled={isClosed}
      >
        Send
        <SendOutlined />
      </Button>
    </div>
  );
};

export default Typing;
