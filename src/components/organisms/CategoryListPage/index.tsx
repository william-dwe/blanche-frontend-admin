import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryTable from './CategoryTable';
import style from './index.module.scss';

const CategoryListPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAddCategory = () => {
    navigate('/categories/create');
  };

  return (
    <div className={style.clp}>
      <div className={style.clp__header}>
        <h1 className={style.clp__header__title}>Category List</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </div>
      <CategoryTable />
    </div>
  );
};

export default CategoryListPage;
