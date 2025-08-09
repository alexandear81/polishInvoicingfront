import axios from 'axios';

/**
 * KSeF API Service
 * 
 * Communicates with the backend server that acts as a proxy to the official KSeF API.
 * Backend handles CORS issues and provides proper authentication with Polish tax system.
 * 
 * Production Backend: https://polishinvoicingback-1.onrender.com
 */

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://polishinvoicingback-1.onrender.com';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    console.log('🌐 Base URL:', config.baseURL);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message);
    if (error.response) {
      console.error('📄 Error Response:', error.response.status, error.response.data);
    }
    return Promise.reject(error);
  }
);

// KSeF API endpoints
export const ksefApi = {
  // Request authorization challenge
  requestChallenge: async (contextIdentifier: { type: string; identifier: string }) => {
    const response = await apiClient.post('/api/ksef/request-challenge', {
      contextIdentifier,
    });
    return response.data;
  },

  // Request session token with base64 signed XML
  requestSessionToken: async (signedXmlBase64: string) => {
    const response = await apiClient.post('/api/ksef/request-session-token', {
      signedXmlBase64,
      environment: 'test'
    });
    return response.data;
  },

  // Send invoice to KSeF
  sendInvoice: async (sessionToken: string, invoiceXml: string) => {
    const response = await apiClient.post('/api/ksef/send-invoice', {
      sessionToken,
      invoiceXml,
    });
    return response.data;
  },

  // Get invoice status
  getInvoiceStatus: async (sessionToken: string, referenceNumber: string) => {
    const response = await apiClient.get(`/api/ksef/invoice-status/${encodeURIComponent(referenceNumber)}`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
      },
    });
    return response.data;
  },

  // Terminate session
  terminateSession: async (sessionToken: string) => {
    const response = await apiClient.post('/api/ksef/terminate-session', {
      sessionToken,
    });
    return response.data;
  },

  // Company lookup using GUS REGON API (supports NIP/REGON) with environment selection
  lookupCompany: async (id: string, environment: 'test' | 'production' | 'prod' = 'production') => {
    const response = await apiClient.get(
      `/api/gus/search/${encodeURIComponent(id)}?environment=${encodeURIComponent(environment)}`
    );
    return response.data;
  }
};

export default ksefApi;
