import React, { useState } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const portfolioItems = [
    {
      id: 1,
      название: 'Уборка после ремонта',
      описание: 'Комплексная уборка квартиры после завершения ремонтных работ. Удаление строительного мусора, пыли и загрязнений со всех поверхностей.',
      категория: 'квартира',
      площадь: '56 м²',
      время: '8 часов',
      цена: '9 570 руб.',
      изображения: [
        { url: 'https://via.placeholder.com/400x300/cc0000/ffffff?text=До', label: 'До' },
        { url: 'https://via.placeholder.com/400x300/00cc00/ffffff?text=После', label: 'После' }
      ],
      датаСоздания: '2024-01-15',
      датаОбновления: '2024-01-20',
      works: [
        'Убрали строительный мусор',
        'Удалили строительную пыль',
        'Помыли полы, стены, потолок',
        'Мытьё окон',
      ],
    },
    {
      id: 2,
      название: 'Клининг двухкомнатной квартиры',
      описание: 'Генеральная уборка двухкомнатной квартиры с полной очисткой всех помещений, мебели и техники.',
      категория: 'квартира',
      площадь: '69 м²',
      время: '6 часов',
      цена: '9 100 руб.',
      изображения: [
        { url: 'https://via.placeholder.com/400x300/cc0000/ffffff?text=До', label: 'До' },
        { url: 'https://via.placeholder.com/400x300/00cc00/ffffff?text=После', label: 'После' }
      ],
      датаСоздания: '2024-01-10',
      датаОбновления: '2024-01-18',
      works: [
        'Провели влажную уборку пола, комнат, кухни и санузла',
        'Удалили пыль со стен, потолков, мебели',
        'Удалили пыль с техники и предметов интерьера',
        'Помыли подоконники и окна во всех комнатах',
      ],
    },
    {
      id: 3,
      название: 'Мойка окон после ремонта',
      описание: 'Профессиональная мойка окон с удалением строительных загрязнений, остатков скотча и защитной пленки.',
      категория: 'окна',
      площадь: '23 створки',
      время: '3 часа',
      цена: '7 500 руб.',
      изображения: [
        { url: 'https://via.placeholder.com/400x300/cc0000/ffffff?text=До', label: 'До' },
        { url: 'https://via.placeholder.com/400x300/00cc00/ffffff?text=После', label: 'После' }
      ],
      датаСоздания: '2024-01-12',
      датаОбновления: '2024-01-19',
      works: [
        'Мытье стекол с двух сторон',
        'Удаление остатков скотча',
        'Чистка оконных рам и подоконников',
        'Протирка фурнитуры и уплотнителей',
      ],
    },
    {
      id: 4,
      название: 'Уборка офиса',
      описание: 'Ежедневная уборка офисного помещения с поддержанием чистоты рабочих мест и общих зон.',
      категория: 'офис',
      площадь: '120 м²',
      время: '4 часа',
      цена: '12 000 руб.',
      изображения: null,
      датаСоздания: '2024-01-20',
      датаОбновления: '2024-01-25',
      works: [
        'Влажная уборка полов',
        'Протирка рабочих столов',
        'Очистка оргтехники',
        'Уборка санузлов и кухни',
      ],
    },
    {
      id: 5,
      название: 'Уборка коттеджа',
      описание: 'Комплексная уборка загородного дома с несколькими этажами и большим количеством помещений.',
      категория: 'коттедж',
      площадь: '180 м²',
      время: '10 часов',
      цена: '18 500 руб.',
      изображения: [
        { url: 'https://via.placeholder.com/400x300/cc0000/ffffff?text=До', label: 'До' },
        { url: 'https://via.placeholder.com/400x300/00cc00/ffffff?text=После', label: 'После' }
      ],
      датаСоздания: '2024-01-18',
      датаОбновления: '2024-01-22',
      works: [
        'Уборка всех этажей',
        'Мытье окон и зеркал',
        'Чистка ковров и мягкой мебели',
        'Уборка прилегающей территории',
      ],
    },
  ];

  const handlePreviousImage = (itemId) => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (!item || !item.изображения) return;
    
    setCurrentImageIndex(prev => {
      const currentIndex = prev[itemId] || 0;
      const newIndex = currentIndex === 0 ? item.изображения.length - 1 : currentIndex - 1;
      return { ...prev, [itemId]: newIndex };
    });
  };

  const handleNextImage = (itemId) => {
    const item = portfolioItems.find(i => i.id === itemId);
    if (!item || !item.изображения) return;
    
    setCurrentImageIndex(prev => {
      const currentIndex = prev[itemId] || 0;
      const newIndex = currentIndex === item.изображения.length - 1 ? 0 : currentIndex + 1;
      return { ...prev, [itemId]: newIndex };
    });
  };

  const getCurrentImage = (item) => {
    if (!item.изображения || item.изображения.length === 0) return null;
    const index = currentImageIndex[item.id] || 0;
    return item.изображения[index];
  };

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="portfolio__content">
          <div className="portfolio__header">
            <h2 className="portfolio__title">Примеры наших работ</h2>
            <a href="/portfolio" className="portfolio__viewAll">Все наши работы</a>
          </div>
          <div className="portfolio__grid">
          {portfolioItems.map(item => {
            const currentImage = getCurrentImage(item);
            const hasMultipleImages = item.изображения && item.изображения.length > 1;
            
            return (
            <div key={item.id} className="portfolio__item">
              {currentImage && (
                <div className="portfolio__imageWrapper">
                  <img src={currentImage.url} alt={`${item.название} - ${currentImage.label}`} className="portfolio__image" />
                  {hasMultipleImages && (
                    <>
                      <div className="portfolio__imageLabel">{currentImage.label}</div>
                      <div className="portfolio__imageArrows">
                        <span onClick={() => handlePreviousImage(item.id)}>←</span>
                        <span onClick={() => handleNextImage(item.id)}>→</span>
                      </div>
                      <div className="portfolio__imageDots">
                        {item.изображения.map((img, index) => (
                          <span
                            key={index}
                            className={`portfolio__imageDot ${(currentImageIndex[item.id] || 0) === index ? 'portfolio__imageDot--active' : ''}`}
                            onClick={() => setCurrentImageIndex(prev => ({ ...prev, [item.id]: index }))}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="portfolio__itemContent">
                <div className="portfolio__category">{item.категория}</div>
                <h3 className="portfolio__itemTitle">{item.название}</h3>
                {item.описание && (
                  <p className="portfolio__description">{item.описание}</p>
                )}
                <div className="portfolio__details">
                  <div className="portfolio__detail">
                    <span className="portfolio__detailLabel">Площадь:</span>
                    <span className="portfolio__detailValue">{item.площадь}</span>
                  </div>
                  <div className="portfolio__detail">
                    <span className="portfolio__detailLabel">Время уборки:</span>
                    <span className="portfolio__detailValue">{item.время}</span>
                  </div>
                  <div className="portfolio__detail">
                    <span className="portfolio__detailLabel">Цена:</span>
                    <span className="portfolio__detailValue">{item.цена}</span>
                  </div>
                  <div className="portfolio__detail">
                    <span className="portfolio__detailLabel">Дата создания:</span>
                    <span className="portfolio__detailValue">{item.датаСоздания}</span>
                  </div>
                  <div className="portfolio__detail">
                    <span className="portfolio__detailLabel">Дата обновления:</span>
                    <span className="portfolio__detailValue">{item.датаОбновления}</span>
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
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

