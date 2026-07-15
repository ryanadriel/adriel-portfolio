import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.tsx";

interface HeaderProps {
  activeSection: string;
}

export function Header({ activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
    { id: "hero", label: t("nav_hero") },
    { id: "about", label: t("nav_about") },
    { id: "experience", label: t("nav_experience") },
    { id: "projects", label: t("nav_projects") },
    { id: "skills", label: t("nav_skills") },
    { id: "principles", label: t("nav_principles") },
    { id: "contact", label: t("nav_contact") },
  ];

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-panel py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b border-border-dark/60"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <button
            onClick={() => handleScrollTo("hero")}
            className="flex items-center gap-1 group cursor-pointer focus:outline-none"
            id="header-logo-btn"
          >
            <div className="flex flex-col items-start leading-none">
              <div className="flex items-center gap-1.5">
                <div className="w-[6px] h-[6px] bg-[#1072FB] rounded-[2px]" />
                <span className="text-sm font-semibold tracking-wider text-text-primary group-hover:text-primary-blue transition-colors duration-200">
                  ADRIEL BARBOSA
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-text-muted mt-0.5">
                BACKEND ENGINEER
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`relative px-4 py-2 text-xs font-medium transition-colors duration-200 rounded-full cursor-pointer focus:outline-none ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  id={`nav-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-white/5 rounded-full -z-10 border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Language Switcher */}
          <div className="hidden lg:flex items-center gap-2 border border-border-dark bg-surface-dark/40 p-1 rounded-full text-xs font-mono select-none">
            <button
              onClick={() => setLanguage("pt")}
              className={`p-1 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer border ${
                language === "pt"
                  ? "bg-primary-blue/20 border-primary-blue/30 scale-105"
                  : "border-transparent opacity-50 hover:opacity-100 hover:bg-white/5"
              }`}
              title="Português"
            >
              <img src="https://flagsapi.com/BR/shiny/64.png" alt="BR" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`p-1 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer border ${
                language === "en"
                  ? "bg-primary-blue/20 border-primary-blue/30 scale-105"
                  : "border-transparent opacity-50 hover:opacity-100 hover:bg-white/5"
              }`}
              title="English"
            >
              <img src="https://flagsapi.com/US/shiny/64.png" alt="US" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer"
            id="mobile-menu-toggle"
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[57px] z-40 lg:hidden glass-panel border-b border-border-dark p-6 shadow-2xl flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-left ${
                      isActive
                        ? "bg-primary-blue/10 text-primary-blue border-l-2 border-primary-blue pl-3"
                        : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className={`w-4 h-4 opacity-40 ${isActive ? "text-primary-blue opacity-100" : ""}`} />
                  </button>
                );
              })}
            </div>
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between border-t border-border-dark/60 pt-4 mt-2">
              <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-wider">Idioma / Language</span>
              <div className="flex items-center gap-2 border border-border-dark bg-surface-dark/40 p-1 rounded-full text-xs font-mono select-none">
                <button
                  onClick={() => setLanguage("pt")}
                  className={`p-1 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer border ${
                    language === "pt"
                      ? "bg-primary-blue/20 border-primary-blue/30 scale-105"
                      : "border-transparent opacity-50 hover:opacity-100 hover:bg-white/5"
                  }`}
                >
                  <img src="https://flagsapi.com/BR/shiny/64.png" alt="BR" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`p-1 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer border ${
                    language === "en"
                      ? "bg-primary-blue/20 border-primary-blue/30 scale-105"
                      : "border-transparent opacity-50 hover:opacity-100 hover:bg-white/5"
                  }`}
                >
                  <img src="https://flagsapi.com/US/shiny/64.png" alt="US" className="w-5 h-5 object-contain" referrerPolicy="no-referrer" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
