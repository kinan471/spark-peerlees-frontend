import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/spark-logo.png";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Mağaza", href: "/store" },
  { label: "Batarya Laboratuvarı", href: "/battery-lab" },
  { label: "Bakım Merkezi", href: "/maintenance" },
  { label: "Bize Sat", href: "/sell-to-us" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-100 shadow-sm animate-fade-in">
      {/* Top Bar - Logo */}
      <div className="w-full flex justify-center py-2 bg-white">
        <Link to="/" className="transition-transform duration-300 hover:scale-105">
          <img src={logo} alt="Swarder" className="h-10 lg:h-16 w-auto object-contain" />
        </Link>
      </div>

      {/* Navigation Links - Bottom Bar (Mobile Tabs / Desktop Menu) */}
      <div className="w-full border-t border-slate-50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-0 lg:px-4">
          <div className="flex items-center justify-center h-12 lg:h-14 overflow-x-auto no-scrollbar scroll-smooth">
            <div className="flex items-center gap-0 lg:gap-1 px-4 lg:px-0 min-w-max">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 lg:px-6 py-3 lg:py-2 text-[11px] lg:text-sm font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    location.pathname === link.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-slate-500 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
