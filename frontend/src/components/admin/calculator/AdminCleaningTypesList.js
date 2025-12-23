import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminCleaningTypesList.css';

const AdminCleaningTypesList = () => {
  const [cleaningTypes, setCleaningTypes] = useState([
    {
      id: 'oven',
      название: 'Мытье духовки внутри',
      ценаЗаМ2: 1000,
      единицаИзмерения: 'шт.',
      порядок: 1,
      активен: true,
      датаОбновления: '2025-12-22 22:15:12.886412',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredTypes = cleaningTypes.filter(item =>
    item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.название?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот тип уборки?')) {
      setCleaningTypes(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleActive = (id) => {
    setCleaningTypes(prev => prev.map(item =>
      item.id === id ? { ...item, активен: !item.активен } : item
    ));
  };

  return (
    <div className="admin-cleaning-types-list">
      <div className="admin-cleaning-types-list__actions">
        <div className="admin-cleaning-types-list__left">
          <span className="admin-cleaning-types-list__count">List ({filteredTypes.length})</span>
          <Link to="/admin/calculator/cleaning-types/create" className="admin-cleaning-types-list__createBtn">
            Create
          </Link>
          <button className="admin-cleaning-types-list__filterBtn">
            Add Filter
            <span className="admin-cleaning-types-list__arrow">▼</span>
          </button>
        </div>
        <div className="admin-cleaning-types-list__search">
          <input
            type="text"
            className="admin-cleaning-types-list__searchInput"
            placeholder="Search: ID (код), Название"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-cleaning-types-list__tableWrapper">
        <table className="admin-cleaning-types-list__table">
          <thead>
            <tr>
              <th></th>
              <th>ID (код)</th>
              <th>Название</th>
              <th>Цена за м² (Р)</th>
              <th>Единица измерения</th>
              <th>Порядок</th>
              <th>Активен</th>
              <th>Дата обновления</th>
            </tr>
          </thead>
          <tbody>
            {filteredTypes.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="admin-cleaning-types-list__actionsCell">
                    <Link 
                      to={`/admin/calculator/cleaning-types/edit/${item.id}`}
                      className="admin-cleaning-types-list__editBtn"
                      title="Редактировать"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="admin-cleaning-types-list__deleteBtn"
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
                <td>{item.id}</td>
                <td>{item.название}</td>
                <td>{item.ценаЗаМ2}</td>
                <td>{item.единицаИзмерения}</td>
                <td>{item.порядок}</td>
                <td>
                  <button
                    className={`admin-cleaning-types-list__activeBtn ${item.активен ? 'admin-cleaning-types-list__activeBtn--active' : ''}`}
                    onClick={() => toggleActive(item.id)}
                    title={item.активен ? 'Деактивировать' : 'Активировать'}
                  >
                    {item.активен ? '✓' : '−'}
                  </button>
                </td>
                <td>{item.датаОбновления}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCleaningTypesList;

