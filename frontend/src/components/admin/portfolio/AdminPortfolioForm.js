import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPhotoSelector from '../shared/AdminPhotoSelector';
import './AdminPortfolioForm.css';

const AdminPortfolioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [showPhotoSelector, setShowPhotoSelector] = useState(false);

  const [formData, setFormData] = useState({
    название: '',
    описание: '',
    категория: '',
    площадь: '',
    время: '',
    цена: '',
    изображения: [],
    works: [],
  });

  const [newWork, setNewWork] = useState('');

  useEffect(() => {
    if (isEdit) {
      // Загрузка данных для редактирования
      // В реальном приложении здесь будет запрос к API
      setFormData({
        название: 'Уборка после ремонта',
        описание: 'Комплексная уборка квартиры после завершения ремонтных работ.',
        категория: 'квартира',
        площадь: '56 м²',
        время: '8 часов',
        цена: '9 570 руб.',
        изображения: ['/portfolio-photo.jpeg'],
        works: ['Убрали строительный мусор', 'Удалили строительную пыль'],
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddWork = () => {
    if (newWork.trim()) {
      setFormData(prev => ({
        ...prev,
        works: [...prev.works, newWork.trim()]
      }));
      setNewWork('');
    }
  };

  const handleRemoveWork = (index) => {
    setFormData(prev => ({
      ...prev,
      works: prev.works.filter((_, i) => i !== index)
    }));
  };

  const handleImagesChange = (images) => {
    setFormData(prev => ({
      ...prev,
      изображения: images
    }));
    setShowPhotoSelector(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет отправка данных на сервер
    console.log('Form data:', formData);
    navigate('/admin/portfolio');
  };

  return (
    <div className="admin-portfolio-form">
      <form onSubmit={handleSubmit} className="admin-portfolio-form__form">
        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="название">
            Название <span className="admin-portfolio-form__required">*</span>
          </label>
          <input
            type="text"
            id="название"
            name="название"
            className="admin-portfolio-form__input"
            value={formData.название}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="описание">
            Описание
          </label>
          <textarea
            id="описание"
            name="описание"
            className="admin-portfolio-form__textarea"
            value={formData.описание}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="категория">
            Категория
          </label>
          <input
            type="text"
            id="категория"
            name="категория"
            className="admin-portfolio-form__input"
            value={formData.категория}
            onChange={handleChange}
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="площадь">
            Площадь
          </label>
          <input
            type="text"
            id="площадь"
            name="площадь"
            className="admin-portfolio-form__input"
            value={formData.площадь}
            onChange={handleChange}
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="время">
            Время
          </label>
          <input
            type="text"
            id="время"
            name="время"
            className="admin-portfolio-form__input"
            value={formData.время}
            onChange={handleChange}
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="цена">
            Цена
          </label>
          <input
            type="text"
            id="цена"
            name="цена"
            className="admin-portfolio-form__input"
            value={formData.цена}
            onChange={handleChange}
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label">
            Изображения (JSON массив) - опционально
          </label>
          <textarea
            className="admin-portfolio-form__textarea"
            value={JSON.stringify(formData.изображения, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setFormData(prev => ({ ...prev, изображения: parsed }));
              } catch (err) {
                // Игнорируем ошибки парсинга
              }
            }}
            rows="3"
            placeholder='Введите JSON массив URL изображений, например: ["url1.jpg", "url2.jpg"]'
          />
          <button
            type="button"
            className="admin-portfolio-form__photoBtn"
            onClick={() => setShowPhotoSelector(true)}
          >
            Выбрать фотографии
          </button>
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label">
            Виды выполненных работ
          </label>
          <div className="admin-portfolio-form__worksInput">
            <input
              type="text"
              className="admin-portfolio-form__input"
              value={newWork}
              onChange={(e) => setNewWork(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddWork();
                }
              }}
              placeholder="Добавить работу"
            />
            <button
              type="button"
              className="admin-portfolio-form__addBtn"
              onClick={handleAddWork}
            >
              Добавить
            </button>
          </div>
          <div className="admin-portfolio-form__worksList">
            {formData.works.map((work, index) => (
              <div key={index} className="admin-portfolio-form__workItem">
                <span>{work}</span>
                <button
                  type="button"
                  className="admin-portfolio-form__removeBtn"
                  onClick={() => handleRemoveWork(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-portfolio-form__actions">
          <button type="submit" className="admin-portfolio-form__saveBtn">
            Save
          </button>
          <button 
            type="button" 
            className="admin-portfolio-form__saveAnotherBtn"
            onClick={() => {
              handleSubmit({ preventDefault: () => {} });
              setFormData({
                название: '',
                описание: '',
                категория: '',
                площадь: '',
                время: '',
                цена: '',
                изображения: [],
                works: [],
              });
            }}
          >
            Save and Add Another
          </button>
          <button 
            type="button" 
            className="admin-portfolio-form__saveContinueBtn"
          >
            Save and Continue Editing
          </button>
          <button 
            type="button" 
            className="admin-portfolio-form__cancelBtn"
            onClick={() => navigate('/admin/portfolio')}
          >
            Cancel
          </button>
        </div>
      </form>

      {showPhotoSelector && (
        <AdminPhotoSelector
          selectedImages={formData.изображения}
          onClose={() => setShowPhotoSelector(false)}
          onSelect={handleImagesChange}
        />
      )}
    </div>
  );
};

export default AdminPortfolioForm;

