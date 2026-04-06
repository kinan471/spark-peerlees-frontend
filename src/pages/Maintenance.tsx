import { useState } from "react";
import { Battery, Wrench, CheckCircle, Clock, Shield, Zap, MessageCircle, ChevronRight, Smartphone, Laptop, Cpu, Monitor, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";

const services = [
  {
    icon: Battery,
    title: "Batarya Bakımı (Swarder)",
    description: "Lityum bataryalar için kapsamlı inceleme, hücre dengeleme ve hasarlı parça değişimi.",
    price: "₺300",
  },
  {
    icon: Laptop,
    title: "Ev Aletleri Bakımı",
    description: "Kahve makineleri, robot süpürgeler ve akıllı ev sistemlerinin onarımı.",
    price: "₺450",
  },
  {
    icon: Wrench,
    title: "Elektrikli Bisiklet ve Scooter Tamiri",
    description: "Swarder mühendislerinin gözetiminde motor, kontrol paneli ve fren onarımı.",
    price: "₺250",
  },
  {
    icon: Shield,
    title: "Periyodik Önleyici Bakım",
    description: "Cihazlarınızı ve araçlarınızı kapsamlı teknik inceleme ile ani arızalara karşı güvence altına alın.",
    price: "₺150",
  },
];

const features = [
  {
    icon: Smartphone,
    title: "Telefon Tamiri",
    description: "En son teknolojik ekipmanlarla ekran, batarya değişim ve yazılım tamiri.",
    tag: "Popüler"
  },
  {
    icon: Monitor,
    title: "Laptop Tamiri",
    description: "Kapsamlı temizlik, RAM yükseltme ve anakart sorunlarının çözümü.",
    tag: "Profesyonel"
  },
  {
    icon: Battery,
    title: "Batarya Kliniği",
    description: "Elektrikli bisiklet ve scooterlar için lityum bataryaların revizyonu ve bakımı.",
    tag: "Uzmanlık Alanımız"
  },
  {
    icon: Cpu,
    title: "Orijinal Parça",
    description: "Uzun ömürlü performans sağlamak için sadece orijinal yedek parçalar kullanıyoruz.",
    tag: "Kalite"
  },
  {
    icon: ShieldCheck,
    title: "Onarım Garantisi",
    description: "Tüm bakım hizmetlerinde 6 aya kadar gerçek garanti.",
    tag: "Garantili"
  },
  {
    icon: Zap,
    title: "Hızlı Onarım",
    description: "Çoğu acil durum için aynı gün şarj ve bakım hizmeti.",
    tag: "Hızlı"
  },
];

const steps = [
  { num: "01", title: "Randevu Al", desc: "Bizimle WhatsApp üzerinden iletişime geçin" },
  { num: "02", title: "Teknik İnceleme", desc: "Sorunun hassas tespiti" },
  { num: "03", title: "Maliyet Teklifi", desc: "Tam finansal şeffaflık" },
  { num: "04", title: "Teslimat", desc: "Cihazınız garantili olarak hazır" },
];

const Maintenance = () => {
  const { addMaintenanceRequest } = useApp();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    deviceType: "",
    issue: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addMaintenanceRequest({
      customer_name: formData.name,
      customer_phone: formData.phone,
      issue_type: 'general',
      description: `Cihaz: ${formData.deviceType}\nSorun: ${formData.issue}`
    });

    const msg = encodeURIComponent(
      `Merhaba SPARK, bakım randevusu almak istiyorum:\nİsim: ${formData.name}\nTelefon: ${formData.phone}\nCihaz: ${formData.deviceType}\nSorun: ${formData.issue}`
    );
    window.open(`https://wa.me/905387845388?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-secondary/20 selection:text-secondary">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -mr-80 -mt-40" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-8 text-center lg:text-right">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-black uppercase tracking-widest border border-secondary/20">
                  Yetkili Bakım Merkezi
                </div>
                <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight tracking-tight">
                  Profesyonel Bakım <br/><span className="text-secondary">İçin İlk Seçiminiz</span>
                </h1>
                <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto lg:mr-0 leading-relaxed">
                  Tüm elektronik cihazlarınızı gerçek garanti ve küresel teknik uzmanlıkla onarmak için akıllı çözümler sunuyoruz.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 font-bold text-slate-400 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-secondary" /> Orijinal Parçalar</div>
                  <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-secondary" /> Hızlı Uygulama</div>
                  <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-secondary" /> 6 Ay Garanti</div>
                </div>
              </div>
              
              <div className="flex-1 relative group">
                <div className="absolute inset-0 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />
                <div className="relative bg-white p-4 rounded-[3rem] tech-shadow rotate-3 group-hover:rotate-0 transition-transform duration-500 border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1470&auto=format&fit=crop" 
                    alt="Maintenance Service" 
                    className="rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section (Why Choose Us) - Dark Theme */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          {/* Decorative grid background */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <div className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-black uppercase tracking-widest border border-secondary/30">
                Profesyonel Bakım Hizmetleri
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                Neden <span className="text-secondary">SPARK Bakımını</span> Seçmelisiniz?
              </h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Cihazları sadece onarmakla kalmıyoruz, onları aşırı hassasiyet ve yılların tecrübesiyle orijinal durumlarına getiriyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-slate-800 p-8 rounded-3xl hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all duration-500 hover:-translate-y-2 border border-slate-700 overflow-hidden"
                  style={{ animation: `slide-up 0.6s ease-out ${index * 0.1}s both` }}
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full group-hover:scale-150 transition-transform duration-700 blur-xl" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:border-secondary group-hover:text-white transition-all duration-500 shadow-inner">
                        <feature.icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 bg-slate-700 text-slate-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        {feature.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-secondary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed font-medium text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 text-center mb-16 tracking-tight">
              Teknik <span className="text-secondary">Hizmetlerimiz</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="bg-white p-10 rounded-[2.5rem] tech-shadow hover:shadow-premium transition-all duration-500 hover:-translate-y-2 border border-slate-100/50 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-8 group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">{service.description}</p>
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-2xl font-black text-secondary">{service.price}</span>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-6 text-center lg:text-right text-white">
                <h2 className="text-4xl lg:text-6xl font-black tracking-tight">Hemen Randevunuzu <br/><span className="text-secondary">Alın</span></h2>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  Bilgilerinizi doldurun, teknik uzmanımız bakım randevusu almak için 15 dakikadan kısa sürede sizinle iletişime geçecektir.
                </p>
                <div className="pt-6">
                  <a href={`tel:+905387845388`} className="inline-flex items-center gap-4 text-2xl font-black text-white hover:text-secondary transition-colors">
                    +90 538 784 53 88
                  </a>
                </div>
              </div>

              <div className="flex-1 w-full">
                <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] tech-shadow space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Tam Adınız</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                      placeholder="Adınız buraya..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Telefon Numarası</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                        placeholder="+90..."
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Cihaz Türü</label>
                      <input
                        type="text"
                        required
                        value={formData.deviceType}
                        onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                        className="w-full h-14 px-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                        placeholder="Örneğin: iPhone 13"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Sorunun Açıklaması</label>
                    <textarea
                      required
                      value={formData.issue}
                      onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                      rows={4}
                      className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-bold focus:bg-white focus:ring-2 focus:ring-secondary/20 transition-all outline-none resize-none"
                      placeholder="Neyin onarılması gerektiğini bize açıklayın..."
                    />
                  </div>

                  <Button type="submit" className="w-full h-16 bg-secondary hover:bg-secondary/95 text-white font-black text-xl rounded-2xl shadow-xl shadow-secondary/20 gap-3 group transition-all active:scale-95">
                    <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
                    <span>Hemen İletişime Geçin</span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Maintenance;
