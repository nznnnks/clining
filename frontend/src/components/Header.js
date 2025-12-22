import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

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
            // Закрываем подменю на десктопе
            if (activeSubmenu && 
                window.innerWidth > 768 &&
                !e.target.closest('.menu-item-has-children') && 
                !e.target.closest('.sub-menu') &&
                !e.target.closest('.sub-menu--info__close')) {
              setActiveSubmenu(null);
            }
            // Закрываем бургер-меню на мобильных при клике вне меню
            if (isMenuOpen && 
                window.innerWidth <= 768 &&
                !e.target.closest('.header__mobileMenu') &&
                !e.target.closest('.header__burgerWrp') &&
                !e.target.closest('.header__mobileMenuContent')) {
              closeMenu();
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
            // Восстанавливаем скролл при размонтировании
            document.body.style.overflow = '';
          };
  }, [activeSubmenu, isMenuOpen]);

  const toggleMenu = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (activeSubmenu) {
      setActiveSubmenu(null);
    }
    // Блокируем скролл body когда меню открыто
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
    document.body.style.overflow = '';
  };

  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    e.stopPropagation();
    closeMenu();
    
    // Если мы не на главной странице, переходим на главную с якорем
    if (location.pathname !== '/') {
      navigate(`/#${anchor}`);
      // Даем время на переход, затем скроллим
      setTimeout(() => {
        scrollToAnchor(anchor);
      }, 300);
    } else {
      // Если уже на главной, просто скроллим
      setTimeout(() => {
        scrollToAnchor(anchor);
      }, 100);
    }
  };

  const scrollToAnchor = (anchor) => {
    const element = document.getElementById(anchor);
    if (element) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Если элемент не найден, попробуем еще раз через небольшую задержку
      setTimeout(() => {
        const elementRetry = document.getElementById(anchor);
        if (elementRetry) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const elementPosition = elementRetry.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight - 20;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 200);
    }
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
              <a 
                href="#calculator" 
                className="header__link"
                onClick={(e) => {
                  e.preventDefault();
                  handleAnchorClick(e, 'calculator');
                }}
              >
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
          <div className={`header__burgerWrp ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className="header__menuWrp">
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
                    const isMobile = window.innerWidth <= 768;
                    const newState = activeSubmenu === 'individuals' ? null : 'individuals';
                    setActiveSubmenu(newState);
                    if (newState === 'individuals') {
                      const headerBottom = document.querySelector('.header__bottom');
                      if (headerBottom) {
                        const headerRect = headerBottom.getBoundingClientRect();
                        setSubmenuPosition({
                          top: isMobile ? 0 : headerRect.bottom,
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
                          <li><Link to="/services/apartment/general" onClick={closeMenu}>Генеральная</Link></li>
                          <li><Link to="/services/apartment/after-renovation" onClick={closeMenu}>После ремонта</Link></li>
                          <li><Link to="/services/apartment/maintenance" onClick={closeMenu}>Поддерживающая</Link></li>
                          <li><Link to="/services/apartment/after-death" onClick={closeMenu}>После смерти</Link></li>
                          <li><Link to="/services/apartment/urgent" onClick={closeMenu}>Срочная</Link></li>
                          <li><Link to="/services/apartment/wet" onClick={closeMenu}>Влажная</Link></li>
                          <li><Link to="/services/apartment/three-times-week" onClick={closeMenu}>Три раза в неделю</Link></li>
                          <li><Link to="/services/apartment/after-moving" onClick={closeMenu}>После переезда</Link></li>
                          <li><Link to="/services/apartment/after-rental" onClick={closeMenu}>После аренды</Link></li>
                          <li><Link to="/services/apartment/eco" onClick={closeMenu}>Эко клининг</Link></li>
                          <li><Link to="/services/apartment/before-birth" onClick={closeMenu}>Перед рождением</Link></li>
                          <li><Link to="/services/apartment/two-room" onClick={closeMenu}>Двухкомнатной</Link></li>
                          <li><Link to="/services/apartment/four-room" onClick={closeMenu}>Четырёхкомнатной</Link></li>
                          <li><Link to="/services/apartment/disinfection" onClick={closeMenu}>Дезинфекция</Link></li>
                        </ul>
                      </div>
                      <div className="sub-menu__column">
                        <ul>
                          <li><Link to="/services/apartment/complex" onClick={closeMenu}>Комплексная</Link></li>
                          <li><Link to="/services/apartment/after-fire" onClick={closeMenu}>После пожара</Link></li>
                          <li><Link to="/services/apartment/after-flood" onClick={closeMenu}>После потопа</Link></li>
                          <li><Link to="/services/apartment/daily" onClick={closeMenu}>Ежедневная</Link></li>
                          <li><Link to="/services/apartment/vip" onClick={closeMenu}>VIP клининг</Link></li>
                          <li><Link to="/services/apartment/twice-week" onClick={closeMenu}>Два раза в неделю</Link></li>
                          <li><Link to="/services/apartment/neglected" onClick={closeMenu}>Запущенной</Link></li>
                          <li><Link to="/services/apartment/after-disinfection" onClick={closeMenu}>После дезинфекции</Link></li>
                          <li><Link to="/services/apartment/before-moving-in" onClick={closeMenu}>Перед въездом</Link></li>
                          <li><Link to="/services/apartment/weekly" onClick={closeMenu}>Еженедельная</Link></li>
                          <li><Link to="/services/apartment/one-room" onClick={closeMenu}>Однокомнатной</Link></li>
                          <li><Link to="/services/apartment/three-room" onClick={closeMenu}>Трёхкомнатной</Link></li>
                          <li><Link to="/services/apartment/elite" onClick={closeMenu}>Элитных</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="sub-menu__column">
                    <h4 className="sub-menu__title">Уборка домов</h4>
                    <ul>
                      <li><Link to="/services/house/after-renovation" onClick={closeMenu}>После ремонта</Link></li>
                      <li><Link to="/services/house/maintenance" onClick={closeMenu}>Поддерживающая</Link></li>
                      <li><Link to="/services/house/cottage" onClick={closeMenu}>Коттеджей</Link></li>
                      <li><Link to="/services/house/two-story" onClick={closeMenu}>Двухэтажного дома</Link></li>
                      <li><Link to="/services/house/townhouse" onClick={closeMenu}>Таунхауса</Link></li>
                      <li><Link to="/services/house/dacha" onClick={closeMenu}>Дачи</Link></li>
                    </ul>
                  </div>
                  <div className="sub-menu__column">
                    <h4 className="sub-menu__title">Дополнительные услуги</h4>
                    <ul>
                      <li><Link to="/services/additional/kitchen" onClick={closeMenu}>Клининг кухни</Link></li>
                      <li><Link to="/services/additional/bathroom" onClick={closeMenu}>Клининг санузла</Link></li>
                      <li><Link to="/services/additional/balcony" onClick={closeMenu}>Уборка балкона</Link></li>
                      <li><Link to="/services/additional/chandelier" onClick={closeMenu}>Мойка люстр</Link></li>
                      <li><Link to="/services/additional/ironing" onClick={closeMenu}>Глажка белья</Link></li>
                      <li><Link to="/services/additional/garbage" onClick={closeMenu}>Вывоз мусора</Link></li>
                      <li><Link to="/services/additional/polishing" onClick={closeMenu}>Полировка пола</Link></li>
                      <li><Link to="/services/additional/ceiling" onClick={closeMenu}>Мойка натяжных потолков</Link></li>
                      <li><Link to="/services/additional/dry-fog" onClick={closeMenu}>Сухой туман</Link></li>
                      <li><Link to="/services/additional/ozonation" onClick={closeMenu}>Озонирование</Link></li>
                      <li><Link to="/services/additional/after-construction" onClick={closeMenu}>После строительства</Link></li>
                      <li><Link to="/services/additional/new-building" onClick={closeMenu}>В новостройке</Link></li>
                    </ul>
                  </div>
                  <div className="sub-menu__column">
                    <h4 className="sub-menu__title">Химчистка</h4>
                    <ul>
                      <li><Link to="/services/dry-cleaning/sofa" onClick={closeMenu}>Диванов</Link></li>
                      <li><Link to="/services/dry-cleaning/chair" onClick={closeMenu}>Стульев</Link></li>
                      <li><Link to="/services/dry-cleaning/carpet" onClick={closeMenu}>Ковров</Link></li>
                      <li><Link to="/services/dry-cleaning/carpet-floor" onClick={closeMenu}>Ковролина</Link></li>
                      <li><Link to="/services/dry-cleaning/mattress" onClick={closeMenu}>Матрасов</Link></li>
                      <li><Link to="/services/dry-cleaning/pillow" onClick={closeMenu}>Подушек</Link></li>
                      <li><Link to="/services/dry-cleaning/curtain" onClick={closeMenu}>Штор</Link></li>
                      <li><Link to="/services/dry-cleaning/blinds" onClick={closeMenu}>Жалюзи</Link></li>
                      <li><Link to="/services/dry-cleaning/blanket" onClick={closeMenu}>Одеял</Link></li>
                      <li><Link to="/services/dry-cleaning/ottoman" onClick={closeMenu}>Пуфиков</Link></li>
                      <li><Link to="/services/dry-cleaning/car" onClick={closeMenu}>Салона автомобиля</Link></li>
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
                        <li><Link to="/services/office/general" onClick={closeMenu}>Генеральная</Link></li>
                        <li><Link to="/services/office/daily" onClick={closeMenu}>Ежедневная</Link></li>
                        <li><Link to="/services/office/weekly" onClick={closeMenu}>Еженедельная</Link></li>
                        <li><Link to="/services/office/after-renovation" onClick={closeMenu}>После ремонта</Link></li>
                        <li><Link to="/services/office/window" onClick={closeMenu}>Мойка окон</Link></li>
                      </ul>
                    </div>
                    <div className="sub-menu__column">
                      <h4 className="sub-menu__title">Клининг для бизнеса</h4>
                      <ul>
                        <li><Link to="/services/business/restaurant" onClick={closeMenu}>Ресторанов</Link></li>
                        <li><Link to="/services/business/shop" onClick={closeMenu}>Магазинов</Link></li>
                        <li><Link to="/services/business/warehouse" onClick={closeMenu}>Складов</Link></li>
                        <li><Link to="/services/business/medical" onClick={closeMenu}>Медицинских учреждений</Link></li>
                      </ul>
                    </div>
                  </div>,
                  document.body
                )}
              </li>
              <li>
                <Link to="/windows" onClick={closeMenu}>Мытье окон</Link>
              </li>
              <li>
                <Link to="/prices" onClick={closeMenu}>Цены</Link>
              </li>
              <li>
                <Link to="/portfolio" onClick={closeMenu}>Наши работы</Link>
              </li>
              <li>
                <Link to="/promotions" onClick={closeMenu}>Акции</Link>
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
                          <li><Link to="/reviews" onClick={closeMenu}>Отзывы</Link></li>
                          <li><Link to="/about" onClick={closeMenu}>О компании</Link></li>
                          <li><Link to="/faq" onClick={closeMenu}>Вопросы и ответы</Link></li>
                          <li><Link to="/guarantees" onClick={closeMenu}>Гарантии</Link></li>
                          <li><Link to="/sitemap" onClick={closeMenu}>Карта сайта</Link></li>
                        </ul>
                      </div>
                      <div className="sub-menu--info__column">
                        <ul>
                          <li><Link to="/calculator" onClick={closeMenu}>Калькулятор</Link></li>
                          <li><Link to="/vacancies" onClick={closeMenu}>Вакансии</Link></li>
                          <li><Link to="/moscow-region" onClick={closeMenu}>Московская область</Link></li>
                          <li><Link to="/payment-terms" onClick={closeMenu}>Условия оплаты</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>,
                  document.body
                )}
              </li>
              <li>
                <Link to="/contacts" onClick={closeMenu}>Контакты</Link>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleAnchorClick(e, 'services')}
                >
                  Услуги
                </a>
              </li>
              <li>
                <a 
                  href="#calculator" 
                  onClick={(e) => handleAnchorClick(e, 'calculator')}
                >
                  Калькулятор
                </a>
              </li>
              <li>
                <a 
                  href="#portfolio" 
                  onClick={(e) => handleAnchorClick(e, 'portfolio')}
                >
                  Портфолио
                </a>
              </li>
              <li>
                <a 
                  href="#reviews" 
                  onClick={(e) => handleAnchorClick(e, 'reviews')}
                >
                  Отзывы
                </a>
              </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {isMenuOpen && ReactDOM.createPortal(
        <div 
          className="header__mobileMenu"
          onClick={(e) => {
            // Закрываем меню только при клике на фон (сам контейнер), не на его содержимое
            if (e.target === e.currentTarget || e.target.classList.contains('header__mobileMenu')) {
              closeMenu();
            }
          }}
        >
          <button 
            className="header__mobileMenuClose"
            onClick={closeMenu}
            aria-label="Закрыть меню"
          >
            ×
          </button>
          <div 
            className="header__mobileMenuContent"
            onClick={(e) => {
              // Предотвращаем закрытие меню при клике на содержимое
              e.stopPropagation();
            }}
          >
            <ul className="header__mobileMenuList">
              <li className={`header__mobileMenuItem ${activeSubmenu === 'individuals' ? 'active' : ''}`}>
                <a 
                  href="#services" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newState = activeSubmenu === 'individuals' ? null : 'individuals';
                    setActiveSubmenu(newState);
                  }}
                >
                  Услуги физлицам
                  <span className="header__mobileMenuArrow">▼</span>
                </a>
                {activeSubmenu === 'individuals' && (
                  <div className="header__mobileSubmenu">
                    <div className="header__mobileSubmenuGroup">
                      <h4>Уборка квартир</h4>
                      <ul>
                        <li><Link to="/services/apartment/general" onClick={closeMenu}>Генеральная</Link></li>
                        <li><Link to="/services/apartment/after-renovation" onClick={closeMenu}>После ремонта</Link></li>
                        <li><Link to="/services/apartment/maintenance" onClick={closeMenu}>Поддерживающая</Link></li>
                        <li><Link to="/services/apartment/after-death" onClick={closeMenu}>После смерти</Link></li>
                        <li><Link to="/services/apartment/urgent" onClick={closeMenu}>Срочная</Link></li>
                        <li><Link to="/services/apartment/wet" onClick={closeMenu}>Влажная</Link></li>
                        <li><Link to="/services/apartment/three-times-week" onClick={closeMenu}>Три раза в неделю</Link></li>
                        <li><Link to="/services/apartment/after-moving" onClick={closeMenu}>После переезда</Link></li>
                        <li><Link to="/services/apartment/after-rental" onClick={closeMenu}>После аренды</Link></li>
                        <li><Link to="/services/apartment/eco" onClick={closeMenu}>Эко клининг</Link></li>
                        <li><Link to="/services/apartment/before-birth" onClick={closeMenu}>Перед рождением</Link></li>
                        <li><Link to="/services/apartment/two-room" onClick={closeMenu}>Двухкомнатной</Link></li>
                        <li><Link to="/services/apartment/four-room" onClick={closeMenu}>Четырёхкомнатной</Link></li>
                        <li><Link to="/services/apartment/disinfection" onClick={closeMenu}>Дезинфекция</Link></li>
                        <li><Link to="/services/apartment/complex" onClick={closeMenu}>Комплексная</Link></li>
                        <li><Link to="/services/apartment/after-fire" onClick={closeMenu}>После пожара</Link></li>
                        <li><Link to="/services/apartment/after-flood" onClick={closeMenu}>После потопа</Link></li>
                        <li><Link to="/services/apartment/daily" onClick={closeMenu}>Ежедневная</Link></li>
                        <li><Link to="/services/apartment/vip" onClick={closeMenu}>VIP клининг</Link></li>
                        <li><Link to="/services/apartment/twice-week" onClick={closeMenu}>Два раза в неделю</Link></li>
                        <li><Link to="/services/apartment/neglected" onClick={closeMenu}>Запущенной</Link></li>
                        <li><Link to="/services/apartment/after-disinfection" onClick={closeMenu}>После дезинфекции</Link></li>
                        <li><Link to="/services/apartment/before-moving-in" onClick={closeMenu}>Перед въездом</Link></li>
                        <li><Link to="/services/apartment/weekly" onClick={closeMenu}>Еженедельная</Link></li>
                        <li><Link to="/services/apartment/one-room" onClick={closeMenu}>Однокомнатной</Link></li>
                        <li><Link to="/services/apartment/three-room" onClick={closeMenu}>Трёхкомнатной</Link></li>
                        <li><Link to="/services/apartment/elite" onClick={closeMenu}>Элитных</Link></li>
                      </ul>
                    </div>
                    <div className="header__mobileSubmenuGroup">
                      <h4>Уборка домов</h4>
                      <ul>
                        <li><Link to="/services/house/after-renovation" onClick={closeMenu}>После ремонта</Link></li>
                        <li><Link to="/services/house/maintenance" onClick={closeMenu}>Поддерживающая</Link></li>
                        <li><Link to="/services/house/cottage" onClick={closeMenu}>Коттеджей</Link></li>
                        <li><Link to="/services/house/two-story" onClick={closeMenu}>Двухэтажного дома</Link></li>
                        <li><Link to="/services/house/townhouse" onClick={closeMenu}>Таунхауса</Link></li>
                        <li><Link to="/services/house/dacha" onClick={closeMenu}>Дачи</Link></li>
                      </ul>
                    </div>
                    <div className="header__mobileSubmenuGroup">
                      <h4>Дополнительные услуги</h4>
                      <ul>
                        <li><Link to="/services/additional/kitchen" onClick={closeMenu}>Клининг кухни</Link></li>
                        <li><Link to="/services/additional/bathroom" onClick={closeMenu}>Клининг санузла</Link></li>
                        <li><Link to="/services/additional/balcony" onClick={closeMenu}>Уборка балкона</Link></li>
                        <li><Link to="/services/additional/chandelier" onClick={closeMenu}>Мойка люстр</Link></li>
                        <li><Link to="/services/additional/ironing" onClick={closeMenu}>Глажка белья</Link></li>
                        <li><Link to="/services/additional/garbage" onClick={closeMenu}>Вывоз мусора</Link></li>
                        <li><Link to="/services/additional/polishing" onClick={closeMenu}>Полировка пола</Link></li>
                        <li><Link to="/services/additional/ceiling" onClick={closeMenu}>Мойка натяжных потолков</Link></li>
                        <li><Link to="/services/additional/dry-fog" onClick={closeMenu}>Сухой туман</Link></li>
                        <li><Link to="/services/additional/ozonation" onClick={closeMenu}>Озонирование</Link></li>
                        <li><Link to="/services/additional/after-construction" onClick={closeMenu}>После строительства</Link></li>
                        <li><Link to="/services/additional/new-building" onClick={closeMenu}>В новостройке</Link></li>
                      </ul>
                    </div>
                    <div className="header__mobileSubmenuGroup">
                      <h4>Химчистка</h4>
                      <ul>
                        <li><Link to="/services/dry-cleaning/sofa" onClick={closeMenu}>Диванов</Link></li>
                        <li><Link to="/services/dry-cleaning/chair" onClick={closeMenu}>Стульев</Link></li>
                        <li><Link to="/services/dry-cleaning/carpet" onClick={closeMenu}>Ковров</Link></li>
                        <li><Link to="/services/dry-cleaning/carpet-floor" onClick={closeMenu}>Ковролина</Link></li>
                        <li><Link to="/services/dry-cleaning/mattress" onClick={closeMenu}>Матрасов</Link></li>
                        <li><Link to="/services/dry-cleaning/pillow" onClick={closeMenu}>Подушек</Link></li>
                        <li><Link to="/services/dry-cleaning/curtain" onClick={closeMenu}>Штор</Link></li>
                        <li><Link to="/services/dry-cleaning/blinds" onClick={closeMenu}>Жалюзи</Link></li>
                        <li><Link to="/services/dry-cleaning/blanket" onClick={closeMenu}>Одеял</Link></li>
                        <li><Link to="/services/dry-cleaning/ottoman" onClick={closeMenu}>Пуфиков</Link></li>
                        <li><Link to="/services/dry-cleaning/car" onClick={closeMenu}>Салона автомобиля</Link></li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li className={`header__mobileMenuItem ${activeSubmenu === 'legal' ? 'active' : ''}`}>
                <a 
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newState = activeSubmenu === 'legal' ? null : 'legal';
                    setActiveSubmenu(newState);
                  }}
                >
                  Услуги юрлицам
                  <span className="header__mobileMenuArrow">▼</span>
                </a>
                {activeSubmenu === 'legal' && (
                  <div className="header__mobileSubmenu">
                    <div className="header__mobileSubmenuGroup">
                      <h4>Уборка офисов</h4>
                      <ul>
                        <li><Link to="/services/office/general" onClick={closeMenu}>Генеральная</Link></li>
                        <li><Link to="/services/office/daily" onClick={closeMenu}>Ежедневная</Link></li>
                        <li><Link to="/services/office/weekly" onClick={closeMenu}>Еженедельная</Link></li>
                        <li><Link to="/services/office/after-renovation" onClick={closeMenu}>После ремонта</Link></li>
                        <li><Link to="/services/office/window" onClick={closeMenu}>Мойка окон</Link></li>
                      </ul>
                    </div>
                    <div className="header__mobileSubmenuGroup">
                      <h4>Клининг для бизнеса</h4>
                      <ul>
                        <li><Link to="/services/business/restaurant" onClick={closeMenu}>Ресторанов</Link></li>
                        <li><Link to="/services/business/shop" onClick={closeMenu}>Магазинов</Link></li>
                        <li><Link to="/services/business/warehouse" onClick={closeMenu}>Складов</Link></li>
                        <li><Link to="/services/business/medical" onClick={closeMenu}>Медицинских учреждений</Link></li>
                        <li><Link to="/services/business/educational" onClick={closeMenu}>Образовательных учреждений</Link></li>
                        <li><Link to="/services/business/industrial" onClick={closeMenu}>Промышленных объектов</Link></li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li className="header__mobileMenuItem">
                <Link to="/windows" onClick={closeMenu}>Мытье окон</Link>
              </li>
              <li className="header__mobileMenuItem">
                <Link to="/prices" onClick={closeMenu}>Цены</Link>
              </li>
              <li className="header__mobileMenuItem">
                <Link to="/portfolio" onClick={closeMenu}>Наши работы</Link>
              </li>
              <li className="header__mobileMenuItem">
                <Link to="/promotions" onClick={closeMenu}>Акции</Link>
              </li>
              <li className={`header__mobileMenuItem ${activeSubmenu === 'info' ? 'active' : ''}`}>
                <a
                  href="#info"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newState = activeSubmenu === 'info' ? null : 'info';
                    setActiveSubmenu(newState);
                  }}
                >
                  Информация
                  <span className="header__mobileMenuArrow">▼</span>
                </a>
                {activeSubmenu === 'info' && (
                  <div className="header__mobileSubmenu">
                    <ul>
                      <li><Link to="/reviews" onClick={closeMenu}>Отзывы</Link></li>
                      <li><Link to="/about" onClick={closeMenu}>О компании</Link></li>
                      <li><Link to="/faq" onClick={closeMenu}>Вопросы и ответы</Link></li>
                      <li><Link to="/guarantees" onClick={closeMenu}>Гарантии</Link></li>
                      <li><Link to="/sitemap" onClick={closeMenu}>Карта сайта</Link></li>
                      <li><Link to="/calculator" onClick={closeMenu}>Калькулятор</Link></li>
                      <li><Link to="/vacancies" onClick={closeMenu}>Вакансии</Link></li>
                      <li><Link to="/moscow-region" onClick={closeMenu}>Московская область</Link></li>
                      <li><Link to="/payment-terms" onClick={closeMenu}>Условия оплаты</Link></li>
                    </ul>
                  </div>
                )}
              </li>
              <li className="header__mobileMenuItem">
                <Link to="/contacts" onClick={closeMenu}>Контакты</Link>
              </li>
              <li className="header__mobileMenuItem">
                <a 
                  href="#services" 
                  onClick={(e) => handleAnchorClick(e, 'services')}
                >
                  Услуги
                </a>
              </li>
              <li className="header__mobileMenuItem">
                <a 
                  href="#calculator" 
                  onClick={(e) => handleAnchorClick(e, 'calculator')}
                >
                  Калькулятор
                </a>
              </li>
              <li className="header__mobileMenuItem">
                <a 
                  href="#portfolio" 
                  onClick={(e) => handleAnchorClick(e, 'portfolio')}
                >
                  Портфолио
                </a>
              </li>
              <li className="header__mobileMenuItem">
                <a 
                  href="#reviews" 
                  onClick={(e) => handleAnchorClick(e, 'reviews')}
                >
                  Отзывы
                </a>
              </li>
            </ul>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Header;

