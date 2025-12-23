import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminUsersList from './AdminUsersList';
import AdminUsersForm from './AdminUsersForm';
import './AdminUsers.css';

const AdminUsers = () => {
  const location = useLocation();
  const isListPage = location.pathname === '/admin/users' || location.pathname === '/admin/users/';
  const isCreatePage = location.pathname === '/admin/users/create';

  return (
    <div className="admin-users">
      <div className="admin-users__header">
        <div className="admin-users__tabs">
          <Link 
            to="/admin/users" 
            className={`admin-users__tab ${isListPage ? 'admin-users__tab--active' : ''}`}
          >
            List
          </Link>
          <Link 
            to="/admin/users/create" 
            className={`admin-users__tab ${isCreatePage ? 'admin-users__tab--active' : ''}`}
          >
            Create
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<AdminUsersList />} />
        <Route path="/create" element={<AdminUsersForm />} />
        <Route path="/edit/:id" element={<AdminUsersForm />} />
      </Routes>
    </div>
  );
};

export default AdminUsers;

