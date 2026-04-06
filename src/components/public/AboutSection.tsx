import React from 'react';
import { Target, Lightbulb, Heart } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="about">
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-black leading-relaxed">
                <span className="gradient-text">Swarder</span>'ın Hikayesi
              </h2>
              <div className="w-20 h-1.5 gradient-primary rounded-full" />
            </div>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-justify">
              <strong>Swarder</strong>, İstanbul'da akıllı elektrikli ulaşım konusunda her şey için birinci durak olmak üzere kurulmuştur. Biz sadece bir mağaza değil, batarya bakımı ve elektrikli bisiklet ile scooter revizyonu konusunda uzmanlaşmış bir klinikiz.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-justify">
              Geleceğin yeşil olduğuna inanıyor ve elektrikli aracınızın orijinal yedek parçalar ve yenilikçi çözümlerle maksimum verimlilik ve güvenlikle çalışmasını sağlamak için her gün çalışıyoruz.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="space-y-3">
                <Target className="w-8 h-8 text-primary" />
                <h3 className="font-bold">Vizyonumuz</h3>
                <p className="text-sm text-muted-foreground">Sürdürülebilir akıllı ulaşıma geçişe öncülük etmek</p>
              </div>
              <div className="space-y-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                <h3 className="font-bold">Misyonumuz</h3>
                <p className="text-sm text-muted-foreground">Güvenilir ve yenilikçi bakım ve satış çözümleri sunmak</p>
              </div>
              <div className="space-y-3">
                <Heart className="w-8 h-8 text-primary" />
                <h3 className="font-bold">Değerlerimiz</h3>
                <p className="text-sm text-muted-foreground">Şeffaflık, kalite ve müşteri memnuniyeti önce gelir</p>
              </div>
            </div>
          </div>

          {/* Image/Visual Overlay */}
          <div className="relative group perspective-1000">
            <div className="relative z-20 overflow-hidden rounded-3xl border border-white/10 shadow-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop" 
                alt="Swarder Workshop" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 right-8 left-8">
                <div className="glass-card p-6 border border-white/20">
                  <p className="text-white font-bold text-xl mb-1">+500 Mutlu Müşteri</p>
                  <p className="text-white/70 text-sm">İstanbul'da kalite ve güvenilirlik üzerine güvenimizi inşa ettik</p>
                </div>
              </div>
            </div>
            
            {/* Decorative background cards */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-primary/10 rounded-3xl -rotate-2 -z-10" />
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-secondary/10 rounded-3xl rotate-2 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
