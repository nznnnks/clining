import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminCleaningTypesList from './AdminCleaningTypesList';
import AdminCleaningTypesForm from './AdminCleaningTypesForm';
import './AdminCleaningTypes.css';

const AdminCleaningTypes = () => {
  const location = useLocation();
  const isListPage = location.pathname === '/admin/calculator/cleaning-types' || location.pathname.endsWith('/cleaning-types/');
  const isCreatePage = location.pathname.includes('/create');

  return (
    <div className="admin-cleaning-types">
      <div className="admin-cleaning-types__header">
        <div className="admin-cleaning-types__tabs">
          <Link 
            to="/admin/calculator/cleaning-types" 
            className={`admin-cleaning-types__tab ${isListPage ? 'admin-cleaning-types__tab--active' : ''}`}
          >
            List
          </Link>
          <Link 
            to="/admin/calculator/cleaning-types/create" 
            className={`admin-cleaning-types__tab ${isCreatePage ? 'admin-cleaning-types__tab--active' : ''}`}
          >
            Create
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<AdminCleaningTypesList />} />
        <Route path="/create" element={<AdminCleaningTypesForm />} />
        <Route path="/edit/:id" element={<AdminCleaningTypesForm />} />
      </Routes>
    </div>
  );
};

export default AdminCleaningTypes;

