import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceTabs from '../components/ServiceTabs';
import ServiceTable from '../components/ServiceTable';
import Services from '../components/Services';
import HowWeWork from '../components/HowWeWork';
import WhatIncluded from '../components/WhatIncluded';
import Packages from '../components/Packages';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Promotions from '../components/Promotions';
import Reviews from '../components/Reviews';
import WorkSteps from '../components/WorkSteps';
import Employees from '../components/Employees';
import FAQ from '../components/FAQ';
import './WindowsPage.css';

const WindowsPage = () => {
  const [activeTab, setActiveTab] = useState('windows');

  useEffect(() => {
    document.title = 'Мытье окон в квартире в Москве по выгодной цене | Уборка 24';
  }, []);

  const windowsData = {
    headers: ['Виды работ', 'Стоимость'],
    rows: [
      { cells: [{ content: 'Одностворчатое окно (с двух сторон)' }, { content: 'от 400 руб.' }] },
      { cells: [{ content: 'Двухстворчатое окно (с двух сторон)' }, { content: 'от 800 руб.' }] },
      { cells: [{ content: 'Трехстворчатое окно (с двух сторон)' }, { content: 'от 1200 руб.' }] },
      { cells: [{ content: 'Окна больших размеров' }, { content: 'от 400 руб./м²' }] },
      { cells: [{ content: 'Мытье москитной сетки окон' }, { content: 'от 200 руб.' }] },
      { cells: [{ content: 'Мытье жалюзи' }, { content: 'от 300 руб. за ед.' }] },
      { cells: [{ content: 'Мыть окон после ремонта' }, { content: 'от 450 руб./м²' }] },
    ]
  };

  const tabs = [
    { id: 'windows', label: 'Мытье окон', icon: '🪟' }
  ];

  return (
    <div className="windows-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'Дополнительные услуги', path: '/services/additional' },
        { label: 'Мытье окон', path: '/windows' }
      ]} />
      
      <section className="windows-page__hero">
        <div className="container">
          <div className="windows-page__header">
            <div className="windows-page__left">
              <h1 className="windows-page__title">Мытье окон в квартире в Москве</h1>
              
              <div className="windows-page__promo">
                <span className="windows-page__promoIcon">🔥</span>
                <span className="windows-page__promoText">
                  Скидка 10% + мойка окна в подарок!
                </span>
              </div>

              <ul className="windows-page__achievements">
                <li className="windows-page__achievement">
                  <span className="windows-page__check">✓</span>
                  Моем окна любой сложности и любых объемов
                </li>
                <li className="windows-page__achievement">
                  <span className="windows-page__check">✓</span>
                  ТОП-10 компаний по версии Klerk.ru и Vc.ru
                </li>
                <li className="windows-page__achievement">
                  <span className="windows-page__check">✓</span>
                  Выполнили 18 957 заказов за 5 лет работы
                </li>
                <li className="windows-page__achievement">
                  <span className="windows-page__check">✓</span>
                  Наш рейтинг в Яндекс Я 5,0
                </li>
              </ul>

              <div className="windows-page__buttons">
                <a 
                  href="https://wa.me/79770893293" 
                  className="windows-page__btn windows-page__btn_wa btn"
                  target="_blank"
                  rel="nofollow"
                >
                  <span className="windows-page__btnIcon">💬</span>
                  Написать в WhatsApp
                </a>
                <a 
                  href="https://t.me/uborka24_sales" 
                  className="windows-page__btn windows-page__btn_tg btn"
                  target="_blank"
                  rel="nofollow"
                >
                  <span className="windows-page__btnIcon">✈️</span>
                  Написать в Telegram
                </a>
              </div>
            </div>
            <div className="windows-page__right">
              <div className="windows-page__imageWrapper">
                <div className="windows-page__playButton">▶</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="windows-page__content">
        <div className="container">
          <div className="windows-page__description">
            <p>
              Мытье окон кажется простым делом, но на самом деле требует много времени и усилий, 
              чтобы удалить все загрязнения и разводы. Особенно сложно мыть окна после ремонта, 
              когда на стеклах остаются следы строительной пыли, штукатурки, клея и скотча.
            </p>
            <p>
              Мытье окон на высоте в квартирах или офисах может быть опасным, поэтому лучше 
              доверить это профессионалам.
            </p>
            <p>
              Компания "Уборка 24" предлагает услуги по мытью окон любой сложности. Наши 
              промышленные альпинисты могут вымыть все виды остекления: окна, рамы, лоджии, 
              витрины. Мы справимся с любой сложностью: квартиры, балконы, лоджии, панорамные 
              и пластиковые окна, а также мытье окон на высоте.
            </p>
            <p>
              Цены на мытье окон в нашей компании демократичные и доступные, что делает 
              профессиональную уборку доступной для всех. В таблице ниже представлены цены 
              в рублях на каждый вид мытья окон. Итоговая стоимость будет зависеть от количества 
              выбранных задач, площади остекления и использования специального оборудования.
            </p>
            <p>
              Заказать клинеров удобно по телефону или через сайт. Наша команда приедет по 
              любому адресу в Москве или объекту в Московской области в указанное время.
            </p>
          </div>
        </div>
      </section>

      <ServiceTabs 
        tabs={tabs} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === 'windows' && (
        <ServiceTable data={windowsData} />
      )}

      {/* Все блоки с главной страницы */}
      <Services />
      <HowWeWork />
      <WhatIncluded />
      <Packages />
      <About />
      <Portfolio />
      <Promotions />
      <Reviews />
      <WorkSteps />
      <Employees />
      <FAQ />
    </div>
  );
};

export default WindowsPage;

