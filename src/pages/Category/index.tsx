import { Divider } from 'antd';
import React from 'react';
import { CategoryPage } from '../../components';
import style from './index.module.scss';

const Dashboard: React.FC = () => {
  return (
    <div className={style.category}>
      <div className={style.category__header}>
        <h3 className={style.category__header__title}>Category</h3>
        <p className={style.category__header__info}>
          Create a new category to segment products.
        </p>
      </div>
      <Divider />
      <CategoryPage />
    </div>
  );
};

export default Dashboard;
