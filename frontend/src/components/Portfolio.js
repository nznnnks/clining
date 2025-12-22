import React, { useState, useEffect } from 'react';
import './Portfolio.css';

// Базовый URL API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Portfolio = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Загружаем данные из API
    const fetchPortfolioItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/portfolio/`);
        const result = await response.json();
        
        if (result.success) {
          // Преобразуем данные из формата бекенда в формат компонента
          const transformedItems = result.data.map(item => {
            // Преобразуем изображения: если это массив строк, создаем объекты с url
            let images = [];
            if (item.images && Array.isArray(item.images)) {
              images = item.images.map((img) => {
                if (typeof img === 'string') {
                  // Если это строка, создаем объект с url
                  return { url: img };
                }
                // Если уже объект, возвращаем как есть
                return img;
              });
            }
            
            return {
              id: item.id,
              название: item.title,
              описание: item.description,
              категория: item.category,
              площадь: item.area,
              время: item.time,
              цена: item.price,
              изображения: images.length > 0 ? images : null,
              works: item.works || [] // Опциональное поле, если будет добавлено в модель
            };
          });
          
          setPortfolioItems(transformedItems);
        } else {
          setError('Не удалось загрузить данные портфолио');
        }
      } catch (err) {
        console.error('Ошибка при загрузке портфолио:', err);
        setError('Ошибка при загрузке данных портфолио');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

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

  // Отображаем состояние загрузки
  if (loading) {
    return (
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="portfolio__content">
            <div className="portfolio__header">
              <h2 className="portfolio__title">Примеры наших работ</h2>
              <a href="/portfolio" className="portfolio__viewAll">Все наши работы</a>
            </div>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Загрузка данных...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Отображаем ошибку
  if (error) {
    return (
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="portfolio__content">
            <div className="portfolio__header">
              <h2 className="portfolio__title">Примеры наших работ</h2>
              <a href="/portfolio" className="portfolio__viewAll">Все наши работы</a>
            </div>
            <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Если нет элементов портфолио
  if (portfolioItems.length === 0) {
    return (
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="portfolio__content">
            <div className="portfolio__header">
              <h2 className="portfolio__title">Примеры наших работ</h2>
              <a href="/portfolio" className="portfolio__viewAll">Все наши работы</a>
            </div>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Портфолио пока пусто</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
                  <img src={currentImage.url} alt={item.название} className="portfolio__image" />
                  {hasMultipleImages && (
                    <>
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
                </div>
                {item.works && item.works.length > 0 && (
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
                )}
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

