import React, { useState, useEffect, useMemo } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ReviewsRatings from '../components/ReviewsRatings';
import './CalculatorPage.css';

// Базовый URL API (можно вынести в конфигурационный файл)
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const CalculatorPage = () => {
  const [area, setArea] = useState(50);
  const [cleaningType, setCleaningType] = useState('maintenance');
  const [additionalServices, setAdditionalServices] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [cleaningTypes, setCleaningTypes] = useState([]);
  const [additionalServicesList, setAdditionalServicesList] = useState([]);
  const [minPrice, setMinPrice] = useState(4000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Калькулятор уборки - Уборка 24';
    
    // Загружаем данные из API
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/calculator/prices`);
        const result = await response.json();
        
        if (result.success) {
          setCleaningTypes(result.data.cleaningTypes);
          setAdditionalServicesList(result.data.additionalServices);
          setMinPrice(result.data.minPrice);
          
          // Устанавливаем первый тип уборки по умолчанию, если есть данные
          if (result.data.cleaningTypes.length > 0) {
            setCleaningType(result.data.cleaningTypes[0].id);
          }
        } else {
          setError('Не удалось загрузить данные о ценах');
          // Используем значения по умолчанию в случае ошибки
          setCleaningTypes([
            { id: 'maintenance', label: 'Поддерживающая', price: 70 },
            { id: 'general', label: 'Генеральная', price: 130 },
            { id: 'after-renovation', label: 'После ремонта', price: 150 }
          ]);
          setAdditionalServicesList([
            { id: 'oven', label: 'Мытье духовки внутри', price: 800, unit: 'шт.' },
            { id: 'microwave', label: 'Мытье СВЧ внутри', price: 400, unit: 'шт.' },
            { id: 'fridge', label: 'Мытье холодильника внутри', price: 800, unit: 'шт.' },
            { id: 'windows', label: 'Мойка окон', price: 400, unit: 'створка' },
            { id: 'chandelier', label: 'Мытье хрустальной люстры', price: 1500, unit: 'шт.' },
            { id: 'hood', label: 'Мытье вытяжки', price: 400, unit: 'шт.' },
            { id: 'washing-machine', label: 'Мытье стиральной машины внутри', price: 550, unit: 'шт.' },
            { id: 'ironing', label: 'Глажка', price: 1000, unit: '60 мин' },
            { id: 'bed-linen', label: 'Смена постельного белья', price: 500, unit: 'комплект' },
            { id: 'balcony', label: 'Уборка на балконе', price: 600, unit: 'м²' }
          ]);
        }
      } catch (err) {
        console.error('Ошибка загрузки цен:', err);
        setError('Не удалось загрузить данные о ценах');
        // Используем значения по умолчанию в случае ошибки
        setCleaningTypes([
          { id: 'maintenance', label: 'Поддерживающая', price: 70 },
          { id: 'general', label: 'Генеральная', price: 130 },
          { id: 'after-renovation', label: 'После ремонта', price: 150 }
        ]);
        setAdditionalServicesList([
          { id: 'oven', label: 'Мытье духовки внутри', price: 800, unit: 'шт.' },
          { id: 'microwave', label: 'Мытье СВЧ внутри', price: 400, unit: 'шт.' },
          { id: 'fridge', label: 'Мытье холодильника внутри', price: 800, unit: 'шт.' },
          { id: 'windows', label: 'Мойка окон', price: 400, unit: 'створка' },
          { id: 'chandelier', label: 'Мытье хрустальной люстры', price: 1500, unit: 'шт.' },
          { id: 'hood', label: 'Мытье вытяжки', price: 400, unit: 'шт.' },
          { id: 'washing-machine', label: 'Мытье стиральной машины внутри', price: 550, unit: 'шт.' },
          { id: 'ironing', label: 'Глажка', price: 1000, unit: '60 мин' },
          { id: 'bed-linen', label: 'Смена постельного белья', price: 500, unit: 'комплект' },
          { id: 'balcony', label: 'Уборка на балконе', price: 600, unit: 'м²' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrices();
  }, []);

  const currentCleaningType = cleaningTypes.find(t => t.id === cleaningType);
  
  // Используем useMemo для расчета цен, чтобы они пересчитывались только при изменении зависимостей
  const basePrice = useMemo(() => {
    if (!currentCleaningType) return 0;
    return area * currentCleaningType.price;
  }, [area, currentCleaningType]);
  
  const additionalPrice = useMemo(() => {
    return Object.keys(additionalServices).reduce((sum, key) => {
      const service = additionalServicesList.find(s => s.id === key);
      const count = additionalServices[key];
      if (service && count && count > 0) {
        return sum + (service.price * count);
      }
      return sum;
    }, 0);
  }, [additionalServices, additionalServicesList]);

  // Применяем минимальную цену только к базовой цене
  // Дополнительные услуги добавляются сверху
  const adjustedBasePrice = useMemo(() => {
    return basePrice < minPrice ? minPrice : basePrice;
  }, [basePrice, minPrice]);
  
  // Рассчитываем итоговую цену: скорректированная базовая цена + дополнительные услуги
  const finalPrice = useMemo(() => {
    return adjustedBasePrice + additionalPrice;
  }, [adjustedBasePrice, additionalPrice]);

  const handleServiceChange = (serviceId, delta) => {
    setAdditionalServices(prev => {
      const currentCount = prev[serviceId] || 0;
      const newCount = Math.max(0, currentCount + delta);
      
      // Если значение стало 0, удаляем ключ из объекта
      if (newCount === 0) {
        const updated = { ...prev };
        delete updated[serviceId];
        return updated;
      }
      
      return {
        ...prev,
        [serviceId]: newCount
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверяем обязательные поля
    if (!phone.trim()) {
      alert('Пожалуйста, укажите номер телефона');
      return;
    }
    
    try {
      // Отправляем данные на сервер
      const response = await fetch(`${API_BASE_URL}/api/calculator/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          comment: comment.trim(),
          area: area,
          cleaningType: cleaningType,
          additionalServices: additionalServices,
          basePrice: basePrice,
          adjustedBasePrice: adjustedBasePrice,
          additionalPrice: additionalPrice,
          finalPrice: finalPrice
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
        // Очищаем форму
        setName('');
        setPhone('');
        setComment('');
        setAdditionalServices({});
      } else {
        alert(`Ошибка при отправке заказа: ${result.error || 'Неизвестная ошибка'}`);
      }
    } catch (err) {
      console.error('Ошибка отправки заказа:', err);
      alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте позже.');
    }
  };

  return (
    <div className="calculator-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'Калькулятор', path: '/calculator' }
      ]} />
      
      <section className="calculator-page__hero">
        <div className="container">
          <h1 className="calculator-page__title">Калькулятор уборки</h1>
        </div>
      </section>

      <section className="calculator-page__content">
        <div className="container">
          {loading && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              Загрузка данных...
            </div>
          )}
          {error && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#ff6b6b' }}>
              {error}
            </div>
          )}
          <div className="calculator-page__wrapper">
            <div className="calculator-page__left">
              <div className="calculator-page__section">
                <h2 className="calculator-page__sectionTitle">Площадь помещения, м²</h2>
                <div className="calculator-page__areaControl">
                  <button
                    className="calculator-page__controlButton"
                    onClick={() => setArea(Math.max(10, area - 5))}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="calculator-page__areaInput"
                    value={area}
                    onChange={(e) => setArea(Math.max(10, parseInt(e.target.value) || 10))}
                    min="10"
                  />
                  <button
                    className="calculator-page__controlButton"
                    onClick={() => setArea(area + 5)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="calculator-page__section">
                <h2 className="calculator-page__sectionTitle">Тип уборки</h2>
                <div className="calculator-page__cleaningTypes">
                  {cleaningTypes.map(type => (
                    <button
                      key={type.id}
                      className={`calculator-page__cleaningType ${cleaningType === type.id ? 'calculator-page__cleaningType--active' : ''}`}
                      onClick={() => setCleaningType(type.id)}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calculator-page__section">
                <h2 className="calculator-page__sectionTitle">Дополнительные услуги</h2>
                <div className="calculator-page__additionalServices">
                  {additionalServicesList.length > 0 ? additionalServicesList.map(service => (
                    <div key={service.id} className="calculator-page__additionalService">
                      <div className="calculator-page__serviceInfo">
                        <span className="calculator-page__serviceLabel">{service.label}</span>
                        <span className="calculator-page__servicePrice">{service.price} ₽/{service.unit}</span>
                      </div>
                      <div className="calculator-page__serviceControl">
                        <button
                          className="calculator-page__controlButton"
                          onClick={() => handleServiceChange(service.id, -1)}
                        >
                          −
                        </button>
                        <span className="calculator-page__serviceCount">{additionalServices[service.id] || 0}</span>
                        <button
                          className="calculator-page__controlButton"
                          onClick={() => handleServiceChange(service.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      Нет доступных услуг
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="calculator-page__right">
              <div className="calculator-page__orderCard">
                <div className="calculator-page__orderOptions">
                  <div className="calculator-page__orderOption">
                    {currentCleaningType ? `${currentCleaningType.label} уборка, ${area} м²` : 'Загрузка...'}
                  </div>
                </div>
                <div className="calculator-page__orderPrice">
                  <div className="calculator-page__orderPriceLabel">Ориентировочная стоимость ОТ:</div>
                  <div className="calculator-page__orderPriceValue">{finalPrice.toLocaleString()} ₽</div>
                </div>
                <form className="calculator-page__orderForm" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="calculator-page__orderInput"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="tel"
                    className="calculator-page__orderInput"
                    placeholder="Ваш номер телефона*"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <textarea
                    className="calculator-page__orderTextarea"
                    placeholder="Комментарий к заказу"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                  />
                  <button type="submit" className="calculator-page__orderSubmit btn">
                    Заказать уборку
                  </button>
                  <div className="calculator-page__orderAgreement">
                    <span>согласие на обработку персональных данных</span>
                    <span>принимаю пользовательское соглашение и</span>
                    <span>политику конфиденциальности</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsRatings />
    </div>
  );
};

export default CalculatorPage;

