import { useParams, Link } from "react-router-dom";
import { ArrowRight, Zap, MessageCircle, Star, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, settings, addOrder } = useApp();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background font-cairo">
        <Navbar />
        <div className="pt-32 text-center">
          <p className="text-2xl text-muted-foreground">Ürün bulunamadı</p>
          <Link to="/products" className="text-primary mt-4 inline-block hover:underline">
            Ürünlere Geri Dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleWhatsAppOrder = async () => {
    if (product.id) {
      await addOrder({
        product_id: product.id,
        customer_name: "WhatsApp Müşterisi",
        customer_phone: "WhatsApp üzerinden"
      });
    }
    
    const whatsappMsg = encodeURIComponent(`Merhaba ${settings.siteName}, şu ürünü satın almak istiyorum: ${product.name_ar} (₺${product.price})\nBağlantı: ${window.location.href}`);
    const whatsappUrl = `https://wa.me/${settings.whatsappNumber.replace('+', '')}?text=${whatsappMsg}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <ArrowRight className="w-3 h-3 rotate-180" />
            <Link to="/products" className="hover:text-primary transition-colors">Ürünler</Link>
            <ArrowRight className="w-3 h-3 rotate-180" />
            <span className="text-foreground">{product.name_ar}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Gallery */}
            <div className="space-y-4" style={{ animation: "fade-in 0.5s ease-out" }}>
              <div className="glass-card overflow-hidden aspect-[4/3]">
                <img
                  src={product.image_url}
                  alt={product.name_ar}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6" style={{ animation: "slide-up 0.6s ease-out" }}>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                <h1 className="text-3xl md:text-4xl font-black text-foreground">{product.name_ar}</h1>
                {product.name_tr && <p className="text-sm text-muted-foreground mt-1">{product.name_tr}</p>}
              </div>

              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 5 ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                  />
                ))}
                <span className="text-muted-foreground text-sm">(5.0)</span>
              </div>

              <div className="flex items-baseline gap-3">
                <p className="text-4xl font-black gradient-text">₺{product.price.toLocaleString()}</p>
                <span className="text-sm text-muted-foreground line-through opacity-50">₺{(product.price * 1.2).toLocaleString()}</span>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description_tr || product.description_ar || "Bu ürün için henüz açıklama mevcut değil."}
              </p>

              {/* Product Badges */}
              <div className="grid grid-cols-2 gap-3 pb-2">
                <div className="glass-card p-3 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <div className="text-xs">
                    <p className="font-bold">Spark Garantisi</p>
                    <p className="text-muted-foreground">%100 Orijinal</p>
                  </div>
                </div>
                <div className="glass-card p-3 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <div className="text-xs">
                    <p className="font-bold">Hızlı Teslimat</p>
                    <p className="text-muted-foreground">48 saat içinde</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="flex-1 text-base h-14 group"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  WhatsApp ile Sipariş Ver
                </Button>
                <Button variant="glass" size="lg" className="flex-1 text-base h-14">
                  <Zap className="w-5 h-5" />
                  Favorilere Ekle
                </Button>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mt-20 bg-muted/20 p-6 md:p-10 rounded-2xl border backdrop-blur-md shadow-xl" style={{ animation: "fade-in 0.8s ease-out" }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-primary rounded-full"></div>
                <h2 className="text-2xl font-black text-foreground">
                  Teknik Özellikler
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-1">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center py-4 border-b border-muted/50 hover:bg-muted/10 transition-colors px-2">
                    <span className="text-muted-foreground font-medium text-sm md:text-base">{key}</span>
                    <span className="text-foreground font-bold text-sm md:text-base text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
