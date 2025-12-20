import React from 'react';
import './ReviewsRatings.css';

const ReviewsRatings = () => {
  return (
    <section className="reviews-ratings">
      <div className="container">
        <div className="reviews-ratings__header">
          <h2 className="reviews-ratings__title">Наш рейтинг на отзовиках</h2>
          <a href="/reviews" className="reviews-ratings__link btn">
            Читать все отзывы
          </a>
        </div>
        <div className="reviews-ratings__grid">
          <div className="reviews-ratings__card">
            <div className="reviews-ratings__rating">5.0</div>
            <div className="reviews-ratings__stars">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <div className="reviews-ratings__label">Рейтинг компании</div>
            <div className="reviews-ratings__logo reviews-ratings__logo--yandex">Яндекс</div>
            <div className="reviews-ratings__count">294 отзыва</div>
          </div>
          <div className="reviews-ratings__card">
            <div className="reviews-ratings__rating">4.9</div>
            <div className="reviews-ratings__stars">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <div className="reviews-ratings__label">Рейтинг компании</div>
            <div className="reviews-ratings__logo reviews-ratings__logo--google">Google Maps</div>
            <div className="reviews-ratings__count">129 отзывов</div>
          </div>
          <div className="reviews-ratings__card">
            <div className="reviews-ratings__rating">5.0</div>
            <div className="reviews-ratings__stars">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <div className="reviews-ratings__label">Рейтинг компании</div>
            <div className="reviews-ratings__logo reviews-ratings__logo--2gis">2ГИС</div>
            <div className="reviews-ratings__count">103 отзыва</div>
          </div>
          <div className="reviews-ratings__card">
            <div className="reviews-ratings__rating">5.0</div>
            <div className="reviews-ratings__stars">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <div className="reviews-ratings__label">Рейтинг компании</div>
            <div className="reviews-ratings__logo reviews-ratings__logo--zoon">ZOON</div>
            <div className="reviews-ratings__count">77 отзывов</div>
          </div>
        </div>
        <div className="reviews-ratings__messengers">
          <div className="reviews-ratings__messengersText">
            <div className="reviews-ratings__avatar">👩</div>
            <span>Напишите нам в мессенджеры</span>
          </div>
          <div className="reviews-ratings__messengersButtons">
            <a
              href="https://wa.me/79770893293"
              className="reviews-ratings__btn reviews-ratings__btn--wa"
              target="_blank"
              rel="nofollow"
            >
              <span>WhatsApp</span>
              <span className="reviews-ratings__btnIcon">💬</span>
            </a>
            <a
              href="https://t.me/uborka24_sales"
              className="reviews-ratings__btn reviews-ratings__btn--tg"
              target="_blank"
              rel="nofollow"
            >
              <span>Telegram</span>
              <span className="reviews-ratings__btnIcon">✈️</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsRatings;

