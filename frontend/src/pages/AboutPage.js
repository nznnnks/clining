import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import ReviewsRatings from '../components/ReviewsRatings';
import './AboutPage.css';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'О компании - Клининговая компания Уборка 24 | Уборка 24';
  }, []);

  return (
    <div className="about-page">
      <Breadcrumbs items={[
        { label: 'Главная', path: '/' },
        { label: 'О компании', path: '/about' }
      ]} />
      
      <section className="about-page__hero">
        <div className="container">
          <h1 className="about-page__title">О компании</h1>
        </div>
      </section>

      <section className="about-page__content">
        <div className="container">
          <div className="about-page__intro">
            <div className="about-page__introText">
              <h2 className="about-page__subtitle">Уборка 24: Чистота, которая вдохновляет!</h2>
              <p className="about-page__paragraph">
                Ваше время бесценно, а комфорт и уют в доме или офисе — неотъемлемая часть качественной жизни. Почему бы не доверить заботу о чистоте профессионалам? Клининговая компания <strong>Уборка 24</strong> — это ваш надежный партнер в создании идеальной чистоты. Мы знаем, как важно, чтобы ваш дом сиял, а рабочее пространство радовало свежестью и порядком. Именно поэтому мы предлагаем услуги, которые превосходят ожидания!
              </p>
            </div>
            <div className="about-page__introImage">
              <div className="about-page__imagePlaceholder">👩‍💼</div>
            </div>
          </div>

          <div className="about-page__why">
            <h2 className="about-page__subtitle">Почему выбирают Уборка 24?</h2>
            
            <div className="about-page__reasons">
              <div className="about-page__reason">
                <div className="about-page__reasonNumber">1.</div>
                <div className="about-page__reasonContent">
                  <h3 className="about-page__reasonTitle">Профессионализм и опыт</h3>
                  <p className="about-page__reasonText">
                    Наша команда — это высококвалифицированные специалисты с многолетним опытом работы в сфере клининга. Мы используем современное оборудование и экологически безопасные моющие средства, которые гарантируют безупречный результат без вреда для здоровья вашей семьи, сотрудников или домашних питомцев.
                  </p>
                </div>
              </div>

              <div className="about-page__reason">
                <div className="about-page__reasonNumber">2.</div>
                <div className="about-page__reasonContent">
                  <h3 className="about-page__reasonTitle">Широкий спектр услуг</h3>
                  <p className="about-page__reasonText">
                    Мы предлагаем комплексные решения для любых задач:
                  </p>
                  <ul className="about-page__servicesList">
                    <li><strong>Генеральная уборка:</strong> идеальный порядок в каждом уголке вашего дома или офиса.</li>
                    <li><strong>Ежедневная или еженедельная уборка:</strong> поддерживаем чистоту на высшем уровне.</li>
                    <li><strong>Уборка после ремонта:</strong> избавим от строительной пыли, грязи и мусора.</li>
                    <li><strong>Химчистка ковров, мебели и текстиля:</strong> вернем свежесть и безупречный вид вашим вещам.</li>
                    <li><strong>Мойка окон и фасадов:</strong> кристальная чистота даже на высоте.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="about-page__how">
            <h2 className="about-page__subtitle">Как мы работаем?</h2>
            <div className="about-page__steps">
              <div className="about-page__step">
                <div className="about-page__stepNumber">1</div>
                <h3 className="about-page__stepTitle">Заявка</h3>
                <p className="about-page__stepText">
                  Оставьте заявку на сайте или по телефону. Наш менеджер уточнит детали и подберет оптимальное решение для вашего объекта.
                </p>
              </div>
              <div className="about-page__step">
                <div className="about-page__stepNumber">2</div>
                <h3 className="about-page__stepTitle">Выезд специалиста</h3>
                <p className="about-page__stepText">
                  При необходимости мы организуем бесплатный выезд специалиста для оценки объема работ и расчета стоимости.
                </p>
              </div>
              <div className="about-page__step">
                <div className="about-page__stepNumber">3</div>
                <h3 className="about-page__stepTitle">Уборка</h3>
                <p className="about-page__stepText">
                  Наши профессионалы оперативно и качественно выполнят все задачи, используя современное оборудование и безопасные средства.
                </p>
              </div>
              <div className="about-page__step">
                <div className="about-page__stepNumber">4</div>
                <h3 className="about-page__stepTitle">Результат</h3>
                <p className="about-page__stepText">
                  Вы получаете идеальную чистоту и больше свободного времени для себя!
                </p>
              </div>
            </div>
          </div>

          <div className="about-page__mission">
            <h2 className="about-page__subtitle">Уборка 24 — это не просто клининговая компания, это ваш помощник в создании комфорта и уюта!</h2>
            <p className="about-page__paragraph">
              Мы работаем для тех, кто ценит свое время, заботится о здоровье близких и стремится к безупречной чистоте. Доверьтесь профессионалам, и вы убедитесь, что уборка может быть легкой, быстрой и приятной!
            </p>
            <p className="about-page__paragraph">
              Свяжитесь с нами уже сегодня, и мы сделаем ваш дом или офис по-настоящему чистым!
            </p>
            <p className="about-page__slogan">Уборка 24 — чистота, которой можно доверять!</p>
          </div>

          <div className="about-page__stats">
            <div className="about-page__stat">
              <div className="about-page__statValue">9</div>
              <div className="about-page__statLabel">бригад</div>
              <div className="about-page__statDescription">клинеров с профессиональным оборудованием</div>
            </div>
            <div className="about-page__stat">
              <div className="about-page__statValue">5</div>
              <div className="about-page__statLabel">лет</div>
              <div className="about-page__statDescription">занимаемся клинингом квартир, домов, офисов</div>
            </div>
            <div className="about-page__stat">
              <div className="about-page__statValue">2490</div>
              <div className="about-page__statLabel"></div>
              <div className="about-page__statDescription">заказов выполнили за 2024 год</div>
            </div>
            <div className="about-page__stat">
              <div className="about-page__statValue">1190+</div>
              <div className="about-page__statLabel"></div>
              <div className="about-page__statDescription">реальных отзывов от клиентов в 2ГИС, Яндекс и Google</div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsRatings />
    </div>
  );
};

export default AboutPage;
