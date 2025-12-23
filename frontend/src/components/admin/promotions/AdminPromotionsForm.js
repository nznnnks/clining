import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminPromotionsForm.css';

const AdminPromotionsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    название: '',
    описание: '',
    действительноДо: '',
    активна: true,
  });

  useEffect(() => {
    if (isEdit) {
      // Загрузка данных для редактирования
      setFormData({
        название: 'новый год',
        описание: '',
        действительноДо: '2026',
        активна: false,
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет отправка данных на сервер
    console.log('Form data:', formData);
    navigate('/admin/promotions');
  };

  return (
    <div className="admin-promotions-form">
      <form onSubmit={handleSubmit} className="admin-promotions-form__form">
        <div className="admin-promotions-form__field">
          <label className="admin-promotions-form__label" htmlFor="название">
            Название <span className="admin-promotions-form__required">*</span>
          </label>
          <input
            type="text"
            id="название"
            name="название"
            className="admin-promotions-form__input"
            value={formData.название}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-promotions-form__field">
          <label className="admin-promotions-form__label" htmlFor="описание">
            Описание
          </label>
          <textarea
            id="описание"
            name="описание"
            className="admin-promotions-form__textarea"
            value={formData.описание}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="admin-promotions-form__field">
          <label className="admin-promotions-form__label" htmlFor="действительноДо">
            Действительно до
          </label>
          <input
            type="text"
            id="действительноДо"
            name="действительноДо"
            className="admin-promotions-form__input"
            value={formData.действительноДо}
            onChange={handleChange}
            placeholder="2026"
          />
        </div>

        <div className="admin-promotions-form__field">
          <label className="admin-promotions-form__checkboxLabel">
            <input
              type="checkbox"
              name="активна"
              className="admin-promotions-form__checkbox"
              checked={formData.активна}
              onChange={handleChange}
            />
            <span className="admin-promotions-form__checkboxText">Активна</span>
          </label>
        </div>

        <div className="admin-promotions-form__actions">
          <button type="submit" className="admin-promotions-form__saveBtn">
            Save
          </button>
          <button 
            type="button" 
            className="admin-promotions-form__saveAnotherBtn"
          >
            Save and Add Another
          </button>
          <button 
            type="button" 
            className="admin-promotions-form__saveContinueBtn"
          >
            Save and Continue Editing
          </button>
          <button 
            type="button" 
            className="admin-promotions-form__cancelBtn"
            onClick={() => navigate('/admin/promotions')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPromotionsForm;

