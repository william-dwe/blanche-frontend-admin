import { Divider, Dropdown, MenuProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { Avatar, Button } from '../../atoms';
import style from './index.module.scss';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <p>
      saa
    </p>,
  },
  {
    key: '2',
    label: (
      <>
          <p>haha</p>
              </>
    ),
  },
  {
    key: '3',
    label: (
      <Link to="transactions" className={style.menu__profile__item}>
        <p>My Transaction</p>
      </Link>
    ),
  },
  {
    key: '4',
    label: (
      <Link to="transactions" className={style.menu__profile__item}>
        <p>Favorite Product</p>
      </Link>
    ),
  },
];
const MenuProfile: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <Dropdown
      menu={{ items }}
      className={style.menu__profile}
      overlayClassName={style.menu__profile}
    >
      <Button className={style.menu__profile__btn} type="text">
        <Avatar />
        {user?.username}
      </Button>
    </Dropdown>
  );
};

export default MenuProfile;
