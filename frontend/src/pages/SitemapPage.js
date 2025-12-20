import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import './SitemapPage.css';

const SitemapPage = () => {
  useEffect(() => {
    document.title = 'Карта сайта - Уборка 24';
  }, []);

  return (
    <div className="sitemap-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'Карта сайта', path: '/sitemap' }
      ]} />
      
      <section className="sitemap-page__hero">
        <div className="container">
          <h1 className="sitemap-page__title">Карта сайта</h1>
        </div>
      </section>

      <section className="sitemap-page__content">
        <div className="container">
          <ul className="sitemap-page__list">
            <li>
              <Link to="/services/apartment/general">Услуги физлицам</Link>
              <ul>
                <li>
                  <Link to="/services/apartment/general">Уборка квартир</Link>
                  <ul>
                    <li><Link to="/services/apartment/general">Генеральная</Link></li>
                    <li><Link to="/services/apartment/complex">Комплексная</Link></li>
                    <li><Link to="/services/apartment/after-renovation">После ремонта</Link></li>
                    <li><Link to="/services/apartment/after-fire">После пожара</Link></li>
                    <li><Link to="/services/apartment/maintenance">Поддерживающая</Link></li>
                    <li><Link to="/services/apartment/after-flood">После потопа</Link></li>
                    <li><Link to="/services/apartment/after-death">После смерти</Link></li>
                    <li><Link to="/services/apartment/daily">Ежедневная</Link></li>
                    <li><Link to="/services/apartment/urgent">Срочная</Link></li>
                    <li><Link to="/services/apartment/vip">VIP клининг</Link></li>
                    <li><Link to="/services/apartment/wet">Влажная</Link></li>
                    <li><Link to="/services/apartment/twice-week">Два раза в неделю</Link></li>
                    <li><Link to="/services/apartment/three-times-week">Три раза в неделю</Link></li>
                    <li><Link to="/services/apartment/neglected">Запущенной</Link></li>
                    <li><Link to="/services/apartment/after-moving">После переезда</Link></li>
                    <li><Link to="/services/apartment/after-disinfection">После дезинфекции</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/services/house/cottage">Уборка домов</Link>
                  <ul>
                    <li><Link to="/services/house/after-renovation">После ремонта</Link></li>
                    <li><Link to="/services/house/maintenance">Поддерживающая</Link></li>
                    <li><Link to="/services/house/cottage">Коттеджей</Link></li>
                    <li><Link to="/services/house/two-story">Двухэтажного дома</Link></li>
                    <li><Link to="/services/house/townhouse">Таунхауса</Link></li>
                    <li><Link to="/services/house/dacha">Дачи</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/services/additional/kitchen">Дополнительные услуги</Link>
                </li>
                <li>
                  <Link to="/services/dry-cleaning/sofa">Химчистка</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/services/office/general">Услуги юрлицам</Link>
              <ul>
                <li>
                  <Link to="/services/office/general">Уборка офисов</Link>
                </li>
                <li>
                  <Link to="/services/business/restaurant">Клининг для бизнеса</Link>
                </li>
              </ul>
            </li>
            <li><Link to="/windows">Мытье окон</Link></li>
            <li><Link to="/prices">Цены</Link></li>
            <li><Link to="/portfolio">Наши работы</Link></li>
            <li><Link to="/promotions">Акции</Link></li>
            <li>
              <Link to="/about">Информация</Link>
              <ul>
                <li><Link to="/reviews">Отзывы</Link></li>
                <li><Link to="/about">О компании</Link></li>
                <li><Link to="/faq">Вопросы и ответы</Link></li>
                <li><Link to="/guarantees">Гарантии</Link></li>
                <li><Link to="/sitemap">Карта сайта</Link></li>
                <li><Link to="/calculator">Калькулятор</Link></li>
                <li><Link to="/vacancies">Вакансии</Link></li>
                <li><Link to="/moscow-region">Московская область</Link></li>
                <li><Link to="/payment-terms">Условия оплаты</Link></li>
              </ul>
            </li>
            <li><Link to="/contacts">Контакты</Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default SitemapPage;

