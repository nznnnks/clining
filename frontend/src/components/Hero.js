import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="banner banner_index">
      <div className="banner__container container">
        <div className="banner__left">
          <h1 className="banner__heading">
            Клининговая компания в Москве <span>от 70 руб./м²</span>
          </h1>
          <div className="banner__promo">
            <span className="banner__promoIcon">🔥</span>
            <span className="banner__promoText">Скидка 10% + мойка окна в подарок!</span>
          </div>
          <div className="banner__desc">
            <ul className="banner__achievements">
              <li>
                <span className="banner__check">✓</span>
                ТОП-10 компаний по версии Klerk.ru и Vc.ru
              </li>
              <li>
                <span className="banner__check">✓</span>
                Выполнили 18 957 заказов за 5 лет работы
              </li>
              <li>
                <span className="banner__check">✓</span>
                Наш рейтинг в Яндекс Я 5,0
              </li>
            </ul>
          </div>
          <div className="banner__btnsRow">
            <a 
              href="https://wa.me/79770893293" 
              className="banner__btn banner__btn_wa btn"
              target="_blank"
              rel="nofollow"
            >
              <span className="banner__btnIcon">💬</span>
              Написать в WhatsApp
            </a>
            <a 
              href="https://t.me/uborka24_sales" 
              className="banner__btn banner__btn_tg btn"
              target="_blank"
              rel="nofollow"
            >
              <span className="banner__btnIcon">✈️</span>
              Написать в Telegram
            </a>
          </div>
        </div>
        <div className="banner__right">
          <div className="banner__imageWrapper">
            <div className="banner__playButton">▶</div>
          </div>
        </div>
        <div className="banner__bottomRow">
          <div className="banner__bottomItm">
            <div className="banner__bottomImgWrp">🚗</div>
            <div className="banner__bottomTxt">
              Приедем в удобное для вас время без опозданий
            </div>
          </div>
          <div className="banner__bottomItm">
            <div className="banner__bottomImgWrp">🛠️</div>
            <div className="banner__bottomTxt">
              Используем только профессиональное оборудование
            </div>
          </div>
          <div className="banner__bottomItm">
            <div className="banner__bottomImgWrp">🛡️</div>
            <div className="banner__bottomTxt">
              Гарантия качества и сохранности вашего имущества
            </div>
          </div>
          <div className="banner__bottomItm">
            <div className="banner__bottomImgWrp">💳</div>
            <div className="banner__bottomTxt">
              Никаких предоплат! Оплата только после уборки
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

