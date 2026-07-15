import React from "react";
import { Heart, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.tsx";

export function Footer() {
  const { language, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <footer className="border-t border-border-dark bg-[#080808] py-12 relative overflow-hidden">
      {/* Visual background ambient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border-dark to-transparent" />

      {/* Editorial Highlights Grid (extracted from Design Theme) */}
      <div className="max-w-7xl mx-auto border-b border-border-dark/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12 text-left relative z-10">
        <div className="p-6 md:py-8 md:px-12 border-b sm:border-b-0 sm:border-r border-border-dark/60 flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-widest text-text-muted font-mono font-bold">
            {language === "pt" ? "EXPERIÊNCIA" : "EXPERIENCE"}
          </span>
          <span className="text-sm text-text-primary font-medium font-serif">
            {language === "pt" ? "Engenharia de Backend" : "Backend Engineering"}
          </span>
        </div>
        <div className="p-6 md:py-8 md:px-12 border-b sm:border-b-0 lg:border-r border-border-dark/60 flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-widest text-text-muted font-mono font-bold">
            {language === "pt" ? "ARQUITETURA" : "ARCHITECTURE"}
          </span>
          <span className="text-sm text-text-primary font-medium font-serif">
            {language === "pt" ? "Design Limpo & SOLID" : "Clean Design & SOLID"}
          </span>
        </div>
        <div className="p-6 md:py-8 md:px-12 border-b sm:border-b-0 sm:border-r border-border-dark/60 flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-widest text-text-muted font-mono font-bold">
            {language === "pt" ? "PERFORMANCE" : "PERFORMANCE"}
          </span>
          <span className="text-sm text-text-primary font-medium font-serif">
            {language === "pt" ? "Runtimes de API Otimizados" : "Optimized API Runtimes"}
          </span>
        </div>
        <div className="p-6 md:py-8 md:px-12 flex flex-col gap-1.5">
          <span className="text-[10px] uppercase tracking-widest text-text-muted font-mono font-bold">
            {language === "pt" ? "LOCALIZAÇÃO" : "LOCATION"}
          </span>
          <span className="text-sm text-text-primary font-medium font-serif">
            {language === "pt" ? "Remoto / Global" : "Remote / Global"}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Brand Left */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <button
            onClick={() => handleScrollTo("hero")}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
            id="footer-logo-btn"
          >
            <div className="w-[6px] h-[6px] bg-[#1072FB] rounded-[2px]" />
            <span className="text-sm font-bold tracking-widest text-text-primary font-serif">
              ADRIEL BARBOSA
            </span>
          </button>
          <span className="text-[10px] font-mono tracking-widest text-text-muted mt-1 uppercase">
            Backend Software Engineer
          </span>
        </div>

        {/* Navigation Middle */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-mono font-semibold text-text-secondary">
          <button onClick={() => handleScrollTo("hero")} className="hover:text-primary-blue transition-colors duration-200 cursor-pointer">{t("nav_hero").toUpperCase()}</button>
          <button onClick={() => handleScrollTo("about")} className="hover:text-primary-blue transition-colors duration-200 cursor-pointer">{t("nav_about").toUpperCase()}</button>
          <button onClick={() => handleScrollTo("experience")} className="hover:text-primary-blue transition-colors duration-200 cursor-pointer">{t("nav_experience").toUpperCase()}</button>
          <button onClick={() => handleScrollTo("projects")} className="hover:text-primary-blue transition-colors duration-200 cursor-pointer">{t("nav_projects").toUpperCase()}</button>
          <button onClick={() => handleScrollTo("skills")} className="hover:text-primary-blue transition-colors duration-200 cursor-pointer">{t("nav_skills").toUpperCase()}</button>
        </div>

        {/* Socials & Copyright Right */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ryanadriel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border-dark bg-surface-dark/40 hover:border-text-secondary/20 hover:text-text-primary text-text-secondary transition-all duration-300 cursor-pointer"
              id="footer-github"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/adriel-ryan/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-border-dark bg-surface-dark/40 hover:border-text-secondary/20 hover:text-text-primary text-text-secondary transition-all duration-300 cursor-pointer"
              id="footer-linkedin"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:adrielryan.tj@hotmail.com"
              className="p-2 rounded-lg border border-border-dark bg-surface-dark/40 hover:border-text-secondary/20 hover:text-text-primary text-text-secondary transition-all duration-300 cursor-pointer"
              id="footer-email"
              aria-label="E-mail"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end text-[10px] font-mono text-text-muted leading-none mt-1">
            <span>
              © {currentYear} Adriel Barbosa. {language === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
