import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ReviewsRatings from '../components/ReviewsRatings';
import './GuaranteesPage.css';

const GuaranteesPage = () => {
  useEffect(() => {
    document.title = 'Гарантии - Клининговая компания Уборка 24 | Уборка 24';
  }, []);

  return (
    <div className="guarantees-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'Гарантии', path: '/guarantees' }
      ]} />
      
      <section className="guarantees-page__hero">
        <div className="container">
          <h1 className="guarantees-page__title">Гарантии</h1>
        </div>
      </section>

      <section className="guarantees-page__content">
        <div className="container">
          <h2 className="guarantees-page__subtitle">
            Гарантии от клининговой компании «Уборка24» — ваш комфорт и уверенность в результате
          </h2>
          <p className="guarantees-page__paragraph">
            В «Уборка24» мы понимаем, что доверие клиентов — это самое ценное, что может быть у компании. Именно поэтому мы предлагаем не только качественные услуги по уборке, но и надежные гарантии, которые делают сотрудничество с нами максимально комфортным и безопасным.
          </p>

          <div className="guarantees-page__guarantees">
            <h2 className="guarantees-page__sectionTitle">Что мы гарантируем?</h2>
            
            <div className="guarantees-page__guaranteeList">
              <div className="guarantees-page__guarantee">
                <div className="guarantees-page__guaranteeNumber">1.</div>
                <div className="guarantees-page__guaranteeContent">
                  <h3 className="guarantees-page__guaranteeTitle">Качество выполнения работ</h3>
                  <p className="guarantees-page__guaranteeText">
                    Мы используем профессиональное оборудование, безопасные моющие средства и проверенные методики уборки. Наши сотрудники проходят строгий отбор и обучение, чтобы выполнять работу на высшем уровне. Если по какой-то причине результат уборки вас не устроит, мы оперативно устраним все недочеты.
                  </p>
                </div>
              </div>

              <div className="guarantees-page__guarantee">
                <div className="guarantees-page__guaranteeNumber">2.</div>
                <div className="guarantees-page__guaranteeContent">
                  <h3 className="guarantees-page__guaranteeTitle">Пунктуальность</h3>
                  <p className="guarantees-page__guaranteeText">
                    Мы ценим ваше время и всегда приезжаем точно в назначенный час. Если клинер задерживается, мы обязательно предупредим вас заранее и предложим компенсацию за неудобства.
                  </p>
                </div>
              </div>

              <div className="guarantees-page__guarantee">
                <div className="guarantees-page__guaranteeNumber">3.</div>
                <div className="guarantees-page__guaranteeContent">
                  <h3 className="guarantees-page__guaranteeTitle">Безопасность</h3>
                  <p className="guarantees-page__guaranteeText">
                    Все наши сотрудники проходят проверку и обучение, чтобы гарантировать безопасность вашего имущества. Мы используем только сертифицированные моющие средства, которые не вредят поверхностям и безопасны для людей и животных.
                  </p>
                </div>
              </div>

              <div className="guarantees-page__guarantee">
                <div className="guarantees-page__guaranteeNumber">4.</div>
                <div className="guarantees-page__guaranteeContent">
                  <h3 className="guarantees-page__guaranteeTitle">Конфиденциальность</h3>
                  <p className="guarantees-page__guaranteeText">
                    Мы соблюдаем строгую политику конфиденциальности. Ваши личные данные и информация о заказе никогда не будут переданы третьим лицам.
                  </p>
                </div>
              </div>

              <div className="guarantees-page__guarantee">
                <div className="guarantees-page__guaranteeNumber">5.</div>
                <div className="guarantees-page__guaranteeContent">
                  <h3 className="guarantees-page__guaranteeTitle">Фиксированная цена</h3>
                  <p className="guarantees-page__guaranteeText">
                    Стоимость услуг рассчитывается заранее и фиксируется в договоре. Никаких скрытых платежей или дополнительных наценок — вы платите только за то, что было оговорено.
                  </p>
                </div>
              </div>

              <div className="guarantees-page__guarantee">
                <div className="guarantees-page__guaranteeNumber">6.</div>
                <div className="guarantees-page__guaranteeContent">
                  <h3 className="guarantees-page__guaranteeTitle">Гарантия на услуги</h3>
                  <p className="guarantees-page__guaranteeText">
                    Если после уборки вы обнаружите, что какие-то участки остались недостаточно чистыми, мы бесплатно вернемся и устраним недочеты в течение 24 часов.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="guarantees-page__trust">
            <h2 className="guarantees-page__sectionTitle">Почему вы можете нам доверять?</h2>
            
            <div className="guarantees-page__trustList">
              <div className="guarantees-page__trustItem">
                <h3 className="guarantees-page__trustTitle">Опыт и репутация</h3>
                <p className="guarantees-page__trustText">
                  работаем на рынке клининговых услуг уже несколько лет и заслужили доверие сотен клиентов. Наши отзывы — это лучшее подтверждение качества нашей работы.
                </p>
              </div>

              <div className="guarantees-page__trustItem">
                <h3 className="guarantees-page__trustTitle">Профессиональная команда</h3>
                <p className="guarantees-page__trustText">
                  В нашей компании работают только проверенные и обученные специалисты, которые знают, как добиться идеальной чистоты в любом помещении.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsRatings />
    </div>
  );
};

export default GuaranteesPage;

