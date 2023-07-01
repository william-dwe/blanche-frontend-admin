import React from 'react';
import { DashboardPage } from '../../components';
import style from './index.module.scss';

const Dashboard: React.FC = () => {
  return (
    <div className={style.dashboard}>
      <div className={style.dashboard__header}>
        <h3 className={style.dashboard__header__title}>Dashboard</h3>
      </div>
      <DashboardPage />
    </div>
  );
};

export default Dashboard;
