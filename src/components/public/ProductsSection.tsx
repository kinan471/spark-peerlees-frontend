import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";

const ProductsSection = () => {
  const { products } = useApp();
  const swarderCategories = ['ebike', 'scooter', 'accessory'];
  const featured = products
    .filter(p => !swarderCategories.includes(p.category))
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-24" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-4 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/20">
              <Zap className="w-3 h-3 fill-accent" />
              Swarder Elektrikli Mobilite Ürünleri
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              En Yeni E-Mobilite Ürünleri
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl lg:ml-0 lg:mr-auto">
              Şehir içi ulaşımda çığır açan, yüksek performanslı ve Spark onaylı elektrikli araç modellerimizi keşfedin.
            </p>
          </div>

          <div className="hidden lg:block">
            <Link to="/store">
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl border-2 border-slate-100 font-bold hover:bg-slate-50 hover:text-primary transition-all gap-3">
                Tümünü Gör
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product, index) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <div style={{ animation: `slide-up 0.6s ease-out ${index * 0.1}s both` }}>
                <ProductCard
                  name={product.name_ar}
                  price={`${product.price ? product.price.toLocaleString() : '0'}`}
                  image={product.image_url}
                  category={product.category}
                  rating={5}
                  isNew={index === 0}
                  power={product.power}
                  range={product.range}
                  weight={product.weight}
                  speed={product.speed}
                  isSparkCertified={product.is_spark_certified}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16 lg:hidden">
          <Link to="/products">
            <Button variant="outline" size="lg" className="w-full h-14 rounded-2xl border-2 border-slate-100 font-bold gap-3">
              Tüm Ürünleri Görüntüle
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
