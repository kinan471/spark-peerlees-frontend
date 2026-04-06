import { Button } from "@/components/ui/button";
import { ShoppingBag, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import heroTech from "@/assets/hero-tech.png";

const HeroSection = () => {
  const { settings } = useApp();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden bg-background">
      {/* العناصر الزخرفية في الخلفية */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-64 -mt-32 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -ml-48 -mb-24" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* محتوى النصوص */}
          <div className="flex-1 space-y-8 text-center lg:text-right group animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Yetkili Teknoloji Merkezi
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              <span className="block mb-2 text-primary">{settings.site_name}</span>
              <span className="block text-4xl mt-4">Akıllı Hareketlilik Çözümleri</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-semibold">
              {settings.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-xl shadow-primary/20 group-hover:-translate-y-1 transition-all gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Ürünlerimizi Keşfedin
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Button>
              </Link>
            </div>
          </div>

          {/* حاوية الصورة */}
          <div className="flex-1 relative w-full max-w-[600px] h-[400px] lg:h-[600px] animate-tech-float">
            <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent -z-10 rounded-full blur-3xl opacity-50" />
            <img 
              src={heroTech} 
              alt="Premium Electronics" 
              className="w-full h-full object-contain filter drop-shadow-2xl drop-shadow-slate-400/20 pointer-events-none select-none p-8" 
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;