import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmet Yılmaz",
    role: "Müşteri - Laptop Tamiri",
    content: "Çok profesyonel ve hızlı servis. Cihazım bir günde hayata döndü ve fiyatı da çok uygundu. Kesinlikle tavsiye ederim!",
    avatar: "https://i.pravatar.cc/150?u=ahmed",
  },
  {
    name: "Selin Kaya",
    role: "Müşteri - Telefon Satın Alma",
    content: "Mükemmel durumda bir ikinci el telefon satın aldım ve kargo beklediğimden çok daha hızlı geldi. Ambalaj son derece profesyoneldi.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Mehmet Demir",
    role: "Müşteri - Batarya Tamiri",
    content: "Batarya bakımında dahice bir ekip. Yüksek maliyetli yeni batarya almaktan kurtardılar. Teşekkürler SPARK!",
    avatar: "https://i.pravatar.cc/150?u=mohamed",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-200">
            Müşterilerimiz Ne Diyor?
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Müşteri Güveni <span className="text-primary">En Büyük Sermayemiz</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            SPARK uzmanlarına cihazlarının bakımını ve en iyi teknolojiyi edinmeyi güvenen kişilerin gerçek başarı hikayeleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="group bg-slate-50 p-10 rounded-[2.5rem] tech-shadow hover:shadow-premium transition-all duration-500 hover:-translate-y-2 border border-slate-100/50 flex flex-col justify-between"
              style={{ animation: `slide-up 0.6s ease-out ${i * 0.15}s both` }}
            >
              <div className="space-y-6">
                <Quote className="w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
                <p className="text-slate-600 font-bold leading-relaxed text-lg italic">
                  "{t.content}"
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                  ))}
                </div>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-2xl object-cover shadow-lg border-2 border-white" />
                <div>
                  <h4 className="text-slate-900 font-black text-sm">{t.name}</h4>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
