import React, { useEffect } from 'react';
import Hero from '../components/Hero';
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
import Calculator from '../components/Calculator';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Уборка 24 - Клининговая компания в Москве';
  }, []);

  return (
    <>
      <Hero />
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
      <Calculator />
      <FAQ />
    </>
  );
};

export default HomePage;

