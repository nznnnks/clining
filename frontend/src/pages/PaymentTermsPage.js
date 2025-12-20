import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ReviewsRatings from '../components/ReviewsRatings';
import './PaymentTermsPage.css';

const PaymentTermsPage = () => {
  useEffect(() => {
    document.title = 'Условия оплаты - Уборка 24';
  }, []);

  return (
    <div className="payment-terms-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'Условия оплаты', path: '/payment-terms' }
      ]} />
      
      <section className="payment-terms-page__hero">
        <div className="container">
          <h1 className="payment-terms-page__title">Правила оплаты</h1>
        </div>
      </section>

      <section className="payment-terms-page__content">
        <div className="container">
          <p className="payment-terms-page__paragraph">
            К оплате принимаются платежные карты: <strong>VISA Inc</strong>, <strong>MasterCard WorldWide</strong>, <strong>МИР</strong>.
          </p>
          <p className="payment-terms-page__paragraph">
            Для оплаты товара банковской картой при оформлении заказа в интернет-магазине выберите способ оплаты: банковской картой.
          </p>
          <p className="payment-terms-page__paragraph">
            При оплате заказа банковской картой, обработка платежа происходит на авторизационной странице банка, где Вам необходимо ввести данные Вашей банковской карты:
          </p>

          <ol className="payment-terms-page__list">
            <li>тип карты</li>
            <li>номер карты</li>
            <li>срок действия карты (указан на лицевой стороне карты)</li>
            <li>Имя держателя карты (латинскими буквами, точно также как указано на карте)</li>
            <li>CVC2/CVV2 код</li>
          </ol>

          <div className="payment-terms-page__cardDiagram">
            <div className="payment-terms-page__cardFront">
              <div className="payment-terms-page__cardNumber">1234 5678 1234 5678</div>
              <div className="payment-terms-page__cardValid">VALID THRU MONTH/YEAR 10/18</div>
              <div className="payment-terms-page__cardName">CARDHOLDER NAME</div>
            </div>
            <div className="payment-terms-page__cardBack">
              <div className="payment-terms-page__cardCvv">123</div>
            </div>
          </div>

          <div className="payment-terms-page__labels">
            <div className="payment-terms-page__label">Номер карты</div>
            <div className="payment-terms-page__label">Срок действия</div>
            <div className="payment-terms-page__label">Владелец карты</div>
            <div className="payment-terms-page__label">Код CVV2</div>
          </div>

          <p className="payment-terms-page__paragraph">
            Если Ваша карта подключена к услуге 3D-Secure, Вы будете автоматически переадресованы на страницу банка, выпустившего карту, для прохождения процедуры аутентификации. Информацию о правилах и методах дополнительной идентификации уточняйте в Банке, выдавшем Вам банковскую карту.
          </p>
          <p className="payment-terms-page__paragraph">
            Безопасность обработки интернет-платежей через платежный шлюз банка гарантирована международным сертификатом безопасности PCI DSS. Передача информации происходит с применением технологии шифрования TLS. Эта информация недоступна посторонним лицам.
          </p>
        </div>
      </section>

      <ReviewsRatings />
    </div>
  );
};

export default PaymentTermsPage;

