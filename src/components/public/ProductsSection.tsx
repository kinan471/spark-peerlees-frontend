import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";

const ProductsSection = () => {
  const { products } = useApp();
  
  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-200">
              <Zap className="w-3 h-3 fill-slate-500" />
              Swarder Ürün Kataloğu
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Tüm Ürünler
            </h2>
          </div>

          <div className="hidden lg:block">
            <Link to="/products">
              <Button variant="outline" size="sm" className="h-10 px-6 rounded-xl border border-slate-200 font-bold hover:bg-slate-50 transition-all gap-2">
                Tümünü Gör
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 12).map((product, index) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <ProductCard
                name={product.name_ar}
                price={`${product.price ? product.price.toLocaleString() : '0'}`}
                image={product.image_url}
                category={product.category}
                rating={5}
                isNew={index < 2}
                power={product.power}
                range={product.range}
                weight={product.weight}
                speed={product.speed}
                isSparkCertified={product.is_spark_certified}
              />
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 lg:hidden px-6">
          <Link to="/products">
            <Button variant="outline" size="lg" className="w-full h-12 rounded-xl border border-slate-200 font-bold gap-2">
              Tüm Ürünleri Görüntüle
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
