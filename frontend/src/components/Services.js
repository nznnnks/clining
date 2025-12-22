import React, { useState, useRef, useEffect } from 'react';
import './Services.css';

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      id: 1,
      title: 'Генеральная',
      time: '4-8 часов',
      workers: '2-3 клинера',
      price: 'от 130 руб./м²',
      image: '🧹',
      description: 'Комплексная уборка всех помещений',
    },
    {
      id: 2,
      title: 'Мойка окон',
      time: '1-3 часа',
      workers: '1-2 клинера',
      price: 'от 200 руб./створка',
      image: '🪟',
      description: 'Профессиональная мойка окон',
    },
    {
      id: 3,
      title: 'После ремонта',
      time: '6-12 часов',
      workers: '3-4 клинера',
      price: 'от 150 руб./м²',
      image: '🔨',
      description: 'Уборка после строительных работ',
    },
    {
      id: 4,
      title: 'Поддерживающая',
      time: '2-4 часа',
      workers: '1-2 клинера',
      price: 'от 70 руб./м²',
      image: '✨',
      description: 'Регулярная уборка для поддержания чистоты',
    },
  ];

  const contentRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Обновляем activeIndex при прокрутке
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current || isScrolling) return;
      
      const isMobile = window.innerWidth <= 768;
      const cardWidth = isMobile 
        ? contentRef.current.clientWidth - (window.innerWidth <= 480 ? 30 : 40)
        : 330;
      const scrollLeft = contentRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + (isMobile ? 15 : 30)));
      
      if (newIndex >= 0 && newIndex < services.length) {
        setActiveIndex(newIndex);
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, [isScrolling, services.length]);

  const nextService = () => {
    if (isScrolling || !contentRef.current) return;
    
    setIsScrolling(true);
    const isMobile = window.innerWidth <= 768;
    const gap = isMobile ? 15 : 30;
    const cardWidth = isMobile 
      ? contentRef.current.clientWidth - (window.innerWidth <= 480 ? 30 : 40)
      : 300;
    const totalCardWidth = cardWidth + gap;
    const maxScroll = contentRef.current.scrollWidth - contentRef.current.clientWidth;
    const nextIndex = (activeIndex + 1) % services.length;
    
    if (nextIndex === 0) {
      // Переходим к началу (цикл)
      contentRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
      setActiveIndex(0);
    } else {
      // Прокручиваем к следующей карточке
      const targetScroll = nextIndex * totalCardWidth;
      contentRef.current.scrollTo({
        left: Math.min(targetScroll, maxScroll),
        behavior: 'smooth'
      });
      setActiveIndex(nextIndex);
    }
    
    setTimeout(() => setIsScrolling(false), 500);
  };

  const prevService = () => {
    if (isScrolling || !contentRef.current) return;
    
    setIsScrolling(true);
    const isMobile = window.innerWidth <= 768;
    const gap = isMobile ? 15 : 30;
    const cardWidth = isMobile 
      ? contentRef.current.clientWidth - (window.innerWidth <= 480 ? 30 : 40)
      : 300;
    const totalCardWidth = cardWidth + gap;
    const prevIndex = (activeIndex - 1 + services.length) % services.length;
    
    if (prevIndex === services.length - 1) {
      // Переходим к концу (цикл)
      const maxScroll = contentRef.current.scrollWidth - contentRef.current.clientWidth;
      contentRef.current.scrollTo({
        left: maxScroll,
        behavior: 'smooth'
      });
      setActiveIndex(services.length - 1);
    } else {
      // Прокручиваем к предыдущей карточке
      const targetScroll = prevIndex * totalCardWidth;
      contentRef.current.scrollTo({
        left: Math.max(targetScroll, 0),
        behavior: 'smooth'
      });
      setActiveIndex(prevIndex);
    }
    
    setTimeout(() => setIsScrolling(false), 500);
  };

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-heading">
          <h2>Наши услуги клининга</h2>
        </div>
        <div className="services__carousel">
          <button className="services__arrow services__arrow--left" onClick={prevService}>
            ←
          </button>
          <div className="services__content" ref={contentRef}>
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`services__card ${index === activeIndex ? 'active' : ''}`}
              >
                <div className="services__cardImage">{service.image}</div>
                <div className="services__cardContent">
                  <h3 className="services__cardTitle">{service.title}</h3>
                  <p className="services__cardDescription">{service.description}</p>
                  <div className="services__cardInfo">
                    <div className="services__cardInfoItem">
                      <span className="services__icon">⏱️</span> {service.time}
                    </div>
                    <div className="services__cardInfoItem">
                      <span className="services__icon">👥</span> {service.workers}
                    </div>
                  </div>
                  <div className="services__cardPrice">{service.price}</div>
                  <a 
                    href="#calculator" 
                    className="services__cardButton btn"
                    onClick={(e) => {
                      e.preventDefault();
                      if (window.location.pathname !== '/') {
                        window.location.href = '/#calculator';
                      } else {
                        const element = document.getElementById('calculator');
                        if (element) {
                          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                          const offsetPosition = elementPosition - headerHeight - 20;
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }
                    }}
                  >
                    Узнать подробнее
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button className="services__arrow services__arrow--right" onClick={nextService}>
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;

