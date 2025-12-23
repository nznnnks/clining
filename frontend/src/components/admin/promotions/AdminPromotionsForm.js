import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { promotionsAdminAPI } from '../../../utils/api';
import './AdminPromotionsForm.css';

const AdminPromotionsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    valid_until: '',
    is_active: true,
  });
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      loadPromotion();
    }
  }, [id, isEdit]);

  // Функция для получения текущей даты в формате YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Функция для преобразования даты в формат YYYY-MM-DD
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    // Если дата уже в формате YYYY-MM-DD, возвращаем как есть
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    // Пытаемся распарсить дату из разных форматов
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    } catch (e) {
      // Если не удалось распарсить, возвращаем пустую строку
    }
    return '';
  };

  const loadPromotion = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await promotionsAdminAPI.getById(id);
      if (response.success && response.data) {
        const promo = response.data;
        setFormData({
          title: promo.title || '',
          description: promo.description || '',
          valid_until: formatDateForInput(promo.valid_until) || '',
          is_active: promo.is_active !== undefined ? promo.is_active : true,
        });
      } else {
        setError(response.error || 'Ошибка при загрузке акции');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке акции');
      if (err.message.includes('401') || err.message.includes('авторизация')) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Валидация даты
    if (name === 'valid_until' && type === 'date') {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
      
      if (value && selectedDate < today) {
        setDateError('Нельзя выбрать дату из прошлого');
        return;
      } else {
        setDateError('');
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация даты перед отправкой
    if (formData.valid_until) {
      const selectedDate = new Date(formData.valid_until);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        setDateError('Нельзя выбрать дату из прошлого');
        return;
      }
    }
    
    try {
      setLoading(true);
      setError('');
      setDateError('');
      
      const data = {
        title: formData.title,
        description: formData.description || null,
        valid_until: formData.valid_until || null,
        is_active: formData.is_active,
      };

      let response;
      if (isEdit) {
        response = await promotionsAdminAPI.update(id, data);
      } else {
        response = await promotionsAdminAPI.create(data);
      }

      if (response.success) {
        navigate('/admin/promotions');
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
      <div className="admin-promotions-form">
        <div className="admin-promotions-form__loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="admin-promotions-form">
      {error && (
        <div className="admin-promotions-form__error">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="admin-promotions-form__form">
        <div className="admin-promotions-form__field">
          <label className="admin-promotions-form__label" htmlFor="title">
            Название <span className="admin-promotions-form__required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="admin-promotions-form__input"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-promotions-form__field">
          <label className="admin-promotions-form__label" htmlFor="description">
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            className="admin-promotions-form__textarea"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="admin-promotions-form__field">
          <label className="admin-promotions-form__label" htmlFor="valid_until">
            Действительно до
          </label>
          <input
            type="date"
            id="valid_until"
            name="valid_until"
            className={`admin-promotions-form__input ${dateError ? 'admin-promotions-form__input--error' : ''}`}
            value={formData.valid_until}
            onChange={handleChange}
            min={getTodayDate()}
            onInvalid={(e) => {
              e.preventDefault();
              if (e.target.validity.valueMissing) {
                setDateError('Выберите дату');
              } else if (e.target.validity.rangeUnderflow) {
                setDateError('Нельзя выбрать дату из прошлого');
              }
            }}
          />
          {dateError && (
            <span className="admin-promotions-form__errorText">{dateError}</span>
          )}
        </div>

        <div className="admin-promotions-form__field">
          <label className="admin-promotions-form__checkboxLabel">
            <input
              type="checkbox"
              name="is_active"
              className="admin-promotions-form__checkbox"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <span className="admin-promotions-form__checkboxText">Активна</span>
          </label>
        </div>

        <div className="admin-promotions-form__actions">
          <button type="submit" className="admin-promotions-form__saveBtn" disabled={loading}>
            {loading ? 'Сохранение...' : 'Save'}
          </button>
          <button 
            type="button" 
            className="admin-promotions-form__cancelBtn"
            onClick={() => navigate('/admin/promotions')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPromotionsForm;
