import React from 'react';
import { useGetDashboardActiveUsersQuery } from '../../../../app/features/dashboard/dashboardApiSlice';
import style from '../index.module.scss';
import { Area } from '@ant-design/plots';
import { Empty } from 'antd';

interface ActiveUsersProps {
  date: {
    start_date: string;
    end_date: string;
  };
}

const ActiveUsers: React.FC<ActiveUsersProps> = ({ date }) => {
  const { data, isLoading } = useGetDashboardActiveUsersQuery(date);

  return (
    <div className={style.dp}>
      <div className={style.dp__header}>
        <h3 className={style.dp__title}>Active Users</h3>
        <p className={style.dp__info}>
          MAU (Monthly Active User) is number of distinct registered user login
          for the last 30 days. MTU (Monthly Transaction User) is number of
          distinct user who transacate for the last 30 days.
        </p>
      </div>
      {data ? (
        <Area
          loading={isLoading}
          data={data}
          xField="date"
          yField="value"
          seriesField="type"
        />
      ) : (
        <Empty description="We are still working on your data. Please comeback later." />
      )}
    </div>
  );
};

export default ActiveUsers;
