import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ReviewsRatings from '../components/ReviewsRatings';
import './MoscowRegionPage.css';

const MoscowRegionPage = () => {
  useEffect(() => {
    document.title = 'Москва и Московская область - Уборка 24';
  }, []);

  const cities = [
    'Химки', 'Балашиха', 'Домодедово', 'Зеленоград', 'Подольск',
    'Мытищи', 'Дзержинский', 'Чехов', 'Сергиев Посад', 'Красногорск',
    'Одинцово', 'Щёлково', 'Реутов', 'Люберцы', 'Серпухов',
    'Раменское', 'Ногинск', 'Королёв', 'Истра', 'Долгопрудный'
  ];

  return (
    <div className="moscow-region-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'Московская область', path: '/moscow-region' }
      ]} />
      
      <section className="moscow-region-page__hero">
        <div className="container">
          <h1 className="moscow-region-page__title">Москва и Московская область</h1>
        </div>
      </section>

      <section className="moscow-region-page__content">
        <div className="container">
          <h2 className="moscow-region-page__subtitle">Регион работы: Москва и Московская область</h2>
          <div className="moscow-region-page__cities">
            {cities.map((city, index) => (
              <button key={index} className="moscow-region-page__city">
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      <ReviewsRatings />
    </div>
  );
};

export default MoscowRegionPage;

