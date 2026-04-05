import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import logo from "@/assets/spark-logo.png";

const navLinks = [
  { label: "Galeri", href: "/" },
  { label: "Ürünler", href: "/products" },
  { label: "Swarder Bölümü", href: "/swarder" },
  { label: "Bakım Bölümü", href: "/maintenance" },
  { label: "Bize Ulaşın", href: "/contact" },
];

const Navbar = () => {
  const { settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 tech-shadow animate-fade-in">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105">
              <img src={logo} alt="Spark" className="h-10 w-auto object-contain" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    location.pathname === link.href
                      ? "text-primary bg-primary/5 shadow-[inset_0_0_10px_rgba(37,99,235,0.05)]"
                      : "text-slate-600 hover:text-primary hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="relative group">
              <Button variant="ghost" size="icon" className="text-slate-600 hover:text-primary group-hover:bg-primary/5 transition-all w-10 h-10 rounded-xl">
                <Search className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-slate-600 hover:text-primary hover:bg-primary/5 transition-all w-10 h-10 rounded-xl">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Actions Overlay */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 active:scale-90 transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 inset-x-0 bg-white border-b border-slate-100 shadow-xl animate-slide-up origin-top">
          <div className="flex flex-col p-6 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-5 py-4 rounded-xl text-lg font-bold transition-all ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/5 border border-primary/20"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
