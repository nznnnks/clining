import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cleaningTypesAPI } from '../../../utils/api';
import './AdminCleaningTypesList.css';

const AdminCleaningTypesList = () => {
  const [cleaningTypes, setCleaningTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCleaningTypes();
  }, []);

  const loadCleaningTypes = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await cleaningTypesAPI.getAll();
      if (response.success) {
        setCleaningTypes(response.data || []);
      } else {
        setError(response.error || 'Ошибка при загрузке типов уборки');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке типов уборки');
      if (err.message.includes('401') || err.message.includes('авторизация')) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredTypes = cleaningTypes.filter(item => {
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
    if (!window.confirm('Вы уверены, что хотите удалить этот тип уборки?')) {
      return;
    }

    try {
      const response = await cleaningTypesAPI.delete(id);
      if (response.success) {
        setCleaningTypes(prev => prev.filter(item => item.id !== id));
      } else {
        alert(response.error || 'Ошибка при удалении типа уборки');
      }
    } catch (err) {
      alert(err.message || 'Ошибка при удалении типа уборки');
    }
  };

  const toggleActive = async (id) => {
    try {
      const item = cleaningTypes.find(ct => ct.id === id);
      if (!item) return;

      const response = await cleaningTypesAPI.update(id, {
        ...item,
        is_active: !item.is_active
      });
      
      if (response.success) {
        setCleaningTypes(prev => prev.map(ct =>
          ct.id === id ? { ...ct, is_active: !ct.is_active } : ct
        ));
      } else {
        alert(response.error || 'Ошибка при изменении статуса');
        loadCleaningTypes();
      }
    } catch (err) {
      alert(err.message || 'Ошибка при изменении статуса');
      loadCleaningTypes();
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
      <div className="admin-cleaning-types-list">
        <div className="admin-cleaning-types-list__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-cleaning-types-list">
        <div className="admin-cleaning-types-list__error">
          {error}
          <button onClick={loadCleaningTypes} style={{ marginTop: '10px' }}>Повторить</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-cleaning-types-list">
      <div className="admin-cleaning-types-list__actions">
        <div className="admin-cleaning-types-list__left">
          <span className="admin-cleaning-types-list__count">List ({filteredTypes.length})</span>
          <Link to="/admin/calculator/cleaning-types/create" className="admin-cleaning-types-list__createBtn">
            Create
          </Link>
          <div style={{ position: 'relative' }}>
            <button 
              className="admin-cleaning-types-list__filterBtn"
              onClick={() => setShowDateFilter(!showDateFilter)}
              style={{ backgroundColor: hasActiveDateFilter ? '#667eea' : undefined, color: hasActiveDateFilter ? 'white' : undefined }}
            >
              Filter by Date {hasActiveDateFilter && '✓'}
              <span className="admin-cleaning-types-list__arrow">▼</span>
            </button>
            {showDateFilter && (
              <div className="admin-cleaning-types-list__dateFilter">
                <div className="admin-cleaning-types-list__dateFilterRow">
                  <label>
                    От:
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="admin-cleaning-types-list__dateInput"
                    />
                  </label>
                  <label>
                    До:
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="admin-cleaning-types-list__dateInput"
                    />
                  </label>
                  <button
                    onClick={handleResetDateFilter}
                    className="admin-cleaning-types-list__resetFilterBtn"
                  >
                    Сбросить
                  </button>
                </div>
              </div>
            )}
          </div>
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
            {filteredTypes.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                  Типы уборки не найдены
                </td>
              </tr>
            ) : (
              filteredTypes.map(item => (
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
                <td>{item.label}</td>
                <td>{item.price}</td>
                <td>м²</td>
                <td>{item.order}</td>
                <td>
                  <button
                    className={`admin-cleaning-types-list__activeBtn ${item.is_active ? 'admin-cleaning-types-list__activeBtn--active' : ''}`}
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

export default AdminCleaningTypesList;

