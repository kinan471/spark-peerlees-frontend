import * as React from "react";
import { Link } from "react-router-dom";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { ShoppingBag, ArrowRight, Zap, Battery } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const HeroCarousel = () => {
  const { heroSliders, products, loading } = useApp();
  
  // إعداد ملحق التشغيل التلقائي
  const plugin = React.useRef(
    Autoplay({ 
      delay: 1500, // المدة بين السلايدات (3.5 ثانية)
      stopOnInteraction: false, // لا يتوقف عند الضغط أو السحب
      stopOnMouseEnter: true    // يتوقف مؤقتاً فقط عند وضع الماوس فوقه
    })
  );

  if (loading) {
    return (
      <div className="w-full h-[60vh] bg-slate-50 flex items-center justify-center pt-24">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const featuredProducts = products.filter(p => p.is_featured);
  const hasCustomSliders = heroSliders && heroSliders.length > 0;
  const hasFeaturedProducts = featuredProducts.length > 0;

  if (!hasCustomSliders && !hasFeaturedProducts) {
    return (
      <div className="w-full h-[40vh] bg-slate-50 flex items-center justify-center pt-32 text-center px-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Swarder Dünyasına Hoş Geldiniz</h3>
          <p className="text-slate-500 mt-2">Öne çıkan ürünlerimizi ve kampanyalarımızı هنا تجدها.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full pt-32 pb-8 bg-white selection:bg-primary/10">
      <div className="container mx-auto px-4 lg:px-6">
        <Carousel
          // opts={{ loop: true }} تضمن العودة للسلايد الأول بعد الأخير بلا توقف
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[plugin.current]}
          className="w-full relative overflow-hidden rounded-[1.5rem] lg:rounded-[2.5rem] tech-shadow bg-slate-50 border border-slate-100"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {/* عرض السلايدر المخصص من لوحة التحكم */}
            {hasCustomSliders && heroSliders.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className="relative flex flex-col lg:flex-row items-center h-auto min-h-[400px] lg:min-h-[600px] overflow-hidden">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={slide.image_url} 
                      alt={slide.title_tr} 
                      className="w-full h-full object-cover lg:object-right opacity-90 transition-transform duration-1000 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:from-white lg:via-white/40 lg:to-transparent" />
                  </div>
                  <div className="relative z-10 flex-1 p-8 lg:p-20 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl">
                    {slide.title_ar && (
                      <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                        {slide.title_ar}
                      </div>
                    )}
                    <h1 className="text-3xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tighter">
                      {slide.title_tr}
                    </h1>
                    <p className="text-base lg:text-xl text-slate-600 font-medium leading-relaxed max-w-lg">
                      {slide.subtitle_tr}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link to={slide.link_url || '/store'} className="w-full sm:w-auto">
                        <Button 
                          size="lg" 
                          className="w-full h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all gap-2 transform hover:-translate-y-1"
                        >
                          {slide.button_text_tr}
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="hidden lg:block flex-1" />
                </div>
              </CarouselItem>
            ))}

            {/* عرض المنتجات المميزة في حال عدم وجود سلايدر مخصص */}
            {!hasCustomSliders && featuredProducts.map((product) => (
              <CarouselItem key={product.id}>
                <div className="flex flex-col lg:flex-row items-center min-h-[400px] lg:min-h-[550px] p-6 lg:p-16 gap-6 lg:gap-12 bg-white">
                  <div className="flex-1 relative w-full h-[250px] lg:h-[450px] flex items-center justify-center order-1 lg:order-2">
                    <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent -z-10 rounded-full blur-3xl opacity-60" />
                    <img
                      src={product.image_url}
                      alt={product.name_tr || product.name_ar}
                      className="w-full h-full object-contain filter drop-shadow-2xl animate-tech-float p-4"
                    />
                  </div>
                  <div className="flex-1 space-y-4 lg:space-y-8 text-center lg:text-left order-2 lg:order-1 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 mx-auto lg:ml-0">
                      Öne Çıkan Ürün
                    </div>
                    <h2 className="text-3xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tighter">
                      {product.name_tr || product.name_ar}
                    </h2>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                      {product.power && (
                        <div className="flex items-center gap-1.5 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                          <Zap className="w-3.5 h-3.5 text-secondary" />
                          <span className="text-xs lg:text-sm font-bold text-slate-700">{product.power}</span>
                        </div>
                      )}
                      {product.range && (
                        <div className="flex items-center gap-1.5 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                          <Battery className="w-3.5 h-3.5 text-green-500" />
                          <span className="text-xs lg:text-sm font-bold text-slate-700">{product.range}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-2xl lg:text-5xl font-black text-primary">
                      {product.price ? product.price.toLocaleString() : '0'} <span className="text-sm font-bold opacity-70">TL</span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                      <Link to={`/products/${product.id}`} className="w-full lg:w-auto">
                        <Button 
                          size="lg" 
                          className="w-full h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg transition-all gap-2 transform hover:-translate-y-1"
                        >
                          <ShoppingBag className="w-5 h-5" />
                          İNCELE
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden lg:block">
            <CarouselPrevious className="left-8 w-12 h-12 bg-white/80 backdrop-blur-sm border-none hover:bg-white transition-all shadow-xl text-primary" />
            <CarouselNext className="right-8 w-12 h-12 bg-white/80 backdrop-blur-sm border-none hover:bg-white transition-all shadow-xl text-primary" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default HeroCarousel;