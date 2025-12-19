import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contacts" className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__topCol footer__topCol_left">
            <div className="footer__topColH">Мы на карте</div>
            <div className="footer__topColAdr">
              Москва, ул. Буилерова 17, оф. 5055
            </div>
            <div className="footer__topColMap">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Aexample&lang=ru_RU"
                width="100%"
                height="200"
                frameBorder="0"
                title="Карта"
                style={{ border: 'none', borderRadius: '8px' }}
              ></iframe>
            </div>
          </div>
          <div className="footer__topCol footer__topCol_center">
            <div className="footer__topColH">Контакты</div>
            <div className="footer__contacts">
              <div className="footer__contactItem">
                <span className="footer__contactLabel">Телефон:</span>
                <a href="tel:+74954313021" className="footer__contactValue">
                  +7 (495) 431-30-21
                </a>
              </div>
              <div className="footer__contactItem">
                <span className="footer__contactLabel">Режим работы:</span>
                <span className="footer__contactValue">
                  Ежедневно с 9:00-22:00
                </span>
              </div>
              <div className="footer__contactItem">
                <span className="footer__contactLabel">WhatsApp:</span>
                <a
                  href="https://wa.me/79770893293"
                  className="footer__contactValue"
                  target="_blank"
                  rel="nofollow"
                >
                  +7 (977) 089-32-93
                </a>
              </div>
              <div className="footer__contactItem">
                <span className="footer__contactLabel">Telegram:</span>
                <a
                  href="https://t.me/uborka24_sales"
                  className="footer__contactValue"
                  target="_blank"
                  rel="nofollow"
                >
                  @uborka24_sales
                </a>
              </div>
            </div>
          </div>
          <div className="footer__topCol footer__topCol_right">
            <div className="footer__topColH">Навигация</div>
            <nav className="footer__nav">
              <ul className="footer__navList">
                <li>
                  <a href="#home">Главная</a>
                </li>
                <li>
                  <a href="#about">О нас</a>
                </li>
                <li>
                  <a href="#portfolio">Портфолио</a>
                </li>
                <li>
                  <a href="#packages">Пакеты услуг</a>
                </li>
                <li>
                  <a href="#steps">Этапы работы</a>
                </li>
                <li>
                  <a href="#calculator">Калькулятор</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>&copy; {new Date().getFullYear()} Клининговая компания. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

