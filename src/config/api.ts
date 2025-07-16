// API 配置檔案
export const API_CONFIG = {
  // 主要 API Gateway URL
  API_GATEWAY_URL: process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'https://your-api-gateway.onrender.com',
  
  // 各微服務 URL
  AUTH_SERVICE_URL: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'https://your-auth-service.onrender.com',
  AI_SERVICE_URL: process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'https://new1-jid6.onrender.com', // 你的 AI 服務
  OCR_SERVICE_URL: process.env.NEXT_PUBLIC_OCR_SERVICE_URL || 'https://your-ocr-service.onrender.com',
  USER_SERVICE_URL: process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'https://your-user-service.onrender.com',
  SOCIAL_SERVICE_URL: process.env.NEXT_PUBLIC_SOCIAL_SERVICE_URL || 'https://your-social-service.onrender.com',
  ANALYTICS_SERVICE_URL: process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL || 'https://your-analytics-service.onrender.com',
  NOTIFICATION_SERVICE_URL: process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE_URL || 'https://your-notification-service.onrender.com',
  STORAGE_SERVICE_URL: process.env.NEXT_PUBLIC_STORAGE_SERVICE_URL || 'https://your-storage-service.onrender.com',
};

// API 端點配置
export const API_ENDPOINTS = {
  // Auth Service
  LOGIN: `${API_CONFIG.AUTH_SERVICE_URL}/auth/login`,
  REGISTER: `${API_CONFIG.AUTH_SERVICE_URL}/auth/register`,
  LOGOUT: `${API_CONFIG.AUTH_SERVICE_URL}/auth/logout`,
  REFRESH_TOKEN: `${API_CONFIG.AUTH_SERVICE_URL}/auth/refresh`,
  
  // AI Service
  GENERATE_CARD: `${API_CONFIG.AI_SERVICE_URL}/ai/generate-card`,
  ANALYZE_CARD: `${API_CONFIG.AI_SERVICE_URL}/ai/analyze`,
  OPTIMIZE_CARD: `${API_CONFIG.AI_SERVICE_URL}/ai/optimize`,
  
  // OCR Service
  SCAN_CARD: `${API_CONFIG.OCR_SERVICE_URL}/ocr/scan`,
  EXTRACT_TEXT: `${API_CONFIG.OCR_SERVICE_URL}/ocr/extract`,
  
  // User Service
  GET_PROFILE: `${API_CONFIG.USER_SERVICE_URL}/users/profile`,
  UPDATE_PROFILE: `${API_CONFIG.USER_SERVICE_URL}/users/profile`,
  GET_CONTACTS: `${API_CONFIG.USER_SERVICE_URL}/users/contacts`,
  ADD_CONTACT: `${API_CONFIG.USER_SERVICE_URL}/users/contacts`,
  
  // Social Service
  SHARE_CARD: `${API_CONFIG.SOCIAL_SERVICE_URL}/social/share`,
  GET_SHARES: `${API_CONFIG.SOCIAL_SERVICE_URL}/social/shares`,
  
  // Analytics Service
  TRACK_EVENT: `${API_CONFIG.ANALYTICS_SERVICE_URL}/analytics/track`,
  GET_INSIGHTS: `${API_CONFIG.ANALYTICS_SERVICE_URL}/analytics/insights`,
  
  // Notification Service
  SEND_NOTIFICATION: `${API_CONFIG.NOTIFICATION_SERVICE_URL}/notifications/send`,
  GET_NOTIFICATIONS: `${API_CONFIG.NOTIFICATION_SERVICE_URL}/notifications`,
  
  // Storage Service
  UPLOAD_FILE: `${API_CONFIG.STORAGE_SERVICE_URL}/storage/upload`,
  GET_FILE: `${API_CONFIG.STORAGE_SERVICE_URL}/storage/file`,
};

// API 請求工具函數
export const apiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// 帶認證的 API 請求
export const authenticatedApiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = localStorage.getItem('authToken');
  
  const authOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    },
  };

  return apiRequest(url, authOptions);
}; 