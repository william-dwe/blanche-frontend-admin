import { Dropdown, MenuProps, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button } from '../../atoms';
import CardProfile from './CardProfile';
import style from './index.module.scss';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <CardProfile />,
  },
  {
    key: '2',
    label: (
      <Link to="transactions" className={style.menu__merchant__item}>
        <p>My Transaction</p>
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <Link to="transactions" className={style.menu__merchant__item}>
        <p>Favorite Product</p>
      </Link>
    ),
  },
];
const MenuMerchant: React.FC = () => {
  return (
    <Dropdown menu={{ items }} className={style.menu__merchant}>
      <Button className={style.menu__merchant__btn} type="text">
        <Avatar />
        Giwang
      </Button>
      <p>Merchant</p>
    </Dropdown>
  );
};

export default MenuMerchant;
