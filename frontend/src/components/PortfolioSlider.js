import React, { useState, useEffect } from 'react';
import './PortfolioSlider.css';

const PortfolioSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const portfolioItems = [
    {
      id: 1,
      название: 'Уборка после ремонта',
      категория: 'квартира',
      изображения: [
        { url: 'https://via.placeholder.com/800x600/cc0000/ffffff?text=До', label: 'До' },
        { url: 'https://via.placeholder.com/800x600/00cc00/ffffff?text=После', label: 'После' }
      ],
    },
    {
      id: 2,
      название: 'Клининг двухкомнатной квартиры',
      категория: 'квартира',
      изображения: [
        { url: 'https://via.placeholder.com/800x600/cc0000/ffffff?text=До', label: 'До' },
        { url: 'https://via.placeholder.com/800x600/00cc00/ffffff?text=После', label: 'После' }
      ],
    },
    {
      id: 3,
      название: 'Мойка окон после ремонта',
      категория: 'окна',
      изображения: [
        { url: 'https://via.placeholder.com/800x600/cc0000/ffffff?text=До', label: 'До' },
        { url: 'https://via.placeholder.com/800x600/00cc00/ffffff?text=После', label: 'После' }
      ],
    },
    {
      id: 5,
      название: 'Уборка коттеджа',
      категория: 'коттедж',
      изображения: [
        { url: 'https://via.placeholder.com/800x600/cc0000/ffffff?text=До', label: 'До' },
        { url: 'https://via.placeholder.com/800x600/00cc00/ffffff?text=После', label: 'После' }
      ],
    },
  ];

  // Фильтруем только те элементы, у которых есть изображения "до" и "после"
  const itemsWithImages = portfolioItems.filter(item => 
    item.изображения && item.изображения.length >= 2
  );

  // Автопрокрутка слайдера
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => 
        prev === itemsWithImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [itemsWithImages.length]);

  const handlePreviousSlide = () => {
    setCurrentSlideIndex(prev => 
      prev === 0 ? itemsWithImages.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex(prev => 
      prev === itemsWithImages.length - 1 ? 0 : prev + 1
    );
  };

  if (itemsWithImages.length === 0) return null;

  const currentItem = itemsWithImages[currentSlideIndex];
  const beforeImage = currentItem.изображения.find(img => img.label === 'До');
  const afterImage = currentItem.изображения.find(img => img.label === 'После');

  return (
    <section id="portfolio" className="portfolio-slider">
      <div className="container">
        <div className="portfolio-slider__content">
          <div className="portfolio-slider__header">
            <h2 className="portfolio-slider__title">Примеры наших работ</h2>
            <a href="/portfolio" className="portfolio-slider__viewAll">Все наши работы</a>
          </div>
          <div className="portfolio-slider__wrapper">
            <div className="portfolio-slider__slider">
              <div className="portfolio-slider__beforeAfter">
                <div className="portfolio-slider__beforeSection">
                  <div className="portfolio-slider__beforeLabel">До</div>
                  <img 
                    src={beforeImage?.url || 'https://via.placeholder.com/800x600/cc0000/ffffff?text=До'} 
                    alt={`${currentItem.название} - До`} 
                    className="portfolio-slider__beforeImage" 
                  />
                </div>
                <div className="portfolio-slider__divider"></div>
                <div className="portfolio-slider__afterSection">
                  <div className="portfolio-slider__afterLabel">После</div>
                  <img 
                    src={afterImage?.url || 'https://via.placeholder.com/800x600/00cc00/ffffff?text=После'} 
                    alt={`${currentItem.название} - После`} 
                    className="portfolio-slider__afterImage" 
                  />
                </div>
              </div>
              <div className="portfolio-slider__info">
                <div className="portfolio-slider__category">{currentItem.категория}</div>
                <h3 className="portfolio-slider__sliderTitle">{currentItem.название}</h3>
              </div>
            </div>
            <button 
              className="portfolio-slider__arrow portfolio-slider__arrow--prev"
              onClick={handlePreviousSlide}
              aria-label="Предыдущий слайд"
            >
              ←
            </button>
            <button 
              className="portfolio-slider__arrow portfolio-slider__arrow--next"
              onClick={handleNextSlide}
              aria-label="Следующий слайд"
            >
              →
            </button>
            <div className="portfolio-slider__dots">
              {itemsWithImages.map((item, index) => (
                <button
                  key={item.id}
                  className={`portfolio-slider__dot ${currentSlideIndex === index ? 'portfolio-slider__dot--active' : ''}`}
                  onClick={() => setCurrentSlideIndex(index)}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSlider;

