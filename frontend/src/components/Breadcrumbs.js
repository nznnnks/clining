import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="breadcrumbs">
      <div className="container">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="breadcrumbs__separator">/</span>}
            {index === items.length - 1 ? (
              <span className="breadcrumbs__current">{item.label}</span>
            ) : (
              <Link to={item.path} className="breadcrumbs__link">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumbs;

