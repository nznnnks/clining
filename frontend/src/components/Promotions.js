import React from 'react';
import './Promotions.css';

const Promotions = () => {
  const promotions = [
    {
      id: 1,
      title: 'Скидка 10% и мойка окна в подарок!',
      image: '🧹',
      validUntil: '13 декабря 2025',
      description: 'При заказе генеральной уборки получите скидку 10% и бесплатную мойку одного окна',
    },
    {
      id: 2,
      title: 'Мойка 1 единицы бытовой техники!',
      image: '🔌',
      validUntil: '14 декабря 2025',
      description: 'Бесплатная мойка одной единицы бытовой техники при заказе комплексной уборки',
    },
    {
      id: 3,
      title: 'Скидка 20% на химчистку мебели!',
      image: '🛋️',
      validUntil: '15 декабря 2025',
      description: 'Специальное предложение на химчистку мягкой мебели и ковров',
    },
  ];

  return (
    <section className="promotions">
      <div className="container">
        <div className="promotions__header">
          <h2 className="promotions__title">Акции и скидки компании</h2>
          <a href="#promotions" className="promotions__viewAll">
            Смотреть все
          </a>
        </div>
        <div className="promotions__carousel">
          <div className="promotions__list">
            {promotions.map((promo) => (
              <div key={promo.id} className="promotions__card">
                <div className="promotions__cardImage">{promo.image}</div>
                <h3 className="promotions__cardTitle">{promo.title}</h3>
                <p className="promotions__cardDescription">{promo.description}</p>
                <div className="promotions__cardValid">
                  Действует до: {promo.validUntil}
                </div>
                <a href="#calculator" className="promotions__cardButton btn">
                  Подробнее
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;

