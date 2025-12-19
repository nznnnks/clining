import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Portfolio from '../components/Portfolio';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const [phone, setPhone] = useState('');

  useEffect(() => {
    document.title = 'Наши работы - Примеры выполненных заказов | Уборка 24';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Phone:', phone);
  };

  return (
    <div className="portfolio-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'Наши работы', path: '/portfolio' }
      ]} />
      
      <section className="portfolio-page__hero">
        <div className="container">
          <h1 className="portfolio-page__title">Наши работы</h1>
        </div>
      </section>

      <section className="portfolio-page__content">
        <div className="container">
          <div className="portfolio-page__wrapper">
            <div className="portfolio-page__left">
              <div className="portfolio-page__portfolioWrapper">
                <Portfolio />
              </div>
            </div>

            <div className="portfolio-page__right">
              <div className="portfolio-page__order">
                <h2 className="portfolio-page__orderTitle">Заказать уборку</h2>
                <div className="portfolio-page__orderCard">
                  <p className="portfolio-page__orderSubtitle">
                    Напишите нам в мессенджеры или оставьте заявку в форме ниже
                  </p>
                  
                  <div className="portfolio-page__orderButtons">
                  <a
                    href="https://wa.me/79770893293"
                    className="portfolio-page__orderBtn portfolio-page__orderBtn_wa"
                    target="_blank"
                    rel="nofollow"
                  >
                    <span>WhatsApp</span>
                    <span className="portfolio-page__orderBtnIcon">💬</span>
                  </a>
                  <a
                    href="https://t.me/uborka24_sales"
                    className="portfolio-page__orderBtn portfolio-page__orderBtn_tg"
                    target="_blank"
                    rel="nofollow"
                  >
                    <span>Telegram</span>
                    <span className="portfolio-page__orderBtnIcon">✈️</span>
                  </a>
                </div>

                <form className="portfolio-page__orderForm" onSubmit={handleSubmit}>
                  <input
                    type="tel"
                    className="portfolio-page__orderInput"
                    placeholder="Ваш номер телефона*"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <button type="submit" className="portfolio-page__orderSubmit btn">
                    Перезвоните мне
                  </button>
                  
                  <div className="portfolio-page__orderCheckboxes">
                    <label className="portfolio-page__orderCheckbox">
                      <input type="checkbox" required />
                      <span className="portfolio-page__orderCheckboxIcon">✓</span>
                      <span>
                        Даю согласие на{' '}
                        <span className="portfolio-page__orderCheckboxHighlight">обработку персональных данных</span>
                      </span>
                    </label>
                    <label className="portfolio-page__orderCheckbox">
                      <input type="checkbox" required />
                      <span className="portfolio-page__orderCheckboxIcon">✓</span>
                      <span>
                        Принимаю{' '}
                        <span className="portfolio-page__orderCheckboxHighlight">пользовательское соглашение</span> и{' '}
                        <span className="portfolio-page__orderCheckboxHighlight">политику конфиденциальности</span>
                      </span>
                    </label>
                  </div>
                </form>
                </div>

                <div className="portfolio-page__orderSteps">
                  <h3 className="portfolio-page__orderStepsTitle">Что будет после отправки заявки?</h3>
                  <div className="portfolio-page__orderStepsList">
                    <div className="portfolio-page__orderStep">
                      <div className="portfolio-page__orderStepCircle"></div>
                      <div className="portfolio-page__orderStepLine"></div>
                      <div className="portfolio-page__orderStepText">
                        Перезвоним или напишем в мессенджеры
                      </div>
                    </div>
                    <div className="portfolio-page__orderStep">
                      <div className="portfolio-page__orderStepCircle"></div>
                      <div className="portfolio-page__orderStepLine"></div>
                      <div className="portfolio-page__orderStepText">
                        Зададим уточняющие вопросы по вашему помещению
                      </div>
                    </div>
                    <div className="portfolio-page__orderStep">
                      <div className="portfolio-page__orderStepCircle"></div>
                      <div className="portfolio-page__orderStepLine"></div>
                      <div className="portfolio-page__orderStepText">
                        Рассчитаем стоимость и удобное время уборки
                      </div>
                    </div>
                    <div className="portfolio-page__orderStep">
                      <div className="portfolio-page__orderStepCircle portfolio-page__orderStepCircle_active"></div>
                      <div className="portfolio-page__orderStepText portfolio-page__orderStepText_active">
                        Выполним уборку
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;

