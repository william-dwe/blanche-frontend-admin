import React from 'react';
import { SelectProps, Select as ASelect } from 'antd';

const Select: React.FC<SelectProps> = ({ size, ...props }) => {
  return <ASelect size="large" {...props} />;
};

export default Select;
