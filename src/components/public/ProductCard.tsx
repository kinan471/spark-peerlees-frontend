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
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 group flex flex-col h-full uppercase">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center p-4">
        <img
          src={image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1026&auto=format&fit=crop'}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1026&auto=format&fit=crop';
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {isNew && (
            <span className="bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">
              YENİ
            </span>
          )}
          {isSparkCertified && (
            <span className="bg-secondary text-secondary-foreground flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase tracking-tighter">
              SPARK ONAYLI
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow border-t border-slate-50">
        <h3 className="text-sm font-bold text-slate-800 leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors mb-3">
          {name}
        </h3>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {power && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
              <Zap className="w-3 h-3 text-secondary" /> 
              <span>{power}</span>
            </div>
          )}
          {speed && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
              <Gauge className="w-3 h-3 text-primary" /> 
              <span>{speed}</span>
            </div>
          )}
          {range && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
              <Battery className="w-3 h-3 text-green-500" /> 
              <span>{range}</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-3 flex flex-col gap-3">
          <div className="flex items-baseline gap-0.5">
            <span className="text-xl font-black text-slate-900">{price}</span>
            <span className="text-[10px] font-bold text-slate-400">TL</span>
          </div>
          
          <Button 
            onClick={handleWhatsApp}
            className="w-full h-10 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold rounded-xl transition-all duration-300 gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Sipariş Ver</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
