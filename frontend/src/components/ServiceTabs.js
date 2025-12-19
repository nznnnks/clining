import React, { useState } from 'react';
import './ServiceTabs.css';

const ServiceTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="service-tabs">
      <div className="container">
        <div className="service-tabs__wrapper">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`service-tabs__tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.icon && <span className="service-tabs__icon">{tab.icon}</span>}
              <span className="service-tabs__label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceTabs;

