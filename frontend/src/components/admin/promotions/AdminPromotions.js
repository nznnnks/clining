import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminPromotionsList from './AdminPromotionsList';
import AdminPromotionsForm from './AdminPromotionsForm';
import './AdminPromotions.css';

const AdminPromotions = () => {
  const location = useLocation();
  const isListPage = location.pathname === '/admin/promotions' || location.pathname === '/admin/promotions/';
  const isCreatePage = location.pathname === '/admin/promotions/create';

  return (
    <div className="admin-promotions">
      <div className="admin-promotions__header">
        <div className="admin-promotions__tabs">
          <Link 
            to="/admin/promotions" 
            className={`admin-promotions__tab ${isListPage ? 'admin-promotions__tab--active' : ''}`}
          >
            List
          </Link>
          <Link 
            to="/admin/promotions/create" 
            className={`admin-promotions__tab ${isCreatePage ? 'admin-promotions__tab--active' : ''}`}
          >
            Create
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<AdminPromotionsList />} />
        <Route path="/create" element={<AdminPromotionsForm />} />
        <Route path="/edit/:id" element={<AdminPromotionsForm />} />
      </Routes>
    </div>
  );
};

export default AdminPromotions;

