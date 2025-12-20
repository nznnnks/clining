import React, { useState, useEffect } from 'react';
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
  const basePrice = area * currentCleaningType.price;
  
  const additionalPrice = Object.keys(additionalServices).reduce((sum, key) => {
    const service = additionalServicesList.find(s => s.id === key);
    if (service && additionalServices[key] > 0) {
      return sum + (service.price * additionalServices[key]);
    }
    return sum;
  }, 0);

  const totalPrice = basePrice + additionalPrice;
  const minPrice = Math.max(4000, totalPrice);

  const handleServiceChange = (serviceId, value) => {
    setAdditionalServices(prev => ({
      ...prev,
      [serviceId]: Math.max(0, parseInt(value) || 0)
    }));
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
                          onClick={() => handleServiceChange(service.id, (additionalServices[service.id] || 0) - 1)}
                        >
                          −
                        </button>
                        <span className="calculator-page__serviceCount">{additionalServices[service.id] || 0}</span>
                        <button
                          className="calculator-page__controlButton"
                          onClick={() => handleServiceChange(service.id, (additionalServices[service.id] || 0) + 1)}
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
                  <div className="calculator-page__orderPriceValue">{minPrice.toLocaleString()} ₽</div>
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

