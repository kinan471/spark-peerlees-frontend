import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/public/HeroCarousel";
import ProductsSection from "@/components/public/ProductsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="space-y-0">
        <HeroCarousel />
        <ProductsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
