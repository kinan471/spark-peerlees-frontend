import React, { useState } from "react";
import { motion } from "framer-motion";
import { Battery, Zap, ShieldCheck, Cpu, Send, Settings, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  { icon: Battery, title: "Lityum İyon Hücreler", desc: "A Sınıfı yüksek kaliteli pil hücreleri" },
  { icon: Cpu, title: "Akıllı BMS", desc: "Bataryanızı aşırı şarja ve ısınmaya karşı korur" },
  { icon: Zap, title: "Hızlı Şarj", desc: "Optimum kimyasal denge ile yüksek verim" },
  { icon: ShieldCheck, title: "1 Yıl Garanti", desc: "Kapasite testinden geçmiş onaylı piller" },
];

const BatteryLab = () => {
  const { addBatteryRequest } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    voltage: "36",
    capacity: "10",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addBatteryRequest({
        customer_name: formData.name,
        customer_phone: formData.phone,
        voltage: parseInt(formData.voltage),
        capacity: parseInt(formData.capacity),
        notes: formData.notes
      });
      
      setSuccess(true);
      
      const msg = encodeURIComponent(
        `Merhaba SPARK Battery Lab, özel batarya siparişi vermek istiyorum:\nAd: ${formData.name}\nVoltaj: ${formData.voltage}V\nKapasite: ${formData.capacity}Ah\nNotlar: ${formData.notes || "Yok"}`
      );
      const whatsappNumber = "905387845388";
      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
      }, 2000);

    } catch (err) {
      console.error("Error submitting battery request:", err);
      alert("Talebiniz gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-cairo selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      <main className="pt-24 pb-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -mr-40 -mt-20 pointer-events-none" />
          <div className="container mx-auto px-4 z-10 relative">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-sm mb-6 shadow-xl">
                <Settings className="w-4 h-4 animate-spin-slow" />
                Özel Batarya Üretim Laboratuvarı
              </motion.div>
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-8">
                Performansı Zirveye <br/><span className="text-primary">Taşıyın</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                Elektrikli bisikletiniz veya scooter'ınız için ihtiyaç duyduğunuz tam kapasiteye ve voltaja sahip bataryayı sizin için sıfırdan üretiyoruz.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Info & Form Section */}
        <section className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            
            {/* Features (Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-12"
            >
              <div className="relative rounded-[3rem] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1472&auto=format&fit=crop" 
                  alt="Battery Construction" 
                  className="w-full h-[300px] lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                  <h3 className="text-white text-2xl font-black">Yüksek Kalite Standartları</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <feat.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-slate-900 font-black mb-2">{feat.title}</h4>
                    <p className="text-slate-500 font-medium text-sm">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Customization Form (Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -mr-4 -mt-4 opacity-50" />
                
                <h3 className="text-3xl font-black text-slate-900 mb-2">Sipariş Oluştur</h3>
                <p className="text-slate-500 font-medium mb-10">Talebinizi iletin, size en uygun çözümü sunalım.</p>

                {success ? (
                  <div className="text-center py-10 animate-fade-in">
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4">Talebiniz Alındı!</h4>
                    <p className="text-slate-500 mb-8">
                      WhatsApp uygulamasına yönlendirileceksiniz. Teknik ekibimiz detayları görüşmek için hazır.
                    </p>
                    <Button onClick={() => window.location.href = '/'} className="h-12 bg-slate-900 hover:bg-primary font-bold px-8 rounded-xl w-full">
                      Ana Sayfaya Dön
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Adınız Soyadınız</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        placeholder="Adınız"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Telefon Numaranız</label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        placeholder="+90 5xx..."
                        dir="ltr"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Voltaj (V)</label>
                        <select
                          value={formData.voltage}
                          onChange={(e) => setFormData({...formData, voltage: e.target.value})}
                          className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none"
                        >
                          <option value="24">24V</option>
                          <option value="36">36V</option>
                          <option value="48">48V</option>
                          <option value="52">52V</option>
                          <option value="60">60V</option>
                          <option value="72">72V</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Kapasite (Ah)</label>
                        <input
                          required
                          type="number"
                          value={formData.capacity}
                          onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                          className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                          placeholder="Örn: 15"
                          min="5"
                          max="100"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Ek Notlar / Kutu Ölçüleri</label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        rows={4}
                        className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                        placeholder="Özel istekleriniz, maksimum alan ölçüleriniz vb..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-16 bg-primary hover:bg-blue-600 text-white font-black text-xl rounded-2xl shadow-xl shadow-primary/30 group transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Gönderiliyor..." : (
                        <>
                          <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Talebi Gönder
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BatteryLab;
