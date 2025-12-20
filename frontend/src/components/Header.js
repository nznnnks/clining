import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0, width: 0 });
  const individualsRef = useRef(null);
  const legalRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastScrolledState = false;
    let ticking = false;
    let rafId = null;
    const SCROLL_THRESHOLD = 120;
    const SCROLL_DEADZONE = 50; // Увеличиваем зону нечувствительности для предотвращения тряски
    const MIN_SCROLL_DELTA = 8; // Увеличиваем минимальное изменение для обработки

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      // Пропускаем обработку при очень маленьких изменениях
      if (scrollDelta < MIN_SCROLL_DELTA && ticking) {
        return;
      }
      
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(() => {
          // Используем более умную логику с расширенной зоной нечувствительности
          let scrolled;
          if (currentScrollY > SCROLL_THRESHOLD + SCROLL_DEADZONE) {
            scrolled = true;
          } else if (currentScrollY < SCROLL_THRESHOLD - SCROLL_DEADZONE) {
            scrolled = false;
          } else {
            // В зоне нечувствительности сохраняем последнее известное состояние
            scrolled = lastScrolledState;
          }
          
          // Обновляем только если состояние действительно изменилось
          if (scrolled !== lastScrolledState) {
            setIsScrolled(scrolled);
            lastScrolledState = scrolled;
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
      }
    };

          const updateSubmenuPosition = () => {
            if (activeSubmenu) {
              const headerBottom = document.querySelector('.header__bottom');
              if (headerBottom) {
                const headerRect = headerBottom.getBoundingClientRect();
                setSubmenuPosition({
                  top: headerRect.bottom,
                  left: 0,
                  width: window.innerWidth
                });
              }
            }
          };

          // Закрываем меню при клике вне его
          const handleClickOutside = (e) => {
            if (activeSubmenu && 
                !e.target.closest('.menu-item-has-children') && 
                !e.target.closest('.sub-menu') &&
                !e.target.closest('.sub-menu--info__close')) {
              setActiveSubmenu(null);
            }
          };

          window.addEventListener('scroll', handleScroll, { passive: true });
          window.addEventListener('resize', updateSubmenuPosition, { passive: true });
          document.addEventListener('click', handleClickOutside);
          
          if (activeSubmenu) {
            updateSubmenuPosition();
          }
          
          return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', updateSubmenuPosition);
            document.removeEventListener('click', handleClickOutside);
            if (rafId) {
              cancelAnimationFrame(rafId);
            }
          };
  }, [activeSubmenu]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__top">
        <div className="container">
          <div className="header__topContent">
            <Link to="/" className="header__logo">
              <div className="header__logoMain">
                <span className="header__logoImg">🧹</span>
                <div className="header__logoText">
                  <div className="header__logoTitle">
                    УБОРКА <span className="header__logoTitleNumber">24</span>
                  </div>
                  <div className="header__logoSubtitle">клининговая компания</div>
                </div>
              </div>
              <div className="header__logoTxt">
                Клининг квартир, домов, офисов в Москве и МО
              </div>
            </Link>
            <div className="header__contacts">
              <div className="header__digStars">
                <div className="header__digStarsLeft">5,0</div>
                <div className="header__digStarsRight">
                  <div className="header__digStarsRightTop">
                    <span className="header__itmStar">⭐</span>
                    <span className="header__itmStar">⭐</span>
                    <span className="header__itmStar">⭐</span>
                    <span className="header__itmStar">⭐</span>
                    <span className="header__itmStar">⭐</span>
                  </div>
                  <div className="header__digStarsRightBottom">
                    <span className="header__sTxtTop">Рейтинг в Яндекс на основании 294 отзыва</span>
                  </div>
                </div>
              </div>
              <div className="header__address">
                <span className="header__addressIcon">📍</span>
                <span className="header__addressText">Москва, ул. Бутлерова, 17</span>
                <span className="header__addressArrow">▼</span>
              </div>
              <div className="header__iconsTxt">
                <div className="header__txt">
                  <a href="tel:+74954313021" className="header__txtTop">
                    <span className="header__phoneIcon">📞</span>
                    <span>+7 (495) 431-30-21</span>
                  </a>
                  <div className="header__txtBottom">
                    <span className="header__timeIcon">🟢</span>
                    <span>Ежедневно с 9:00-22:00</span>
                  </div>
                </div>
              </div>
              <a href="#calculator" className="header__link">
                Заказать
              </a>
            </div>
            <a href="tel:+74954313021" className="header__mobContacts">
              +7 (495) 431-30-21
            </a>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="header__bottomWrapper">
          <nav className={`header__menuWrp ${isMenuOpen ? 'active' : ''}`}>
            <div className="container">
              <ul className="menu">
              <li 
                className="menu-item-has-children menu-item--button"
                ref={individualsRef}
              >
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    const newState = activeSubmenu === 'individuals' ? null : 'individuals';
                    setActiveSubmenu(newState);
                    if (newState === 'individuals') {
                      const headerBottom = document.querySelector('.header__bottom');
                      if (headerBottom) {
                        const headerRect = headerBottom.getBoundingClientRect();
                        setSubmenuPosition({
                          top: headerRect.bottom,
                          left: 0,
                          width: window.innerWidth
                        });
                      }
                    }
                  }}
                >
                  Услуги физлицам
                </a>
                {activeSubmenu === 'individuals' && ReactDOM.createPortal(
                  <div 
                    className="sub-menu sub-menu--wide visible"
                    style={{
                      top: `${submenuPosition.top}px`,
                      left: `${submenuPosition.left}px`,
                      width: `${submenuPosition.width}px`
                    }}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                  <div className="sub-menu__group">
                    <h4 className="sub-menu__title">Уборка квартир</h4>
                    <div className="sub-menu__columns">
                      <div className="sub-menu__column">
                        <ul>
                          <li><Link to="/services/apartment/general" onClick={() => setActiveSubmenu(null)}>Генеральная</Link></li>
                          <li><Link to="/services/apartment/after-renovation" onClick={() => setActiveSubmenu(null)}>После ремонта</Link></li>
                          <li><Link to="/services/apartment/maintenance" onClick={() => setActiveSubmenu(null)}>Поддерживающая</Link></li>
                          <li><Link to="/services/apartment/after-death" onClick={() => setActiveSubmenu(null)}>После смерти</Link></li>
                          <li><Link to="/services/apartment/urgent" onClick={() => setActiveSubmenu(null)}>Срочная</Link></li>
                          <li><Link to="/services/apartment/wet" onClick={() => setActiveSubmenu(null)}>Влажная</Link></li>
                          <li><Link to="/services/apartment/three-times-week" onClick={() => setActiveSubmenu(null)}>Три раза в неделю</Link></li>
                          <li><Link to="/services/apartment/after-moving" onClick={() => setActiveSubmenu(null)}>После переезда</Link></li>
                          <li><Link to="/services/apartment/after-rental" onClick={() => setActiveSubmenu(null)}>После аренды</Link></li>
                          <li><Link to="/services/apartment/eco" onClick={() => setActiveSubmenu(null)}>Эко клининг</Link></li>
                          <li><Link to="/services/apartment/before-birth" onClick={() => setActiveSubmenu(null)}>Перед рождением</Link></li>
                          <li><Link to="/services/apartment/two-room" onClick={() => setActiveSubmenu(null)}>Двухкомнатной</Link></li>
                          <li><Link to="/services/apartment/four-room" onClick={() => setActiveSubmenu(null)}>Четырёхкомнатной</Link></li>
                          <li><Link to="/services/apartment/disinfection" onClick={() => setActiveSubmenu(null)}>Дезинфекция</Link></li>
                        </ul>
                      </div>
                      <div className="sub-menu__column">
                        <ul>
                          <li><Link to="/services/apartment/complex" onClick={() => setActiveSubmenu(null)}>Комплексная</Link></li>
                          <li><Link to="/services/apartment/after-fire" onClick={() => setActiveSubmenu(null)}>После пожара</Link></li>
                          <li><Link to="/services/apartment/after-flood" onClick={() => setActiveSubmenu(null)}>После потопа</Link></li>
                          <li><Link to="/services/apartment/daily" onClick={() => setActiveSubmenu(null)}>Ежедневная</Link></li>
                          <li><Link to="/services/apartment/vip" onClick={() => setActiveSubmenu(null)}>VIP клининг</Link></li>
                          <li><Link to="/services/apartment/twice-week" onClick={() => setActiveSubmenu(null)}>Два раза в неделю</Link></li>
                          <li><Link to="/services/apartment/neglected" onClick={() => setActiveSubmenu(null)}>Запущенной</Link></li>
                          <li><Link to="/services/apartment/after-disinfection" onClick={() => setActiveSubmenu(null)}>После дезинфекции</Link></li>
                          <li><Link to="/services/apartment/before-moving-in" onClick={() => setActiveSubmenu(null)}>Перед въездом</Link></li>
                          <li><Link to="/services/apartment/weekly" onClick={() => setActiveSubmenu(null)}>Еженедельная</Link></li>
                          <li><Link to="/services/apartment/one-room" onClick={() => setActiveSubmenu(null)}>Однокомнатной</Link></li>
                          <li><Link to="/services/apartment/three-room" onClick={() => setActiveSubmenu(null)}>Трёхкомнатной</Link></li>
                          <li><Link to="/services/apartment/elite" onClick={() => setActiveSubmenu(null)}>Элитных</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="sub-menu__column">
                    <h4 className="sub-menu__title">Уборка домов</h4>
                    <ul>
                      <li><Link to="/services/house/after-renovation" onClick={() => setActiveSubmenu(null)}>После ремонта</Link></li>
                      <li><Link to="/services/house/maintenance" onClick={() => setActiveSubmenu(null)}>Поддерживающая</Link></li>
                      <li><Link to="/services/house/cottage" onClick={() => setActiveSubmenu(null)}>Коттеджей</Link></li>
                      <li><Link to="/services/house/two-story" onClick={() => setActiveSubmenu(null)}>Двухэтажного дома</Link></li>
                      <li><Link to="/services/house/townhouse" onClick={() => setActiveSubmenu(null)}>Таунхауса</Link></li>
                      <li><Link to="/services/house/dacha" onClick={() => setActiveSubmenu(null)}>Дачи</Link></li>
                    </ul>
                  </div>
                  <div className="sub-menu__column">
                    <h4 className="sub-menu__title">Дополнительные услуги</h4>
                    <ul>
                      <li><Link to="/services/additional/kitchen" onClick={() => setActiveSubmenu(null)}>Клининг кухни</Link></li>
                      <li><Link to="/services/additional/bathroom" onClick={() => setActiveSubmenu(null)}>Клининг санузла</Link></li>
                      <li><Link to="/services/additional/balcony" onClick={() => setActiveSubmenu(null)}>Уборка балкона</Link></li>
                      <li><Link to="/services/additional/chandelier" onClick={() => setActiveSubmenu(null)}>Мойка люстр</Link></li>
                      <li><Link to="/services/additional/ironing" onClick={() => setActiveSubmenu(null)}>Глажка белья</Link></li>
                      <li><Link to="/services/additional/garbage" onClick={() => setActiveSubmenu(null)}>Вывоз мусора</Link></li>
                      <li><Link to="/services/additional/polishing" onClick={() => setActiveSubmenu(null)}>Полировка пола</Link></li>
                      <li><Link to="/services/additional/ceiling" onClick={() => setActiveSubmenu(null)}>Мойка натяжных потолков</Link></li>
                      <li><Link to="/services/additional/dry-fog" onClick={() => setActiveSubmenu(null)}>Сухой туман</Link></li>
                      <li><Link to="/services/additional/ozonation" onClick={() => setActiveSubmenu(null)}>Озонирование</Link></li>
                      <li><Link to="/services/additional/after-construction" onClick={() => setActiveSubmenu(null)}>После строительства</Link></li>
                      <li><Link to="/services/additional/new-building" onClick={() => setActiveSubmenu(null)}>В новостройке</Link></li>
                    </ul>
                  </div>
                  <div className="sub-menu__column">
                    <h4 className="sub-menu__title">Химчистка</h4>
                    <ul>
                      <li><Link to="/services/dry-cleaning/sofa" onClick={() => setActiveSubmenu(null)}>Диванов</Link></li>
                      <li><Link to="/services/dry-cleaning/chair" onClick={() => setActiveSubmenu(null)}>Стульев</Link></li>
                      <li><Link to="/services/dry-cleaning/carpet" onClick={() => setActiveSubmenu(null)}>Ковров</Link></li>
                      <li><Link to="/services/dry-cleaning/carpet-floor" onClick={() => setActiveSubmenu(null)}>Ковролина</Link></li>
                      <li><Link to="/services/dry-cleaning/mattress" onClick={() => setActiveSubmenu(null)}>Матрасов</Link></li>
                      <li><Link to="/services/dry-cleaning/pillow" onClick={() => setActiveSubmenu(null)}>Подушек</Link></li>
                      <li><Link to="/services/dry-cleaning/curtain" onClick={() => setActiveSubmenu(null)}>Штор</Link></li>
                      <li><Link to="/services/dry-cleaning/blinds" onClick={() => setActiveSubmenu(null)}>Жалюзи</Link></li>
                      <li><Link to="/services/dry-cleaning/blanket" onClick={() => setActiveSubmenu(null)}>Одеял</Link></li>
                      <li><Link to="/services/dry-cleaning/ottoman" onClick={() => setActiveSubmenu(null)}>Пуфиков</Link></li>
                      <li><Link to="/services/dry-cleaning/car" onClick={() => setActiveSubmenu(null)}>Салона автомобиля</Link></li>
                    </ul>
                  </div>
                  </div>,
                  document.body
                )}
              </li>
              <li 
                className="menu-item-has-children menu-item--button"
                ref={legalRef}
              >
                <a 
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    const newState = activeSubmenu === 'legal' ? null : 'legal';
                    setActiveSubmenu(newState);
                    if (newState === 'legal') {
                      const headerBottom = document.querySelector('.header__bottom');
                      if (headerBottom) {
                        const headerRect = headerBottom.getBoundingClientRect();
                        setSubmenuPosition({
                          top: headerRect.bottom,
                          left: 0,
                          width: window.innerWidth
                        });
                      }
                    }
                  }}
                >
                  Услуги юрлицам
                </a>
                {activeSubmenu === 'legal' && ReactDOM.createPortal(
                  <div
                    className="sub-menu sub-menu--wide visible"
                    style={{
                      top: `${submenuPosition.top}px`,
                      left: `${submenuPosition.left}px`,
                      width: `${submenuPosition.width}px`
                    }}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <div className="sub-menu__column">
                      <h4 className="sub-menu__title">Уборка офисов</h4>
                      <ul>
                        <li><Link to="/services/office/general" onClick={() => setActiveSubmenu(null)}>Генеральная</Link></li>
                        <li><Link to="/services/office/daily" onClick={() => setActiveSubmenu(null)}>Ежедневная</Link></li>
                        <li><Link to="/services/office/weekly" onClick={() => setActiveSubmenu(null)}>Еженедельная</Link></li>
                        <li><Link to="/services/office/after-renovation" onClick={() => setActiveSubmenu(null)}>После ремонта</Link></li>
                        <li><Link to="/services/office/window" onClick={() => setActiveSubmenu(null)}>Мойка окон</Link></li>
                      </ul>
                    </div>
                    <div className="sub-menu__column">
                      <h4 className="sub-menu__title">Клининг для бизнеса</h4>
                      <ul>
                        <li><Link to="/services/business/restaurant" onClick={() => setActiveSubmenu(null)}>Ресторанов</Link></li>
                        <li><Link to="/services/business/shop" onClick={() => setActiveSubmenu(null)}>Магазинов</Link></li>
                        <li><Link to="/services/business/warehouse" onClick={() => setActiveSubmenu(null)}>Складов</Link></li>
                        <li><Link to="/services/business/medical" onClick={() => setActiveSubmenu(null)}>Медицинских учреждений</Link></li>
                      </ul>
                    </div>
                  </div>,
                  document.body
                )}
              </li>
              <li>
                <Link to="/windows" onClick={() => { setIsMenuOpen(false); setActiveSubmenu(null); }}>Мытье окон</Link>
              </li>
              <li>
                <Link to="/prices" onClick={() => { setIsMenuOpen(false); setActiveSubmenu(null); }}>Цены</Link>
              </li>
              <li>
                <Link to="/portfolio" onClick={() => { setIsMenuOpen(false); setActiveSubmenu(null); }}>Наши работы</Link>
              </li>
              <li>
                <Link to="/promotions" onClick={() => { setIsMenuOpen(false); setActiveSubmenu(null); }}>Акции</Link>
              </li>
              <li 
                className="menu-item-has-children menu-item--button"
                ref={infoRef}
              >
                <a
                  href="#info"
                  onClick={(e) => {
                    e.preventDefault();
                    const newState = activeSubmenu === 'info' ? null : 'info';
                    setActiveSubmenu(newState);
                    if (newState === 'info') {
                      const headerBottom = document.querySelector('.header__bottom');
                      if (headerBottom) {
                        const headerRect = headerBottom.getBoundingClientRect();
                        setSubmenuPosition({
                          top: headerRect.bottom - 1,
                          left: 0,
                          width: window.innerWidth
                        });
                      }
                    }
                  }}
                >
                  Информация
                </a>
                {activeSubmenu === 'info' && ReactDOM.createPortal(
                  <div
                    className="sub-menu sub-menu--info visible"
                    style={{
                      top: `${submenuPosition.top}px`,
                      left: `${submenuPosition.left}px`,
                      width: `${submenuPosition.width}px`
                    }}
                  >
                    <button 
                      className="sub-menu--info__close"
                      onClick={() => setActiveSubmenu(null)}
                      aria-label="Закрыть меню"
                    >
                      ×
                    </button>
                    <div className="sub-menu--info__columns">
                      <div className="sub-menu--info__column">
                        <ul>
                          <li><Link to="/reviews" onClick={() => setActiveSubmenu(null)}>Отзывы</Link></li>
                          <li><Link to="/about" onClick={() => setActiveSubmenu(null)}>О компании</Link></li>
                          <li><Link to="/faq" onClick={() => setActiveSubmenu(null)}>Вопросы и ответы</Link></li>
                          <li><Link to="/guarantees" onClick={() => setActiveSubmenu(null)}>Гарантии</Link></li>
                          <li><Link to="/sitemap" onClick={() => setActiveSubmenu(null)}>Карта сайта</Link></li>
                        </ul>
                      </div>
                      <div className="sub-menu--info__column">
                        <ul>
                          <li><Link to="/calculator" onClick={() => setActiveSubmenu(null)}>Калькулятор</Link></li>
                          <li><Link to="/vacancies" onClick={() => setActiveSubmenu(null)}>Вакансии</Link></li>
                          <li><Link to="/moscow-region" onClick={() => setActiveSubmenu(null)}>Московская область</Link></li>
                          <li><Link to="/payment-terms" onClick={() => setActiveSubmenu(null)}>Условия оплаты</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>,
                  document.body
                )}
              </li>
              <li>
                <Link to="/contacts" onClick={() => setIsMenuOpen(false)}>Контакты</Link>
              </li>
              </ul>
            </div>
            <div className={`header__burgerWrp ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

