import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: 2,
      имя: 'денчик',
      телефон: '+7391293193',
      площадь: '50',
      типУборки: 'Поддерживающая',
      итоговаяЦена: '6000',
      статус: 'new',
      комментарий: 'хочу уборку уборку мене',
      датаСоздания: '2025-12-22 22:36:19.911478',
    },
    {
      id: 1,
      имя: 'fdgfd',
      телефон: '+4324234',
      площадь: '100',
      типУборки: 'Поддерживающая',
      итоговаяЦена: '9900',
      статус: 'new',
      комментарий: 'dskfslkj',
      датаСоздания: '2025-12-22 22:23:12.629118',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredOrders = orders.filter(order =>
    order.имя?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.телефон?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.комментарий?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredOrders.map(order => order.id));
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
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      setOrders(prev => prev.filter(order => order.id !== id));
      setSelectedItems(prev => prev.filter(item => item !== id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    if (window.confirm(`Вы уверены, что хотите удалить ${selectedItems.length} заказов?`)) {
      setOrders(prev => prev.filter(order => !selectedItems.includes(order.id)));
      setSelectedItems([]);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === id ? { ...order, статус: newStatus } : order
    ));
  };

  return (
    <div className="admin-orders">
      <div className="admin-orders__actions">
        <div className="admin-orders__left">
          <span className="admin-orders__count">List ({filteredOrders.length})</span>
          <button className="admin-orders__filterBtn">
            Add Filter
            <span className="admin-orders__arrow">▼</span>
          </button>
          {selectedItems.length > 0 && (
            <button 
              className="admin-orders__selectedBtn"
              onClick={handleDeleteSelected}
            >
              With selected ({selectedItems.length})
              <span className="admin-orders__arrow">▼</span>
            </button>
          )}
        </div>
        <div className="admin-orders__search">
          <input
            type="text"
            className="admin-orders__searchInput"
            placeholder="Search: Имя, Телефон, Комментарий"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-orders__tableWrapper">
        <table className="admin-orders__table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedItems.length === filteredOrders.length && filteredOrders.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th></th>
              <th>ID</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Площадь (м²)</th>
              <th>Тип уборки</th>
              <th>Итоговая цена (Р)</th>
              <th>Статус</th>
              <th>Комментарий</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(order.id)}
                    onChange={() => handleSelectItem(order.id)}
                  />
                </td>
                <td>
                  <div className="admin-orders__actionsCell">
                    <button
                      onClick={() => {
                        // Редактирование заказа
                        console.log('Edit order:', order.id);
                      }}
                      className="admin-orders__editBtn"
                      title="Редактировать"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="admin-orders__deleteBtn"
                      title="Удалить"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
                <td>{order.id}</td>
                <td>{order.имя}</td>
                <td>{order.телефон}</td>
                <td>{order.площадь}</td>
                <td>{order.типУборки}</td>
                <td>{order.итоговаяЦена}</td>
                <td>
                  <select
                    className="admin-orders__statusSelect"
                    value={order.статус}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="new">new</option>
                    <option value="in_progress">in_progress</option>
                    <option value="completed">completed</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </td>
                <td className="admin-orders__comment">{order.комментарий}</td>
                <td>{order.датаСоздания}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;

