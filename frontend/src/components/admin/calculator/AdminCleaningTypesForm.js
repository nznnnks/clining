import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { cleaningTypesAPI } from '../../../utils/api';
import './AdminCleaningTypesForm.css';

const AdminCleaningTypesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    label: '',
    price: '',
    order: 0,
    is_active: true,
  });

  useEffect(() => {
    const loadType = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError('');
        const response = await cleaningTypesAPI.getById(id);
        if (response.success && response.data) {
          const item = response.data;
          setFormData({
            id: item.id || '',
            label: item.label || '',
            price: item.price || '',
            order: item.order || 0,
            is_active: item.is_active !== undefined ? item.is_active : true,
          });
        } else {
          setError(response.error || 'Ошибка при загрузке типа уборки');
        }
      } catch (err) {
        setError(err.message || 'Ошибка при загрузке типа уборки');
        if (err.message.includes('401') || err.message.includes('авторизация')) {
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (isEdit && id) {
      loadType();
    } else {
      // Сбрасываем форму при переходе на создание нового элемента
      setFormData({
        id: '',
        label: '',
        price: '',
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
        order: formData.order,
        is_active: formData.is_active,
      };

      let response;
      if (isEdit && id) {
        response = await cleaningTypesAPI.update(id, data);
      } else {
        data.id = formData.id;
        response = await cleaningTypesAPI.create(data);
      }

      if (response.success) {
        navigate('/admin/calculator/cleaning-types');
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
      <div className="admin-cleaning-types-form">
        <div className="admin-cleaning-types-form__loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="admin-cleaning-types-form">
      {error && (
        <div className="admin-cleaning-types-form__error">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="admin-cleaning-types-form__form">
        <div className="admin-cleaning-types-form__field">
          <label className="admin-cleaning-types-form__label" htmlFor="id">
            ID (код) <span className="admin-cleaning-types-form__required">*</span>
          </label>
          <input
            type="text"
            id="id"
            name="id"
            className="admin-cleaning-types-form__input"
            value={formData.id}
            onChange={handleChange}
            required
            disabled={isEdit}
          />
        </div>

        <div className="admin-cleaning-types-form__field">
          <label className="admin-cleaning-types-form__label" htmlFor="label">
            Название <span className="admin-cleaning-types-form__required">*</span>
          </label>
          <input
            type="text"
            id="label"
            name="label"
            className="admin-cleaning-types-form__input"
            value={formData.label}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-cleaning-types-form__field">
          <label className="admin-cleaning-types-form__label" htmlFor="price">
            Цена за м² (Р) <span className="admin-cleaning-types-form__required">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="admin-cleaning-types-form__input"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="admin-cleaning-types-form__field">
          <label className="admin-cleaning-types-form__label" htmlFor="order">
            Порядок
          </label>
          <input
            type="number"
            id="order"
            name="order"
            className="admin-cleaning-types-form__input"
            value={formData.order}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="admin-cleaning-types-form__field">
          <label className="admin-cleaning-types-form__checkboxLabel">
            <input
              type="checkbox"
              name="is_active"
              className="admin-cleaning-types-form__checkbox"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <span className="admin-cleaning-types-form__checkboxText">Активен</span>
          </label>
        </div>

        <div className="admin-cleaning-types-form__actions">
          <button type="submit" className="admin-cleaning-types-form__saveBtn" disabled={loading}>
            {loading ? 'Сохранение...' : 'Save'}
          </button>
          <button 
            type="button" 
            className="admin-cleaning-types-form__saveAnotherBtn"
          >
            Save and Add Another
          </button>
          <button 
            type="button" 
            className="admin-cleaning-types-form__saveContinueBtn"
          >
            Save and Continue Editing
          </button>
          <button 
            type="button" 
            className="admin-cleaning-types-form__cancelBtn"
            onClick={() => navigate('/admin/calculator/cleaning-types')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCleaningTypesForm;

