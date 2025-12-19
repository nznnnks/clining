import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import About from '../components/About';
import './AboutPage.css';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'О нас - Клининговая компания Уборка 24 | Уборка 24';
  }, []);

  return (
    <div className="about-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'О нас', path: '/about' }
      ]} />
      
      <section className="about-page__hero">
        <div className="container">
          <h1 className="about-page__title">О нас</h1>
        </div>
      </section>

      <About />
    </div>
  );
};

export default AboutPage;

