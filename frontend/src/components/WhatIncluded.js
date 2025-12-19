import React, { useState } from 'react';
import './WhatIncluded.css';

const WhatIncluded = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'Генеральная' },
    { id: 'after-renovation', name: 'После ремонта' },
    { id: 'maintenance', name: 'Поддерживающая' },
  ];

  const services = {
    general: {
      room: [
        'Вымоем полы и очистим плинтусы',
        'Протрем дверные откосы, наличники и двери',
        'Протираем дверные ручки, выключатели и розетки',
        'Полируем зеркала и стеклянные поверхности (не более 1 м²)',
        'Обрабатываем всю оргтехнику',
        'Проведем сухую чистку ковровых покрытий',
        'Протрем подоконники',
        'Удаляем пыль с осветительных приборов (кроме хрустальных)',
        'Удаляем пыль с поверхностей мебели (на всю высоту)',
      ],
      kitchen: [
        'Моем кухонную мебель снаружи и внутри',
        'Очищаем плиту и вытяжку',
        'Моем холодильник снаружи',
        'Очищаем микроволновую печь снаружи',
        'Моем раковину и смеситель',
        'Протираем фартук и столешницу',
      ],
      bathroom: [
        'Моем ванну/душевую кабину',
        'Моем унитаз',
        'Моем раковину и смеситель',
        'Очищаем зеркала',
        'Моем кафель и пол',
        'Очищаем сантехнику',
      ],
    },
    'after-renovation': {
      room: [
        'Удаление строительного мусора',
        'Удаление строительной пыли со всех поверхностей',
        'Мытье полов, стен, потолков',
        'Очистка окон и подоконников',
        'Очистка всех поверхностей от следов ремонта',
      ],
      kitchen: [
        'Глубокая очистка кухонной мебели',
        'Удаление строительной пыли из всех щелей',
        'Очистка техники от строительных загрязнений',
      ],
      bathroom: [
        'Удаление строительных остатков',
        'Глубокая очистка сантехники',
        'Очистка кафеля от строительных загрязнений',
      ],
    },
    maintenance: {
      room: [
        'Влажная уборка полов',
        'Протирка пыли с поверхностей',
        'Протирка зеркал',
        'Вынос мусора',
      ],
      kitchen: [
        'Протирка поверхностей',
        'Мытье раковины',
      ],
      bathroom: [
        'Мытье сантехники',
        'Мытье пола',
      ],
    },
  };

  return (
    <section className="what-included">
      <div className="container">
        <div className="section-heading">
          <h2>Что входит в клининг</h2>
          <p>
            Мы гарантируем идеальную чистоту вашего помещения. Наши клинеры работают 
            быстро, качественно и без доработок.
          </p>
        </div>
        <div className="what-included__tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`what-included__tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="what-included__content">
          <div className="what-included__section">
            <div className="what-included__sectionHeader">
              <h3>Комната</h3>
              <span className="what-included__toggle">▲</span>
            </div>
            <ul className="what-included__list">
              {services[activeTab].room.map((service, index) => (
                <li key={index}>
                  <span className="what-included__check">✓</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div className="what-included__section">
            <div className="what-included__sectionHeader">
              <h3>Кухня</h3>
              <span className="what-included__toggle">▲</span>
            </div>
            <ul className="what-included__list">
              {services[activeTab].kitchen.map((service, index) => (
                <li key={index}>
                  <span className="what-included__check">✓</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div className="what-included__section">
            <div className="what-included__sectionHeader">
              <h3>Санузел</h3>
              <span className="what-included__toggle">▲</span>
            </div>
            <ul className="what-included__list">
              {services[activeTab].bathroom.map((service, index) => (
                <li key={index}>
                  <span className="what-included__check">✓</span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIncluded;

