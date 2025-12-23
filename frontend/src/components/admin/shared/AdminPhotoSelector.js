import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './AdminPhotoSelector.css';

const AdminPhotoSelector = ({ selectedImages = [], onClose, onSelect }) => {
  const [images, setImages] = useState([
    { id: 1, url: '/portfolio-photo.jpeg', isMain: true },
    { id: 2, url: '/portfolio-photo.jpeg', isMain: false },
  ]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleAddPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage = {
            id: Date.now() + Math.random(),
            url: event.target.result,
            isMain: images.length === 0,
          };
          setImages(prev => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      });
    };
    input.click();
  };

  const handleRemovePhoto = (id) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      if (filtered.length > 0 && prev.find(img => img.id === id)?.isMain) {
        filtered[0].isMain = true;
      }
      return filtered;
    });
  };

  const handleSetMain = (id) => {
    setImages(prev => prev.map(img => ({
      ...img,
      isMain: img.id === id
    })));
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);
    setImages(newImages);
    setDraggedIndex(null);
  };

  const handleSave = () => {
    const imageUrls = images.map(img => img.url);
    onSelect(imageUrls);
  };

  return ReactDOM.createPortal(
    <div className="admin-photo-selector" onClick={onClose}>
      <div className="admin-photo-selector__content" onClick={(e) => e.stopPropagation()}>
        <div className="admin-photo-selector__header">
          <h2 className="admin-photo-selector__title">Фотографии</h2>
          <button 
            className="admin-photo-selector__close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <div className="admin-photo-selector__addBtnWrapper">
          <button 
            className="admin-photo-selector__addBtn"
            onClick={handleAddPhoto}
          >
            Добавить фотографии
          </button>
        </div>

        <p className="admin-photo-selector__hint">
          Первая фотография будет главной. Перетаскивайте фотографии для изменения порядка.
        </p>

        <div className="admin-photo-selector__grid">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`admin-photo-selector__card ${image.isMain ? 'admin-photo-selector__card--main' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="admin-photo-selector__cardNumber">
                {index + 1}
              </div>
              <button
                className="admin-photo-selector__cardRemove"
                onClick={() => handleRemovePhoto(image.id)}
                aria-label="Удалить"
              >
                ×
              </button>
              <img 
                src={image.url} 
                alt={`Фото ${index + 1}`}
                className="admin-photo-selector__cardImage"
              />
              {image.isMain && (
                <div className="admin-photo-selector__cardMain">
                  Главное
                </div>
              )}
              {!image.isMain && (
                <button
                  className="admin-photo-selector__cardSetMain"
                  onClick={() => handleSetMain(image.id)}
                >
                  Сделать главным
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="admin-photo-selector__actions">
          <button 
            className="admin-photo-selector__cancelBtn"
            onClick={onClose}
          >
            Отмена
          </button>
          <button 
            className="admin-photo-selector__saveBtn"
            onClick={handleSave}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AdminPhotoSelector;

