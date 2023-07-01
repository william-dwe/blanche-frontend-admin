import React from 'react';
import {
  Alert,
  Button,
  Card,
  FormLabel,
  Input,
  InputPassword,
} from '../../../atoms';
import style from './index.module.scss';
import useForm from './useForm';
import { rules } from './validation';
import { Form } from '../../../molecules';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';

const CardLogin: React.FC = () => {
  const { handleSubmit, isLoading, isError, error } = useForm();
  return (
    <Card className={style.card__login}>
      <div className={style.card__login__title}>
        <h6>Login</h6>
      </div>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <FormLabel label="Email" name="email" rules={rules.email}>
          <Input placeholder="Email" />
        </FormLabel>
        <FormLabel label="Password" name="password" rules={rules.password}>
          <InputPassword placeholder="Password" />
        </FormLabel>
        {isError && (
          <Alert
            message={capitalizeFirstLetter(error?.message)}
            type="error"
            showIcon
            className={style.card__login__alert}
          />
        )}
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          block
          className={style.card__login__button}
          loading={isLoading}
          disabled={isLoading}
        >
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default CardLogin;
