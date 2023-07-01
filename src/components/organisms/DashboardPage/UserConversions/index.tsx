import React from 'react';
import { useGetDashboardUserConversionQuery } from '../../../../app/features/dashboard/dashboardApiSlice';
import style from '../index.module.scss';
import { Line } from '@ant-design/plots';
import { Empty } from 'antd';

interface UserConversionsProps {
  date: {
    start_date: string;
    end_date: string;
  };
}

const UserConversions: React.FC<UserConversionsProps> = ({ date }) => {
  const { data, isLoading } = useGetDashboardUserConversionQuery(date);

  const config = {
    xField: 'date',
    yField: 'value',
    label: {},
    meta: {
      value: {
        min: 0,
        max: 1,
      },
    },
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };

  return (
    <div className={style.dp}>
      <div className={style.dp__header}>
        <h3 className={style.dp__title}>User Conversions</h3>
        <p className={style.dp__info}>
          User conversion rate is the ratio of MTU to MAU for the last 30 days.
        </p>
      </div>
      {data ? (
        <Line loading={isLoading} data={data} {...config} />
      ) : (
        <Empty description="We are still working on your data. Please comeback later." />
      )}
    </div>
  );
};

export default UserConversions;
