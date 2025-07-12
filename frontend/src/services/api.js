const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers
const getAuthHeaders = (includeContentType = true) => {
    const token = localStorage.getItem('token');
    const headers = {
        ...(token && { 'Authorization': `Bearer ${token}` })
    };

    if (includeContentType) {
        headers['Content-Type'] = 'application/json';
    }

    return headers;
};

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred');
    }
    return response.json();
};

// Auth API
export const authAPI = {
    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(userData)
        });
        return handleResponse(response);
    },

    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(credentials)
        });
        return handleResponse(response);
    },

    verify: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    }
};

// Items API
export const itemsAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/items`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    getById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    // Add method for getting user's items
    getUserItems: async (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        const response = await fetch(`${API_BASE_URL}/items/user?${queryParams}`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    create: async (itemData) => {
        const isFormData = itemData instanceof FormData;
        const response = await fetch(`${API_BASE_URL}/items`, {
            method: 'POST',
            headers: getAuthHeaders(!isFormData),
            body: isFormData ? itemData : JSON.stringify(itemData)
        });
        return handleResponse(response);
    },

    update: async (id, itemData) => {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(itemData)
        });
        return handleResponse(response);
    },

    delete: async (id) => {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    }
};

// Swaps API
export const swapsAPI = {
    getAll: async () => {
        const response = await fetch(`${API_BASE_URL}/swaps`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    // Add method for getting user's swaps
    getUserSwaps: async (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        const response = await fetch(`${API_BASE_URL}/swaps?${queryParams}`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    create: async (swapData) => {
        const response = await fetch(`${API_BASE_URL}/swaps`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(swapData)
        });
        return handleResponse(response);
    },

    updateStatus: async (id, status) => {
        const response = await fetch(`${API_BASE_URL}/swaps/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status })
        });
        return handleResponse(response);
    }
};

export default {
    auth: authAPI,
    items: itemsAPI,
    swaps: swapsAPI
};