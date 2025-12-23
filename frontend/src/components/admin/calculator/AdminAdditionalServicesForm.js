import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { additionalServicesAPI } from '../../../utils/api';
import './AdminAdditionalServicesForm.css';

const AdminAdditionalServicesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    label: '',
    price: '',
    unit: '',
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    const loadService = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError('');
        const response = await additionalServicesAPI.getById(id);
        if (response.success && response.data) {
          const item = response.data;
          setFormData({
            id: item.id || '',
            label: item.label || '',
            price: item.price || '',
            unit: item.unit || '',
            order: item.order || 0,
            is_active: item.is_active !== undefined ? item.is_active : true,
          });
        } else {
          setError(response.error || 'Ошибка при загрузке услуги');
        }
      } catch (err) {
        setError(err.message || 'Ошибка при загрузке услуги');
        if (err.message.includes('401') || err.message.includes('авторизация')) {
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (isEdit && id) {
      loadService();
    } else {
      // Сбрасываем форму при переходе на создание нового элемента
      setFormData({
        id: '',
        label: '',
        price: '',
        unit: '',
        order: 0,
        is_active: true,
      });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) || 0 : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      const data = {
        label: formData.label,
        price: formData.price,
        unit: formData.unit,
        order: formData.order,
        is_active: formData.is_active,
      };

      let response;
      if (isEdit && id) {
        response = await additionalServicesAPI.update(id, data);
      } else {
        data.id = formData.id;
        response = await additionalServicesAPI.create(data);
      }

      if (response.success) {
        navigate('/admin/calculator/additional-services');
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
      <div className="admin-additional-services-form">
        <div className="admin-additional-services-form__loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="admin-additional-services-form">
      {error && (
        <div className="admin-additional-services-form__error">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="admin-additional-services-form__form">
        <div className="admin-additional-services-form__field">
          <label className="admin-additional-services-form__label" htmlFor="id">
            ID (код) <span className="admin-additional-services-form__required">*</span>
          </label>
          <input
            type="text"
            id="id"
            name="id"
            className="admin-additional-services-form__input"
            value={formData.id}
            onChange={handleChange}
            required
            disabled={isEdit}
          />
        </div>

        <div className="admin-additional-services-form__field">
          <label className="admin-additional-services-form__label" htmlFor="label">
            Название <span className="admin-additional-services-form__required">*</span>
          </label>
          <input
            type="text"
            id="label"
            name="label"
            className="admin-additional-services-form__input"
            value={formData.label}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-additional-services-form__field">
          <label className="admin-additional-services-form__label" htmlFor="price">
            Цена (Р) <span className="admin-additional-services-form__required">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="admin-additional-services-form__input"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="admin-additional-services-form__field">
          <label className="admin-additional-services-form__label" htmlFor="unit">
            Единица измерения <span className="admin-additional-services-form__required">*</span>
          </label>
          <input
            type="text"
            id="unit"
            name="unit"
            className="admin-additional-services-form__input"
            value={formData.unit}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-additional-services-form__field">
          <label className="admin-additional-services-form__label" htmlFor="order">
            Порядок
          </label>
          <input
            type="number"
            id="order"
            name="order"
            className="admin-additional-services-form__input"
            value={formData.order}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="admin-additional-services-form__field">
          <label className="admin-additional-services-form__checkboxLabel">
            <input
              type="checkbox"
              name="is_active"
              className="admin-additional-services-form__checkbox"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <span className="admin-additional-services-form__checkboxText">Активна</span>
          </label>
        </div>

        <div className="admin-additional-services-form__actions">
          <button type="submit" className="admin-additional-services-form__saveBtn" disabled={loading}>
            {loading ? 'Сохранение...' : 'Save'}
          </button>
          <button 
            type="button" 
            className="admin-additional-services-form__saveAnotherBtn"
          >
            Save and Add Another
          </button>
          <button 
            type="button" 
            className="admin-additional-services-form__saveContinueBtn"
          >
            Save and Continue Editing
          </button>
          <button 
            type="button" 
            className="admin-additional-services-form__cancelBtn"
            onClick={() => navigate('/admin/calculator/additional-services')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAdditionalServicesForm;

