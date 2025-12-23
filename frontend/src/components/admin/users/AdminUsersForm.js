import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usersAdminAPI } from '../../../utils/api';
import './AdminUsersForm.css';

const AdminUsersForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    is_admin: false,
  });

  useEffect(() => {
    if (isEdit && id) {
      loadUser();
    }
  }, [id, isEdit]);

  const loadUser = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await usersAdminAPI.getById(id);
      if (response.success && response.data) {
        const user = response.data;
        setFormData({
          username: user.username || '',
          email: user.email || '',
          password: '', // Не загружаем пароль при редактировании
          is_admin: user.is_admin !== undefined ? user.is_admin : false,
        });
      } else {
        setError(response.error || 'Ошибка при загрузке пользователя');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке пользователя');
      if (err.message.includes('401') || err.message.includes('авторизация')) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      const data = {
        username: formData.username,
        email: formData.email,
        is_admin: formData.is_admin,
      };

      // Пароль обязателен только при создании
      if (!isEdit) {
        if (!formData.password) {
          setError('Пароль обязателен при создании пользователя');
          setLoading(false);
          return;
        }
        data.password = formData.password;
      } else if (formData.password) {
        // При редактировании пароль опционален (обновляем только если указан)
        data.password = formData.password;
      }

      let response;
      if (isEdit) {
        response = await usersAdminAPI.update(id, data);
      } else {
        response = await usersAdminAPI.create(data);
      }

      if (response.success) {
        navigate('/admin/users');
      } else {
        setError(response.error || 'Ошибка при сохранении');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при сохранении');
      if (err.message.includes('401') || err.message.includes('авторизация')) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="admin-users-form">
        <div className="admin-users-form__loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="admin-users-form">
      {error && (
        <div className="admin-users-form__error">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="admin-users-form__form">
        <div className="admin-users-form__field">
          <label className="admin-users-form__label" htmlFor="username">
            Имя пользователя <span className="admin-users-form__required">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="admin-users-form__input"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-users-form__field">
          <label className="admin-users-form__label" htmlFor="email">
            Email <span className="admin-users-form__required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="admin-users-form__input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-users-form__field">
          <label className="admin-users-form__label" htmlFor="password">
            Пароль {!isEdit && <span className="admin-users-form__required">*</span>}
            {isEdit && <span className="admin-users-form__hint"> (оставьте пустым, чтобы не менять)</span>}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="admin-users-form__input"
            value={formData.password}
            onChange={handleChange}
            required={!isEdit}
            placeholder={isEdit ? "Новый пароль (опционально)" : "Введите пароль"}
          />
        </div>

        <div className="admin-users-form__field">
          <label className="admin-users-form__checkboxLabel">
            <input
              type="checkbox"
              name="is_admin"
              className="admin-users-form__checkbox"
              checked={formData.is_admin}
              onChange={handleChange}
            />
            <span className="admin-users-form__checkboxText">Администратор</span>
          </label>
        </div>

        <div className="admin-users-form__actions">
          <button type="submit" className="admin-users-form__saveBtn" disabled={loading}>
            {loading ? 'Сохранение...' : 'Save'}
          </button>
          <button 
            type="button" 
            className="admin-users-form__cancelBtn"
            onClick={() => navigate('/admin/users')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUsersForm;

