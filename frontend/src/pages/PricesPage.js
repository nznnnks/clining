import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceTabs from '../components/ServiceTabs';
import ServiceTable from '../components/ServiceTable';
import './PricesPage.css';

const PricesPage = () => {
  const [activeTab, setActiveTab] = useState('cost');

  useEffect(() => {
    document.title = 'Прайс-лист - Цены на уборку квартир в Москве | Уборка 24';
  }, []);

  const tabs = [
    { id: 'cost', label: 'Стоимость', icon: '💰' },
    { id: 'included', label: 'Что входит', icon: '🛋️' },
    { id: 'additional', label: 'Дополнительные услуги', icon: '➕' }
  ];

  const costData = {
    headers: ['Кв. м', 'Кол-во клинеров', 'Поддерживающая', 'Генеральная', 'После ремонта'],
    rows: [
      { cells: [{ content: '30 м²' }, { content: '1 чел.' }, { content: 'от 4000 руб.' }, { content: 'от 6500 руб.' }, { content: 'от 7500 руб.' }] },
      { cells: [{ content: '40 м²' }, { content: '1 чел.' }, { content: 'от 4000 руб.' }, { content: 'от 6500 руб.' }, { content: 'от 7500 руб.' }] },
      { cells: [{ content: '50 м²' }, { content: '1-2 чел.' }, { content: 'от 4000 руб.' }, { content: 'от 6500 руб.' }, { content: 'от 7500 руб.' }] },
      { cells: [{ content: '60 м²' }, { content: '1-2 чел.' }, { content: 'от 4000 руб.' }, { content: 'от 6500 руб.' }, { content: 'от 7500 руб.' }] },
      { cells: [{ content: '70 м²' }, { content: '2-3 чел.' }, { content: 'от 4000 руб.' }, { content: 'от 6500 руб.' }, { content: 'от 7500 руб.' }] },
      { cells: [{ content: '80 м²' }, { content: '2-3 чел.' }, { content: 'от 4000 руб.' }, { content: 'от 9600 руб.' }, { content: 'от 11200 руб.' }] },
      { cells: [{ content: '90 м²' }, { content: '3-5 чел.' }, { content: 'от 4000 руб.' }, { content: 'от 10800 руб.' }, { content: 'от 12600 руб.' }] },
      { cells: [{ content: '100+ м²' }, { content: '5-9 чел.' }, { content: 'от 6000 руб.' }, { content: 'от 12000 руб.' }, { content: 'от 14000 руб.' }] },
    ]
  };

  const includedData = {
    headers: ['Виды работ', 'Генеральная уборка'],
    rows: [
      { cells: [{ content: 'Время' }, { content: '4-8 ч.' }] },
      { cells: [{ content: 'Комната:' }, { content: '' }] },
      { cells: [{ content: '• Моем полы и очищаем плинтусы' }, { content: '', included: true }] },
      { cells: [{ content: '• Чистим дверные откосы, наличники и двери' }, { content: '', included: true }] },
      { cells: [{ content: '• Обеспыливаем стены и потолок' }, { content: '', included: true }] },
      { cells: [{ content: '• Обеспыливаем предметы интерьера' }, { content: '', included: true }] },
      { cells: [{ content: '• Обеспыливаем осветительные приборы' }, { content: '', included: true }] },
      { cells: [{ content: '• Протираем столы и стулья' }, { content: '', included: true }] },
      { cells: [{ content: '• Пылесосим ковры' }, { content: '', included: true }] },
      { cells: [{ content: '• Обеспыливаем фасады мебели' }, { content: '', included: true }] },
      { cells: [{ content: '• Моем окна, подоконники и откосы' }, { content: '', included: true }] },
      { cells: [{ content: '• Стираем и гладим шторы' }, { content: '', included: true }] },
      { cells: [{ content: '• Моем посуду и столовые приборы' }, { content: '', included: true }] }
    ]
  };

  const additionalData = {
    headers: ['Виды работ', 'Стоимость'],
    rows: [
      { cells: [{ content: 'Сменить постельное белье' }, { content: '400 руб./комплект' }] },
      { cells: [{ content: 'Глажка' }, { content: '1000 руб./час' }] },
      { cells: [{ content: 'Разбор, сортировка и раскладка вещей' }, { content: '1000 руб./час' }] },
      { cells: [{ content: 'Мытье дизайнерских или хрустальных люстр' }, { content: 'от 1500 руб.' }] },
      { cells: [{ content: 'Мытье жалюзи' }, { content: '300 руб./ед.' }] },
      { cells: [{ content: 'Снять, постирать и повесить шторы' }, { content: '450 руб. за комплект (тюль+2 шторы)' }] },
      { cells: [{ content: 'Полировка зеркал и стеклянных перегородок' }, { content: '200 руб./м²' }] },
      { cells: [{ content: 'Мытье радиаторов' }, { content: 'от 500 руб./ед.' }] },
      { cells: [{ content: 'Мытье стен от стойких загрязнений' }, { content: '1000 руб./час' }] },
      { cells: [{ content: 'Мытье кухонных шкафов внутри (освобожденные от посуды)' }, { content: '1000 руб.' }] },
      { cells: [{ content: 'Мытье кухонных шкафов внутри (с изъятием всех принадлежностей)' }, { content: '1500 руб.' }] },
    ]
  };

  return (
    <div className="prices-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'Прайс-лист', path: '/prices' }
      ]} />
      
      <section className="prices-page__hero">
        <div className="container">
          <h1 className="prices-page__title">Прайс-лист</h1>
          <p className="prices-page__subtitle">Цены на уборку квартир</p>
        </div>
      </section>

      <ServiceTabs 
        tabs={tabs} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === 'cost' && (
        <ServiceTable data={costData} />
      )}

      {activeTab === 'included' && (
        <ServiceTable data={includedData} />
      )}

      {activeTab === 'additional' && (
        <ServiceTable data={additionalData} />
      )}
    </div>
  );
};

export default PricesPage;

