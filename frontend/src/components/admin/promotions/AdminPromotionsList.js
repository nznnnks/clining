import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminPromotionsList.css';

const AdminPromotionsList = () => {
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      название: 'новый год',
      действительноДо: '2026',
      активна: false,
      датаСоздания: '2025-12-20 20:28:53.088988',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredPromotions = promotions.filter(item =>
    item.название?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.описание?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту акцию?')) {
      setPromotions(prev => prev.filter(item => item.id !== id));
    }
  };

  const toggleActive = (id) => {
    setPromotions(prev => prev.map(item =>
      item.id === id ? { ...item, активна: !item.активна } : item
    ));
  };

  return (
    <div className="admin-promotions-list">
      <div className="admin-promotions-list__actions">
        <div className="admin-promotions-list__left">
          <span className="admin-promotions-list__count">List ({filteredPromotions.length})</span>
          <Link to="/admin/promotions/create" className="admin-promotions-list__createBtn">
            Create
          </Link>
          <button className="admin-promotions-list__filterBtn">
            Add Filter
            <span className="admin-promotions-list__arrow">▼</span>
          </button>
        </div>
        <div className="admin-promotions-list__search">
          <input
            type="text"
            className="admin-promotions-list__searchInput"
            placeholder="Search: Название, Описание"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-promotions-list__tableWrapper">
        <table className="admin-promotions-list__table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Название</th>
              <th>Действительно до</th>
              <th>Активна</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="admin-promotions-list__actionsCell">
                    <Link 
                      to={`/admin/promotions/edit/${item.id}`}
                      className="admin-promotions-list__editBtn"
                      title="Редактировать"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="admin-promotions-list__deleteBtn"
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
                <td>{item.id}</td>
                <td>{item.название}</td>
                <td>{item.действительноДо}</td>
                <td>
                  <button
                    className={`admin-promotions-list__activeBtn ${item.активна ? 'admin-promotions-list__activeBtn--active' : ''}`}
                    onClick={() => toggleActive(item.id)}
                    title={item.активна ? 'Деактивировать' : 'Активировать'}
                  >
                    {item.активна ? '✓' : '−'}
                  </button>
                </td>
                <td>{item.датаСоздания}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPromotionsList;

