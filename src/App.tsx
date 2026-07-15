/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Header } from "./components/Header.tsx";
import { InteractiveArchitecture } from "./components/InteractiveArchitecture.tsx";
import { Timeline } from "./components/Timeline.tsx";
import { SkillsGrid } from "./components/SkillsGrid.tsx";
import { ProjectsShowcase } from "./components/ProjectsShowcase.tsx";
import { Principles } from "./components/Principles.tsx";
import { ContactForm } from "./components/ContactForm.tsx";
import { Footer } from "./components/Footer.tsx";
import { useLanguage } from "./context/LanguageContext.tsx";
import { 
  ArrowDown, Code2, Terminal, Cpu, Database, Cloud, 
  Layers, ChevronRight, Sparkles, Server, CheckCircle, FileText
} from "lucide-react";

export default function App() {
  const { language, t } = useLanguage();
  const [activeSection, setActiveSection] = useState("hero");
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  // Global scroll progress indicator (Stripe/Vercel aesthetic)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Active section scroll tracking
  useEffect(() => {
    const sections = ["hero", "about", "experience", "projects", "skills", "principles", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // Trigger when section occupies the active view center
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Scroll listener for floating resume download button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="bg-[#080808] text-white min-h-screen flex flex-col font-sans relative overflow-x-hidden selection:bg-primary-blue/30 selection:text-white">
      
      {/* Editorial Grid Lines Backdrop */}
      <div className="absolute inset-0 editorial-grid-lines pointer-events-none z-0" />

      {/* Top Scroll Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary-blue z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Decorative Glow Dots Background */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary-blue/5 rounded-full filter blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] bg-primary-blue/5 rounded-full filter blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-primary-blue/5 rounded-full filter blur-[150px] pointer-events-none z-0" />

      {/* Premium Navigation Header */}
      <Header activeSection={activeSection} />

      {/* 1. HERO SECTION */}
      <section 
        id="hero" 
        className="relative pt-24 pb-14 md:pt-28 md:pb-16 lg:min-h-[calc(100vh-80px)] flex items-center justify-center border-b border-border-dark/40 z-10"
      >
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content (7 columns on desktop) */}
          <div className="lg:col-span-6 flex flex-col gap-6 items-start text-left">
            
            {/* Embedded Active SSH Console Tag */}
            <div className="flex items-center gap-2 bg-[#111111] border border-border-dark px-4 py-1.5 rounded-full text-[11px] font-mono font-semibold text-text-secondary select-none animate-float shadow-sm">
              <span className="w-1.5 h-1.5 rounded-sm bg-primary-blue animate-pulse" />
              <span className="hidden md:inline">adriel@production_cluster:~$ ssh saas_gateway</span>
            </div>

            {/* Title & Headline (Editorial Aesthetic font-serif) */}
            <div className="flex flex-col gap-3">
              <span className="editorial-badge w-fit">{t("software_engineer")}</span>
              <h1 className="text-4xl xs:text-5xl md:text-6xl lg:text-[64px] font-serif font-bold tracking-tight text-white leading-[1.1]">
                Adriel Barbosa
              </h1>
              
              {/* Elegant Dot Divider Subtitle */}
              <div className="flex flex-wrap items-center gap-y-1.5 text-[10px] xs:text-xs font-mono font-semibold text-text-secondary mt-1 tracking-wide uppercase">
                <span>Laravel</span>
                <span className="w-1 h-1 rounded-full bg-text-muted mx-2.5" />
                <span>PHP</span>
                <span className="w-1 h-1 rounded-full bg-text-muted mx-2.5" />
                <span>Node.js</span>
                <span className="w-1 h-1 rounded-full bg-text-muted mx-2.5" />
                <span>Docker</span>
                <span className="w-1 h-1 rounded-full bg-text-muted mx-2.5" />
                <span>REST APIs</span>
              </div>
            </div>

            {/* Subtext description */}
            <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-lg font-normal">
              {t("hero_description")}
            </p>

            {/* Action buttons (Editorial Minimalist style) */}
            <div className="flex flex-wrap gap-3 mt-2 w-full sm:w-auto">
              <button
                onClick={() => handleScrollTo("projects")}
                className="px-6 py-3 rounded-md bg-primary-blue hover:bg-primary-blue/90 text-xs font-mono font-bold tracking-wider text-white flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-md"
                id="hero-view-projects-btn"
              >
                <span>{t("btn_view_projects")}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleScrollTo("contact")}
                className="px-6 py-3 rounded-md border border-border-dark hover:border-primary-blue/50 text-xs font-mono font-bold tracking-wider text-text-secondary hover:text-primary-blue bg-transparent transition-all duration-300 cursor-pointer"
                id="hero-contact-btn"
              >
                <span>{t("btn_talk_to_me")}</span>
              </button>
            </div>
          </div>

          {/* Hero Right Content: Visual System Interactive Architecture Sandbox (6 columns) */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <InteractiveArchitecture />
          </div>
        </div>

        {/* Ambient Arrow Indicator */}
        <button 
          onClick={() => handleScrollTo("about")}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2.5 rounded-full border border-border-dark text-text-muted hover:text-text-primary hover:border-primary-blue/40 transition-all duration-300 cursor-pointer animate-bounce hidden md:block"
          aria-label={t("rolar_para_sobre")}
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </section>

      {/* 2. ABOUT ME SECTION (Bento UI layout) */}
      <section 
        id="about" 
        className="py-14 sm:py-16 md:py-20 lg:py-24 border-b border-border-dark/40 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-3 mb-14 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-primary-blue font-bold uppercase">
              {t("about_title")}
            </span>
            <h2 className="text-3xl font-serif font-semibold tracking-tight text-white">
              {t("about_subtitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story Biography (7 Columns) */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-left text-xs md:text-sm leading-relaxed text-text-secondary w-full">
              <p>
                {t("about_p1")}
              </p>
              <p>
                {t("about_p2")}
              </p>
              <p>
                {t("about_p3")}
              </p>

              {/* Highlight metrics card block */}
              <div className="grid grid-cols-3 gap-2 xs:gap-4 border border-border-dark/60 bg-surface-dark/20 p-2.5 xs:p-4 rounded-xl mt-4 select-none">
                <div className="flex flex-col gap-1 leading-none">
                  <span className="text-[8px] xs:text-[10px] font-mono text-text-muted uppercase tracking-wider">{t("metric_exp")}</span>
                  <span className="text-sm xs:text-base sm:text-xl font-bold text-text-primary font-mono">{t("metric_exp_val")}</span>
                </div>
                <div className="flex flex-col gap-1 leading-none">
                  <span className="text-[8px] xs:text-[10px] font-mono text-text-muted uppercase tracking-wider">{t("metric_apis")}</span>
                  <span className="text-sm xs:text-base sm:text-xl font-bold text-primary-blue font-mono">{t("metric_apis_val")}</span>
                </div>
                <div className="flex flex-col gap-1 leading-none">
                  <span className="text-[8px] xs:text-[10px] font-mono text-text-muted uppercase tracking-wider">{t("metric_latency")}</span>
                  <span className="text-sm xs:text-base sm:text-xl font-bold text-emerald-400 font-mono">{t("metric_latency_val")}</span>
                </div>
              </div>
            </div>

            {/* Immersive Backend PHP Code mock representing high engineering quality (5 Columns) */}
            <div className="lg:col-span-5 w-full hidden lg:block">
              <div className="glass-panel rounded-xl border border-border-dark bg-black/80 p-4 font-mono text-[10px] text-[#A9B1D6] leading-relaxed shadow-2xl relative select-text overflow-x-auto">
                <div className="flex items-center justify-between border-b border-border-dark/60 pb-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E06C75]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E5C07B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#98C379]" />
                    <span className="text-[9px] text-text-muted ml-2 font-mono">TenantBillingService.php</span>
                  </div>
                  <span className="text-[8px] text-text-muted uppercase">Clean Laravel PHP 8</span>
                </div>
                
                {/* Code highlight mock */}
                <div className="flex flex-col gap-0.5 select-text">
                  <span><span className="text-[#C678DD]">namespace</span> App\Services\Billing;</span>
                  <span className="text-text-muted">// SOLID Dependency Inversion Principle</span>
                  <span><span className="text-[#C678DD]">class</span> TenantBillingService <span className="text-[#C678DD]">implements</span> BillingInterface {"{"}</span>
                  <span className="pl-4"><span className="text-[#C678DD]">public</span> <span className="text-[#C678DD]">function</span> __construct(</span>
                  <span className="pl-8"><span className="text-[#C678DD]">private</span> RepositoryInterface <span className="text-[#E5C07B]">$repo</span>,</span>
                  <span className="pl-8"><span className="text-[#C678DD]">private</span> CacheInterface <span className="text-[#E5C07B]">$cache</span></span>
                  <span className="pl-4">) {"{}"}</span>
                  <span className="text-text-muted pl-4">// Cache-Aside Pattern optimized with Sub-millisecond Redis</span>
                  <span className="pl-4"><span className="text-[#C678DD]">public</span> <span className="text-[#C678DD]">function</span> getTenantInvoice(string <span className="text-[#E5C07B]">$id</span>): Invoice {"{"}</span>
                  <span className="pl-8"><span className="text-[#E5C07B]">$cacheKey</span> = <span className="text-[#98C379]">"tenant:invoice:{"{"}$id{"}"}"</span>;</span>
                  <span className="pl-8"><span className="text-[#C678DD]">return</span> <span className="text-[#E5C07B]">$this</span>-&gt;cache-&gt;remember(<span className="text-[#E5C07B]">$cacheKey</span>, 3600, <span className="text-[#C678DD]">function</span>() {"{"}</span>
                  <span className="pl-12"><span className="text-[#C678DD]">return</span> <span className="text-[#E5C07B]">$this</span>-&gt;repo-&gt;findActiveInvoice(<span className="text-[#E5C07B]">$id</span>);</span>
                  <span className="pl-8">{"}"});</span>
                  <span className="pl-4">{"}"}</span>
                  <span>{"}"}</span>
                </div>

                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-primary-blue/10 border border-primary-blue/20 text-[9px] text-primary-blue px-2 py-0.5 rounded font-mono font-bold leading-none uppercase">
                  <CheckCircle className="w-3 h-3 text-primary-blue" />
                  <span>SOLID COMPLIANT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE SECTION */}
      <section 
        id="experience" 
        className="py-14 sm:py-16 md:py-20 lg:py-24 border-b border-border-dark/40"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-3 mb-16 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-primary-blue font-bold uppercase">
              {t("exp_title")}
            </span>
            <h2 className="text-3xl font-serif font-semibold tracking-tight text-white">
              {t("exp_subtitle")}
            </h2>
          </div>

          <Timeline />
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SECTION */}
      <section 
        id="projects" 
        className="py-14 sm:py-16 md:py-20 lg:py-24 border-b border-border-dark/40 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-3 mb-16 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-primary-blue font-bold uppercase">
              {t("projects_title")}
            </span>
            <h2 className="text-3xl font-serif font-semibold tracking-tight text-white">
              {t("projects_subtitle")}
            </h2>
          </div>

          <ProjectsShowcase />
        </div>
      </section>

      {/* 5. SKILLS GRID SECTION */}
      <section 
        id="skills" 
        className="py-14 sm:py-16 md:py-20 lg:py-24 border-b border-border-dark/40"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-3 mb-14 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-primary-blue font-bold uppercase">
              {t("skills_title")}
            </span>
            <h2 className="text-3xl font-serif font-semibold tracking-tight text-white">
              {t("skills_subtitle")}
            </h2>
          </div>

          <SkillsGrid />
        </div>
      </section>

      {/* 6. ENGINEERING PRINCIPLES SECTION */}
      <section 
        id="principles" 
        className="py-14 sm:py-16 md:py-20 lg:py-24 border-b border-border-dark/40 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-3 mb-16 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-primary-blue font-bold uppercase">
              {t("principles_title")}
            </span>
            <h2 className="text-3xl font-serif font-semibold tracking-tight text-white">
              {t("principles_subtitle")}
            </h2>
          </div>

          <Principles />
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section 
        id="contact" 
        className="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-3 mb-16 text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-primary-blue font-bold uppercase">
              {t("contact_title")}
            </span>
            <h2 className="text-3xl font-serif font-semibold tracking-tight text-white">
              {t("contact_subtitle")}
            </h2>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* Floating Resume Download Button */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.a
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={language === "pt" ? "/documents/Adriel_Barbosa_Pt_Br.pdf" : "/documents/Adriel_Barbosa_EN.pdf"}
            download={language === "pt" ? "Curriculo-Adriel.pdf" : "Adriel-Resume.pdf"}
            className="fixed bottom-6 right-6 z-40 bg-primary-blue hover:bg-primary-blue/90 text-white rounded-full p-4 shadow-[0_4px_20px_rgba(16,114,251,0.4)] flex items-center justify-center group cursor-pointer border border-white/10"
            id="floating-resume-btn"
            title={t("download_resume")}
          >
            <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-[#0c0c0c]/90 border border-border-dark text-[10px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md text-text-primary">
              {t("download_resume").toUpperCase()}
            </span>
            <FileText className="w-5 h-5" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
