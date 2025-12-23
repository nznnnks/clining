import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminPortfolioList.css';

const AdminPortfolioList = () => {
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      название: 'Уборка после ремонта',
      описание: 'Комплексная уборка квартиры после завершения ремонтных работ.',
      категория: 'квартира',
      площадь: '56 м²',
      время: '8 часов',
      цена: '9 570 руб.',
      датаСоздания: '2024-01-15',
    },
    {
      id: 2,
      название: 'Клининг двухкомнатной квартиры',
      описание: 'Генеральная уборка двухкомнатной квартиры с полной очисткой всех помещений.',
      категория: 'квартира',
      площадь: '69 м²',
      время: '6 часов',
      цена: '9 100 руб.',
      датаСоздания: '2024-01-10',
    },
    {
      id: 3,
      название: 'Мойка окон после ремонта',
      описание: 'Профессиональная мойка окон с удалением строительных загрязнений.',
      категория: 'окна',
      площадь: '23 створки',
      время: '3 часа',
      цена: '7 500 руб.',
      датаСоздания: '2024-01-12',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredItems = portfolioItems.filter(item =>
    item.название.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.описание?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.категория?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот элемент?')) {
      setPortfolioItems(prev => prev.filter(item => item.id !== id));
      setSelectedItems(prev => prev.filter(item => item !== id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    if (window.confirm(`Вы уверены, что хотите удалить ${selectedItems.length} элементов?`)) {
      setPortfolioItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };

  return (
    <div className="admin-portfolio-list">
      <div className="admin-portfolio-list__actions">
        <div className="admin-portfolio-list__left">
          <span className="admin-portfolio-list__count">List ({filteredItems.length})</span>
          <Link to="/admin/portfolio/create" className="admin-portfolio-list__createBtn">
            Create
          </Link>
          <button className="admin-portfolio-list__filterBtn">
            Add Filter
            <span className="admin-portfolio-list__arrow">▼</span>
          </button>
          {selectedItems.length > 0 && (
            <button 
              className="admin-portfolio-list__selectedBtn"
              onClick={handleDeleteSelected}
            >
              With selected ({selectedItems.length})
              <span className="admin-portfolio-list__arrow">▼</span>
            </button>
          )}
        </div>
        <div className="admin-portfolio-list__search">
          <input
            type="text"
            className="admin-portfolio-list__searchInput"
            placeholder="Search: Название, Описание, Категория"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-portfolio-list__tableWrapper">
        <table className="admin-portfolio-list__table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th></th>
              <th>ID</th>
              <th>Название</th>
              <th>Категория</th>
              <th>Площадь</th>
              <th>Время</th>
              <th>Цена</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </td>
                <td>
                  <div className="admin-portfolio-list__actionsCell">
                    <Link 
                      to={`/admin/portfolio/edit/${item.id}`}
                      className="admin-portfolio-list__editBtn"
                      title="Редактировать"
                    >
                      ✏️
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="admin-portfolio-list__deleteBtn"
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
                <td>{item.id}</td>
                <td>{item.название}</td>
                <td>{item.категория}</td>
                <td>{item.площадь}</td>
                <td>{item.время}</td>
                <td>{item.цена}</td>
                <td>{item.датаСоздания}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPortfolioList;

