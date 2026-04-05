import { Cpu, Battery, Smartphone, Monitor, ShieldCheck, Zap } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Telefon Tamiri",
    description: "En son teknolojik ekipmanlarla ekran, batarya değişim ve yazılım tamiri.",
    tag: "Popüler",
  },
  {
    icon: Monitor,
    title: "Laptop Tamiri",
    description: "Kapsamlı temizlik, RAM yükseltme ve anakart sorunlarının çözümü.",
    tag: "Profesyonel",
  },
  {
    icon: Battery,
    title: "Batarya Kliniği",
    description: "Elektrikli bisiklet ve scooterlar için lityum bataryaların revizyonu ve bakımı.",
    tag: "Uzmanlık",
  },
  {
    icon: Cpu,
    title: "Orijinal Parça",
    description: "Uzun ömürlü performans sağlamak için sadece orijinal yedek parçalar kullanıyoruz.",
    tag: "Kalite",
  },
  {
    icon: ShieldCheck,
    title: "Onarım Garantisi",
    description: "Tüm bakım hizmetlerinde 6 aya kadar gerçek garanti.",
    tag: "Garantili",
  },
  {
    icon: Zap,
    title: "Hızlı Onarım",
    description: "Çoğu acil durum için aynı gün bakım hizmeti.",
    tag: "Hızlı",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-black uppercase tracking-widest border border-secondary/20">
            Profesyonel Bakım Hizmetleri
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Neden <span className="text-secondary">SPARK Bakımını</span> Seçmelisiniz?
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Cihazları sadece onarmakla kalmıyoruz, onları aşırı hassasiyet ve yılların tecrübesiyle orijinal durumlarına getiriyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative bg-white p-8 rounded-3xl tech-shadow hover:shadow-premium transition-all duration-500 hover:-translate-y-2 border border-slate-100/50 overflow-hidden"
              style={{ animation: `slide-up 0.6s ease-out ${index * 0.1}s both` }}
            >
              {/* Decorative background circle */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-inner">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <span className="repair-badge opacity-0 group-hover:opacity-100 transition-opacity">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
