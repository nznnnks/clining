import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Footer from '../components/Footer';
import './ContactsPage.css';

const ContactsPage = () => {
  useEffect(() => {
    document.title = 'Контакты - Свяжитесь с нами | Уборка 24';
  }, []);

  return (
    <>
      <div className="contacts-page">
        <Breadcrumbs items={[
          { label: 'Главная', path: '/' },
          { label: 'Контакты', path: '/contacts' }
        ]} />
        
        <section className="contacts-page__content">
          <div className="container">
            <h1 className="contacts-page__title">Контакты</h1>
            <div className="contacts-page__wrapper">
              <div className="contacts-page__left">
                <div className="contacts-page__company">
                  <div className="contacts-page__companyType">Клининговая компания</div>
                  <div className="contacts-page__companyName">Уборка 24</div>
                </div>

                <div className="contacts-page__info">
                  <div className="contacts-page__infoItem">
                    <span className="contacts-page__infoIcon">📍</span>
                    <div className="contacts-page__infoContent">
                      <div className="contacts-page__infoLabel">Адрес компании:</div>
                      <div className="contacts-page__infoValue">Москва, ул. Бутлерова 17, оф.5055</div>
                    </div>
                  </div>

                  <div className="contacts-page__infoItem">
                    <span className="contacts-page__infoIcon">📞</span>
                    <div className="contacts-page__infoContent">
                      <div className="contacts-page__infoLabel">Телефон отдела продаж:</div>
                      <div className="contacts-page__infoValue">
                        <a href="tel:+74954313021">+7 (495) 431-30-21</a>
                      </div>
                    </div>
                  </div>

                  <div className="contacts-page__infoItem">
                    <span className="contacts-page__infoIcon">✉️</span>
                    <div className="contacts-page__infoContent">
                      <div className="contacts-page__infoLabel">Email:</div>
                      <div className="contacts-page__infoValue">
                        <a href="mailto:info@uborka24.ru">info@uborka24.ru</a>
                      </div>
                    </div>
                  </div>

                  <div className="contacts-page__infoItem">
                    <div className="contacts-page__infoContent">
                      <div className="contacts-page__infoLabel">Режим работы компании</div>
                      <div className="contacts-page__infoValue">Ежедневно с 9:00-22:00</div>
                    </div>
                  </div>
                </div>

                <a 
                  href="https://yandex.ru/maps/?pt=37.5238,55.6419&z=15&l=map" 
                  target="_blank" 
                  rel="nofollow"
                  className="contacts-page__mapLink"
                >
                  <span className="contacts-page__mapLinkIcon">🗺️</span>
                  <span>Открыть в Яндекс Картах</span>
                </a>
              </div>

              <div className="contacts-page__right">
                <div className="contacts-page__map">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?pt=37.5238,55.6419&z=15&l=map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Карта расположения компании"
                    style={{ border: 'none', borderRadius: '12px' }}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contacts-page__details">
          <div className="container">
            <div className="contacts-page__detailsWrapper">
              <div className="contacts-page__detailsLeft">
                <h2 className="contacts-page__detailsTitle">Реквизиты компании</h2>
                <div className="contacts-page__detailsTable">
                  <div className="contacts-page__detailsRow">
                    <div className="contacts-page__detailsLabel">Наименование организации</div>
                    <div className="contacts-page__detailsValue">ИП Серков Андрей Валерьевич</div>
                  </div>
                  <div className="contacts-page__detailsRow">
                    <div className="contacts-page__detailsLabel">ИНН</div>
                    <div className="contacts-page__detailsValue">110901870457</div>
                  </div>
                  <div className="contacts-page__detailsRow">
                    <div className="contacts-page__detailsLabel">ОГРНИП</div>
                    <div className="contacts-page__detailsValue">318112100019828</div>
                  </div>
                  <div className="contacts-page__detailsRow">
                    <div className="contacts-page__detailsLabel">Банк</div>
                    <div className="contacts-page__detailsValue">№ 8617 ПАО Сбербанк</div>
                  </div>
                  <div className="contacts-page__detailsRow">
                    <div className="contacts-page__detailsLabel">БИК</div>
                    <div className="contacts-page__detailsValue">048702640</div>
                  </div>
                  <div className="contacts-page__detailsRow">
                    <div className="contacts-page__detailsLabel">Расчетный счет</div>
                    <div className="contacts-page__detailsValue">40802810328000008929</div>
                  </div>
                  <div className="contacts-page__detailsRow">
                    <div className="contacts-page__detailsLabel">Корреспондентский счет</div>
                    <div className="contacts-page__detailsValue">30101810400000000640</div>
                  </div>
                  <div className="contacts-page__detailsRow">
                    <div className="contacts-page__detailsLabel">ОКВЭД</div>
                    <div className="contacts-page__detailsValue">81.21, 81.22, 81.29, 81.29.9</div>
                  </div>
                </div>
                <div className="contacts-page__detailsNote">
                  <span className="contacts-page__detailsNoteIcon">⚠️</span>
                  <span className="contacts-page__detailsNoteText">
                    Корпоративным клиентам предоставляется все необходимые закрывающие документы после оказания услуги по ЭДО.
                  </span>
                  <span className="contacts-page__detailsNoteLogo">Контур Диадок</span>
                </div>
              </div>

              <div className="contacts-page__detailsRight">
                <h2 className="contacts-page__orderTitle">Заказать уборку</h2>
                <p className="contacts-page__orderSubtitle">
                  Напишите нам в мессенджеры или оставьте заявку в форме ниже
                </p>
                <div className="contacts-page__orderButtons">
                  <a
                    href="https://wa.me/79770893293"
                    className="contacts-page__orderBtn contacts-page__orderBtn_wa"
                    target="_blank"
                    rel="nofollow"
                  >
                    <span>WhatsApp</span>
                    <span className="contacts-page__orderBtnIcon">💬</span>
                  </a>
                  <a
                    href="https://t.me/uborka24_sales"
                    className="contacts-page__orderBtn contacts-page__orderBtn_tg"
                    target="_blank"
                    rel="nofollow"
                  >
                    <span>Telegram</span>
                    <span className="contacts-page__orderBtnIcon">✈️</span>
                  </a>
                </div>
                <form className="contacts-page__orderForm">
                  <input
                    type="tel"
                    className="contacts-page__orderInput"
                    placeholder="Ваш номер телефона*"
                    required
                  />
                  <button type="submit" className="contacts-page__orderSubmit btn">
                    Перезвоните мне
                  </button>
                  <div className="contacts-page__orderCheckboxes">
                    <label className="contacts-page__orderCheckbox">
                      <input type="checkbox" required />
                      <span className="contacts-page__orderCheckboxIcon">✓</span>
                      <span>Даю согласие на обработку персональных данных</span>
                    </label>
                    <label className="contacts-page__orderCheckbox">
                      <input type="checkbox" required />
                      <span className="contacts-page__orderCheckboxIcon">✓</span>
                      <span>Принимаю пользовательское соглашение и политику конфиденциальности</span>
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactsPage;

