import { ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
}

const ProductCard = ({ name, price, image, category, rating, isNew }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden tech-shadow hover:shadow-premium transition-all duration-500 group border border-slate-100/50">
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
          <span className="bg-white/90 backdrop-blur-md text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-100 shadow-sm uppercase tracking-wider">
            {category}
          </span>
        </div>

        {/* Quick Actions */}
        <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < rating ? "text-accent fill-accent" : "text-slate-200"}`}
            />
          ))}
          <span className="text-[10px] font-bold text-slate-400 ml-1">({rating}.0)</span>
        </div>

        <h3 className="text-lg font-black text-slate-900 leading-tight line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
          {name}
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-accent">{price}</span>
            <span className="text-xs font-bold text-slate-400">TL</span>
          </div>
          
          <Button className="w-full h-12 bg-slate-900 hover:bg-primary text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-slate-200 hover:shadow-primary/30 gap-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Sepete Ekle</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
