import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI, additionalServicesAPI } from '../../../utils/api';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [additionalServicesMap, setAdditionalServicesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    loadAdditionalServices();
    loadOrders();
  }, []);

  const loadAdditionalServices = async () => {
    try {
      const response = await additionalServicesAPI.getAll();
      if (response.success && response.data) {
        // Создаем map для быстрого доступа к названиям услуг по ID
        const servicesMap = {};
        response.data.forEach(service => {
          servicesMap[service.id] = service.label;
        });
        setAdditionalServicesMap(servicesMap);
      }
    } catch (err) {
      console.error('Ошибка загрузки дополнительных услуг:', err);
    }
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await ordersAPI.getAll();
      if (response.success) {
        setOrders(response.data || []);
      } else {
        setError(response.error || 'Ошибка при загрузке заказов');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке заказов');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    // Фильтр по тексту
    const matchesSearch = order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.comment?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Фильтр по дате создания
    if (dateFrom || dateTo) {
      if (!order.created_at) return false;
      
      const orderDate = new Date(order.created_at);
      orderDate.setHours(0, 0, 0, 0);
      
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        if (orderDate < fromDate) return false;
      }
      
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (orderDate > toDate) return false;
      }
    }
    
    return true;
  });

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

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      return;
    }

    try {
      const response = await ordersAPI.delete(id);
      if (response.success) {
        setOrders(prev => prev.filter(order => order.id !== id));
        setSelectedItems(prev => prev.filter(item => item !== id));
      } else {
        alert(response.error || 'Ошибка при удалении заказа');
      }
    } catch (err) {
      alert(err.message || 'Ошибка при удалении заказа');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;
    if (!window.confirm(`Вы уверены, что хотите удалить ${selectedItems.length} заказов?`)) {
      return;
    }

    try {
      // Удаляем заказы по одному
      const deletePromises = selectedItems.map(id => ordersAPI.delete(id));
      await Promise.all(deletePromises);
      
      setOrders(prev => prev.filter(order => !selectedItems.includes(order.id)));
      setSelectedItems([]);
    } catch (err) {
      alert(err.message || 'Ошибка при удалении заказов');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await ordersAPI.update(id, { status: newStatus });
      if (response.success) {
        setOrders(prev => prev.map(order =>
          order.id === id ? { ...order, status: newStatus } : order
        ));
      } else {
        alert(response.error || 'Ошибка при обновлении статуса');
        // Перезагружаем заказы в случае ошибки
        loadOrders();
      }
    } catch (err) {
      alert(err.message || 'Ошибка при обновлении статуса');
      loadOrders();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('ru-RU');
    } catch {
      return dateString;
    }
  };

  const formatAdditionalServices = (additionalServices) => {
    if (!additionalServices || typeof additionalServices !== 'object' || Object.keys(additionalServices).length === 0) {
      return '-';
    }
    
    // Форматируем как список: название услуги (x)
    const servicesList = Object.entries(additionalServices)
      .filter(([_, count]) => count > 0)
      .map(([serviceId, count]) => {
        const serviceName = additionalServicesMap[serviceId] || serviceId;
        return `${serviceName} (${count})`;
      })
      .join(', ');
    
    return servicesList || '-';
  };

  const handleResetDateFilter = () => {
    setDateFrom('');
    setDateTo('');
    setShowDateFilter(false);
  };

  const hasActiveDateFilter = dateFrom || dateTo;

  if (loading) {
    return (
      <div className="admin-orders">
        <div className="admin-orders__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-orders">
        <div className="admin-orders__error">
          {error}
          <button onClick={loadOrders} style={{ marginTop: '10px' }}>Повторить</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-orders">
      <div className="admin-orders__actions">
        <div className="admin-orders__left">
          <span className="admin-orders__count">List ({filteredOrders.length})</span>
          <div style={{ position: 'relative' }}>
            <button 
              className="admin-orders__filterBtn"
              onClick={() => setShowDateFilter(!showDateFilter)}
              style={{ backgroundColor: hasActiveDateFilter ? '#667eea' : undefined, color: hasActiveDateFilter ? 'white' : undefined }}
            >
              Filter by Date {hasActiveDateFilter && '✓'}
              <span className="admin-orders__arrow">▼</span>
            </button>
            {showDateFilter && (
              <div className="admin-orders__dateFilter">
                <div className="admin-orders__dateFilterRow">
                  <label>
                    От:
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="admin-orders__dateInput"
                    />
                  </label>
                  <label>
                    До:
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="admin-orders__dateInput"
                    />
                  </label>
                  <button
                    onClick={handleResetDateFilter}
                    className="admin-orders__resetFilterBtn"
                  >
                    Сбросить
                  </button>
                </div>
              </div>
            )}
          </div>
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
              <th>Доп. услуги</th>
              <th>Итоговая цена (₽)</th>
              <th>Статус</th>
              <th>Комментарий</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="12" style={{ textAlign: 'center', padding: '20px' }}>
                  Заказы не найдены
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
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
                          // Редактирование заказа можно добавить позже
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
                  <td>{order.name || '-'}</td>
                  <td>{order.phone}</td>
                  <td>{order.area}</td>
                  <td>{order.cleaning_type_label || order.cleaning_type_id}</td>
                  <td className="admin-orders__additionalServices" title={formatAdditionalServices(order.additional_services)}>
                    {formatAdditionalServices(order.additional_services)}
                  </td>
                  <td>{order.final_price}</td>
                  <td>
                    <select
                      className="admin-orders__statusSelect"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="new">new</option>
                      <option value="in_progress">in_progress</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td className="admin-orders__comment">{order.comment || '-'}</td>
                  <td>{formatDate(order.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
