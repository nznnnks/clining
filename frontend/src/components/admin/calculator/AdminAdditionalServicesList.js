import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { additionalServicesAPI } from '../../../utils/api';
import './AdminAdditionalServicesList.css';

const AdminAdditionalServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await additionalServicesAPI.getAll();
      if (response.success) {
        setServices(response.data || []);
      } else {
        setError(response.error || 'Ошибка при загрузке дополнительных услуг');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке дополнительных услуг');
      if (err.message.includes('401') || err.message.includes('авторизация')) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(item => {
    // Фильтр по тексту
    const matchesSearch = item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.label?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Фильтр по дате создания (или обновления, если создания нет)
    if (dateFrom || dateTo) {
      const itemDateStr = item.created_at || item.updated_at;
      if (!itemDateStr) return false;
      
      const itemDate = new Date(itemDateStr);
      itemDate.setHours(0, 0, 0, 0);
      
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        if (itemDate < fromDate) return false;
      }
      
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (itemDate > toDate) return false;
      }
    }
    
    return true;
  });

  const handleResetDateFilter = () => {
    setDateFrom('');
    setDateTo('');
    setShowDateFilter(false);
  };

  const hasActiveDateFilter = dateFrom || dateTo;

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту услугу?')) {
      return;
    }

    try {
      const response = await additionalServicesAPI.delete(id);
      if (response.success) {
        setServices(prev => prev.filter(item => item.id !== id));
      } else {
        alert(response.error || 'Ошибка при удалении услуги');
      }
    } catch (err) {
      alert(err.message || 'Ошибка при удалении услуги');
    }
  };

  const toggleActive = async (id) => {
    try {
      const item = services.find(s => s.id === id);
      if (!item) return;

      const response = await additionalServicesAPI.update(id, {
        ...item,
        is_active: !item.is_active
      });
      
      if (response.success) {
        setServices(prev => prev.map(s =>
          s.id === id ? { ...s, is_active: !s.is_active } : s
        ));
      } else {
        alert(response.error || 'Ошибка при изменении статуса');
        loadServices();
      }
    } catch (err) {
      alert(err.message || 'Ошибка при изменении статуса');
      loadServices();
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

  if (loading) {
    return (
      <div className="admin-additional-services-list">
        <div className="admin-additional-services-list__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-additional-services-list">
        <div className="admin-additional-services-list__error">
          {error}
          <button onClick={loadServices} style={{ marginTop: '10px' }}>Повторить</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-additional-services-list">
      <div className="admin-additional-services-list__actions">
        <div className="admin-additional-services-list__left">
          <span className="admin-additional-services-list__count">List ({filteredServices.length})</span>
          <Link to="/admin/calculator/additional-services/create" className="admin-additional-services-list__createBtn">
            Create
          </Link>
          <div style={{ position: 'relative' }}>
            <button 
              className="admin-additional-services-list__filterBtn"
              onClick={() => setShowDateFilter(!showDateFilter)}
              style={{ backgroundColor: hasActiveDateFilter ? '#667eea' : undefined, color: hasActiveDateFilter ? 'white' : undefined }}
            >
              Filter by Date {hasActiveDateFilter && '✓'}
              <span className="admin-additional-services-list__arrow">▼</span>
            </button>
            {showDateFilter && (
              <div className="admin-additional-services-list__dateFilter">
                <div className="admin-additional-services-list__dateFilterRow">
                  <label>
                    От:
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="admin-additional-services-list__dateInput"
                    />
                  </label>
                  <label>
                    До:
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="admin-additional-services-list__dateInput"
                    />
                  </label>
                  <button
                    onClick={handleResetDateFilter}
                    className="admin-additional-services-list__resetFilterBtn"
                  >
                    Сбросить
                  </button>
                </div>
              </div>
            )}
          </div>
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
            {filteredServices.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                  Дополнительные услуги не найдены
                </td>
              </tr>
            ) : (
              filteredServices.map(item => (
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
                <td>{item.label}</td>
                <td>{item.price}</td>
                <td>{item.unit}</td>
                <td>{item.order}</td>
                <td>
                  <button
                    className={`admin-additional-services-list__activeBtn ${item.is_active ? 'admin-additional-services-list__activeBtn--active' : ''}`}
                    onClick={() => toggleActive(item.id)}
                    title={item.is_active ? 'Деактивировать' : 'Активировать'}
                  >
                    {item.is_active ? '✓' : '−'}
                  </button>
                </td>
                <td>{formatDate(item.updated_at)}</td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAdditionalServicesList;

