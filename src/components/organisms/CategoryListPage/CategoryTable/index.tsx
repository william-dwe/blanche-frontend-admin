import { message, PaginationProps } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteMarketPlaceCategoryMutation,
  useGetMarketplaceCategoriesQuery,
} from '../../../../app/features/categories/categoriesApi';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { IErrorResponse } from '../../../../helpers/types/response.interface';
import { Button, Card } from '../../../atoms';
import { Pagination } from '../../../molecules';
import style from './index.module.scss';

interface Row {
  key: string;
  name: React.ReactNode;
  slug: React.ReactNode;
  level: React.ReactNode;
  action: React.ReactNode;
}

const columns: ColumnsType<Row> = [
  {
    title: 'Category Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Category Slug',
    dataIndex: 'slug',
    key: 'slug',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
];

const limit = 10;

const CategoryTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading: isLoadingFetch } = useGetMarketplaceCategoriesQuery({
    page,
    limit,
  });
  const [deleteCategory, { isLoading: isLoadingDelete }] =
    useDeleteMarketPlaceCategoryMutation();
  const [dataSource, setDataSource] = useState<Row[]>();

  const handleEdit = (id: number) => {
    navigate(`/categories/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    try {
      const data = await deleteCategory(id).unwrap();
      message.success(`Category ${data.name} has been deleted`);
    } catch (err) {
      const error = err as IErrorResponse;
      message.error(capitalizeFirstLetter(error.message));
    }
  };

  const isLoading = isLoadingFetch || isLoadingDelete;

  useEffect(() => {
    if (!data) return;
    const row: Row[] = data.categories.map((item) => ({
      key: item.id.toString(),
      name: (
        <p key={item.id} className={style.ct__name}>
          {item.name}
        </p>
      ),
      slug: <p key={item.id}>{item.slug}</p>,
      level: <p key={item.id}>{item.level}</p>,
      action: (
        <div key={item.id} className={style.ct__action}>
          <Button
            type="primary"
            ghost
            onClick={() => {
              handleEdit(item.id);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDelete(item.id);
            }}
            danger
          >
            Delete
          </Button>
        </div>
      ),
    }));
    setDataSource(row);
  }, [data]);

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };

  return (
    <Card className={classNames(style.ct, 'ct')}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 800 }}
        loading={isLoading}
      />
      <div className={style.ct__pagination}>
        <Pagination
          total={data?.total_data}
          pageSize={limit}
          onChange={onChange}
          current={page}
          showSizeChanger={false}
        />
      </div>
    </Card>
  );
};

export default CategoryTable;
