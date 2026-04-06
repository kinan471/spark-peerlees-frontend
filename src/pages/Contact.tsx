import { useState } from "react";
import { MessageCircle, Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const Contact = () => {
  const { settings, addMessage } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
    } catch (err) {
      console.error("Database connection failed:", err);
    }

    const msg = encodeURIComponent(
      `Merhaba, siteden yeni bir mesaj:\nAd: ${formData.name}\nE-posta: ${formData.email}\nTelefon: ${formData.phone}\nKonu: ${formData.subject}\nMesaj: ${formData.message}`
    );
    
    const landingPhone = settings.whatsappNumber.replace(/\D/g, "") || "905387845388";
    window.open(`https://wa.me/${landingPhone}?text=${msg}`, "_blank");
  };
  
  const contactInfo = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: `+${settings.whatsappNumber}`,
      href: `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`,
      description: "7/24 Doğrudan İletişim",
    },
    {
      icon: Mail,
      title: "E-posta",
      value: "Rgb2gb20@gmail.com",
      href: "mailto:Rgb2gb20@gmail.com",
      description: "24 saat içinde yanıtlıyoruz",
    },
    {
      icon: Phone,
      title: "Telefon",
      value: "+90 538 784 53 88",
      href: "tel:+905387845388",
      description: "Sabah 9 - Akşam 8",
    },
    {
      icon: MapPin,
      title: "Adres",
      value: "İstanbul, Türkiye",
      href: "#",
      description: "Önceden randevu alarak ziyaret edin",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-cairo">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h1 className="text-3xl md:text-5xl font-black mb-4">
              Bizimle <span className="gradient-text">İletişime Geçin</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Her türlü soru veya talep için bizimle iletişime geçmekten memnuniyet duyarız. Ekibimiz size yardımcı olmaya hazır.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {contactInfo.map((info, i) => (
              <a
                key={info.title}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="glass-card p-6 text-center hover:glow-border transition-all duration-500 group"
                style={{ animation: `slide-up 0.5s ease-out ${i * 0.1}s both` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <info.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{info.title}</h3>
                <p className="text-sm text-primary font-medium mb-1" dir="ltr">{info.value}</p>
                <p className="text-xs text-muted-foreground">{info.description}</p>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="lg:col-span-2 glass-card p-8">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Bize <span className="gradient-text">Mesaj Gönderin</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    required
                    placeholder="Tam Adınız"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-11 px-4 bg-secondary/50 border border-glass-border/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <input
                    type="email"
                    placeholder="E-posta Adresiniz"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 px-4 bg-secondary/50 border border-glass-border/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    dir="ltr"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    placeholder="Telefon Numaranız"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-11 px-4 bg-secondary/50 border border-glass-border/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    dir="ltr"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Konu"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="h-11 px-4 bg-secondary/50 border border-glass-border/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <textarea
                  required
                  placeholder="Mesajınız..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary/50 border border-glass-border/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
                <Button type="submit" variant="hero" size="lg" className="w-full text-base">
                  <Send className="w-5 h-5" />
                  WhatsApp ile Gönder
                </Button>
              </form>
            </div>

            <div className="glass-card p-8 h-fit">
              <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Çalışma Saatleri
              </h3>
              <div className="space-y-4">
                {[
                  { day: "Pazartesi - Cuma", hours: "09:00 - 20:00" },
                  { day: "Cumartesi", hours: "10:00 - 18:00" },
                  { day: "Pazar", hours: "Kapalı" },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between items-center py-2 border-b border-glass-border/15 last:border-0">
                    <span className="text-sm text-foreground">{item.day}</span>
                    <span className={`text-sm font-medium ${item.hours === "Kapalı" ? "text-destructive" : "text-primary"}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-glass-border/15">
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="glass" className="w-full">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Sohbeti
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
