import React, { useState, useRef, useEffect } from 'react';
import './Employees.css';

const Employees = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const employees = [
    {
      id: 1,
      name: 'Айза',
      rating: '5,0',
      role: 'Клинер',
      experience: '5 лет',
      image: '👩‍💼',
    },
    {
      id: 2,
      name: 'Татьяна',
      rating: '5,0',
      role: 'Клинер',
      experience: '4 года',
      image: '👩‍💼',
    },
    {
      id: 3,
      name: 'Мария',
      rating: '5,0',
      role: 'Клинер',
      experience: '6 лет',
      image: '👩‍💼',
    },
    {
      id: 4,
      name: 'Елена',
      rating: '5,0',
      role: 'Клинер',
      experience: '5 лет',
      image: '👩‍💼',
    },
    {
      id: 5,
      name: 'Анна',
      rating: '5,0',
      role: 'Клинер',
      experience: '7 лет',
      image: '👩‍💼',
    },
  ];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? employees.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === employees.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (carouselRef.current) {
      const list = carouselRef.current.querySelector('.employees__list');
      if (list) {
        const cardWidth = 260; // Ширина карточки (240px) + gap (20px)
        const containerWidth = carouselRef.current.offsetWidth;
        // Показываем по 2 карточки за раз
        const visibleCards = 2;
        const maxIndex = Math.max(0, employees.length - visibleCards);
        const clampedIndex = Math.min(currentIndex, maxIndex);
        list.style.transform = `translateX(-${clampedIndex * cardWidth}px)`;
      }
    }
  }, [currentIndex, employees.length]);

  return (
    <section className="employees">
      <div className="container">
        <h2 className="employees__title">Наши сотрудники</h2>
        <div className="employees__content">
          <div className="employees__text">
            <p className="employees__intro">
              В штате клининговой компании более <span className="employees__highlight">75 клинеров</span>. Мы работаем по всей Москве, Московской области и выезжаем до 50 км от МКАД.
            </p>
            <h3 className="employees__subtitle">Все сотрудники, которые работают в нашей компании:</h3>
            <ul className="employees__featuresList">
              <li>успешно прошли проверку службы безопасности</li>
              <li>прошли специализированное обучение</li>
              <li>дважды в год проходят курсы повышение квалификации</li>
              <li>обладают опытом работы в клининге не менее 5 лет</li>
            </ul>
            <p className="employees__conclusion">
              Мы предлагаем все виды клининга, поэтому в работе используем качественную технику и чистящие средства.
            </p>
          </div>
          <div className="employees__carouselWrapper">
            <button 
              className="employees__arrow employees__arrow--prev"
              onClick={goToPrevious}
              aria-label="Предыдущий сотрудник"
            >
              ←
            </button>
            <div className="employees__carousel" ref={carouselRef}>
              <div className="employees__list">
                {employees.map((employee) => (
                  <div key={employee.id} className="employees__card">
                    <div className="employees__cardImage">
                      {employee.image}
                    </div>
                    <div className="employees__cardName">{employee.name}</div>
                    <div className="employees__cardRating">
                      <span>⭐</span> <span>{employee.rating}</span>/5
                    </div>
                    <div className="employees__cardRole">{employee.role}</div>
                    <div className="employees__cardExperience">
                      Опыт: {employee.experience}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button 
              className="employees__arrow employees__arrow--next"
              onClick={goToNext}
              aria-label="Следующий сотрудник"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Employees;

