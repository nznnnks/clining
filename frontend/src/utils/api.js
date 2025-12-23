// API utility для работы с бекендом
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Базовый fetch с обработкой ошибок
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Важно для работы с сессиями Flask-Login
    ...options,
  };

  // Если есть тело запроса, преобразуем в JSON
  if (options.body && typeof options.body === 'object') {
    defaultOptions.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, defaultOptions);
    
    // Проверяем, есть ли контент для парсинга JSON
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text || 'Произошла ошибка');
      }
    }

    if (!response.ok) {
      throw new Error(data.error || data.message || `Ошибка ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    // Если это NetworkError, даем более понятное сообщение
    if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
      // Для публичных эндпоинтов (не требующих авторизации) не логируем ошибку в консоль
      // и не выбрасываем ошибку, чтобы избежать сообщений в консоли браузера
      const isPublicEndpoint = !endpoint.includes('/api/admin/');
      if (!isPublicEndpoint) {
        // Для публичных эндпоинтов возвращаем объект с success: false вместо выброса ошибки
        // Это позволяет компонентам обрабатывать ошибку без попадания в консоль
        return {
          success: false,
          error: 'Не удалось подключиться к серверу',
          data: null
        };
      }
      // Для админских эндпоинтов логируем и выбрасываем ошибку
      console.error('API Error:', error);
      console.error('Request URL:', url);
      throw new Error('Не удалось подключиться к серверу. Проверьте, что бекенд запущен на http://localhost:5000 и доступен');
    }
    // Для других ошибок логируем только для админских эндпоинтов
    if (endpoint.includes('/api/admin/')) {
      console.error('API Error:', error);
      console.error('Request URL:', url);
    }
    throw error;
  }
}

// ========== Auth API ==========

export const authAPI = {
  login: async (username, password) => {
    return fetchAPI('/api/admin/login', {
      method: 'POST',
      body: { username, password },
    });
  },

  logout: async () => {
    return fetchAPI('/api/admin/logout', {
      method: 'POST',
    });
  },

  check: async () => {
    return fetchAPI('/api/admin/check');
  },
};

// ========== Portfolio API ==========

export const portfolioAPI = {
  getAll: async (category = null) => {
    const url = category 
      ? `/api/portfolio?category=${encodeURIComponent(category)}`
      : '/api/portfolio';
    return fetchAPI(url);
  },

  getById: async (id) => {
    return fetchAPI(`/api/portfolio/${id}`);
  },

  create: async (data) => {
    return fetchAPI('/api/portfolio', {
      method: 'POST',
      body: data,
    });
  },

  update: async (id, data) => {
    return fetchAPI(`/api/portfolio/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  delete: async (id) => {
    return fetchAPI(`/api/portfolio/${id}`, {
      method: 'DELETE',
    });
  },
};

// ========== Portfolio Admin API ==========

export const portfolioAdminAPI = {
  getAll: async (category = null) => {
    const url = category 
      ? `/api/admin/portfolio?category=${encodeURIComponent(category)}`
      : '/api/admin/portfolio';
    return fetchAPI(url);
  },

  getById: async (id) => {
    return fetchAPI(`/api/admin/portfolio/${id}`);
  },

  create: async (data) => {
    return fetchAPI('/api/admin/portfolio', {
      method: 'POST',
      body: data,
    });
  },

  update: async (id, data) => {
    return fetchAPI(`/api/admin/portfolio/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  delete: async (id) => {
    return fetchAPI(`/api/admin/portfolio/${id}`, {
      method: 'DELETE',
    });
  },
};

// ========== Promotions API ==========

export const promotionsAPI = {
  getAll: async (activeOnly = false) => {
    const url = activeOnly 
      ? '/api/promotions?active_only=true'
      : '/api/promotions';
    return fetchAPI(url);
  },

  getById: async (id) => {
    return fetchAPI(`/api/promotions/${id}`);
  },

  create: async (data) => {
    return fetchAPI('/api/promotions', {
      method: 'POST',
      body: data,
    });
  },

  update: async (id, data) => {
    return fetchAPI(`/api/promotions/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  delete: async (id) => {
    return fetchAPI(`/api/promotions/${id}`, {
      method: 'DELETE',
    });
  },

  toggle: async (id) => {
    return fetchAPI(`/api/promotions/${id}/toggle`, {
      method: 'POST',
    });
  },
};

// ========== Promotions Admin API ==========

export const promotionsAdminAPI = {
  getAll: async (activeOnly = false) => {
    const url = activeOnly 
      ? '/api/admin/promotions?active_only=true'
      : '/api/admin/promotions';
    return fetchAPI(url);
  },

  getById: async (id) => {
    return fetchAPI(`/api/admin/promotions/${id}`);
  },

  create: async (data) => {
    return fetchAPI('/api/admin/promotions', {
      method: 'POST',
      body: data,
    });
  },

  update: async (id, data) => {
    return fetchAPI(`/api/admin/promotions/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  delete: async (id) => {
    return fetchAPI(`/api/admin/promotions/${id}`, {
      method: 'DELETE',
    });
  },

  toggle: async (id) => {
    return fetchAPI(`/api/admin/promotions/${id}/toggle`, {
      method: 'POST',
    });
  },
};

// ========== Orders API ==========

export const ordersAPI = {
  getAll: async () => {
    return fetchAPI('/api/admin/orders');
  },

  getById: async (id) => {
    return fetchAPI(`/api/admin/orders/${id}`);
  },

  update: async (id, data) => {
    return fetchAPI(`/api/admin/orders/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  delete: async (id) => {
    return fetchAPI(`/api/admin/orders/${id}`, {
      method: 'DELETE',
    });
  },
};

// ========== Calculator API ==========

// Cleaning Types
export const cleaningTypesAPI = {
  getAll: async () => {
    return fetchAPI('/api/admin/calculator/cleaning-types');
  },

  getById: async (id) => {
    return fetchAPI(`/api/admin/calculator/cleaning-types/${id}`);
  },

  create: async (data) => {
    return fetchAPI('/api/admin/calculator/cleaning-types', {
      method: 'POST',
      body: data,
    });
  },

  update: async (id, data) => {
    return fetchAPI(`/api/admin/calculator/cleaning-types/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  delete: async (id) => {
    return fetchAPI(`/api/admin/calculator/cleaning-types/${id}`, {
      method: 'DELETE',
    });
  },
};

// Additional Services
export const additionalServicesAPI = {
  getAll: async () => {
    return fetchAPI('/api/admin/calculator/additional-services');
  },

  getById: async (id) => {
    return fetchAPI(`/api/admin/calculator/additional-services/${id}`);
  },

  create: async (data) => {
    return fetchAPI('/api/admin/calculator/additional-services', {
      method: 'POST',
      body: data,
    });
  },

  update: async (id, data) => {
    return fetchAPI(`/api/admin/calculator/additional-services/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  delete: async (id) => {
    return fetchAPI(`/api/admin/calculator/additional-services/${id}`, {
      method: 'DELETE',
    });
  },
};

// Calculator Settings
export const calculatorSettingsAPI = {
  getAll: async () => {
    return fetchAPI('/api/admin/calculator/settings');
  },

  getByKey: async (key) => {
    return fetchAPI(`/api/admin/calculator/settings/${key}`);
  },

  create: async (data) => {
    return fetchAPI('/api/admin/calculator/settings', {
      method: 'POST',
      body: data,
    });
  },

  update: async (key, data) => {
    return fetchAPI(`/api/admin/calculator/settings/${key}`, {
      method: 'PUT',
      body: data,
    });
  },
};

// ========== Users Admin API ==========

export const usersAdminAPI = {
  getAll: async () => {
    return fetchAPI('/api/admin/users');
  },

  getById: async (id) => {
    return fetchAPI(`/api/admin/users/${id}`);
  },

  create: async (data) => {
    return fetchAPI('/api/admin/users', {
      method: 'POST',
      body: data,
    });
  },

  update: async (id, data) => {
    return fetchAPI(`/api/admin/users/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  delete: async (id) => {
    return fetchAPI(`/api/admin/users/${id}`, {
      method: 'DELETE',
    });
  },
};

