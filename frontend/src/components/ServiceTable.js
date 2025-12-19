import React from 'react';
import './ServiceTable.css';

const ServiceTable = ({ data }) => {
  if (!data || !data.headers || !data.rows) {
    return null;
  }

  return (
    <div className="service-table">
      <div className="container">
        <div className="service-table__wrapper">
          <table className="service-table__table">
            <thead>
              <tr>
                {data.headers.map((header, index) => (
                  <th key={index} className="service-table__header">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="service-table__row">
                  {row.cells.map((cell, cellIndex) => (
                    <td key={cellIndex} className="service-table__cell">
                      {cell.content}
                      {cell.included && (
                        <span className="service-table__check">✓</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceTable;

