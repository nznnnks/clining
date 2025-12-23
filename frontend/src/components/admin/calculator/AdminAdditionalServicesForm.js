import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminAdditionalServicesForm.css';

const AdminAdditionalServicesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    id: '',
    название: '',
    цена: '',
    единицаИзмерения: '',
    порядок: 0,
    активна: true,
  });

  useEffect(() => {
    if (isEdit) {
      // Загрузка данных для редактирования
      setFormData({
        id: 'oven',
        название: 'Мытье духовки внутри',
        цена: 1000,
        единицаИзмерения: 'шт.',
        порядок: 1,
        активна: true,
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) || 0 : value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет отправка данных на сервер
    console.log('Form data:', formData);
    navigate('/admin/calculator/additional-services');
  };

  return (
    <div className="admin-additional-services-form">
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
          <label className="admin-additional-services-form__label" htmlFor="название">
            Название <span className="admin-additional-services-form__required">*</span>
          </label>
          <input
            type="text"
            id="название"
            name="название"
            className="admin-additional-services-form__input"
            value={formData.название}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-additional-services-form__field">
          <label className="admin-additional-services-form__label" htmlFor="цена">
            Цена (Р) <span className="admin-additional-services-form__required">*</span>
          </label>
          <input
            type="number"
            id="цена"
            name="цена"
            className="admin-additional-services-form__input"
            value={formData.цена}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="admin-additional-services-form__field">
          <label className="admin-additional-services-form__label" htmlFor="единицаИзмерения">
            Единица измерения <span className="admin-additional-services-form__required">*</span>
          </label>
          <input
            type="text"
            id="единицаИзмерения"
            name="единицаИзмерения"
            className="admin-additional-services-form__input"
            value={formData.единицаИзмерения}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-additional-services-form__field">
          <label className="admin-additional-services-form__label" htmlFor="порядок">
            Порядок
          </label>
          <input
            type="number"
            id="порядок"
            name="порядок"
            className="admin-additional-services-form__input"
            value={formData.порядок}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="admin-additional-services-form__field">
          <label className="admin-additional-services-form__checkboxLabel">
            <input
              type="checkbox"
              name="активна"
              className="admin-additional-services-form__checkbox"
              checked={formData.активна}
              onChange={handleChange}
            />
            <span className="admin-additional-services-form__checkboxText">Активна</span>
          </label>
        </div>

        <div className="admin-additional-services-form__actions">
          <button type="submit" className="admin-additional-services-form__saveBtn">
            Save
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

