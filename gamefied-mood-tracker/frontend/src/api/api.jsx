// frontend/src/api/api.jsx - FIXED VERSION

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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
  
  // Ensure endpoint starts with /
  const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
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
    console.log(`🔄 API Request: ${config.method} ${API_BASE_URL}${url}`);
    
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    
    // Try to parse JSON response
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error('❌ Non-JSON response:', text.substring(0, 200));
      throw new APIError(
        'Server returned non-JSON response',
        response.status,
        { text: text.substring(0, 200) }
      );
    }

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status}`, data);
      throw new APIError(
        data.message || 'Something went wrong',
        response.status,
        data
      );
    }

    console.log(`✅ API Success: ${config.method} ${url}`);
    return data;
    
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or parsing error
    console.error('❌ Network/Parse Error:', error);
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