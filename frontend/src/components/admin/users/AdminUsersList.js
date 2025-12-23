import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usersAdminAPI } from '../../../utils/api';
import './AdminUsersList.css';

const AdminUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await usersAdminAPI.getAll();
      if (response.success) {
        setUsers(response.data || []);
      } else {
        setError(response.error || 'Ошибка при загрузке пользователей');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке пользователей');
      if (err.message.includes('401') || err.message.includes('авторизация')) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    // Фильтр по тексту
    const matchesSearch = user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Фильтр по дате создания
    if (dateFrom || dateTo) {
      if (!user.created_at) return false;
      
      const userDate = new Date(user.created_at);
      userDate.setHours(0, 0, 0, 0);
      
      if (dateFrom) {
        const fromDate = new Date(dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        if (userDate < fromDate) return false;
      }
      
      if (dateTo) {
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (userDate > toDate) return false;
      }
    }
    
    return true;
  });

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      return;
    }

    try {
      const response = await usersAdminAPI.delete(id);
      if (response.success) {
        setUsers(prev => prev.filter(user => user.id !== id));
      } else {
        alert(response.error || 'Ошибка при удалении пользователя');
      }
    } catch (err) {
      alert(err.message || 'Ошибка при удалении пользователя');
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
      <div className="admin-users-list">
        <div className="admin-users-list__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-users-list">
        <div className="admin-users-list__error">
          {error}
          <button onClick={loadUsers} style={{ marginTop: '10px' }}>Повторить</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users-list">
      <div className="admin-users-list__actions">
        <div className="admin-users-list__left">
          <span className="admin-users-list__count">List ({filteredUsers.length})</span>
          <Link to="/admin/users/create" className="admin-users-list__createBtn">
            Create
          </Link>
          <div style={{ position: 'relative' }}>
            <button 
              className="admin-users-list__filterBtn"
              onClick={() => setShowDateFilter(!showDateFilter)}
              style={{ backgroundColor: hasActiveDateFilter ? '#667eea' : undefined, color: hasActiveDateFilter ? 'white' : undefined }}
            >
              Filter by Date {hasActiveDateFilter && '✓'}
              <span className="admin-users-list__arrow">▼</span>
            </button>
            {showDateFilter && (
              <div className="admin-users-list__dateFilter">
                <div className="admin-users-list__dateFilterRow">
                  <label>
                    От:
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="admin-users-list__dateInput"
                    />
                  </label>
                  <label>
                    До:
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="admin-users-list__dateInput"
                    />
                  </label>
                  <button
                    onClick={handleResetDateFilter}
                    className="admin-users-list__resetFilterBtn"
                  >
                    Сбросить
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="admin-users-list__search">
          <input
            type="text"
            className="admin-users-list__searchInput"
            placeholder="Search: Имя пользователя, Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-users-list__tableWrapper">
        <table className="admin-users-list__table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Имя пользователя</th>
              <th>Email</th>
              <th>Администратор</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  Пользователи не найдены
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="admin-users-list__actionsCell">
                      <Link 
                        to={`/admin/users/edit/${user.id}`}
                        className="admin-users-list__editBtn"
                        title="Редактировать"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="admin-users-list__deleteBtn"
                        title="Удалить"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.is_admin ? 'Да' : 'Нет'}</td>
                  <td>{formatDate(user.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersList;

