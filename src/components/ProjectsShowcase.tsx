import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types.ts";
import { useLanguage } from "../context/LanguageContext.tsx";
import { 
  Github, ExternalLink, ShieldAlert, Cpu, BarChart3, 
  Layers, ChevronDown, ChevronUp, Database, ArrowRight, Activity
} from "lucide-react";

export function ProjectsShowcase() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { projects, t, language } = useLanguage();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Programmatic mockups utilizing vector CSS to achieve pristine developer visual quality
  const renderProjectMockup = (projectId: string) => {
    switch (projectId) {
      case "nexora-saas":
        return (
          <div className="absolute inset-0 bg-[#0c0d0e] flex flex-col justify-between p-3.5 border-b border-border-dark overflow-hidden font-mono text-[9px] text-[#C7C7C7]">
            {/* Visual SaaS Billing Simulation */}
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
              <span className="text-[10px] font-bold text-primary-blue flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" /> NEXORA BILLING SYSTEM
              </span>
              <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 py-0.5 rounded border border-emerald-500/20 font-bold">MULTI-TENANT ACTIVE</span>
            </div>
            
            <div className="flex-1 py-3 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-text-muted">
                <span>[SCHEMA_CONN] active_tenants</span>
                <span className="text-emerald-400 font-bold">48 Active</span>
              </div>
              {/* Animated Progress Bars */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[8px] text-text-secondary">
                  <span>tenant_stripe_prod_90a</span>
                  <span className="font-bold">MYSQL HIT — 12ms</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-blue w-[85%] rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[8px] text-text-secondary">
                  <span>tenant_clerk_prod_11b</span>
                  <span className="font-bold">REDIS HIT — 0.9ms</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-blue w-[35%] rounded-full" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-1.5 text-[8px] text-text-muted">
              <span>RATE_LIMIT: 500 req/min/IP</span>
              <span className="text-primary-blue">QUEUE: OK</span>
            </div>
          </div>
        );
      case "barberos":
        return (
          <div className="absolute inset-0 bg-[#0e0c0d] flex flex-col justify-between p-3.5 border-b border-border-dark overflow-hidden font-mono text-[9px] text-[#C7C7C7]">
            {/* Visual Security & Payment Transaction Gateway */}
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> BARBEROS CALENDAR ENGINE
              </span>
              <span className="text-[8px] text-primary-blue border border-primary-blue/30 px-1.5 py-0.5 rounded bg-primary-blue/5 font-bold">WHITE-LABEL</span>
            </div>

            <div className="flex-1 py-2.5 flex items-center justify-between gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-[7px] text-text-muted">SCHEDULING LIVE THREAD:</span>
                <span className="text-[10px] font-bold text-emerald-400">APPOINTMENTS SYNC</span>
                <span className="text-[8px] text-primary-blue font-semibold">[MYSQL STATE OK]</span>
              </div>
              <div className="p-2 border border-border-dark bg-surface-dark/80 rounded-lg text-[8px] flex flex-col gap-0.5 leading-none">
                <span className="text-text-muted">REDIS CACHE:</span>
                <span className="font-semibold text-text-primary">AVAILABILITY: LOADED</span>
                <span className="text-primary-blue mt-1 font-mono">LATENCY: 8ms</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-1.5 flex justify-between text-[8px] text-text-muted leading-none">
              <span>ENGINE: REACT & LARAVEL</span>
              <span className="text-emerald-400">DB SCHEMA: MULTI-TENANT</span>
            </div>
          </div>
        );
      case "erp-integration":
        return (
          <div className="absolute inset-0 bg-[#0d0d0f] flex flex-col justify-between p-3.5 border-b border-border-dark overflow-hidden font-mono text-[9px] text-[#C7C7C7]">
            {/* Visual Synchronization Service Hub */}
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
              <span className="text-[10px] font-bold text-sky-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> ERP SYNC PIPELINES
              </span>
              <span className="text-[8px] text-sky-400 bg-sky-500/10 px-1 py-0.5 rounded border border-sky-500/20 font-bold">RABBITMQ ACTIVE</span>
            </div>

            <div className="flex-1 flex items-center justify-center gap-4 py-2">
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[7px] text-text-muted">LEGACY ERP</span>
                <div className="px-2 py-1 border border-border-dark bg-surface-dark rounded text-[8px] font-bold">SOAP/XML</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[7px] text-sky-400 font-bold animate-pulse">Sincronizando</span>
                <span className="text-sky-400 text-xs">➔➔➔</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[7px] text-text-muted">CLOUD SaaS</span>
                <div className="px-2 py-1 border border-primary-blue/30 bg-primary-blue/10 text-primary-blue rounded text-[8px] font-bold">JSON REST</div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-1.5 text-[8px] text-text-muted flex justify-between">
              <span>JOBS_IN_QUEUE: 0</span>
              <span className="text-sky-400">SUCCESS_RATE: 100%</span>
            </div>
          </div>
        );
      case "multi-tenant-saas":
        return (
          <div className="absolute inset-0 bg-[#090b0d] flex flex-col justify-between p-3.5 border-b border-border-dark overflow-hidden font-mono text-[9px] text-[#C7C7C7]">
            {/* Visual Tenant Separation Database Schemas */}
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
              <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> MULTI-TENANT CORE SCHEMAS
              </span>
              <span className="text-[8px] text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded bg-indigo-500/5 font-bold">POSTGRES ISOLATION</span>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-1.5 py-3 text-[7px]">
              <div className="p-1 border border-indigo-500/20 bg-indigo-500/5 rounded flex flex-col gap-0.5 leading-none">
                <span className="text-indigo-400 font-bold">SCHEMA 01</span>
                <span className="text-text-muted">tenant_intel_db</span>
                <span className="text-text-secondary mt-1">Users: 14k</span>
              </div>
              <div className="p-1 border border-indigo-500/20 bg-indigo-500/5 rounded flex flex-col gap-0.5 leading-none">
                <span className="text-indigo-400 font-bold">SCHEMA 02</span>
                <span className="text-text-muted">tenant_tesla_db</span>
                <span className="text-text-secondary mt-1">Users: 22k</span>
              </div>
              <div className="p-1 border border-indigo-500/20 bg-indigo-500/5 rounded flex flex-col gap-0.5 leading-none">
                <span className="text-indigo-400 font-bold">SCHEMA 03</span>
                <span className="text-text-muted">tenant_sony_db</span>
                <span className="text-text-secondary mt-1">Users: 8.4k</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-1.5 text-[8px] text-text-muted">
              <span>DINAMIC SCHEMA ROUTER: CONNECT_OK</span>
            </div>
          </div>
        );
      case "laravel-rest-api":
        return (
          <div className="absolute inset-0 bg-[#0e0d0f] flex flex-col justify-between p-3.5 border-b border-border-dark overflow-hidden font-mono text-[9px] text-[#C7C7C7]">
            {/* API Telemeter JSON Payload */}
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
              <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" /> TELEMETRY RESPONSE BODY
              </span>
              <span className="text-[8px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-bold">REST API RFC</span>
            </div>

            <div className="flex-1 py-2 select-text text-amber-500/90 leading-tight flex flex-col justify-center">
              <span>{"{"}</span>
              <span className="pl-2">"status": "success",</span>
              <span className="pl-2">"code": 200,</span>
              <span className="pl-2">"payload_meta": {"{"} "records_synced": 4200 {"}"},</span>
              <span className="pl-2">"execution_telemetry": "0.98ms"</span>
              <span>{"}"}</span>
            </div>

            <div className="border-t border-white/5 pt-1.5 text-[8px] text-text-muted flex justify-between leading-none">
              <span>PAGINATION: CURSOR-BASED</span>
              <span className="text-amber-500">FORMAT: JSON-API</span>
            </div>
          </div>
        );
      case "adx-technology-platform":
        return (
          <div className="absolute inset-0 bg-[#0a0c0f] flex flex-col justify-between p-3.5 border-b border-border-dark overflow-hidden font-mono text-[9px] text-[#C7C7C7]">
            {/* Microservices Orquestration Graphic Representation */}
            <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
              <span className="text-[10px] font-bold text-primary-blue flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5" /> MICROSERVICES METRICS
              </span>
              <span className="text-[8px] text-primary-blue bg-primary-blue/10 px-1.5 py-0.5 rounded border border-primary-blue/20 font-bold">DOCKER K8S</span>
            </div>

            <div className="flex-1 py-3 flex items-center justify-around">
              <div className="flex flex-col items-center">
                <span className="text-[14px] font-bold text-text-primary">12</span>
                <span className="text-[7px] text-text-muted">CONTAINERS</span>
              </div>
              <div className="w-[1px] h-8 bg-border-dark" />
              <div className="flex flex-col items-center">
                <span className="text-[14px] font-bold text-emerald-400">450k</span>
                <span className="text-[7px] text-text-muted">MSG / MIN</span>
              </div>
              <div className="w-[1px] h-8 bg-border-dark" />
              <div className="flex flex-col items-center">
                <span className="text-[14px] font-bold text-primary-blue">&lt; 3ms</span>
                <span className="text-[7px] text-text-muted">gRPC RTT</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-1.5 text-[8px] text-text-muted">
              <span>CENTRALIZED PROMETHEUS / GRAFANA</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 bg-surface-dark flex items-center justify-center border-b border-border-dark">
            <Cpu className="w-8 h-8 text-primary-blue opacity-55" />
          </div>
        );
    }
  };

  const handleGitHubClick = (url?: string, title?: string) => {
    if (language === "pt") {
      alert(`O repositório do projeto "${title}" é privado por se tratar de um produto comercial sob termo de confidencialidade (NDA).`);
    } else {
      alert(`The repository for project "${title}" is private as it is a commercial product under a Non-Disclosure Agreement (NDA).`);
    }
  };

  const handleDemoClick = (url?: string, title?: string) => {
    if (!url) {
      if (language === "pt") {
        alert(`O projeto "${title}" está atualmente em desenvolvimento ativo e homologação interna, não possuindo pré-visualização pública no momento.`);
      } else {
        alert(`The project "${title}" is currently in active development and internal testing, so there is no public preview at this time.`);
      }
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const visibleProjects = isMobile && !showAllProjects ? projects.slice(0, 1) : projects.slice(0, 3);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {visibleProjects.map((project, index) => {
          const isExpanded = expandedId === project.id;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="glass-panel rounded-xl border border-border-dark bg-surface-dark/40 overflow-hidden flex flex-col justify-between group glow-hover relative shadow-lg hover:-translate-y-1 transition-all duration-300 w-full"
            >
              {index === 2 && (
                <div className="absolute inset-0 z-30 backdrop-blur-[6px] bg-black/75 flex flex-col items-center justify-center p-4 xs:p-6 text-center transition-all duration-300">
                  <div className="p-2.5 xs:p-3.5 rounded-full bg-primary-blue/10 border border-primary-blue/30 mb-2 xs:mb-3 text-primary-blue">
                    <Github className="w-5 h-5 xs:w-6 xs:h-6" />
                  </div>
                  <h4 className="text-sm font-serif font-bold text-text-primary mb-1">{t("other_backend_projects")}</h4>
                  <p className="text-[11px] text-text-secondary leading-relaxed max-w-[210px] mb-3 xs:mb-4">
                    {t("other_backend_projects_desc")}
                  </p>
                  <a
                    href="https://github.com/ryanadriel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-full border border-primary-blue/50 bg-[#0c0c0c] hover:bg-primary-blue/10 hover:border-primary-blue hover:text-text-primary text-text-secondary text-xs font-mono font-bold tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(16,114,251,0.2)] cursor-pointer"
                  >
                    {t("view_more")} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
              <div>
                {/* Custom Technical Mockup Canvas Area */}
                <div className="relative h-40 border-b border-border-dark bg-[#0a0a0a]">
                  {renderProjectMockup(project.id)}
                </div>

                {/* Main Information */}
                <div className="p-4 xs:p-5 flex flex-col gap-2.5 xs:gap-3">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="text-[15px] font-serif font-bold text-text-primary leading-tight group-hover:text-primary-blue transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className="text-[8px] font-mono tracking-widest text-primary-blue bg-primary-blue/10 border border-primary-blue/20 px-1.5 py-0.5 rounded font-bold uppercase shrink-0 leading-none">
                      {t("real_product")}
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono px-2 py-0.5 rounded border border-border-dark/60 bg-bg-dark text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Production Performance Metrics (Stripe-like) */}
                  <div className="grid grid-cols-3 gap-2 bg-black/40 border border-border-dark/50 rounded-lg p-2.5 mt-2 text-center select-none">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="flex flex-col gap-0.5 leading-none">
                        <span className="text-[8px] font-mono text-text-muted uppercase tracking-wider">{m.label}</span>
                        <span className="text-[10px] font-mono font-bold text-primary-blue">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expandable and Link Footer Actions */}
              <div className="px-4 xs:px-5 pb-4 xs:pb-5 pt-1 border-t border-border-dark/30 flex flex-col gap-2.5 xs:gap-3">
                <button
                  onClick={() => toggleExpand(project.id)}
                  className="flex items-center justify-between text-xs font-mono font-semibold text-text-muted hover:text-text-primary transition-colors duration-200 cursor-pointer pt-2 w-full focus:outline-none"
                  id={`project-expand-${project.id}`}
                >
                  <span className="flex items-center gap-1">
                    {isExpanded ? t("hide_details") : t("explore_architecture")}
                  </span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="text-[11px] text-text-secondary leading-relaxed bg-black/40 border border-border-dark p-3 rounded-lg flex flex-col gap-2 mt-1">
                        <div className="text-[9px] font-mono text-primary-blue font-bold uppercase tracking-widest border-b border-border-dark/40 pb-1">
                          {t("infra_specs")}
                        </div>
                        <p>{project.longDescription}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-2 mt-1 pt-1 border-t border-border-dark/20">
                  <button
                    onClick={() => handleGitHubClick(project.githubUrl, project.title)}
                    className="flex items-center justify-center gap-1.5 py-2 border border-border-dark bg-bg-dark hover:border-text-secondary/30 text-[11px] font-mono font-bold text-text-secondary hover:text-text-primary rounded-lg transition-all duration-200 cursor-pointer"
                    id={`project-github-${project.id}`}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>{t("btn_code")}</span>
                  </button>
                  <button
                    onClick={() => handleDemoClick(project.demoUrl, project.title)}
                    className="flex items-center justify-center gap-1.5 py-2 border border-primary-blue/30 bg-primary-blue/10 hover:bg-primary-blue/20 text-[11px] font-mono font-bold text-white hover:text-primary-blue rounded-lg transition-all duration-200 cursor-pointer"
                    id={`project-demo-${project.id}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t("btn_preview")}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Show More / Ver Mais Button (Only visible on mobile) */}
      {isMobile && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-primary-blue/40 bg-[#0c0c0c] hover:bg-primary-blue/10 hover:border-primary-blue hover:text-text-primary text-text-secondary text-xs font-mono font-bold tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(16,114,251,0.15)] hover:shadow-[0_0_30px_rgba(16,114,251,0.3)] cursor-pointer"
          >
            {showAllProjects ? t("btn_collapse_trajectory") : t("btn_view_more")}
          </button>
        </div>
      )}
    </div>
  );
}
