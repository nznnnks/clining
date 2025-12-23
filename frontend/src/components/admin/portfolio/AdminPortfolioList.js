import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { portfolioAdminAPI } from '../../../utils/api';
import './AdminPortfolioList.css';

const AdminPortfolioList = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await portfolioAdminAPI.getAll();
      if (response.success) {
        setPortfolioItems(response.data || []);
      } else {
        setError(response.error || 'Ошибка при загрузке портфолио');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке портфолио');
      if (err.message.includes('401') || err.message.includes('авторизация')) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = portfolioItems.filter(item => {
    // Фильтр по тексту
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
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

  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот элемент?')) {
      return;
    }

    try {
      const response = await portfolioAdminAPI.delete(id);
      if (response.success) {
        setPortfolioItems(prev => prev.filter(item => item.id !== id));
        setSelectedItems(prev => prev.filter(item => item !== id));
      } else {
        alert(response.error || 'Ошибка при удалении элемента');
      }
    } catch (err) {
      alert(err.message || 'Ошибка при удалении элемента');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedItems.length === 0) return;
    if (!window.confirm(`Вы уверены, что хотите удалить ${selectedItems.length} элементов?`)) {
      return;
    }

    try {
      const deletePromises = selectedItems.map(id => portfolioAdminAPI.delete(id));
      await Promise.all(deletePromises);
      
      setPortfolioItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    } catch (err) {
      alert(err.message || 'Ошибка при удалении элементов');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
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
      <div className="admin-portfolio-list">
        <div className="admin-portfolio-list__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-portfolio-list">
        <div className="admin-portfolio-list__error">
          {error}
          <button onClick={loadPortfolio} style={{ marginTop: '10px' }}>Повторить</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portfolio-list">
      <div className="admin-portfolio-list__actions">
        <div className="admin-portfolio-list__left">
          <span className="admin-portfolio-list__count">List ({filteredItems.length})</span>
          <Link to="/admin/portfolio/create" className="admin-portfolio-list__createBtn">
            Create
          </Link>
          <div style={{ position: 'relative' }}>
            <button 
              className="admin-portfolio-list__filterBtn"
              onClick={() => setShowDateFilter(!showDateFilter)}
              style={{ backgroundColor: hasActiveDateFilter ? '#667eea' : undefined, color: hasActiveDateFilter ? 'white' : undefined }}
            >
              Filter by Date {hasActiveDateFilter && '✓'}
              <span className="admin-portfolio-list__arrow">▼</span>
            </button>
            {showDateFilter && (
              <div className="admin-portfolio-list__dateFilter">
                <div className="admin-portfolio-list__dateFilterRow">
                  <label>
                    От:
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="admin-portfolio-list__dateInput"
                    />
                  </label>
                  <label>
                    До:
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="admin-portfolio-list__dateInput"
                    />
                  </label>
                  <button
                    onClick={handleResetDateFilter}
                    className="admin-portfolio-list__resetFilterBtn"
                  >
                    Сбросить
                  </button>
                </div>
              </div>
            )}
          </div>
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
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>
                  Элементы портфолио не найдены
                </td>
              </tr>
            ) : (
              filteredItems.map(item => (
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
                  <td>{item.title}</td>
                  <td>{item.category || '-'}</td>
                  <td>{item.area || '-'}</td>
                  <td>{item.time || '-'}</td>
                  <td>{item.price || '-'}</td>
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

export default AdminPortfolioList;
