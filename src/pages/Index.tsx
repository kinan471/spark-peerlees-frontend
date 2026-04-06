import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/public/HeroSection";
import ProductsSection from "@/components/public/ProductsSection";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import CTASection from "@/components/public/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="space-y-4 md:space-y-0">
        <HeroSection />
        <ProductsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
