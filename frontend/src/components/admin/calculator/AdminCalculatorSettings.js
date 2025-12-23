import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminCalculatorSettings.css';

const AdminCalculatorSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState([
    {
      ключ: 'min_price',
      значение: '4000',
      описание: 'Минимальная цена заказа (Р)',
      датаОбновления: '2025-12-22 15:16:11.541620',
    },
  ]);

  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (setting) => {
    setEditingKey(setting.ключ);
    setEditValue(setting.значение);
  };

  const handleSave = (key) => {
    setSettings(prev => prev.map(item =>
      item.ключ === key ? { ...item, значение: editValue } : item
    ));
    setEditingKey(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditValue('');
  };

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
            {settings.map(item => (
              <tr key={item.ключ}>
                <td>
                  {editingKey === item.ключ ? (
                    <div className="admin-calculator-settings__actionsCell">
                      <button
                        onClick={() => handleSave(item.ключ)}
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
                <td>{item.ключ}</td>
                <td>
                  {editingKey === item.ключ ? (
                    <input
                      type="text"
                      className="admin-calculator-settings__editInput"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    item.значение
                  )}
                </td>
                <td>{item.описание}</td>
                <td>{item.датаОбновления}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCalculatorSettings;

