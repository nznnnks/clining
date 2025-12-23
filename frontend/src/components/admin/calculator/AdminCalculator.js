import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminCleaningTypes from './AdminCleaningTypes';
import AdminAdditionalServices from './AdminAdditionalServices';
import AdminCalculatorSettings from './AdminCalculatorSettings';
import './AdminCalculator.css';

const AdminCalculator = () => {
  const location = useLocation();
  const isCleaningTypes = location.pathname.includes('/cleaning-types');
  const isAdditionalServices = location.pathname.includes('/additional-services');
  const isSettings = location.pathname.includes('/settings');

  return (
    <div className="admin-calculator">
      <div className="admin-calculator__header">
        <div className="admin-calculator__tabs">
          <Link 
            to="/admin/calculator/cleaning-types" 
            className={`admin-calculator__tab ${isCleaningTypes ? 'admin-calculator__tab--active' : ''}`}
          >
            Типы уборки
          </Link>
          <Link 
            to="/admin/calculator/additional-services" 
            className={`admin-calculator__tab ${isAdditionalServices ? 'admin-calculator__tab--active' : ''}`}
          >
            Доп. услуги
          </Link>
          <Link 
            to="/admin/calculator/settings" 
            className={`admin-calculator__tab ${isSettings ? 'admin-calculator__tab--active' : ''}`}
          >
            Настройки
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/cleaning-types/*" element={<AdminCleaningTypes />} />
        <Route path="/additional-services/*" element={<AdminAdditionalServices />} />
        <Route path="/settings" element={<AdminCalculatorSettings />} />
        <Route path="/" element={<AdminCalculatorHome />} />
      </Routes>
    </div>
  );
};

const AdminCalculatorHome = () => {
  return (
    <div className="admin-calculator-home">
      <p className="admin-calculator-home__text">
        Выберите раздел для управления калькулятором
      </p>
    </div>
  );
};

export default AdminCalculator;

