import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQ from '../components/FAQ';
import './FAQPage.css';

const FAQPage = () => {
  useEffect(() => {
    document.title = 'FAQ - Часто задаваемые вопросы | Уборка 24';
  }, []);

  return (
    <div className="faq-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'FAQ', path: '/faq' }
      ]} />
      
      <section className="faq-page__hero">
        <div className="container">
          <h1 className="faq-page__title">Вопросы и ответы</h1>
        </div>
      </section>

      <FAQ />
    </div>
  );
};

export default FAQPage;

