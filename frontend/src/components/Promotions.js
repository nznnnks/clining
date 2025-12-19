import React, { useState, useEffect, useRef } from 'react';
import './Promotions.css';

const Promotions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

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

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Возобновляем автопрокрутку через 5 секунд
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? promotions.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === promotions.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  // Автопрокрутка
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === promotions.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Меняем каждые 5 секунд
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, promotions.length]);

  // Прокрутка карусели через transform
  useEffect(() => {
    if (carouselRef.current) {
      const list = carouselRef.current.querySelector('.promotions__list');
      if (list) {
        list.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }
  }, [currentIndex]);

  return (
    <section className="promotions">
      <div className="container">
        <div className="promotions__header">
          <h2 className="promotions__title">Акции и скидки компании</h2>
          <a href="/promotions" className="promotions__viewAll">
            Смотреть все
          </a>
        </div>
        <div className="promotions__carouselWrapper">
          <button 
            className="promotions__arrow promotions__arrow--prev"
            onClick={goToPrevious}
            aria-label="Предыдущая акция"
          >
            ←
          </button>
          <div className="promotions__carousel" ref={carouselRef}>
            <div className="promotions__list">
              {promotions.map((promo, index) => (
                <div 
                  key={promo.id} 
                  className={`promotions__card ${index === currentIndex ? 'promotions__card--active' : ''}`}
                >
                  <div className="promotions__cardImage">{promo.image}</div>
                  <h3 className="promotions__cardTitle">{promo.title}</h3>
                  <p className="promotions__cardDescription">{promo.description}</p>
                  <div className="promotions__cardValid">
                    Действует до: {promo.validUntil}
                  </div>
                  <a href="/promotions" className="promotions__cardButton btn">
                    Подробнее
                  </a>
                </div>
              ))}
            </div>
          </div>
          <button 
            className="promotions__arrow promotions__arrow--next"
            onClick={goToNext}
            aria-label="Следующая акция"
          >
            →
          </button>
        </div>
        <div className="promotions__dots">
          {promotions.map((_, index) => (
            <button
              key={index}
              className={`promotions__dot ${index === currentIndex ? 'promotions__dot--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к акции ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;

