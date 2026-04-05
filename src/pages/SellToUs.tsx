import React, { useState } from "react";
import { Camera, Send, MessageCircle, Info } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const SellToUs = () => {
  const { settings, addMessage } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    model: "",
    condition: "excellent",
    price: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const conditionLabels: Record<string, string> = {
    excellent: "Mükemmel (Sıfır Gibi)",
    good: "Çok İyi (Temiz Kullanılmış)",
    fair: "İyi (Küçük Bakım Gerektirir)",
    poor: "Kapsamlı Bakım Gerektirir",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addMessage({
        name: formData.name,
        email: "sell-offer@swarder.com",
        subject: "Müşteriden Satış Teklifi",
        message: `Model: ${formData.model}\nDurum: ${conditionLabels[formData.condition]}\nİstenen Fiyat: ${formData.price}\nDetaylar: ${formData.description}`,
      });
      
      setSuccess(true);
      
      const msg = encodeURIComponent(
        `Merhaba Spark Peerless, aracımı satmak istiyorum:\nAd: ${formData.name}\nModel: ${formData.model}\nDurum: ${conditionLabels[formData.condition]}\nİstenen Fiyat: ${formData.price}₺`
      );
      const whatsappNumber = settings.whatsappNumber.replace(/\D/g, "") || "905387845388";
      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
      }, 2000);

    } catch (err) {
      console.error("Error submitting offer:", err);
      alert("Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 glass-card px-4 py-2 text-sm text-primary font-medium mb-6">
                <Camera className="w-4 h-4" />
                İkinci El Pazarı
              </div>
              <h1 className="text-3xl md:text-5xl font-black mb-4">
                Aracınızı <span className="gradient-text">Bize Satın</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Satmak istediğiniz elektrikli bisiklet veya scooter var mı? Adil fiyatlarla satın alıyor ve nakit ödeme yapıyoruz.
              </p>
            </div>

            {success ? (
              <div className="glass-card p-12 text-center animate-scale-in">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Teklifiniz Başarıyla Gönderildi!</h2>
                <p className="text-muted-foreground mb-8">
                  Detayları görüşmek ve inceleme randevusu belirlemek için WhatsApp üzerinden sizinle iletişime geçeceğiz.
                </p>
                <Button onClick={() => window.location.href = '/'} variant="hero" size="lg">
                  Ana Sayfaya Dön
                </Button>
              </div>
            ) : (
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-start gap-4 p-4 bg-primary/5 border border-primary/20 rounded-2xl mb-8">
                  <Info className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div className="text-sm text-muted-foreground">
                    Lütfen tüm detayları eksiksiz doldurun. Gönder'e tıkladıktan sonra araç fotoğraflarını doğrudan bize göndermek için WhatsApp'a yönlendirileceksiniz.
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium pr-1">Adınız</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-12 px-4 bg-secondary/50 border border-glass-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Tam adınız"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium pr-1">İletişim Numarası</label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-12 px-4 bg-secondary/50 border border-glass-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="+90 5xx"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium pr-1">Araç Türü ve Modeli</label>
                      <input
                        required
                        type="text"
                        value={formData.model}
                        onChange={(e) => setFormData({...formData, model: e.target.value})}
                        className="w-full h-12 px-4 bg-secondary/50 border border-glass-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Örnek: RKS RS3 Pro"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium pr-1">Beklenen Fiyat (₺)</label>
                      <input
                        required
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full h-12 px-4 bg-secondary/50 border border-glass-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="İstediğiniz tutar"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium pr-1">Araç Durumu</label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      className="w-full h-12 px-4 bg-secondary/50 border border-glass-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="excellent">Mükemmel (Sıfır Gibi)</option>
                      <option value="good">Çok İyi (Temiz Kullanılmış)</option>
                      <option value="fair">İyi (Küçük Bakım Gerektirir)</option>
                      <option value="poor">Kapsamlı Bakım Gerektirir</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium pr-1">Ek Detaylar</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-secondary/50 border border-glass-border/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      placeholder="Varsa yapılan modifikasyonlar veya önceki arızalar hakkında bilgi veriniz..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full h-14 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Gönderiliyor..." : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Teklifi Gönder ve WhatsApp'a Geç
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellToUs;
