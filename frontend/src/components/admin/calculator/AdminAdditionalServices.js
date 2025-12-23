import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminAdditionalServicesList from './AdminAdditionalServicesList';
import AdminAdditionalServicesForm from './AdminAdditionalServicesForm';
import './AdminAdditionalServices.css';

const AdminAdditionalServices = () => {
  const location = useLocation();
  const isListPage = location.pathname === '/admin/calculator/additional-services' || location.pathname.endsWith('/additional-services/');
  const isCreatePage = location.pathname.includes('/create');

  return (
    <div className="admin-additional-services">
      <div className="admin-additional-services__header">
        <div className="admin-additional-services__tabs">
          <Link 
            to="/admin/calculator/additional-services" 
            className={`admin-additional-services__tab ${isListPage ? 'admin-additional-services__tab--active' : ''}`}
          >
            List
          </Link>
          <Link 
            to="/admin/calculator/additional-services/create" 
            className={`admin-additional-services__tab ${isCreatePage ? 'admin-additional-services__tab--active' : ''}`}
          >
            Create
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<AdminAdditionalServicesList />} />
        <Route path="/create" element={<AdminAdditionalServicesForm key="create" />} />
        <Route path="/edit/:id" element={<AdminAdditionalServicesForm key={location.pathname} />} />
      </Routes>
    </div>
  );
};

export default AdminAdditionalServices;

