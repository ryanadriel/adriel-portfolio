import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext.tsx";
import { 
  Code, Zap, Shield, Layers, Cpu, CheckSquare, FolderGit, Terminal, Award
} from "lucide-react";

export function Principles() {
  const { principles, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);
  
  const getPrincipleIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-primary-blue" };
    switch (iconName) {
      case "Code":
        return <Code {...props} />;
      case "Zap":
        return <Zap className="w-5 h-5 text-amber-400" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-emerald-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-[#b08bf8]" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case "CheckSquare":
        return <CheckSquare className="w-5 h-5 text-[#f163a3]" />;
      case "FolderGit":
        return <FolderGit className="w-5 h-5 text-indigo-400" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-amber-500" />;
      case "Award":
        return <Award className="w-5 h-5 text-[#1072FB]" />;
      default:
        return <Code {...props} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const visiblePrinciples = isExpanded ? principles : (isMobile ? principles.slice(0, 2) : principles.slice(0, 6));

  return (
    <div className="w-full flex flex-col gap-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
      >
        <AnimatePresence mode="popLayout">
          {visiblePrinciples.map((principle, index) => {
            return (
              <motion.div
                key={principle.title}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.015,
                  borderColor: "rgba(16, 114, 251, 0.35)",
                  boxShadow: "0 15px 35px -10px rgba(0,0,0,0.7), 0 0 20px rgba(16, 114, 251, 0.12)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                layout
                className="glass-panel rounded-2xl p-4 xs:p-5 border border-border-dark bg-surface-dark/15 flex flex-col justify-between gap-4 group glow-hover relative shadow-md cursor-default"
              >
                {/* Top Line Decorator */}
                <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-primary-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col gap-3">
                  {/* Icon Container */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:bg-primary-blue/10 group-hover:border-primary-blue/20 transition-colors duration-300">
                      {getPrincipleIcon(principle.iconName)}
                    </div>
                    <h3 className="text-sm font-serif font-bold tracking-wide text-text-primary group-hover:text-primary-blue transition-colors duration-300">
                      {principle.title}
                    </h3>
                  </div>

                  {/* Mindset Statement */}
                  <p className="text-[11.5px] text-text-secondary leading-relaxed font-normal">
                    {principle.description}
                  </p>
                </div>

                {/* Structured Metric Badge */}
                <div className="flex items-center justify-between border-t border-border-dark/60 pt-3 text-[10px] font-mono mt-1">
                  <span className="text-text-muted">{t("metric_focus")}</span>
                  <span className="font-bold text-primary-blue group-hover:text-text-primary transition-colors duration-200">
                    {principle.metric.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Toggle View More Button */}
      <div className="flex justify-center mt-4">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-blue/40 bg-[#0c0c0c] hover:bg-primary-blue/10 hover:border-primary-blue hover:text-text-primary text-text-secondary text-xs font-mono font-bold tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(16,114,251,0.15)] cursor-pointer"
          >
            {t("btn_more_principles")}
          </button>
        ) : (
          <button
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-[#0c0c0c] hover:bg-white/5 hover:text-text-primary text-text-secondary text-xs font-mono font-bold tracking-widest transition-all duration-300 cursor-pointer"
          >
            {t("btn_less_principles")}
          </button>
        )}
      </div>
    </div>
  );
}
