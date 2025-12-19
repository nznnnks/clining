import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      category: 'apartment',
      title: 'Уборка после ремонта',
      area: '56 м²',
      time: '8 часов',
      price: '9 570 руб.',
      image: 'https://via.placeholder.com/400x300/333333/ffffff?text=До+После',
      works: [
        'Убрали строительный мусор',
        'Удалили строительную пыль',
        'Помыли полы, стены, потолок',
        'Мытьё окон',
      ],
    },
    {
      id: 2,
      category: 'apartment',
      title: 'Клининг двухкомнатной квартиры',
      area: '69 м²',
      time: '6 часов',
      price: '9 100 руб.',
      image: 'https://via.placeholder.com/400x300/333333/ffffff?text=До+После',
      works: [
        'Провели влажную уборку пола, комнат, кухни и санузла',
        'Удалили пыль со стен, потолков, мебели',
        'Удалили пыль с техники и предметов интерьера',
        'Помыли подоконники и окна во всех комнатах',
      ],
    },
    {
      id: 3,
      category: 'windows',
      title: 'Мойка окон после ремонта',
      area: '23 створки',
      time: '3 часа',
      price: '7 500 руб.',
      image: 'https://via.placeholder.com/400x300/333333/ffffff?text=До+После',
      works: [
        'Мытье стекол с двух сторон',
        'Удаление остатков скотча',
        'Чистка оконных рам и подоконников',
        'Протирка фурнитуры и уплотнителей',
      ],
    },
  ];

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="portfolio__content">
          <div className="portfolio__header">
            <h2 className="portfolio__title">Примеры наших работ</h2>
            <a href="/portfolio" className="portfolio__viewAll">Все наши работы</a>
          </div>
          <div className="portfolio__grid">
          {portfolioItems.map(item => (
            <div key={item.id} className="portfolio__item">
              <div className="portfolio__imageWrapper">
                <img src={item.image} alt={item.title} className="portfolio__image" />
                <div className="portfolio__imageArrows">
                  <span>←</span>
                  <span>→</span>
                </div>
              </div>
              <div className="portfolio__itemContent">
                <h3 className="portfolio__itemTitle">{item.title}</h3>
                <div className="portfolio__details">
                  <div className="portfolio__detail">
                    <span className="portfolio__detailLabel">Площадь:</span>
                    <span className="portfolio__detailValue">{item.area}</span>
                  </div>
                  <div className="portfolio__detail">
                    <span className="portfolio__detailLabel">Сроки:</span>
                    <span className="portfolio__detailValue">{item.time}</span>
                  </div>
                  <div className="portfolio__detail">
                    <span className="portfolio__detailLabel">Цена:</span>
                    <span className="portfolio__detailValue">{item.price}</span>
                  </div>
                </div>
                <div className="portfolio__works">
                  <div className="portfolio__worksTitle">Виды выполненных работ:</div>
                  <ul className="portfolio__worksList">
                    {item.works.map((work, index) => (
                      <li key={index}>
                        <span className="portfolio__check">✓</span>
                        {work}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

