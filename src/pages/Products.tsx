import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Box, SearchX } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/public/ProductCard";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";

const Products = () => {
  const { products } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  
  const filtered = products
    .filter((p) => p.name_ar.includes(searchQuery) || (p.name_tr && p.name_tr.includes(searchQuery)))
    .sort((a, b) => {
      if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          
          {/* Page Header */}
          <div className="bg-white rounded-[3rem] p-12 lg:p-20 tech-shadow mb-12 relative overflow-hidden border border-slate-100/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 text-center lg:text-right max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                <Box className="w-3 h-3" />
                Geleceğin Teknolojisi Elinizde
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight">
                Elektrikli Mobilite Mağazası
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl lg:mr-0 lg:ml-auto">
                Yüksek performanslı elektrikli bisiklet ve scooter modellerimizi keşfedin. Garantili kalite, teknik destek ve özelleştirme imkanları.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar / Filters */}
            <aside className="lg:w-80 space-y-10">
              <div className="space-y-4">
                <h3 className="text-slate-900 font-black text-sm uppercase tracking-widest">Akıllı Arama</h3>
                <div className="relative group">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Ürün arayın..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pr-12 pl-6 bg-white border border-slate-100 rounded-2xl text-slate-900 font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none"
                  />
                </div>
              </div>



              <div className="space-y-4">
                <h3 className="text-slate-900 font-black text-sm uppercase tracking-widest">Sıralama</h3>
                <div className="relative group">
                  <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full h-14 pl-12 pr-6 bg-white border border-slate-100 rounded-2xl text-slate-900 font-bold appearance-none focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                  >
                    <option value="default">Varsayılan</option>
                    <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
                    <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-slate-400 font-bold text-sm">
                  <span className="text-slate-900">{filtered.length}</span> ürün bulundu
                </p>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filtered.map((product, index) => (
                    <Link key={product.id} to={`/products/${product.id}`} className="block group">
                      <div style={{ animation: `slide-up 0.5s ease-out ${index % 6 * 0.05}s both` }}>
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
              ) : (
                <div className="bg-white rounded-[3rem] py-32 tech-shadow flex flex-col items-center justify-center space-y-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                    <SearchX className="w-12 h-12" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Sonuç Bulunamadı</h3>
                    <p className="text-slate-500 font-medium">Farklı anahtar kelimeler veya kategoriler aramayı deneyin.</p>
                  </div>
                  <Button onClick={() => setSearchQuery("")} variant="outline" className="rounded-xl h-12 font-bold px-8">
                    Aramayı Sıfırla
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
