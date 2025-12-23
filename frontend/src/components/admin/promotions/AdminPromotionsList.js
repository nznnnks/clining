import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { promotionsAdminAPI } from '../../../utils/api';
import './AdminPromotionsList.css';

const AdminPromotionsList = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await promotionsAdminAPI.getAll();
      if (response.success) {
        setPromotions(response.data || []);
      } else {
        setError(response.error || 'Ошибка при загрузке акций');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке акций');
      if (err.message.includes('401') || err.message.includes('авторизация')) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredPromotions = promotions.filter(item => {
    // Фильтр по тексту
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Фильтр по дате создания
    if (dateFrom || dateTo) {
      if (!item.created_at) return false;
      
      const itemDate = new Date(item.created_at);
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

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту акцию?')) {
      return;
    }

    try {
      const response = await promotionsAdminAPI.delete(id);
      if (response.success) {
        setPromotions(prev => prev.filter(item => item.id !== id));
      } else {
        alert(response.error || 'Ошибка при удалении акции');
      }
    } catch (err) {
      alert(err.message || 'Ошибка при удалении акции');
    }
  };

  const toggleActive = async (id) => {
    try {
      const response = await promotionsAdminAPI.toggle(id);
      if (response.success) {
        setPromotions(prev => prev.map(item =>
          item.id === id ? { ...item, is_active: response.data.is_active } : item
        ));
      } else {
        alert(response.error || 'Ошибка при изменении статуса');
        loadPromotions();
      }
    } catch (err) {
      alert(err.message || 'Ошибка при изменении статуса');
      loadPromotions();
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

  const handleResetDateFilter = () => {
    setDateFrom('');
    setDateTo('');
    setShowDateFilter(false);
  };

  const hasActiveDateFilter = dateFrom || dateTo;

  if (loading) {
    return (
      <div className="admin-promotions-list">
        <div className="admin-promotions-list__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-promotions-list">
        <div className="admin-promotions-list__error">
          {error}
          <button onClick={loadPromotions} style={{ marginTop: '10px' }}>Повторить</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-promotions-list">
      <div className="admin-promotions-list__actions">
        <div className="admin-promotions-list__left">
          <span className="admin-promotions-list__count">List ({filteredPromotions.length})</span>
          <Link to="/admin/promotions/create" className="admin-promotions-list__createBtn">
            Create
          </Link>
          <div style={{ position: 'relative' }}>
            <button 
              className="admin-promotions-list__filterBtn"
              onClick={() => setShowDateFilter(!showDateFilter)}
              style={{ backgroundColor: hasActiveDateFilter ? '#667eea' : undefined, color: hasActiveDateFilter ? 'white' : undefined }}
            >
              Filter by Date {hasActiveDateFilter && '✓'}
              <span className="admin-promotions-list__arrow">▼</span>
            </button>
            {showDateFilter && (
              <div className="admin-promotions-list__dateFilter">
                <div className="admin-promotions-list__dateFilterRow">
                  <label>
                    От:
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="admin-promotions-list__dateInput"
                    />
                  </label>
                  <label>
                    До:
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="admin-promotions-list__dateInput"
                    />
                  </label>
                  <button
                    onClick={handleResetDateFilter}
                    className="admin-promotions-list__resetFilterBtn"
                  >
                    Сбросить
                  </button>
                </div>
              </div>
            )}
          </div>
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
            {filteredPromotions.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  Акции не найдены
                </td>
              </tr>
            ) : (
              filteredPromotions.map(item => (
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
                  <td>{item.title}</td>
                  <td>{item.valid_until || '-'}</td>
                  <td>
                    <button
                      className={`admin-promotions-list__activeBtn ${item.is_active ? 'admin-promotions-list__activeBtn--active' : ''}`}
                      onClick={() => toggleActive(item.id)}
                      title={item.is_active ? 'Деактивировать' : 'Активировать'}
                    >
                      {item.is_active ? '✓' : '−'}
                    </button>
                  </td>
                  <td>{formatDate(item.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPromotionsList;
