import { Sparkles, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import logo from "@/assets/spark-logo.png";

const Footer = () => {
  const { settings } = useApp();
  
  return (
    <footer className="bg-slate-50 border-t border-slate-200/50">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand & Mission */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={logo} alt="Spark" className="h-10 w-auto" />
            </Link>
            <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
              En iyi ürünler ve güvenilir bakım hizmetleri ile teknoloji deneyiminizi yeniden tanımlıyoruz.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white tech-shadow flex items-center justify-center text-slate-400 hover:text-primary hover:scale-110 transition-all duration-300 border border-slate-100">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Site Links */}
          <div className="space-y-6">
            <h3 className="text-slate-900 font-black text-lg">Site Haritası</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Galeri", href: "/" },
                { label: "Ürünler", href: "/products" },
                { label: "Swarder Bölümü", href: "/swarder" },
                { label: "Bakım Bölümü", href: "/maintenance" },
                { label: "Bize Ulaşın", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-slate-500 font-bold hover:text-primary transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h3 className="text-slate-900 font-black text-lg">Gizlilik ve Kurallar</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: "Gizlilik Politikası" },
                { label: "Kullanım Şartları" },
                { label: "Garanti Politikası" },
              ].map((link, i) => (
                <a key={i} href="#" className="text-slate-500 font-bold hover:text-primary transition-colors text-sm">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-6">
            <h3 className="text-slate-900 font-black text-lg">İletişim</h3>
            <div className="flex flex-col gap-4">
              <a href="mailto:Rgb2gb20@gmail.com" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors">Rgb2gb20@gmail.com</span>
              </a>
              <a href="tel:+905387845388" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors" dir="ltr">+90 538 784 53 88</span>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-600">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-bold text-slate-400">
            © {new Date().getFullYear()} SPARK ELECTRONICS. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-accent" />
              Daha iyi bir gelecek için tutkuyla tasarlandı
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
