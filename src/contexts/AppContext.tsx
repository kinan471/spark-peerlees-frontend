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
  akakce_url?: string;
  created_at?: string;
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

interface AppContextType {
  products: Product[];
  batteryRequests: BatteryCustomization[];
  maintenanceRequests: MaintenanceRequest[];
  tradeInRequests: TradeInRequest[];
  
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  
  addBatteryRequest: (req: Omit<BatteryCustomization, 'id' | 'created_at' | 'status'>) => Promise<void>;
  updateBatteryStatus: (id: string, status: BatteryCustomization['status']) => Promise<void>;

  addMaintenanceRequest: (req: Omit<MaintenanceRequest, 'id' | 'created_at' | 'status'>) => Promise<void>;
  updateMaintenanceStatus: (id: string, status: MaintenanceRequest['status']) => Promise<void>;

  addTradeInRequest: (req: Omit<TradeInRequest, 'id' | 'created_at' | 'status'>) => Promise<void>;
  updateTradeInStatus: (id: string, status: TradeInRequest['status']) => Promise<void>;
  
  uploadProductImage: (file: File) => Promise<string | null>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [batteryRequests, setBatteryRequests] = useState<BatteryCustomization[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [tradeInRequests, setTradeInRequests] = useState<TradeInRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    applyTheme();
  }, []);

  const applyTheme = () => {
    // Swarder specific theme enforcement (Light mode, #007BFF, #FFC107)
    const root = document.documentElement;
    root.classList.remove('dark');
    root.style.setProperty('--primary', '211 100% 50%'); // #007BFF -> HSL: 211, 100%, 50%
    root.style.setProperty('--ring', '211 100% 50%');
    root.style.setProperty('--primary-foreground', '0 0% 100%');
    root.style.setProperty('--secondary', '45 100% 51%'); // #FFC107 -> HSL: 45, 100%, 51%
    root.style.setProperty('--secondary-foreground', '0 0% 13%'); // #222
  };

  const loadData = async () => {
    try {
      const [productsData, batteryData, maintenanceData, tradeInData] = await Promise.all([
        api.products.list(),
        api.batteryCustomization.list(),
        api.maintenance.list(),
        api.tradeIn.list()
      ]);
      setProducts(productsData);
      setBatteryRequests(batteryData);
      setMaintenanceRequests(maintenanceData);
      setTradeInRequests(tradeInData);
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

  const uploadProductImage = async (file: File) => {
    try {
      return await api.upload(file);
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  return (
    <AppContext.Provider value={{
      products,
      batteryRequests,
      maintenanceRequests,
      tradeInRequests,
      addProduct,
      updateProduct,
      deleteProduct,
      addBatteryRequest,
      updateBatteryStatus,
      addMaintenanceRequest,
      updateMaintenanceStatus,
      addTradeInRequest,
      updateTradeInStatus,
      uploadProductImage,
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
