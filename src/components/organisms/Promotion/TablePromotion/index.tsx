import { message, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDeletePromotionMutation,
  useGetPromotionsQuery,
} from '../../../../app/features/marketplace/promotionApiSlice';
import { IPromotionBanner } from '../../../../helpers/types/promotion.interface';
import { Button, Image } from '../../../atoms';
import { ModalConfirm, Pagination } from '../../../molecules';

interface DataType {
  key: number;
  name: string;
  image: React.ReactNode;
  description: string;
}

const limit = 6;

const TablePromotion: React.FC = () => {
  const { data: promotions, isLoading } = useGetPromotionsQuery({});
  const [promotionToDelete, setPromotionToDelete] =
    React.useState<IPromotionBanner | null>();
  const [deletePromotion, { isLoading: isLoadingDeletePromotion }] =
    useDeletePromotionMutation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const navigate = useNavigate();

  const handleOpenModal = (promotion: IPromotionBanner) => {
    setIsModalOpen(true);
    setPromotionToDelete(promotion);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeletePromotionByKey = async (id: number) => {
    const promotion = promotions?.promotion_banners?.find(
      (item: IPromotionBanner) => item.id === id,
    );
    if (promotion) {
      handleOpenModal(promotion);
    }
  };

  const handleNavigateEdit = (id: number) => {
    navigate(`/promotions/edit/${id}`);
  };

  const handleDeletePromotion = async () => {
    if (!promotionToDelete) return;

    try {
      await deletePromotion(promotionToDelete.id).unwrap();
      handleCloseModal();
      message.success('Delete promotion success');
    } catch (e) {
      const err = e as Error;
      message.error(err.message);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (
        _,
        record: {
          key: React.Key;
        },
      ) => (
        <div>
          <Space size="middle" direction="vertical">
            <Button
              danger
              block
              onClick={() => handleDeletePromotionByKey(Number(record.key))}
            >
              Delete
            </Button>
            <Button
              type="primary"
              ghost
              block
              onClick={() => handleNavigateEdit(Number(record.key))}
            >
              Edit
            </Button>
          </Space>
        </div>
      ),
    },
  ];
  const dataSource: DataType[] | undefined = promotions?.promotion_banners.map(
    (item) => ({
      key: item.id,
      name: item.name,
      image: <Image src={item.image_url} alt={item.name} />,
      description: item.description,
    }),
  );
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={false}
        scroll={{ x: 800 }}
      />
      {promotions &&
        promotions.total_data > limit &&
        Boolean(promotions.promotion_banners.length) && (
          <div>
            <Pagination
              total={promotions.total_data}
              pageSize={limit}
              showSizeChanger={false}
            />
          </div>
        )}

      <ModalConfirm
        isModalOpen={isModalOpen}
        handleCancel={handleCloseModal}
        closable={true}
        cancelButton={true}
        handleOk={() => handleDeletePromotion()}
        title="Delete Promotion Banner"
        confirmButtonProps={{
          danger: true,
          loading: isLoadingDeletePromotion,
        }}
        confirmButtonText="Delete"
        info="Are you sure want to delete this voucher?"
      />
    </>
  );
};

export default TablePromotion;
