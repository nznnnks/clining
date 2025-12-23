import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminAdditionalServicesList.css';

const AdminAdditionalServicesList = () => {
  const [services, setServices] = useState([
    {
      id: 'oven',
      название: 'Мытье духовки внутри',
      цена: 1000,
      единицаИзмерения: 'шт.',
      порядок: 1,
      активна: true,
      датаОбновления: '2025-12-22 22:15:12.886412',
    },
    {
      id: 'microwave',
      название: 'Мытье СВЧ',
      цена: 500,
      единицаИзмерения: 'шт.',
      порядок: 2,
      активна: true,
      датаОбновления: '2025-12-22 15:23:30.530575',
    },
    {
      id: 'fridge',
      название: 'Мытье холодильника',
      цена: 900,
      единицаИзмерения: 'шт.',
      порядок: 3,
      активна: true,
      датаОбновления: '2025-12-22 15:27:36.754904',
    },
    {
      id: 'windows',
      название: 'Мойка окон',
      цена: 400,
      единицаИзмерения: 'створка',
      порядок: 4,
      активна: true,
      датаОбновления: '2025-12-22 15:16:11.526348',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter(item =>
    item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.название?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту услугу?')) {
      setServices(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleActive = (id) => {
    setServices(prev => prev.map(item =>
      item.id === id ? { ...item, активна: !item.активна } : item
    ));
  };

  return (
    <div className="admin-additional-services-list">
      <div className="admin-additional-services-list__actions">
        <div className="admin-additional-services-list__left">
          <span className="admin-additional-services-list__count">List ({filteredServices.length})</span>
          <Link to="/admin/calculator/additional-services/create" className="admin-additional-services-list__createBtn">
            Create
          </Link>
          <button className="admin-additional-services-list__filterBtn">
            Add Filter
            <span className="admin-additional-services-list__arrow">▼</span>
          </button>
        </div>
        <div className="admin-additional-services-list__search">
          <input
            type="text"
            className="admin-additional-services-list__searchInput"
            placeholder="Search: ID (код), Название"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-additional-services-list__tableWrapper">
        <table className="admin-additional-services-list__table">
          <thead>
            <tr>
              <th></th>
              <th>ID (код)</th>
              <th>Название</th>
              <th>Цена (Р)</th>
              <th>Единица измерения</th>
              <th>Порядок</th>
              <th>Активна</th>
              <th>Дата обновления</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="admin-additional-services-list__actionsCell">
                    <Link 
                      to={`/admin/calculator/additional-services/edit/${item.id}`}
                      className="admin-additional-services-list__editBtn"
                      title="Редактировать"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="admin-additional-services-list__deleteBtn"
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
                <td>{item.id}</td>
                <td>{item.название}</td>
                <td>{item.цена}</td>
                <td>{item.единицаИзмерения}</td>
                <td>{item.порядок}</td>
                <td>
                  <button
                    className={`admin-additional-services-list__activeBtn ${item.активна ? 'admin-additional-services-list__activeBtn--active' : ''}`}
                    onClick={() => toggleActive(item.id)}
                    title={item.активна ? 'Деактивировать' : 'Активировать'}
                  >
                    {item.активна ? '✓' : '−'}
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

export default AdminAdditionalServicesList;

