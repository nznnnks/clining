import React, { useState, useEffect, useRef } from 'react';
import { promotionsAPI } from '../utils/api';
import './Promotions.css';

const Promotions = ({ showAll = false, mode = 'carousel' }) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    loadPromotions();
  }, [showAll]);

  const loadPromotions = async () => {
    try {
      setLoading(true);
      // Если showAll = false, показываем только активные акции, иначе все
      const activeOnly = !showAll;
      const response = await promotionsAPI.getAll(activeOnly);
      
      // Проверяем, что response существует и успешен
      if (response && response.success === true && Array.isArray(response.data)) {
        // Преобразуем данные из API в формат компонента
        const formattedPromotions = response.data.map(promo => ({
          id: promo.id,
          title: promo.title || '',
          description: promo.description || '',
          validUntil: promo.valid_until || '',
          image: '🎁', // Дефолтная иконка, можно сделать более умную логику
          is_active: promo.is_active
        }));
        setPromotions(formattedPromotions);
        
        // Сбрасываем индекс если список изменился
        if (formattedPromotions.length > 0) {
          setCurrentIndex(0);
        }
      } else {
        // Если формат ответа неверный или success: false, просто оставляем пустой массив
        setPromotions([]);
      }
    } catch (err) {
      // Тихая обработка ошибок - не логируем в консоль, так как ошибка уже обработана в fetchAPI
      // Оставляем пустой массив при любой ошибке
      setPromotions([]);
    } finally {
      setLoading(false);
    }
  };

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
    if (promotions.length <= 1) {
      // Отключаем автопрокрутку если акций 1 или меньше
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

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

  // Не показываем секцию если акций нет
  if (loading) {
    return (
      <section className="promotions">
        <div className="container">
          <div className="promotions__header">
            <h2 className="promotions__title">Акции и скидки компании</h2>
          </div>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            Загрузка акций...
          </div>
        </div>
      </section>
    );
  }

  if (promotions.length === 0) {
    return (
      <section className="promotions">
        <div className="container">
          <div className="promotions__header">
            <h2 className="promotions__title">Акции и скидки компании</h2>
          </div>
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Акции не найдены
          </div>
        </div>
      </section>
    );
  }

  // Если mode = 'grid', показываем сетку вместо карусели
  if (mode === 'grid') {
    return (
      <section className="promotions">
        <div className="container">
          <div className="promotions__header">
            <h2 className="promotions__title">Акции и скидки компании</h2>
          </div>
          <div className="promotions__grid">
            {promotions.map((promo) => (
              <div key={promo.id} className="promotions__card promotions__card--grid">
                <div className="promotions__cardImage">{promo.image}</div>
                <h3 className="promotions__cardTitle">{promo.title}</h3>
                {promo.description && (
                  <p className="promotions__cardDescription">{promo.description}</p>
                )}
                {promo.validUntil && (
                  <div className="promotions__cardValid">
                    Действует до: {promo.validUntil}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Режим карусели (по умолчанию)
  return (
    <section className="promotions">
      <div className="container">
        <div className="promotions__header">
          <h2 className="promotions__title">Акции и скидки компании</h2>
          {!showAll && (
            <a href="/promotions" className="promotions__viewAll">
              Смотреть все
            </a>
          )}
        </div>
        <div className="promotions__carouselWrapper">
          {promotions.length > 1 && (
            <>
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
                      {promo.description && (
                        <p className="promotions__cardDescription">{promo.description}</p>
                      )}
                      {promo.validUntil && (
                        <div className="promotions__cardValid">
                          Действует до: {promo.validUntil}
                        </div>
                      )}
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
            </>
          )}
          {promotions.length === 1 && (
            <div className="promotions__carousel" ref={carouselRef}>
              <div className="promotions__list">
                {promotions.map((promo) => (
                  <div key={promo.id} className="promotions__card promotions__card--active">
                    <div className="promotions__cardImage">{promo.image}</div>
                    <h3 className="promotions__cardTitle">{promo.title}</h3>
                    {promo.description && (
                      <p className="promotions__cardDescription">{promo.description}</p>
                    )}
                    {promo.validUntil && (
                      <div className="promotions__cardValid">
                        Действует до: {promo.validUntil}
                      </div>
                    )}
                    <a href="/promotions" className="promotions__cardButton btn">
                      Подробнее
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {promotions.length > 1 && (
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
        )}
      </div>
    </section>
  );
};

export default Promotions;

