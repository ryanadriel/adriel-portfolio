import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext.tsx";
import { Code, Database, Globe, Layers, CheckSquare, Settings } from "lucide-react";

export function SkillsGrid() {
  const { skillCategories, t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("Backend");
  const [showAllSkills, setShowAllSkills] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const categories = language === "pt" 
    ? ["Tudo", "Backend", "Databases", "DevOps & Cloud", "Architecture & Practices"] 
    : ["All", "Backend", "Databases", "DevOps & Cloud", "Architecture & Practices"];

  const getCategoryIcon = (categoryTitle: string) => {
    switch (categoryTitle) {
      case "Backend":
        return <Code className="w-4 h-4 text-primary-blue" />;
      case "Databases":
        return <Database className="w-4 h-4 text-emerald-400" />;
      case "DevOps & Cloud":
        return <Globe className="w-4 h-4 text-sky-400" />;
      case "Architecture & Practices":
        return <Layers className="w-4 h-4 text-indigo-400" />;
      default:
        return <Settings className="w-4 h-4 text-text-muted" />;
    }
  };

  const isAllSelected = selectedCategory === "All" || selectedCategory === "Tudo";

  // Filter skills for category views
  const displayedCategories = skillCategories.filter(cat => {
    return cat.title === selectedCategory;
  });

  // Flattened skills for the "All" view
  const allSkills = skillCategories.flatMap(cat =>
    cat.skills.map(skill => ({ ...skill, category: cat.title }))
  );

  const visibleSkills = isMobile && !showAllSkills ? allSkills.slice(0, 3) : (showAllSkills ? allSkills : allSkills.slice(0, 9));

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Interactive Category Selector Tabs */}
      <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap md:justify-center gap-2 border-b border-border-dark/60 pb-4 md:pb-6 px-4 xs:px-6 md:px-0 -mx-4 xs:-mx-6 md:mx-0">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setShowAllSkills(false); // Reset expansion on tab change
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all duration-300 relative cursor-pointer focus:outline-none whitespace-nowrap ${
                isActive
                  ? "text-text-primary bg-white/5 border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                  : "text-text-muted hover:text-text-primary bg-transparent border border-transparent"
              }`}
            >
              <span className="relative z-10">{cat.toUpperCase()}</span>
              {isActive && (
                <motion.span
                  layoutId="activeSkillTabLine"
                  className="absolute bottom-0 left-1/4 right-1/4 h-[1.5px] bg-primary-blue"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid Display */}
      <div className="flex flex-col gap-10">
        <AnimatePresence mode="popLayout">
          {isAllSelected ? (
            <motion.div
              key="all-flat-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -5, 
                      scale: 1.015,
                      borderColor: "rgba(16, 114, 251, 0.35)",
                      boxShadow: "0 12px 30px -10px rgba(0,0,0,0.7), 0 0 20px rgba(16, 114, 251, 0.15)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="glass-panel rounded-xl p-4 border border-border-dark bg-surface-dark/20 flex flex-col justify-between group glow-hover cursor-default"
                  >
                    <div>
                      {/* Name, Category Badge & Progress Score */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-sm font-serif font-bold text-text-primary group-hover:text-primary-blue transition-colors duration-200">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8px] font-mono tracking-widest text-text-muted bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase leading-none">
                            {skill.category.split(" ")[0]}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-text-muted group-hover:text-text-primary transition-colors duration-200">
                            {skill.level}%
                          </span>
                        </div>
                      </div>

                      {/* Estimated Level Progress Meter */}
                      <div className="w-full h-[3px] bg-bg-dark rounded-full overflow-hidden mb-3 border border-border-dark/30">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-primary-blue rounded-full relative"
                        >
                          <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-sm animate-pulse" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Skill Specific Mastery Description */}
                    {skill.description && (
                      <p className="text-[11px] text-text-secondary leading-relaxed font-normal">
                        {skill.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Ver mais button for flat grid */}
              <div className="flex justify-center mt-4">
                {!showAllSkills ? (
                  <button
                    onClick={() => setShowAllSkills(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-blue/40 bg-[#0c0c0c] hover:bg-primary-blue/10 hover:border-primary-blue hover:text-text-primary text-text-secondary text-xs font-mono font-semibold tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(16,114,251,0.15)] cursor-pointer"
                  >
                    {t("btn_more_skills")}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAllSkills(false)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-[#0c0c0c] hover:bg-white/5 hover:text-text-primary text-text-secondary text-xs font-mono font-semibold tracking-widest transition-all duration-300 cursor-pointer"
                  >
                    {t("btn_less_skills")}
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            displayedCategories.map((cat) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {/* Category Subtitle */}
                <div className="flex items-center gap-2 border-l-2 border-primary-blue pl-3 py-1">
                  {getCategoryIcon(cat.title)}
                  <h3 className="text-xs font-mono tracking-widest text-text-primary font-bold uppercase">
                    {cat.title}
                  </h3>
                  <span className="text-[10px] font-mono text-text-muted">
                    ({cat.skills.length} {language === "pt" ? "itens" : "items"})
                  </span>
                </div>

                {/* Skills Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(isMobile && !showAllSkills ? cat.skills.slice(0, 3) : cat.skills).map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        y: -5, 
                        scale: 1.015,
                        borderColor: "rgba(16, 114, 251, 0.35)",
                        boxShadow: "0 12px 30px -10px rgba(0,0,0,0.7), 0 0 20px rgba(16, 114, 251, 0.15)"
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="glass-panel rounded-xl p-4 border border-border-dark bg-surface-dark/20 flex flex-col justify-between group glow-hover cursor-default"
                    >
                      <div>
                        {/* Name & Progress Score */}
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-sm font-serif font-bold text-text-primary group-hover:text-primary-blue transition-colors duration-200">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-text-muted group-hover:text-text-primary transition-colors duration-200">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Estimated Level Progress Meter */}
                        <div className="w-full h-[3px] bg-bg-dark rounded-full overflow-hidden mb-3 border border-border-dark/30">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-primary-blue rounded-full relative"
                          >
                            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-sm animate-pulse" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Skill Specific Mastery Description */}
                      {skill.description && (
                        <p className="text-[11px] text-text-secondary leading-relaxed font-normal">
                          {skill.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Ver mais button for category grid (only on mobile when category has more than 3 skills) */}
                {isMobile && cat.skills.length > 3 && (
                  <div className="flex justify-center mt-4">
                    {!showAllSkills ? (
                      <button
                        onClick={() => setShowAllSkills(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-blue/40 bg-[#0c0c0c] hover:bg-primary-blue/10 hover:border-primary-blue hover:text-text-primary text-text-secondary text-xs font-mono font-semibold tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(16,114,251,0.15)] cursor-pointer"
                      >
                        {t("btn_more_skills")}
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowAllSkills(false)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-[#0c0c0c] hover:bg-white/5 hover:text-text-primary text-text-secondary text-xs font-mono font-semibold tracking-widest transition-all duration-300 cursor-pointer"
                      >
                        {t("btn_less_skills")}
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
