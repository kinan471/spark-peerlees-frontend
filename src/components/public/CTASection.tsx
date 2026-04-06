import { Button } from "@/components/ui/button";
import { MessageCircle, Rocket, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

const CTASection = () => {
  const { settings } = useApp();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="relative bg-slate-900 rounded-[3rem] p-12 lg:p-24 overflow-hidden shadow-2xl shadow-slate-200">
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          </div>
          
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl scale-150" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 text-xs font-black uppercase tracking-widest animate-pulse">
              <Rocket className="w-4 h-4 text-primary" />
              Geleceğin Teknolojisine Katılın
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tight max-w-4xl">
              <span className="text-primary">Teknoloji</span> deneyiminizi yükseltmeye hazır mısınız?
            </h2>

            <p className="text-slate-400 text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
              Uzman ekibimiz sorularınızı yanıtlamaya ve en iyi kararı vermeniz için size rehberlik etmeye hazır.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              <a href={`https://wa.me/${settings.whatsappNumber || '905387845388'}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-16 px-12 bg-white text-slate-900 hover:bg-slate-50 font-black text-xl rounded-2xl transition-all shadow-xl shadow-black/20 gap-3 group">
                  <MessageCircle className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  Hemen Bize Ulaşın
                </Button>
              </a>
              <Link to="/products" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full h-16 px-12 text-white border-2 border-white/10 hover:bg-white/5 font-black text-xl rounded-2xl gap-2 transition-all">
                  Mağazayı Keşfet
                  <ArrowRight className="w-5 h-5 opacity-50" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
