import { Progress } from 'antd';
import React, { useEffect } from 'react';
import { capitalizeFirstLetter } from '../../../../helpers/capitalizeFirstLetter';
import { dateToMinuteHourMonthStringDayYear } from '../../../../helpers/parseDate';
import { toRupiah } from '../../../../helpers/toRupiah';
import { IVoucher } from '../../../../helpers/types/voucher.interface';
import { Card, Image, Tag } from '../../../atoms';
import { Modal, ModalHeader } from '../../../molecules';
import style from './index.module.scss';

interface VoucherDetailModalProps {
  voucher: IVoucher;
  isModalOpen: boolean;
  handleCancel: () => void;
}

const mapStatusToColor = {
  incoming: 'green',
  ongoing: 'blue',
  expired: 'red',
};

const VoucherDetailModal: React.FC<VoucherDetailModalProps> = ({
  voucher,
  isModalOpen,
  handleCancel,
}) => {
  const [status, setStatus] = React.useState('waiting');

  useEffect(() => {
    if (
      voucher.start_date > new Date().toISOString() &&
      voucher.end_date > new Date().toISOString()
    ) {
      setStatus('incoming');
      return;
    }

    if (
      voucher.start_date < new Date().toISOString() &&
      voucher.end_date > new Date().toISOString()
    ) {
      setStatus('ongoing');
      return;
    }

    if (
      voucher.start_date < new Date().toISOString() &&
      voucher.end_date < new Date().toISOString()
    ) {
      setStatus('expired');
      return;
    }
  }, [voucher]);

  return (
    <Modal open={isModalOpen} closable onCancel={handleCancel} footer={null}>
      <ModalHeader title="Voucher Detail" />

      {
        <Card className={style.detail__voucher}>
          <Image
            src="/assets/png/voucher-detail.png"
            alt={voucher.code}
            className={style.detail__voucher__img}
          />
          <div className={style.detail__voucher__info}>
            <p className={style.detail__voucher__info__name}>{voucher.code}</p>
            <p className={style.detail__voucher__info__period}>
              {dateToMinuteHourMonthStringDayYear(new Date(voucher.start_date))}{' '}
              - {dateToMinuteHourMonthStringDayYear(new Date(voucher.end_date))}
            </p>
            <p className="detail__voucher__info__desc">
              Discount {voucher.discount_percentage}% up to{' '}
              {toRupiah(voucher.max_discount_nominal)} <br /> minimum purchase
              of {toRupiah(voucher.min_order_nominal)}
            </p>

            <div className={style.detail__voucher__info__used}>
              <p className={style.used__title}>Used</p>
              <Progress
                percent={voucher.used_quota}
                status="active"
                format={() => `${voucher.used_quota}/${voucher.quota}`}
              />
            </div>
            <Tag
              className={style.detail__voucher__info__tag}
              color={mapStatusToColor[status as keyof typeof mapStatusToColor]}
            >
              {capitalizeFirstLetter(status)}
            </Tag>
          </div>
        </Card>
      }
    </Modal>
  );
};

export default VoucherDetailModal;
