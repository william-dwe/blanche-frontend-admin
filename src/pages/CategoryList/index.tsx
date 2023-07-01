import React from 'react';
import { CategoryListPage } from '../../components';
import style from './index.module.scss';

const ProductList: React.FC = () => {
  return (
    <div className={style.pl}>
      <CategoryListPage />
    </div>
  );
};

export default ProductList;
