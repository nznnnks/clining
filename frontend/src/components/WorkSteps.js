import React from 'react';
import './WorkSteps.css';

const WorkSteps = () => {
  const steps = [
    {
      number: '01',
      title: 'Заявка',
      description: 'Оставьте заявку на сайте, звоните или пишите нам в мессенджеры.',
      icon: '📞',
      button: 'Оставить заявку',
    },
    {
      number: '02',
      title: 'Консультация',
      description: 'Консультируем Вас и согласовываем стоимость.',
      icon: '💬',
    },
    {
      number: '03',
      title: 'Приезжаем на заказ',
      description: 'Приезжаем в удобное для вас время и приступаем к работе.',
      icon: '🚗',
    },
    {
      number: '04',
      title: 'Оплата',
      description: 'После проверки нашей работы, оплачиваете удобным способом.',
      icon: '💳',
    },
  ];

  return (
    <section id="steps" className="work-steps">
      <div className="container">
        <div className="section-heading">
          <h2>4 простых шага для заказа уборки</h2>
        </div>
        <div className="work-steps__grid">
          {steps.map((step) => (
            <div key={step.number} className="work-steps__card">
              <div className="work-steps__number">{step.number}</div>
              <div className="work-steps__icon">{step.icon}</div>
              <h3 className="work-steps__title">{step.title}</h3>
              <p className="work-steps__description">{step.description}</p>
              {step.button && (
                <a href="#calculator" className="work-steps__button btn">
                  {step.button}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSteps;

