import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../utils/api';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(username, password);
      if (response.success) {
        localStorage.setItem('adminAuth', 'true');
        navigate('/admin');
      } else {
        setError(response.error || 'Неверное имя пользователя или пароль');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при входе в систему');
    } finally {
      setLoading(false);
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
          
          <button type="submit" className="admin-login__button" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;

