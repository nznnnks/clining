import React from 'react';
import './Employees.css';

const Employees = () => {
  return (
    <section className="employees">
      <div className="container">
        <div className="section-heading">
          <h2>Наши сотрудники</h2>
        </div>
        <div className="employees__content">
          <div className="employees__text">
            <p>
              В штате клининговой компании более 75 клинеров. Мы работаем по всей Москве, 
              Московской области и выезжаем до 50 км от МКАД.
            </p>
            <div className="employees__features">
              <h3>Все сотрудники, которые работают в нашей компании:</h3>
              <ul>
                <li>✓ успешно прошли проверку служб</li>
                <li>✓ прошли специализированное обучение</li>
              </ul>
            </div>
          </div>
          <div className="employees__gallery">
            <div className="employees__photo">👩‍💼</div>
            <div className="employees__photo">👨‍💼</div>
            <div className="employees__photo">👩‍💼</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Employees;

