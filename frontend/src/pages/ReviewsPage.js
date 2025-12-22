import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ReviewsRatings from '../components/ReviewsRatings';
import './ReviewsPage.css';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Виктор Ф.',
      rating: 5.0,
      title: 'Избавили от каторги',
      text: 'Ненавижу убираться. Живу один, но хочется чистоты и уюта, а когда приходишь с работы уставший как собака, то до пылесоса руки не доходят. Тут все просто и четко. Позвонил - приехали клинеры - навели порядок - все чисто и недорого. Иногда по времени занимает чуть дольше, чем они планируют, но это ерунда. Главное - результат. Спасибо.',
      service: 'Услуга: Поддерживающая уборка квартиры',
      avatar: 'В'
    },
    {
      id: 2,
      name: 'Антонина Ш.',
      rating: 5.0,
      title: 'Благодарю уборка 24 за работу',
      text: 'Я рада, что обратилась именно сюда. девочки очень вежливые и приятные. приехали две красавицы и здорово отмыли мой дом после ремонта. так хотелось скорее в него въехать, но сама я бы не справилась. У клининга есть такое оборудование, что домохозяйкам и не снилось. Для них уборка проходит запросто и быстро. Рекомендую вас всем друзьям.',
      service: 'Услуга: Уборка дома после ремонта',
      avatar: 'А'
    },
    {
      id: 3,
      name: 'Борис Д.',
      rating: 5.0,
      title: 'Спасибо за работу',
      text: 'Добрый день! Заказывали клинеров на чистку фасадов. Наш тц находится в самом центре, и фасады очень страдают от грязи и пыли. Пригласили клинеров, которые приехали полностью готовые со своей техников, спецодеждой, средствами, все свое было. нас просто позвали в конце, чтобы принять работу. Кстати, сработали даже быстрее, чем думали, при этом сделано на совесть. Все окна и вывески нереально сияли.',
      service: 'Услуга: Мойка фасадов',
      avatar: 'Б'
    }
  ]);

  useEffect(() => {
    document.title = 'Отзывы - Клининговая компания Уборка 24 | Уборка 24';
  }, []);

  return (
    <div className="reviews-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'Отзывы', path: '/reviews' }
      ]} />
      
      <section className="reviews-page__hero">
        <div className="container">
          <h1 className="reviews-page__title">Отзывы</h1>
        </div>
      </section>

      <section className="reviews-page__ratings">
        <div className="container">
          <div className="reviews-page__ratingsGrid">
            <div className="reviews-page__ratingCard">
              <div className="reviews-page__ratingValue">5.0</div>
              <div className="reviews-page__ratingStars">
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
              </div>
              <div className="reviews-page__ratingLabel">Рейтинг компании</div>
              <div className="reviews-page__ratingLogo reviews-page__ratingLogo--yandex">Яндекс</div>
              <div className="reviews-page__ratingCount">294 отзыва</div>
            </div>
            <div className="reviews-page__ratingCard">
              <div className="reviews-page__ratingValue">4.9</div>
              <div className="reviews-page__ratingStars">
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
              </div>
              <div className="reviews-page__ratingLabel">Рейтинг компании</div>
              <div className="reviews-page__ratingLogo reviews-page__ratingLogo--google">Google Maps</div>
              <div className="reviews-page__ratingCount">129 отзывов</div>
            </div>
            <div className="reviews-page__ratingCard">
              <div className="reviews-page__ratingValue">5.0</div>
              <div className="reviews-page__ratingStars">
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
              </div>
              <div className="reviews-page__ratingLabel">Рейтинг компании</div>
              <div className="reviews-page__ratingLogo reviews-page__ratingLogo--2gis">2ГИС</div>
              <div className="reviews-page__ratingCount">103 отзыва</div>
            </div>
            <div className="reviews-page__cta">
              <div className="reviews-page__ctaText">Помогите стать нам лучше!</div>
              <a 
                href="#reviews" 
                className="reviews-page__ctaButton btn"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('reviews');
                  if (element) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 20;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Оставить свой отзыв
                <span className="reviews-page__ctaArrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="reviews-page__content">
        <div className="container">
          <div className="reviews-page__grid">
            {reviews.map(review => (
              <div key={review.id} className="reviews-page__card">
                <div className="reviews-page__cardHeader">
                  <div className="reviews-page__cardAvatar">{review.avatar}</div>
                  <div className="reviews-page__cardInfo">
                    <div className="reviews-page__cardName">{review.name}</div>
                    <div className="reviews-page__cardRating">
                      <span>{review.rating}</span>
                      <div className="reviews-page__cardStars">
                        <span>⭐</span>
                        <span>⭐</span>
                        <span>⭐</span>
                        <span>⭐</span>
                        <span>⭐</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="reviews-page__cardTitle">{review.title}</h3>
                <p className="reviews-page__cardText">{review.text}</p>
                <div className="reviews-page__cardService">{review.service}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsRatings />
    </div>
  );
};

export default ReviewsPage;

