import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

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
  power?: string;
  range?: string;
  weight?: string;
  speed?: string;
  is_spark_certified?: boolean;
  created_at?: string;
  akakce_url?: string;
  specifications?: Record<string, string>;
}

export interface Settings {
  site_name: string;
  tagline: string;
  whatsapp_number: string;
  contact_email: string;
  contact_address: string;
  maintenance_contact: string;
}

export interface BatteryCustomization {
  id?: string;
  voltage: number;
  capacity: number;
  customer_name: string;
  customer_phone: string;
  notes?: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  created_at?: string;
}

export interface MaintenanceRequest {
  id?: string;
  issue_type: 'electrical' | 'mechanical' | 'general';
  description: string;
  customer_name: string;
  customer_phone: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  created_at?: string;
}

export interface TradeInRequest {
  id?: string;
  vehicle_type: 'ebike' | 'scooter';
  brand_model: string;
  condition: string;
  customer_name: string;
  customer_phone: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  created_at?: string;
}

export interface Message {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  replied: boolean;
  created_at?: string;
}

export interface Order {
  id?: string;
  product_id?: string;
  product_details?: Product;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  customer_address?: string;
  status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  total_price: number;
  created_at?: string;
}

export interface Visit {
  id?: string;
  path: string;
  created_at?: string;
}

export interface HeroSlider {
  id?: string;
  title_ar: string;
  title_tr: string;
  subtitle_ar: string;
  subtitle_tr: string;
  image_url: string;
  link_url: string;
  button_text_ar: string;
  button_text_tr: string;
  order: number;
  is_active: boolean;
  created_at?: string;
}

interface AppContextType {
  products: Product[];
  batteryRequests: BatteryCustomization[];
  maintenanceRequests: MaintenanceRequest[];
  tradeInRequests: TradeInRequest[];
  messages: Message[];
  orders: Order[];
  visits: Visit[];
  heroSliders: HeroSlider[];
  
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  
  addBatteryRequest: (req: Omit<BatteryCustomization, 'id' | 'created_at' | 'status'>) => Promise<void>;
  updateBatteryStatus: (id: string, status: BatteryCustomization['status']) => Promise<void>;

  addMaintenanceRequest: (req: Omit<MaintenanceRequest, 'id' | 'created_at' | 'status'>) => Promise<void>;
  updateMaintenanceStatus: (id: string, status: MaintenanceRequest['status']) => Promise<void>;

  addTradeInRequest: (req: Omit<TradeInRequest, 'id' | 'created_at' | 'status'>) => Promise<void>;
  updateTradeInStatus: (id: string, status: TradeInRequest['status']) => Promise<void>;
  
  markMessageAsRead: (id: string) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  
  uploadProductImage: (file: File) => Promise<string | null>;
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [batteryRequests, setBatteryRequests] = useState<BatteryCustomization[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [tradeInRequests, setTradeInRequests] = useState<TradeInRequest[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [heroSliders, setHeroSliders] = useState<HeroSlider[]>([]);
  const [settings, setSettings] = useState<Settings>({
    site_name: 'Swarder',
    tagline: 'Akıllı Hareketlilik Çözümleri',
    whatsapp_number: '905387845388',
    contact_email: 'info@swarder.com',
    contact_address: 'Istanbul, Turkey',
    maintenance_contact: '905387845388',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    applyTheme();
    // Track visit
    api.visitors.track(window.location.pathname).catch(console.error);
  }, []);

  const applyTheme = () => {
    const root = document.documentElement;
    root.classList.remove('dark');
    root.style.setProperty('--primary', '211 100% 50%'); // #007BFF
    root.style.setProperty('--ring', '211 100% 50%');
    root.style.setProperty('--primary-foreground', '0 0% 100%');
    root.style.setProperty('--secondary', '45 100% 51%'); // #FFC107
    root.style.setProperty('--secondary-foreground', '0 0% 13%');
  };

  const loadData = async () => {
    try {
      const [
        productsData, 
        batteryData, 
        maintenanceData, 
        tradeInData, 
        settingsData,
        messagesData,
        ordersData,
        visitsData,
        heroSlidersData
      ] = await Promise.all([
        api.products.list(),
        api.batteryCustomization.list(),
        api.maintenance.list(),
        api.tradeIn.list(),
        api.settings.get(),
        api.messages.list(),
        api.orders.list(),
        api.visitors.list(),
        api.heroSliders.list()
      ]);
      setProducts(productsData);
      setBatteryRequests(batteryData);
      setMaintenanceRequests(maintenanceData);
      setTradeInRequests(tradeInData);
      setSettings(settingsData);
      setMessages(messagesData);
      setOrders(ordersData);
      setVisits(visitsData);
      setHeroSliders(heroSlidersData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
    const data = await api.products.create(product);
    setProducts(prev => [data, ...prev]);
  };
  const updateProduct = async (id: string, product: Partial<Product>) => {
    const data = await api.products.update(id, product);
    setProducts(prev => prev.map(p => p.id === id ? data : p));
  };
  const deleteProduct = async (id: string) => {
    await api.products.delete(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addBatteryRequest = async (req: Omit<BatteryCustomization, 'id' | 'created_at' | 'status'>) => {
    const data = await api.batteryCustomization.create(req);
    setBatteryRequests(prev => [data, ...prev]);
  };
  const updateBatteryStatus = async (id: string, status: BatteryCustomization['status']) => {
    const data = await api.batteryCustomization.update(id, { status });
    setBatteryRequests(prev => prev.map(r => r.id === id ? data : r));
  };

  const addMaintenanceRequest = async (req: Omit<MaintenanceRequest, 'id' | 'created_at' | 'status'>) => {
    const data = await api.maintenance.create(req);
    setMaintenanceRequests(prev => [data, ...prev]);
  };
  const updateMaintenanceStatus = async (id: string, status: MaintenanceRequest['status']) => {
    const data = await api.maintenance.update(id, { status });
    setMaintenanceRequests(prev => prev.map(r => r.id === id ? data : r));
  };

  const addTradeInRequest = async (req: Omit<TradeInRequest, 'id' | 'created_at' | 'status'>) => {
    const data = await api.tradeIn.create(req);
    setTradeInRequests(prev => [data, ...prev]);
  };
  const updateTradeInStatus = async (id: string, status: TradeInRequest['status']) => {
    const data = await api.tradeIn.update(id, { status });
    setTradeInRequests(prev => prev.map(r => r.id === id ? data : r));
  };

  const markMessageAsRead = async (id: string) => {
    const data = await api.messages.update(id, { is_read: true });
    setMessages(prev => prev.map(m => m.id === id ? data : m));
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    const data = await api.orders.update(id, { status });
    setOrders(prev => prev.map(o => o.id === id ? data : o));
  };

  const uploadProductImage = async (file: File) => {
    try {
      return await api.upload(file);
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    const data = await api.settings.update(newSettings);
    setSettings(data);
  };

  return (
    <AppContext.Provider value={{
      products,
      batteryRequests,
      maintenanceRequests,
      tradeInRequests,
      messages,
      orders,
      visits,
      heroSliders,
      addProduct,
      updateProduct,
      deleteProduct,
      addBatteryRequest,
      updateBatteryStatus,
      addMaintenanceRequest,
      updateMaintenanceStatus,
      addTradeInRequest,
      updateTradeInStatus,
      markMessageAsRead,
      updateOrderStatus,
      uploadProductImage,
      settings,
      updateSettings,
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
