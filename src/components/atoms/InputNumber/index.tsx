import { InputNumberProps, InputNumber as AInputNumber } from 'antd';
import React from 'react';

const InputNumber: React.FC<InputNumberProps> = ({
  size = 'middle',
  ...props
}) => {
  return <AInputNumber {...props} />;
};

export default InputNumber;
