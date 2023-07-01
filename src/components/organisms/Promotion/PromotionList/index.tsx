import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../../atoms';
import TablePromotion from '../TablePromotion';
import style from './index.module.scss';

const PromotionList: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/promotions/create-banner');
  };

  return (
    <Card className={style.promotion__list}>
      <div className={style.promotion__list__header}>
        <h6>List Of My Promotions</h6>
        <Button type="primary" size="large" onClick={handleNavigate}>
          Create Promotion Banner
        </Button>
      </div>
      <TablePromotion />
    </Card>
  );
};

export default PromotionList;
