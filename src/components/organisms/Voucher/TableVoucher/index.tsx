import { message, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalConfirm, Pagination } from '../../..';
import {
  useDeleteVoucherMutation,
  useGetVouchersQuery,
} from '../../../../app/features/marketplace/voucherApiSlice';

import { useAppSelector } from '../../../../app/hooks';
import { IVoucher } from '../../../../helpers/types/voucher.interface';
import { Button } from '../../../atoms';
import CardQuota from './CardQuota';
import CardTimePeriod from './CardTimePerod';
import CardVoucher from './CardVoucher';
import style from './index.module.scss';

interface DataType {
  key: string;
  name: React.ReactNode;
  quota: React.ReactNode;
  period: React.ReactNode;
}

const limit = 8;

const TableVoucher: React.FC = () => {
  const params = useAppSelector((state) => state.params);
  const navigate = useNavigate();
  const { data: vouchers, isLoading } = useGetVouchersQuery({
    ...params.search,
    limit,
  });

  const [voucherToDelete, setVoucherToDelete] =
    React.useState<IVoucher | null>();
  const [deleteVoucher, { isLoading: isLoadingDeleteVoucher }] =
    useDeleteVoucherMutation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = (vocucher: IVoucher) => {
    setIsModalOpen(true);
    setVoucherToDelete(vocucher);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteVoucherByKey = async (code: string) => {
    const voucher = vouchers?.vouchers?.find(
      (item: IVoucher) => item.code === code,
    );
    if (voucher) {
      handleOpenModal(voucher);
    }
  };

  const handleNavigateEdit = (code: string) => {
    navigate(`/vouchers/edit/${code}`);
  };
  const handleNavigateDuplicate = (code: string) => {
    navigate(`/vouchers/copy/${code}`);
  };

  const handleDeleteVoucher = async () => {
    if (!voucherToDelete) return;

    try {
      await deleteVoucher({
        code: voucherToDelete.code,
      }).unwrap();
      handleCloseModal();
      message.success('Delete voucher success');
    } catch (e) {
      const err = e as Error;
      message.error(err.message);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Voucher Info',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quota Usage',
      dataIndex: 'quota',
      key: 'quota',
    },
    {
      title: 'Time Period',
      dataIndex: 'period',
      key: 'period',
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
              onClick={() => handleDeleteVoucherByKey(record.key.toString())}
            >
              Delete
            </Button>
            <Button
              type="primary"
              block
              onClick={() => handleNavigateDuplicate(record.key.toString())}
            >
              Duplicate
            </Button>
            <Button
              type="primary"
              ghost
              block
              onClick={() => handleNavigateEdit(record.key.toString())}
            >
              Edit
            </Button>
          </Space>
        </div>
      ),
    },
  ];
  const dataSource: DataType[] | undefined = vouchers?.vouchers?.map(
    (item) => ({
      key: item.code,
      name: <CardVoucher voucher={item} />,
      quota: <CardQuota voucher={item} />,
      period: <CardTimePeriod voucher={item} />,
    }),
  );

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        className={style.table__voucher}
        pagination={false}
        scroll={{ x: 800 }}
      />
      {vouchers &&
        vouchers.total_data > limit &&
        Boolean(vouchers.vouchers.length) && (
          <div className={style.table__voucher__pagination}>
            <Pagination
              total={vouchers.total_data}
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
        handleOk={() => handleDeleteVoucher()}
        title="Delete Voucher"
        confirmButtonProps={{
          danger: true,
          loading: isLoadingDeleteVoucher,
        }}
        confirmButtonText="Delete"
        info="Are you sure want to delete this voucher?"
      />
    </>
  );
};

export default TableVoucher;
