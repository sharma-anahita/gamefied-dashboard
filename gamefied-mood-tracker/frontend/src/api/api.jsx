// src/api/api.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

const getToken = () => {
  return localStorage.getItem('token');
};

const api = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    credentials: 'include', // Send cookies
    ...options,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    const data = await response.json();

    if (!response.ok) {
      throw new APIError(
        data.message || 'Something went wrong',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or parsing error
    throw new APIError(
      error.message || 'Network error',
      0,
      null
    );
  }
};

// Convenience methods
api.get = (endpoint, options) => api(endpoint, { ...options, method: 'GET' });
api.post = (endpoint, body, options) => api(endpoint, { ...options, method: 'POST', body });
api.put = (endpoint, body, options) => api(endpoint, { ...options, method: 'PUT', body });
api.patch = (endpoint, body, options) => api(endpoint, { ...options, method: 'PATCH', body });
api.delete = (endpoint, options) => api(endpoint, { ...options, method: 'DELETE' });

export { APIError };
export default api;