import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

// Helper to convert hex to HSL parts for Tailwind compatibility
const hexToHSLParts = (hex: string): string => {
  if (!hex || !hex.startsWith('#')) return '185 80% 50%';
  
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

// Helper: Determine dark/light foreground based on Hex Luminance
const getContrastForegroundHex = (hex: string): string => {
  if (!hex || !hex.startsWith('#')) return '#ffffff';
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#0f172a' : '#ffffff';
};

export interface Product {
  id?: string;
  name_ar: string;
  name_tr?: string;
  price: number;
  image_url: string;
  description_ar?: string;
  description_tr?: string;
  category: string;
  stock: number;
  akakce_url?: string;
  created_at?: string;
  specifications?: Record<string, string>;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at?: string;
  replied?: boolean;
  is_read?: boolean;
}

export interface Order {
  id?: string;
  product_id: string;
  customer_name: string;
  customer_phone: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at?: string;
  product?: Product;
}

export interface Visit {
  id?: string;
  path: string;
  user_agent?: string;
  referrer?: string;
  created_at?: string;
}

export interface SiteSettings {
  id?: string;
  siteName: string;
  tagline: string;
  whatsappNumber: string;
  primaryColor: string;
  secondaryColor: string;
  darkMode: boolean;
  language: 'ar' | 'tr';
}

interface AppContextType {
  products: Product[];
  messages: Message[];
  orders: Order[];
  visits: Visit[];
  settings: SiteSettings;
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addMessage: (message: Omit<Message, 'id' | 'created_at'>) => Promise<void>;
  addOrder: (order: Omit<Order, 'id' | 'created_at' | 'status'>) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  trackVisit: (path: string) => Promise<void>;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  uploadProductImage: (file: File) => Promise<string | null>;
  markMessageAsRead: (id: string) => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultSettings: SiteSettings = {
  siteName: 'Spark Peerless',
  tagline: 'İstanbul\'da Akıllı Elektronik ve Elektrikli Araç Uzmanları',
  whatsappNumber: '+905387845388',
  primaryColor: '#fbbf24',
  secondaryColor: '#10b981',
  darkMode: false,
  language: 'tr',
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.darkMode) root.classList.add('dark');
    else root.classList.remove('dark');

    if (settings.primaryColor) {
      const hslPrimary = hexToHSLParts(settings.primaryColor);
      root.style.setProperty('--primary', hslPrimary);
      root.style.setProperty('--ring', hslPrimary);
      root.style.setProperty('--primary-foreground', hexToHSLParts(getContrastForegroundHex(settings.primaryColor)));
    }
    
    if (settings.secondaryColor) {
      const hslSecondary = hexToHSLParts(settings.secondaryColor);
      root.style.setProperty('--secondary', hslSecondary);
      root.style.setProperty('--secondary-foreground', hexToHSLParts(getContrastForegroundHex(settings.secondaryColor)));
    }
  }, [settings.darkMode, settings.primaryColor, settings.secondaryColor]);

  const loadData = async () => {
    try {
      const [productsData, settingsData, messagesData, ordersData, visitsData] = await Promise.all([
        api.products.list(),
        api.settings.get(),
        api.messages.list(),
        api.orders.list(),
        api.visits.list(),
      ]);

      setProducts(productsData);
      setSettings({
        ...defaultSettings,
        id: settingsData.id,
        siteName: settingsData.site_name,
        tagline: settingsData.tagline,
        whatsappNumber: settingsData.whatsapp_number,
        primaryColor: settingsData.primary_color,
        secondaryColor: settingsData.secondary_color,
        darkMode: settingsData.dark_mode,
        language: settingsData.language,
      });
      setMessages(messagesData);
      setOrders(ordersData);
      setVisits(visitsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const data = await api.products.create(product);
      setProducts(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      const data = await api.products.update(id, product);
      setProducts(prev => prev.map(p => p.id === id ? data : p));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.products.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const addMessage = async (message: Omit<Message, 'id' | 'created_at'>) => {
    try {
      const data = await api.messages.create(message);
      setMessages(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  const addOrder = async (order: Omit<Order, 'id' | 'created_at' | 'status'>) => {
    try {
      const data = await api.orders.create(order);
      setOrders(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      const data = await api.orders.updateStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? data : o));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const trackVisit = async (path: string) => {
    try {
      const data = await api.visits.create({
        path,
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      });
      setVisits(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error tracking visit:', error);
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const dbSettings: any = {};
      if (newSettings.siteName !== undefined) dbSettings.site_name = newSettings.siteName;
      if (newSettings.tagline !== undefined) dbSettings.tagline = newSettings.tagline;
      if (newSettings.whatsappNumber !== undefined) dbSettings.whatsapp_number = newSettings.whatsappNumber;
      if (newSettings.primaryColor !== undefined) dbSettings.primary_color = newSettings.primaryColor;
      if (newSettings.secondaryColor !== undefined) dbSettings.secondary_color = newSettings.secondaryColor;
      if (newSettings.darkMode !== undefined) dbSettings.dark_mode = newSettings.darkMode;
      if (newSettings.language !== undefined) dbSettings.language = newSettings.language;

      const data = await api.settings.update(dbSettings);
      setSettings(prev => ({
        ...prev,
        siteName: data.site_name,
        tagline: data.tagline,
        whatsappNumber: data.whatsapp_number,
        primaryColor: data.primary_color,
        secondaryColor: data.secondary_color,
        darkMode: data.dark_mode,
        language: data.language,
      }));
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const uploadProductImage = async (file: File) => {
    try {
      return await api.upload(file);
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      if (api.messages.markAsRead) {
        await api.messages.markAsRead(id);
      }
      setMessages(prev =>
        prev.map(m => (m.id === id ? { ...m, is_read: true } : m))
      );
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  return (
    <AppContext.Provider value={{
      products,
      messages,
      orders,
      visits,
      settings,
      addProduct,
      updateProduct,
      deleteProduct,
      addMessage,
      addOrder,
      updateOrderStatus,
      trackVisit,
      updateSettings,
      uploadProductImage,
      markMessageAsRead,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
