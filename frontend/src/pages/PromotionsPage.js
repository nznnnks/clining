import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Promotions from '../components/Promotions';
import './PromotionsPage.css';

const PromotionsPage = () => {
  useEffect(() => {
    document.title = 'Акции и скидки - Специальные предложения | Уборка 24';
  }, []);

  return (
    <div className="promotions-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'Акции', path: '/promotions' }
      ]} />
      
      <section className="promotions-page__hero">
        <div className="container">
          <h1 className="promotions-page__title">Акции</h1>
        </div>
      </section>

      <Promotions showAll={true} mode="grid" />
    </div>
  );
};

export default PromotionsPage;

