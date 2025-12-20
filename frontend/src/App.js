import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactButtons from './components/ContactButtons';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import WindowsPage from './pages/WindowsPage';
import PricesPage from './pages/PricesPage';
import PortfolioPage from './pages/PortfolioPage';
import PromotionsPage from './pages/PromotionsPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactsPage from './pages/ContactsPage';
import ReviewsPage from './pages/ReviewsPage';
import GuaranteesPage from './pages/GuaranteesPage';
import SitemapPage from './pages/SitemapPage';
import CalculatorPage from './pages/CalculatorPage';
import VacanciesPage from './pages/VacanciesPage';
import MoscowRegionPage from './pages/MoscowRegionPage';
import PaymentTermsPage from './pages/PaymentTermsPage';
import './App.css';

function AppContent() {
  const location = useLocation();
  const showFooter = location.pathname !== '/contacts';

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:category/:service" element={<ServicePage />} />
          <Route path="/services/:category" element={<ServicePage />} />
          <Route path="/windows" element={<WindowsPage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/guarantees" element={<GuaranteesPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/moscow-region" element={<MoscowRegionPage />} />
          <Route path="/payment-terms" element={<PaymentTermsPage />} />
        </Routes>
      </main>
      <ContactButtons />
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

