import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminPhotoSelector from '../shared/AdminPhotoSelector';
import { portfolioAdminAPI } from '../../../utils/api';
import './AdminPortfolioForm.css';

const AdminPortfolioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [showPhotoSelector, setShowPhotoSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    area: '',
    time: '',
    price: '',
    images: [],
  });

  const [newWork, setNewWork] = useState('');
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const loadPortfolioItem = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError('');
        // Преобразуем id в число, если это строка
        const itemId = typeof id === 'string' ? parseInt(id, 10) : id;
        if (isNaN(itemId)) {
          setError('Неверный ID элемента');
          setLoading(false);
          return;
        }
        const response = await portfolioAdminAPI.getById(itemId);
        if (response.success && response.data) {
          const item = response.data;
          setFormData({
            title: item.title || '',
            description: item.description || '',
            category: item.category || '',
            area: item.area || '',
            time: item.time || '',
            price: item.price || '',
            images: item.images || [],
          });
        } else {
          setError(response.error || 'Ошибка при загрузке элемента');
        }
      } catch (err) {
        setError(err.message || 'Ошибка при загрузке элемента');
        if (err.message.includes('401') || err.message.includes('авторизация')) {
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (isEdit && id) {
      loadPortfolioItem();
    } else {
      // Сбрасываем форму при переходе на создание нового элемента
      setFormData({
        title: '',
        description: '',
        category: '',
        area: '',
        time: '',
        price: '',
        images: [],
      });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddWork = () => {
    if (newWork.trim()) {
      setWorks(prev => [...prev, newWork.trim()]);
      setNewWork('');
    }
  };

  const handleRemoveWork = (index) => {
    setWorks(prev => prev.filter((_, i) => i !== index));
  };

  const handleImagesChange = (images) => {
    setFormData(prev => ({
      ...prev,
      images: images
    }));
    setShowPhotoSelector(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      const data = {
        title: formData.title,
        description: formData.description || null,
        category: formData.category || null,
        area: formData.area || null,
        time: formData.time || null,
        price: formData.price || null,
        images: formData.images || [],
      };

      let response;
      if (isEdit && id) {
        // Преобразуем id в число для API
        const itemId = typeof id === 'string' ? parseInt(id, 10) : id;
        if (isNaN(itemId)) {
          setError('Неверный ID элемента');
          setLoading(false);
          return;
        }
        response = await portfolioAdminAPI.update(itemId, data);
      } else {
        response = await portfolioAdminAPI.create(data);
      }

      if (response.success) {
        navigate('/admin/portfolio');
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
      <div className="admin-portfolio-form">
        <div className="admin-portfolio-form__loading">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="admin-portfolio-form">
      {error && (
        <div className="admin-portfolio-form__error">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="admin-portfolio-form__form">
        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="title">
            Название <span className="admin-portfolio-form__required">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="admin-portfolio-form__input"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="description">
            Описание
          </label>
          <textarea
            id="description"
            name="description"
            className="admin-portfolio-form__textarea"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="category">
            Категория
          </label>
          <input
            type="text"
            id="category"
            name="category"
            className="admin-portfolio-form__input"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="area">
            Площадь
          </label>
          <input
            type="text"
            id="area"
            name="area"
            className="admin-portfolio-form__input"
            value={formData.area}
            onChange={handleChange}
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="time">
            Время
          </label>
          <input
            type="text"
            id="time"
            name="time"
            className="admin-portfolio-form__input"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label" htmlFor="price">
            Цена
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="admin-portfolio-form__input"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="admin-portfolio-form__field">
          <label className="admin-portfolio-form__label">
            Изображения (JSON массив) - опционально
          </label>
          <textarea
            className="admin-portfolio-form__textarea"
            value={JSON.stringify(formData.images, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setFormData(prev => ({ ...prev, images: parsed }));
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

        <div className="admin-portfolio-form__actions">
          <button type="submit" className="admin-portfolio-form__saveBtn" disabled={loading}>
            {loading ? 'Сохранение...' : 'Save'}
          </button>
          <button 
            type="button" 
            className="admin-portfolio-form__cancelBtn"
            onClick={() => navigate('/admin/portfolio')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>

      {showPhotoSelector && (
        <AdminPhotoSelector
          selectedImages={formData.images}
          onClose={() => setShowPhotoSelector(false)}
          onSelect={handleImagesChange}
        />
      )}
    </div>
  );
};

export default AdminPortfolioForm;

