import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import AdminPortfolio from '../../components/admin/portfolio/AdminPortfolio';
import AdminPromotions from '../../components/admin/promotions/AdminPromotions';
import AdminCalculator from '../../components/admin/calculator/AdminCalculator';
import AdminOrders from '../../components/admin/orders/AdminOrders';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCalculatorDropdownOpen, setIsCalculatorDropdownOpen] = useState(false);
  const calculatorDropdownRef = useRef(null);
  const calculatorButtonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    // Проверка авторизации
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Закрытие выпадающего меню при изменении маршрута
    setIsCalculatorDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Обновление позиции выпадающего меню
    const updateDropdownPosition = () => {
      if (calculatorButtonRef.current && isCalculatorDropdownOpen) {
        const rect = calculatorButtonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 5,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    updateDropdownPosition();
    window.addEventListener('scroll', updateDropdownPosition);
    window.addEventListener('resize', updateDropdownPosition);

    return () => {
      window.removeEventListener('scroll', updateDropdownPosition);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [isCalculatorDropdownOpen]);

  useEffect(() => {
    // Закрытие выпадающего меню при клике вне его
    const handleClickOutside = (e) => {
      if (
        calculatorDropdownRef.current &&
        !calculatorDropdownRef.current.contains(e.target) &&
        calculatorButtonRef.current &&
        !calculatorButtonRef.current.contains(e.target)
      ) {
        setIsCalculatorDropdownOpen(false);
      }
    };

    if (isCalculatorDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalculatorDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleCalculatorClick = (e) => {
    e.preventDefault();
    setIsCalculatorDropdownOpen(!isCalculatorDropdownOpen);
  };

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="admin-nav__container">
          <div className="admin-nav__title">Админ-панель</div>
          <div className="admin-nav__menu">
            <Link 
              to="/admin" 
              className={`admin-nav__item ${isActive('/admin') && !isActive('/admin/portfolio') && !isActive('/admin/promotions') && !isActive('/admin/calculator') ? 'admin-nav__item--active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/admin/portfolio" 
              className={`admin-nav__item ${isActive('/admin/portfolio') ? 'admin-nav__item--active' : ''}`}
            >
              Портфолио
            </Link>
            <Link 
              to="/admin/promotions" 
              className={`admin-nav__item ${isActive('/admin/promotions') ? 'admin-nav__item--active' : ''}`}
            >
              Акции
            </Link>
            <div className="admin-nav__item admin-nav__item--dropdown">
              <button
                ref={calculatorButtonRef}
                onClick={handleCalculatorClick}
                className={`admin-nav__item ${isActive('/admin/calculator') ? 'admin-nav__item--active' : ''}`}
              >
                Калькулятор
                <span className="admin-nav__arrow">▼</span>
              </button>
              {isCalculatorDropdownOpen && ReactDOM.createPortal(
                <div
                  ref={calculatorDropdownRef}
                  className="admin-nav__dropdown admin-nav__dropdown--portal"
                  style={{
                    position: 'fixed',
                    top: `${dropdownPosition.top}px`,
                    left: `${dropdownPosition.left}px`,
                    width: `${dropdownPosition.width}px`,
                  }}
                >
                  <Link 
                    to="/admin/calculator/cleaning-types" 
                    className="admin-nav__dropdownItem"
                    onClick={() => setIsCalculatorDropdownOpen(false)}
                  >
                    Типы уборки
                  </Link>
                  <Link 
                    to="/admin/calculator/additional-services" 
                    className="admin-nav__dropdownItem"
                    onClick={() => setIsCalculatorDropdownOpen(false)}
                  >
                    Доп. услуги
                  </Link>
                  <Link 
                    to="/admin/calculator/settings" 
                    className="admin-nav__dropdownItem"
                    onClick={() => setIsCalculatorDropdownOpen(false)}
                  >
                    Настройки
                  </Link>
                </div>,
                document.body
              )}
            </div>
            <Link 
              to="/admin/orders" 
              className={`admin-nav__item ${isActive('/admin/orders') ? 'admin-nav__item--active' : ''}`}
            >
              Заказы
            </Link>
            <button onClick={handleLogout} className="admin-nav__logout">
              Выйти
            </button>
          </div>
        </div>
      </nav>

      <main className="admin-main">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/portfolio/*" element={<AdminPortfolio />} />
          <Route path="/promotions/*" element={<AdminPromotions />} />
          <Route path="/calculator/*" element={<AdminCalculator />} />
          <Route path="/orders" element={<AdminOrders />} />
        </Routes>
      </main>
    </div>
  );
};

const AdminHome = () => {
  return (
    <div className="admin-home">
      <div className="admin-home__container">
        <h1 className="admin-home__title">Добро пожаловать в админ-панель</h1>
        <p className="admin-home__subtitle">Выберите раздел для управления</p>
        
        <div className="admin-home__grid">
          <Link to="/admin/portfolio" className="admin-home__card">
            <div className="admin-home__cardIcon">📁</div>
            <h3 className="admin-home__cardTitle">Портфолио</h3>
            <p className="admin-home__cardText">Управление примерами работ</p>
          </Link>
          
          <Link to="/admin/promotions" className="admin-home__card">
            <div className="admin-home__cardIcon">🎁</div>
            <h3 className="admin-home__cardTitle">Акции</h3>
            <p className="admin-home__cardText">Управление акциями и скидками</p>
          </Link>
          
          <Link to="/admin/calculator" className="admin-home__card">
            <div className="admin-home__cardIcon">🧮</div>
            <h3 className="admin-home__cardTitle">Калькулятор</h3>
            <p className="admin-home__cardText">Настройка калькулятора стоимости</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

