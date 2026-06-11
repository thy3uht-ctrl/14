import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PERSONAL_INFO } from "../data";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "介紹" },
    { id: "experience", label: "插圖" },
    { id: "projects", label: "小漫畫" },
    { id: "skills", label: "遊戲音樂推薦" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-zinc-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo / Name */}
        <div 
          onClick={() => handleNavClick("hero")}
          className="cursor-pointer group flex flex-col"
          id="header-logo"
        >
          <span className="font-display font-bold tracking-wider text-xl text-zinc-900 group-hover:text-zinc-600 transition-colors">
            {PERSONAL_INFO.name}
          </span>
          <span className="font-mono text-[9px] lowercase tracking-widest text-zinc-400 group-hover:text-zinc-500 transition-colors">
            {PERSONAL_INFO.englishName}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`font-sans text-xs uppercase tracking-[0.15em] font-medium transition-all relative py-2 ${
                activeSection === item.id
                  ? "text-zinc-950 font-bold"
                  : "text-zinc-400 hover:text-zinc-900"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-zinc-950" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button & Status */}
        <div className="hidden md:flex items-center space-x-4" id="header-actions">
          <div className="flex items-center space-x-1.5 bg-zinc-100 px-3 py-1 rounded-sm border border-zinc-200 text-[10px] text-zinc-600 font-mono uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse"></span>
            <span>正在遊玩FF14中</span>
          </div>
          <a
            id="header-cta-btn"
            href="https://www.ffxiv.com.tw/pr/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 bg-zinc-950 text-white select-none hover:bg-zinc-800 px-5 py-2.5 rounded-sm font-sans text-xs font-semibold tracking-widest uppercase transition-all shadow-sm"
          >
            <span>一起遊玩</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-zinc-700 hover:text-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-200 rounded"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-zinc-100 shadow-xl overflow-hidden py-6 px-6 flex flex-col space-y-4 animate-fadeIn" id="mobile-nav">
          <div className="flex items-center space-x-2 bg-zinc-50 p-2.5 rounded-lg border border-zinc-200 text-xs text-zinc-600 font-medium font-sans">
            <span className="w-2 h-2 rounded-full bg-zinc-900 animate-pulse"></span>
            <span>遊戲狀態：正在遊玩FF14中，歡迎線上組隊</span>
          </div>
          
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 px-3 rounded-md text-sm font-medium font-sans transition-colors ${
                  activeSection === item.id
                    ? "bg-zinc-50 text-zinc-950 font-semibold border-l-2 border-zinc-950"
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <a
            id="mobile-cta-btn"
            href="https://www.ffxiv.com.tw/pr/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 bg-zinc-950 text-white py-3 rounded-md text-sm font-semibold tracking-wider hover:bg-zinc-800 transition-colors"
          >
            <span>一起遊玩</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
