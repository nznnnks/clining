import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Простая проверка (в реальном приложении здесь будет запрос к API)
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <div className="admin-login__header">
          <h1 className="admin-login__title">Вход</h1>
          <p className="admin-login__subtitle">Авторизация в админ-панель</p>
        </div>
        
        {error && (
          <div className="admin-login__alert admin-login__alert--error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="admin-login__form">
          <div className="admin-login__formGroup">
            <label className="admin-login__label" htmlFor="username">
              Имя пользователя
            </label>
            <input 
              type="text" 
              className="admin-login__input" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
              autoFocus
              placeholder="Введите имя пользователя"
            />
          </div>
          
          <div className="admin-login__formGroup">
            <label className="admin-login__label" htmlFor="password">
              Пароль
            </label>
            <input 
              type="password" 
              className="admin-login__input" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Введите пароль"
            />
          </div>
          
          <button type="submit" className="admin-login__button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;

