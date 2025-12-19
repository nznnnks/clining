import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-heading">
          <h2>4 причины выбрать нашу клининговую компанию</h2>
        </div>
        <div className="about__content">
          <div className="about__text">
            <p>
              Клининговая компания "Уборка 24" - лидер на рынке клининговых услуг в Москве. 
              Мы предлагаем полный спектр услуг по уборке квартир, домов, офисов и коммерческих помещений.
            </p>
            <p>
              В штате клининговой компании более 75 клинеров. Мы работаем по всей Москве, 
              Московской области и выезжаем до 50 км от МКАД.
            </p>
            <div className="about__reasons">
              <div className="about__reason">
                <div className="about__reasonNumber">01</div>
                <div className="about__reasonContent">
                  <h3>Оперативный выезд без опозданий</h3>
                  <p>
                    Ваш персональный менеджер всегда будет на связи 24/7. 
                    Выполним клининг без доработок и в срок.
                  </p>
                </div>
              </div>
              <div className="about__reason">
                <div className="about__reasonNumber">02</div>
                <div className="about__reasonContent">
                  <h3>Профессиональная техника и средства</h3>
                  <p>
                    Используем технику Karcher и чистящие средства известных брендов 
                    химии Pro-Brite, Уникум, Grass, Effect.
                  </p>
                </div>
              </div>
              <div className="about__reason">
                <div className="about__reasonNumber">03</div>
                <div className="about__reasonContent">
                  <h3>Гарантируем результат по договору</h3>
                  <p>
                    Подарим сертификат на последующие услуги клининга в Москве 
                    и предоставим дополнительную скидку 10%.
                  </p>
                </div>
              </div>
              <div className="about__reason">
                <div className="about__reasonNumber">04</div>
                <div className="about__reasonContent">
                  <h3>Гарантия сохранности имущества</h3>
                  <p>
                    Даем гарантию сохранности вашего имущества. Все сотрудники 
                    проходят проверку служб и специализированное обучение.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

