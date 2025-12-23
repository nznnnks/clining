import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './AdminPhotoSelector.css';

const AdminPhotoSelector = ({ selectedImages = [], onClose, onSelect }) => {
  // Преобразуем массив URL в массив объектов с id и isMain
  const convertUrlsToImages = (urls) => {
    if (!urls || urls.length === 0) return [];
    return urls.map((url, index) => {
      // Создаем стабильный ID на основе URL (используем хэш для длинных строк)
      let id;
      if (url.startsWith('data:')) {
        // Для data URL используем индекс и начало строки
        const hash = url.length + url.substring(5, 15).replace(/[^a-zA-Z0-9]/g, '');
        id = `data-img-${index}-${hash}`;
      } else {
        // Для обычных URL используем сам URL как часть ID
        id = `url-img-${index}-${url.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 50)}`;
      }
      
      return {
        id: id,
        url: url,
        isMain: index === 0,
      };
    });
  };
  
  const [images, setImages] = useState(() => convertUrlsToImages(selectedImages));
  const [draggedIndex, setDraggedIndex] = useState(null);
  const prevSelectedImagesRef = useRef(selectedImages);

  // Обновляем images при изменении selectedImages (только если они действительно изменились)
  useEffect(() => {
    const prevUrls = JSON.stringify(prevSelectedImagesRef.current || []);
    const currentUrls = JSON.stringify(selectedImages || []);
    
    if (prevUrls !== currentUrls) {
      const newImages = convertUrlsToImages(selectedImages);
      setImages(newImages);
      prevSelectedImagesRef.current = selectedImages;
    }
  }, [selectedImages]);

  const handleAddPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      files.forEach((file, fileIndex) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage = {
            id: Date.now() + Math.random() + fileIndex,
            url: event.target.result,
            isMain: images.length === 0 && fileIndex === 0,
          };
          setImages(prev => {
            // Если это первое изображение, делаем его главным
            const updated = [...prev, newImage];
            if (prev.length === 0 && fileIndex === 0) {
              updated[0].isMain = true;
            }
            return updated;
          });
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
                onError={(e) => {
                  console.error('Error loading image:', image.url);
                  e.target.style.display = 'none';
                }}
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

