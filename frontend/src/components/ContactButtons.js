import React, { useState, useEffect } from 'react';
import './ContactButtons.css';

const ContactButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = '+74954313021';
  const whatsappNumber = '79770893293';
  const telegramUsername = 'uborka24_sales';

  return (
    <div className={`contact-buttons ${isVisible ? 'visible' : ''}`}>
      <a
        href={`tel:${phoneNumber}`}
        className="contact-buttons__phone"
        aria-label="Позвонить"
      >
        <span className="contact-buttons__phoneIcon">📞</span>
      </a>
      <div className="contact-buttons__manager">
        <div className="contact-buttons__managerAvatar">👩‍💼</div>
        <div className="contact-buttons__managerText">Напишите нам в мессенджеры</div>
        <div className="contact-buttons__managerButtons">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            className="contact-buttons__managerBtn contact-buttons__managerBtn--wa"
            target="_blank"
            rel="nofollow"
            aria-label="WhatsApp"
          >
            WhatsApp
          </a>
          <a
            href={`https://t.me/${telegramUsername}`}
            className="contact-buttons__managerBtn contact-buttons__managerBtn--tg"
            target="_blank"
            rel="nofollow"
            aria-label="Telegram"
          >
            Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactButtons;

