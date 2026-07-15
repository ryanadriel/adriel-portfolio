import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Experience } from "../types.ts";
import { useLanguage } from "../context/LanguageContext.tsx";
import { Briefcase, Calendar, CheckCircle2, TrendingUp, Cpu } from "lucide-react";

export function Timeline() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { experiences, t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="w-full relative">
      {/* Decorative ambient light background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary-blue/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Actual Timeline Line */}
      <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary-blue/40 via-border-dark to-border-dark/10 -translate-x-1/2 hidden md:block" />
      <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary-blue/40 via-border-dark to-border-dark/10 md:hidden" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-12 relative"
      >
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          const isHovered = hoveredId === exp.id;

          const cardContent = (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className={`flex flex-col md:flex-row relative items-start ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Timeline Center Bullet Pin */}
              <div className="absolute left-6 md:left-1/2 w-10 h-10 -translate-x-1/2 flex items-center justify-center z-10">
                <motion.div 
                  className={`w-4 h-4 rounded-full border-2 bg-bg-dark flex items-center justify-center transition-all duration-300 ${
                    isHovered 
                      ? "border-primary-blue scale-125 shadow-[0_0_12px_rgba(16,114,251,0.6)]" 
                      : "border-border-dark"
                  }`}
                >
                  {isHovered && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                  )}
                </motion.div>
              </div>

              {/* Spacer column for perfect timeline layout on desktop */}
              <div className="w-full md:w-1/2 hidden md:block" />

              {/* Timeline Content Block (occupies 1/2 width on desktop, full width on mobile) */}
              <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                <div 
                  className={`glass-panel rounded-xl p-4 xs:p-5 sm:p-6 border transition-all duration-500 bg-surface-dark/40 glow-hover relative overflow-hidden ${
                    isHovered 
                      ? "border-primary-blue/30 -translate-y-1 shadow-[0_15px_35px_rgba(0,0,0,0.6)]" 
                      : "border-border-dark"
                  } ${((!isMobile && index === 2) || (isMobile && index === 1)) && !isExpanded ? "max-h-[175px] border-b-transparent overflow-hidden" : ""}`}
                >
                  {/* Gradient mask for collapsed card */}
                  {((!isMobile && index === 2) || (isMobile && index === 1)) && !isExpanded && (
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pointer-events-none z-20" />
                  )}

                  {/* Decorative glowing gradient mask on hover */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r from-primary-blue/0 to-primary-blue/5 pointer-events-none transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Header metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-dark pb-3 xs:pb-4 mb-3 xs:mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-primary-blue">
                        <Briefcase className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-serif font-semibold text-text-primary leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-xs text-text-muted mt-1 font-semibold font-mono tracking-wider uppercase">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-secondary">
                      <Calendar className="w-3 h-3 text-primary-blue" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Main Job Description */}
                  <p className="text-xs text-text-secondary leading-relaxed mb-4 xs:mb-5">
                    {exp.description}
                  </p>

                  {/* Accomplishment Outcomes Section */}
                  <div className="flex flex-col gap-2.5 xs:gap-3 mb-4 xs:mb-5">
                    <div className="flex items-center gap-1 text-[11px] font-mono text-primary-blue font-bold tracking-wider uppercase">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{t("results_critical")}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {exp.results.map((result, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-text-secondary leading-normal">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-dark/60">
                    <div className="flex items-center gap-1 text-[9px] font-mono text-text-muted mr-1">
                      <Cpu className="w-3 h-3" />
                      <span>STACK:</span>
                    </div>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded border border-border-dark bg-bg-dark/80 text-text-secondary hover:border-primary-blue/30 hover:text-text-primary transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );

          const isHiddenWrapped = (!isMobile && index === 3) || (isMobile && index >= 2);

          if (isHiddenWrapped) {
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={isExpanded ? { opacity: 1, height: "auto", marginTop: 24 } : { opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                {cardContent}
              </motion.div>
            );
          }

          return cardContent;
        })}
      </motion.div>

      {/* Toggle View More Button */}
      <div className="flex justify-center mt-10 relative z-30">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary-blue/40 bg-[#0c0c0c] hover:bg-primary-blue/10 hover:border-primary-blue hover:text-text-primary text-text-secondary text-xs font-mono font-bold tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(16,114,251,0.15)] hover:shadow-[0_0_30px_rgba(16,114,251,0.3)] cursor-pointer"
          >
            {t("btn_full_trajectory")}
          </button>
        ) : (
          <button
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-[#0c0c0c] hover:bg-white/5 hover:text-text-primary text-text-secondary text-xs font-mono font-bold tracking-widest transition-all duration-300 cursor-pointer"
          >
            {t("btn_collapse_trajectory")}
          </button>
        )}
      </div>
    </div>
  );
}
