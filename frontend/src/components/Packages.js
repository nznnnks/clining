import React from 'react';
import './Packages.css';

const Packages = () => {
  const packages = [
    {
      id: 1,
      name: 'Поддерживающая',
      price: 'от 70 руб/м²',
      description: 'Регулярная уборка для поддержания чистоты',
      time: '2-4 часа',
      workers: '1-2 клинера',
      features: [
        'Влажная уборка полов',
        'Протирка пыли со всех поверхностей',
        'Уборка санузла',
        'Вынос мусора',
        'Протирка зеркал',
      ],
    },
    {
      id: 2,
      name: 'Генеральная',
      price: 'от 130 руб/м²',
      description: 'Комплексная уборка всех помещений',
      time: '4-8 часов',
      workers: '2-3 клинера',
      features: [
        'Все из поддерживающей уборки',
        'Мытье окон (до 3 м²)',
        'Глубокая уборка кухни',
        'Пылесос и чистка ковров',
        'Мытье плинтусов',
        'Очистка светильников',
      ],
      popular: true,
    },
    {
      id: 3,
      name: 'После ремонта',
      price: 'от 150 руб/м²',
      description: 'Уборка после строительных работ',
      time: '6-12 часов',
      workers: '3-4 клинера',
      features: [
        'Удаление строительной пыли',
        'Удаление строительного мусора',
        'Мытье всех поверхностей',
        'Очистка окон и подоконников',
        'Мытье полов и стен',
        'Дезинфекция',
      ],
    },
  ];

  return (
    <section id="packages" className="packages">
      <div className="container">
        <div className="section-heading">
          <h2>Готовые пакеты услуг</h2>
          <p>Выберите подходящий пакет услуг для вашего помещения</p>
        </div>
        <div className="packages__grid">
          {packages.map(pkg => (
            <div 
              key={pkg.id} 
              className={`packages__card ${pkg.popular ? 'packages__card--popular' : ''}`}
            >
              {pkg.popular && (
                <div className="packages__badge">Популярный</div>
              )}
              <div className="packages__header">
                <h3>{pkg.name}</h3>
                <div className="packages__price">{pkg.price}</div>
                <p className="packages__description">{pkg.description}</p>
                <div className="packages__info">
                  <div className="packages__infoItem">
                    <span className="packages__infoIcon">⏱️</span>
                    <span>{pkg.time}</span>
                  </div>
                  <div className="packages__infoItem">
                    <span className="packages__infoIcon">👥</span>
                    <span>{pkg.workers}</span>
                  </div>
                </div>
              </div>
              <ul className="packages__features">
                {pkg.features.map((feature, index) => (
                  <li key={index}>
                    <span className="packages__check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#calculator" className="packages__button btn">
                Заказать
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;

