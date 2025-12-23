import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminPortfolioList from './AdminPortfolioList';
import AdminPortfolioForm from './AdminPortfolioForm';
import './AdminPortfolio.css';

const AdminPortfolio = () => {
  const location = useLocation();
  const isListPage = location.pathname === '/admin/portfolio' || location.pathname === '/admin/portfolio/';
  const isCreatePage = location.pathname === '/admin/portfolio/create';

  return (
    <div className="admin-portfolio">
      <div className="admin-portfolio__header">
        <div className="admin-portfolio__tabs">
          <Link 
            to="/admin/portfolio" 
            className={`admin-portfolio__tab ${isListPage ? 'admin-portfolio__tab--active' : ''}`}
          >
            List
          </Link>
          <Link 
            to="/admin/portfolio/create" 
            className={`admin-portfolio__tab ${isCreatePage ? 'admin-portfolio__tab--active' : ''}`}
          >
            Create
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<AdminPortfolioList />} />
        <Route path="/create" element={<AdminPortfolioForm key="create" />} />
        <Route path="/edit/:id" element={<AdminPortfolioForm key={location.pathname} />} />
      </Routes>
    </div>
  );
};

export default AdminPortfolio;

