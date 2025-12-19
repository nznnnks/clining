import React, { useState, useRef } from 'react';
import './HowWeWork.css';

const HowWeWork = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  
  const videos = [
    {
      id: 1,
      title: 'под каждым видео с тяжело уборкой нам пишут',
      thumbnail: '📹',
    },
    {
      id: 2,
      title: 'можете просто пройтись тряпочкой?',
      thumbnail: '📹',
    },
    {
      id: 3,
      title: 'Уборка квартиры после по',
      thumbnail: '📹',
    },
    {
      id: 4,
      title: 'Вы приезжаете со своими средст или нужно что-то подготовить за',
      thumbnail: '📹',
    },
    {
      id: 5,
      title: 'сколько клинеров приедет на уборку?',
      thumbnail: '📹',
    },
    {
      id: 6,
      title: 'что лучше вызвать уборщиц или клининговую компанию',
      thumbnail: '📹',
    },
  ];

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = 300;
      const newPosition = Math.max(0, scrollPosition - cardWidth);
      carouselRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = 300;
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const newPosition = Math.min(maxScroll, scrollPosition + cardWidth);
      carouselRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="how-we-work">
      <div className="container">
        <div className="section-heading">
          <h2>Как мы делаем уборку</h2>
          <p>
            Наши опытные клинеры приедут без опозданий в назначенное время 
            с профессиональным оборудованием и сразу приступят к уборке.
          </p>
        </div>
        <div className="how-we-work__carousel">
          <button className="how-we-work__arrow how-we-work__arrow--left" onClick={scrollLeft}>←</button>
          <div className="how-we-work__videos" ref={carouselRef}>
            {videos.map((video) => (
              <div key={video.id} className="how-we-work__video">
                <div className="how-we-work__thumbnail">
                  <div className="how-we-work__playButton">▶</div>
                  <div className="how-we-work__videoIcon">{video.thumbnail}</div>
                </div>
                <p className="how-we-work__videoTitle">{video.title}</p>
              </div>
            ))}
          </div>
          <button className="how-we-work__arrow how-we-work__arrow--right" onClick={scrollRight}>→</button>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;

