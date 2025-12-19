import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [area, setArea] = useState(50);
  const [roomType, setRoomType] = useState('apartment');
  const [serviceType, setServiceType] = useState('standard');
  const [result, setResult] = useState(null);

  const roomTypes = {
    apartment: { name: 'Квартира', basePrice: 100 },
    house: { name: 'Дом', basePrice: 120 },
    office: { name: 'Офис', basePrice: 90 },
  };

  const serviceTypes = {
    basic: { name: 'Базовый', multiplier: 0.7 },
    standard: { name: 'Стандарт', multiplier: 1.0 },
    premium: { name: 'Премиум', multiplier: 1.5 },
  };

  const calculatePrice = () => {
    const basePrice = roomTypes[roomType].basePrice;
    const multiplier = serviceTypes[serviceType].multiplier;
    const total = Math.round(area * basePrice * multiplier);
    const minPrice = 4000;
    const finalPrice = total < minPrice ? minPrice : total;
    
    setResult({
      area,
      roomType: roomTypes[roomType].name,
      serviceType: serviceTypes[serviceType].name,
      price: finalPrice,
      pricePerM2: Math.round(finalPrice / area),
    });
  };

  const handleAreaChange = (delta) => {
    const newArea = area + delta;
    if (newArea >= 1 && newArea <= 5000) {
      setArea(newArea);
    }
  };

  return (
    <section id="calculator" className="calculator">
      <div className="container">
        <div className="section-heading">
          <h2>Калькулятор стоимости</h2>
          <p>Рассчитайте стоимость уборки онлайн</p>
        </div>
        <div className="calculator__content">
          <div className="calculator__form">
            <div className="calculator__field">
              <label className="calculator__label">Площадь помещения, м²</label>
              <div className="calculator__areaControl">
                <button 
                  className="calculator__btnMinus"
                  onClick={() => handleAreaChange(-1)}
                  type="button"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max="5000"
                  value={area}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    if (value >= 1 && value <= 5000) {
                      setArea(value);
                    }
                  }}
                  className="calculator__input"
                />
                <button 
                  className="calculator__btnPlus"
                  onClick={() => handleAreaChange(1)}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>

            <div className="calculator__field">
              <label className="calculator__label">Тип помещения</label>
              <div className="calculator__radioGroup">
                {Object.entries(roomTypes).map(([key, value]) => (
                  <label key={key} className="calculator__radio">
                    <input
                      type="radio"
                      name="roomType"
                      value={key}
                      checked={roomType === key}
                      onChange={(e) => setRoomType(e.target.value)}
                    />
                    <span>{value.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="calculator__field">
              <label className="calculator__label">Тип уборки</label>
              <div className="calculator__radioGroup">
                {Object.entries(serviceTypes).map(([key, value]) => (
                  <label key={key} className="calculator__radio">
                    <input
                      type="radio"
                      name="serviceType"
                      value={key}
                      checked={serviceType === key}
                      onChange={(e) => setServiceType(e.target.value)}
                    />
                    <span>{value.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              className="calculator__submit btn"
              onClick={calculatePrice}
            >
              Рассчитать стоимость
            </button>
          </div>

          {result && (
            <div className="calculator__result">
              <h3>Результат расчета</h3>
              <div className="calculator__resultContent">
                <div className="calculator__resultItem">
                  <span>Площадь:</span>
                  <strong>{result.area} м²</strong>
                </div>
                <div className="calculator__resultItem">
                  <span>Тип помещения:</span>
                  <strong>{result.roomType}</strong>
                </div>
                <div className="calculator__resultItem">
                  <span>Тип уборки:</span>
                  <strong>{result.serviceType}</strong>
                </div>
                <div className="calculator__resultItem">
                  <span>Цена за м²:</span>
                  <strong>{result.pricePerM2} руб.</strong>
                </div>
                <div className="calculator__resultTotal">
                  <span>Итого:</span>
                  <strong>{result.price.toLocaleString('ru-RU')} руб.</strong>
                </div>
              </div>
              <div className="calculator__resultNote">
                <p>* Минимальная стоимость заказа: 4 000 руб.</p>
                <p>* Точная стоимость будет рассчитана после осмотра помещения</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Calculator;

