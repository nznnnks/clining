import React, { useState, useEffect, useMemo } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ReviewsRatings from '../components/ReviewsRatings';
import './CalculatorPage.css';

const CalculatorPage = () => {
  const [area, setArea] = useState(50);
  const [cleaningType, setCleaningType] = useState('maintenance');
  const [additionalServices, setAdditionalServices] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    document.title = 'Калькулятор уборки - Уборка 24';
  }, []);

  const cleaningTypes = [
    { id: 'maintenance', label: 'Поддерживающая', price: 70 },
    { id: 'general', label: 'Генеральная', price: 130 },
    { id: 'after-renovation', label: 'После ремонта', price: 150 }
  ];

  const additionalServicesList = [
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
  ];

  const currentCleaningType = cleaningTypes.find(t => t.id === cleaningType);
  
  // Используем useMemo для расчета цен, чтобы они пересчитывались только при изменении зависимостей
  const basePrice = useMemo(() => {
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
  }, [additionalServices]);

  // Применяем минимальную цену 4000 только к базовой цене
  // Дополнительные услуги добавляются сверху
  const adjustedBasePrice = useMemo(() => {
    return basePrice < 4000 ? 4000 : basePrice;
  }, [basePrice]);
  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order:', { area, cleaningType, additionalServices, name, phone, comment });
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
                  <button
                    className={`calculator-page__cleaningType ${cleaningType === 'maintenance' ? 'calculator-page__cleaningType--active' : ''}`}
                    onClick={() => setCleaningType('maintenance')}
                  >
                    Поддерживающая
                  </button>
                  <button
                    className={`calculator-page__cleaningType ${cleaningType === 'general' ? 'calculator-page__cleaningType--active' : ''}`}
                    onClick={() => setCleaningType('general')}
                  >
                    Генеральная
                  </button>
                  <button
                    className={`calculator-page__cleaningType ${cleaningType === 'after-renovation' ? 'calculator-page__cleaningType--active' : ''}`}
                    onClick={() => setCleaningType('after-renovation')}
                  >
                    После ремонта
                  </button>
                </div>
              </div>

              <div className="calculator-page__section">
                <h2 className="calculator-page__sectionTitle">Дополнительные услуги</h2>
                <div className="calculator-page__additionalServices">
                  {additionalServicesList.map(service => (
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
                  ))}
                </div>
              </div>
            </div>

            <div className="calculator-page__right">
              <div className="calculator-page__orderCard">
                <div className="calculator-page__orderOptions">
                  <div className="calculator-page__orderOption">
                    {currentCleaningType.label} уборка, {area} м²
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

