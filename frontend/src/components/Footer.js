import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();

  const handleAnchorClick = (e, anchorId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      // Если не на главной странице, переходим на главную и затем скроллим
      window.location.href = `/#${anchorId}`;
    } else {
      // Если на главной странице, просто скроллим
      const element = document.getElementById(anchorId);
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
  };

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
                  <Link to="/" onClick={(e) => handleAnchorClick(e, 'home')}>Главная</Link>
                </li>
                <li>
                  <Link to="/" onClick={(e) => handleAnchorClick(e, 'about')}>О нас</Link>
                </li>
                <li>
                  <Link to="/" onClick={(e) => handleAnchorClick(e, 'portfolio')}>Портфолио</Link>
                </li>
                <li>
                  <Link to="/" onClick={(e) => handleAnchorClick(e, 'packages')}>Пакеты услуг</Link>
                </li>
                <li>
                  <Link to="/" onClick={(e) => handleAnchorClick(e, 'steps')}>Этапы работы</Link>
                </li>
                <li>
                  <Link to="/" onClick={(e) => handleAnchorClick(e, 'calculator')}>Калькулятор</Link>
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

