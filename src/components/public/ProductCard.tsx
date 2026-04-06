import { MessageCircle, Star, Heart, Zap, Battery, Weight, Gauge, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  price: string | number;
  image: string;
  category: string;
  rating?: number;
  isNew?: boolean;
  power?: string;
  range?: string;
  weight?: string;
  speed?: string;
  isSparkCertified?: boolean;
}

const ProductCard = ({ 
  name, price, image, category, rating = 5, isNew, 
  power, range, weight, speed, isSparkCertified 
}: ProductCardProps) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Merhaba, ${name} (Fiyat: ${price} TL) ürünü hakkında bilgi almak ve satın almak istiyorum.`);
    window.open(`https://wa.me/+905387845388?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden tech-shadow hover:shadow-premium transition-all duration-500 group border border-slate-100/50 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 flex items-center justify-center p-6">
        <img
          src={image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1026&auto=format&fit=crop'}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1026&auto=format&fit=crop';
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
              Yeni
            </span>
          )}
          {isSparkCertified && (
            <span className="bg-secondary text-secondary-foreground flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wider">
              <CheckCircle className="w-3 h-3" /> Spark Onaylı
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-md text-slate-500 text-[10px] font-bold px-3 py-1 w-fit rounded-full border border-slate-100 shadow-sm uppercase tracking-wider">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < rating ? "text-accent fill-accent" : "text-slate-200"}`}
              />
            ))}
          </div>
        </div>

        <h3 className="text-lg font-black text-slate-900 leading-tight line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors mb-4">
          {name}
        </h3>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-3 rounded-2xl border border-slate-100/60 mt-auto">
          {power && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <Zap className="w-4 h-4 text-secondary drop-shadow-sm" /> 
              <span>{power}</span>
            </div>
          )}
          {speed && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <Gauge className="w-4 h-4 text-primary drop-shadow-sm" /> 
              <span>{speed}</span>
            </div>
          )}
          {range && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <Battery className="w-4 h-4 text-green-500 drop-shadow-sm" /> 
              <span>{range}</span>
            </div>
          )}
          {weight && (
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
              <Weight className="w-4 h-4 text-slate-400 drop-shadow-sm" /> 
              <span>{weight}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-slate-900">{price}</span>
            <span className="text-xs font-bold text-slate-500">TL</span>
          </div>
          
          <Button 
            onClick={handleWhatsApp}
            className="w-full h-12 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-[#25D366]/30 hover:shadow-[#128C7E]/40 gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp'tan Al</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
