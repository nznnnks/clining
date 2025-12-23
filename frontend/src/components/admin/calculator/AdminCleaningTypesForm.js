import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminCleaningTypesForm.css';

const AdminCleaningTypesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    id: '',
    название: '',
    ценаЗаМ2: '',
    порядок: 0,
    активен: true,
  });

  useEffect(() => {
    if (isEdit) {
      // Загрузка данных для редактирования
      setFormData({
        id: 'oven',
        название: 'Мытье духовки внутри',
        ценаЗаМ2: 1000,
        порядок: 1,
        активен: true,
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
    navigate('/admin/calculator/cleaning-types');
  };

  return (
    <div className="admin-cleaning-types-form">
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
          <label className="admin-cleaning-types-form__label" htmlFor="название">
            Название <span className="admin-cleaning-types-form__required">*</span>
          </label>
          <input
            type="text"
            id="название"
            name="название"
            className="admin-cleaning-types-form__input"
            value={formData.название}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-cleaning-types-form__field">
          <label className="admin-cleaning-types-form__label" htmlFor="ценаЗаМ2">
            Цена за м² (Р) <span className="admin-cleaning-types-form__required">*</span>
          </label>
          <input
            type="number"
            id="ценаЗаМ2"
            name="ценаЗаМ2"
            className="admin-cleaning-types-form__input"
            value={formData.ценаЗаМ2}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="admin-cleaning-types-form__field">
          <label className="admin-cleaning-types-form__label" htmlFor="порядок">
            Порядок
          </label>
          <input
            type="number"
            id="порядок"
            name="порядок"
            className="admin-cleaning-types-form__input"
            value={formData.порядок}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="admin-cleaning-types-form__field">
          <label className="admin-cleaning-types-form__checkboxLabel">
            <input
              type="checkbox"
              name="активен"
              className="admin-cleaning-types-form__checkbox"
              checked={formData.активен}
              onChange={handleChange}
            />
            <span className="admin-cleaning-types-form__checkboxText">Активен</span>
          </label>
        </div>

        <div className="admin-cleaning-types-form__actions">
          <button type="submit" className="admin-cleaning-types-form__saveBtn">
            Save
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

