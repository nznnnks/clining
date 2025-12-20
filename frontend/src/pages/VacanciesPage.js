import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ReviewsRatings from '../components/ReviewsRatings';
import './VacanciesPage.css';

const VacanciesPage = () => {
  useEffect(() => {
    document.title = 'Вакансии - Уборка 24';
  }, []);

  return (
    <div className="vacancies-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'Вакансии', path: '/vacancies' }
      ]} />
      
      <section className="vacancies-page__hero">
        <div className="container">
          <h1 className="vacancies-page__title">Вакансии</h1>
        </div>
      </section>

      <section className="vacancies-page__content">
        <div className="container">
          <h2 className="vacancies-page__subtitle">
            Присоединяйтесь к команде «Уборка24» — мы создаем чистоту вместе!
          </h2>
          <p className="vacancies-page__paragraph">
            «Уборка24» — это динамично развивающаяся клининговая компания, которая уже несколько лет успешно предоставляет услуги по уборке жилых и коммерческих помещений. Мы ценим каждого клиента и стремимся сделать его пространство идеально чистым и уютным. Наш главный актив — это профессиональная и дружелюбная команда, и мы всегда рады приветствовать новых талантливых сотрудников, которые помогут нам создавать чистоту для тысяч довольных клиентов.
          </p>

          <div className="vacancies-page__why">
            <h2 className="vacancies-page__sectionTitle">Почему стоит работать в «Уборка24»?</h2>
            
            <div className="vacancies-page__benefits">
              <div className="vacancies-page__benefit">
                <h3 className="vacancies-page__benefitTitle">Стабильность и надежность</h3>
                <p className="vacancies-page__benefitText">
                  работаем на рынке клининговых услуг уже несколько лет и заслужили доверие сотен клиентов. Наши отзывы — это лучшее подтверждение качества нашей работы. Вы можете быть уверены в стабильной загрузке и своевременной оплате труда.
                </p>
              </div>

              <div className="vacancies-page__benefit">
                <h3 className="vacancies-page__benefitTitle">Гибкий график</h3>
                <p className="vacancies-page__benefitText">
                  Мы понимаем, что у каждого свои обстоятельства, поэтому предлагаем гибкий график работы. Вы можете работать утром, днем или вечером — мы подберем удобное для вас время. Это отличная возможность для студентов, мам в декрете или тех, кто ищет подработку.
                </p>
              </div>

              <div className="vacancies-page__benefit">
                <h3 className="vacancies-page__benefitTitle">Обучение и поддержка</h3>
                <p className="vacancies-page__benefitText">
                  Даже если у вас нет опыта работы в клининге, мы предоставим все необходимое обучение. Наши опытные менеджеры и наставники всегда готовы помочь и поддержать вас на каждом этапе работы.
                </p>
              </div>

              <div className="vacancies-page__benefit">
                <h3 className="vacancies-page__benefitTitle">Комфортные условия труда</h3>
                <p className="vacancies-page__benefitText">
                  Мы предоставляем все необходимые материалы и оборудование, поэтому вам не нужно ничего покупать самостоятельно. Все инструменты и средства для уборки уже готовы к использованию, что делает работу эффективной и качественной.
                </p>
              </div>

              <div className="vacancies-page__benefit">
                <h3 className="vacancies-page__benefitTitle">Конкурентная заработная плата</h3>
                <p className="vacancies-page__benefitText">
                  Мы ценим труд наших сотрудников и предлагаем достойную оплату. Зарплата зависит от объема выполненной работы и может быть увеличена за счет премий и надбавок за отличные результаты.
                </p>
              </div>

              <div className="vacancies-page__benefit">
                <h3 className="vacancies-page__benefitTitle">Дружный коллектив</h3>
                <p className="vacancies-page__benefitText">
                  В «Уборка24» работают открытые, дружелюбные и ответственные люди, которые поддерживают друг друга и создают приятную рабочую атмосферу.
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

export default VacanciesPage;

