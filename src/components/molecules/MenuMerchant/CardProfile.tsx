import React from 'react';
import style from './index.module.scss';
import { Avatar, Card } from '../../atoms';
import { Link } from 'react-router-dom';

const CardProfile: React.FC = () => {
  return (
    <Link to="/profile" className={style.menu__profile__card__profile}>
      <div className={style.menu__profile__card__profile__icon}>
        <Avatar size={50} />
      </div>
      <div className={style.menu__profile__card__profile__content}>
        <h6>Giwang</h6>
        <p>Go to my profile &gt;</p>
      </div>
    </Link>
  );
};

export default CardProfile;
