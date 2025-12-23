import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculatorSettingsAPI } from '../../../utils/api';
import './AdminCalculatorSettings.css';

const AdminCalculatorSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await calculatorSettingsAPI.getAll();
      if (response.success) {
        setSettings(response.data || []);
      } else {
        setError(response.error || 'Ошибка при загрузке настроек');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при загрузке настроек');
      if (err.message.includes('401') || err.message.includes('авторизация')) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (setting) => {
    setEditingKey(setting.key);
    setEditValue(setting.value);
  };

  const handleSave = async (key) => {
    try {
      const response = await calculatorSettingsAPI.update(key, {
        value: editValue
      });
      
      if (response.success) {
        setSettings(prev => prev.map(item =>
          item.key === key ? { ...item, value: editValue } : item
        ));
        setEditingKey(null);
        setEditValue('');
      } else {
        alert(response.error || 'Ошибка при сохранении настройки');
      }
    } catch (err) {
      alert(err.message || 'Ошибка при сохранении настройки');
    }
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditValue('');
  };

  if (loading) {
    return (
      <div className="admin-calculator-settings">
        <div className="admin-calculator-settings__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-calculator-settings">
        <div className="admin-calculator-settings__error">
          {error}
          <button onClick={loadSettings} style={{ marginTop: '10px' }}>Повторить</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-calculator-settings">
      <div className="admin-calculator-settings__actions">
        <div className="admin-calculator-settings__left">
          <span className="admin-calculator-settings__count">List ({settings.length})</span>
        </div>
        <div className="admin-calculator-settings__search">
          <input
            type="text"
            className="admin-calculator-settings__searchInput"
            placeholder="Search: Ключ, Описание"
          />
        </div>
      </div>

      <div className="admin-calculator-settings__tableWrapper">
        <table className="admin-calculator-settings__table">
          <thead>
            <tr>
              <th></th>
              <th>Ключ</th>
              <th>Значение</th>
              <th>Описание</th>
              <th>Дата обновления</th>
            </tr>
          </thead>
          <tbody>
            {settings.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  Настройки не найдены
                </td>
              </tr>
            ) : (
              settings.map(item => (
                <tr key={item.key}>
                  <td>
                    {editingKey === item.key ? (
                      <div className="admin-calculator-settings__actionsCell">
                        <button
                          onClick={() => handleSave(item.key)}
                          className="admin-calculator-settings__saveBtn"
                          title="Сохранить"
                        >
                          ✓
                        </button>
                        <button
                          onClick={handleCancel}
                          className="admin-calculator-settings__cancelBtn"
                          title="Отменить"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(item)}
                        className="admin-calculator-settings__editBtn"
                        title="Редактировать"
                      >
                        ✏️
                      </button>
                    )}
                  </td>
                  <td>{item.key}</td>
                  <td>
                    {editingKey === item.key ? (
                      <input
                        type="text"
                        className="admin-calculator-settings__editInput"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      item.value
                    )}
                  </td>
                  <td>{item.description || '-'}</td>
                  <td>-</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCalculatorSettings;

