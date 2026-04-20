// API Configuration and Endpoints

// Base API URL - loaded from .env (VITE_API_URL)
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/grocery-delivery-api`;

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/login/`,
  SIGNUP: `${API_BASE_URL}/signup/`,
  
  // Future endpoints (add as you create them)
  // PRODUCTS: `${API_BASE_URL}/products/`,
  // CATEGORIES: `${API_BASE_URL}/categories/`,
  // CART: `${API_BASE_URL}/cart/`,
  // ORDERS: `${API_BASE_URL}/orders/`,
  // WISHLIST: `${API_BASE_URL}/wishlist/`,
};

// API Helper Functions
class ApiService {
  
  // Generic API call method
  static async apiCall(url, options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      return {
        success: response.ok,
        status: response.status,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        status: 0,
        data: { error: 'Network error. Please check your connection.' },
      };
    }
  }

  // Authentication APIs
  static async login(credentials) {
    return this.apiCall(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  static async signup(userData) {
    return this.apiCall(API_ENDPOINTS.SIGNUP, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Future API methods (add as needed)
  /*
  static async getProducts() {
    return this.apiCall(API_ENDPOINTS.PRODUCTS);
  }

  static async getCategories() {
    return this.apiCall(API_ENDPOINTS.CATEGORIES);
  }

  static async addToCart(productData) {
    return this.apiCall(API_ENDPOINTS.CART, {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  static async getOrders() {
    return this.apiCall(API_ENDPOINTS.ORDERS);
  }

  static async addToWishlist(productId) {
    return this.apiCall(API_ENDPOINTS.WISHLIST, {
      method: 'POST',
      body: JSON.stringify({ product_id: productId }),
    });
  }
  */
}

export default ApiService;