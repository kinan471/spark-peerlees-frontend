import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import WhatsAppButton from "./components/public/WhatsAppButton.tsx";
import { AppProvider, useApp } from "./contexts/AppContext.tsx";

// Lazy Loaded Pages (Code Splitting for Lightning Fast Performance)
const Index = lazy(() => import("./pages/Index.tsx"));
const Products = lazy(() => import("./pages/Products.tsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.tsx"));
const Maintenance = lazy(() => import("./pages/Maintenance.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Swarder = lazy(() => import("./pages/Swarder.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.tsx"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts.tsx"));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages.tsx"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders.tsx"));

const queryClient = new QueryClient();

const VisitTracker = () => {
  const { trackVisit } = useApp();
  const location = useLocation();

  useEffect(() => {
    trackVisit(location.pathname);
    // Scroll to the top automatically when navigating to a new page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); 
  }, [location.pathname]);

  return null;
};

// Loading Spinner for Chunk Setup
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <VisitTracker />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/swarder" element={<Swarder />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <WhatsAppButton />
        </BrowserRouter>

      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
