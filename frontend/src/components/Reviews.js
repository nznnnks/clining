import React from 'react';
import './Reviews.css';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'София Меркулова',
      rating: 5,
      text: 'Всем спасибо!! Все высшем уровне! Очень вежливые и приятные работники, используют свое оборудование и средства для уборки.',
      platform: 'Yandex',
    },
    {
      id: 2,
      name: 'Петр Р.',
      rating: 5,
      text: 'Отличная клининговая компания! Качество и цена на высоте. Очень доволен результатом. Убрали коммерческое помещение профессионально.',
      platform: '2GIS',
    },
    {
      id: 3,
      name: 'Марина',
      rating: 5,
      text: 'Заказывала генеральную уборку после ремонта. Все сделали на 5+! Справились даже с самыми сложными загрязнениями. Вежливые и внимательные.',
      platform: 'Yandex',
    },
  ];

  const platforms = [
    { name: 'Yandex', rating: 5.0, reviews: 294, icon: '⭐' },
    { name: 'Google Maps', rating: 4.9, reviews: 129, icon: '🗺️' },
    { name: '2GIS', rating: 5.0, reviews: 103, icon: '📍' },
  ];

  return (
    <section className="reviews">
      <div className="container">
        <div className="section-heading">
          <h2>Отзывы наших клиентов</h2>
        </div>
        <div className="reviews__platforms">
          {platforms.map((platform) => (
            <div key={platform.name} className="reviews__platform">
              <div className="reviews__platformIcon">{platform.icon}</div>
              <div className="reviews__platformRating">{platform.rating}</div>
              <div className="reviews__platformStars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="reviews__star">⭐</span>
                ))}
              </div>
              <div className="reviews__platformName">{platform.name}</div>
              <div className="reviews__platformCount">{platform.reviews} отзывов</div>
            </div>
          ))}
        </div>
        <div className="reviews__help">
          <h3>Помогите стать нам лучше!</h3>
          <a href="#contacts" className="reviews__helpButton btn">
            Оставить свой отзыв →
          </a>
        </div>
        <div className="reviews__list">
          {reviews.map((review) => (
            <div key={review.id} className="reviews__card">
              <div className="reviews__header">
                <div className="reviews__name">{review.name}</div>
                <div className="reviews__rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="reviews__star">⭐</span>
                  ))}
                </div>
              </div>
              <p className="reviews__text">{review.text}</p>
              <div className="reviews__platform">{review.platform}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

