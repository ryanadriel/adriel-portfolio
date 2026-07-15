import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext.tsx";
import { 
  Server, Database, Cpu, Network, HardDrive, 
  Terminal, ShieldCheck, Zap, Layers, RefreshCw, Send
} from "lucide-react";

interface NodeDetail {
  id: string;
  name: string;
  category: string;
  status: "ONLINE" | "SYNCHRONIZING" | "IDLE";
  tech: string;
  spec: string;
  description: string;
  metricLabel: string;
  metricValue: string;
}

interface TelemetryLog {
  id: string;
  timestamp: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "SYSTEM";
  endpoint: string;
  status: number | string;
  latency: string;
  origin: string;
  detail: string;
}

const ARCHITECTURE_NODES: NodeDetail[] = [
  {
    id: "node-client",
    name: "Clientes (SPA / Mobile)",
    category: "category_gateway_ingress",
    status: "ONLINE",
    tech: "HTTP/2 / WebSockets",
    spec: "TLS 1.3 • CORS Protegido",
    description: "Clientes externos realizando chamadas de API concorrentes com compressão Gzip/Brotli e cabeçalhos de segurança estritos.",
    metricLabel: "Requests / seg",
    metricValue: "420 req/s"
  },
  {
    id: "node-cloudflare",
    name: "Cloudflare & WAF",
    category: "category_edge_routing",
    status: "ONLINE",
    tech: "Edge Engine",
    spec: "WAF Ativo • DDoS Mitigation",
    description: "Camada de segurança inteligente de borda. Bloqueia ameaças do OWASP Top 10, gerencia certificado SSL e atua como rate-limiter inicial.",
    metricLabel: "Spam Bloqueado",
    metricValue: "99.8%"
  },
  {
    id: "node-gateway",
    name: "API Gateway",
    category: "category_orquestracao",
    status: "ONLINE",
    tech: "Custom Gateway",
    spec: "Idempotency Token Validator",
    description: "Porta de entrada interna do ecossistema. Roteia requisições, valida tokens JWT, injeta cabeçalhos de tenant e gerencia assinaturas de webhook.",
    metricLabel: "Tempo de Roteamento",
    metricValue: "0.8ms"
  },
  {
    id: "node-laravel",
    name: "Laravel Cluster (SaaS Engine)",
    category: "category_app_layer",
    status: "ONLINE",
    tech: "PHP 8.3 / Octane",
    spec: "Multi-Tenant Schema Router",
    description: "Servidor de aplicação responsável pela lógica de negócios robusta, orquestração de faturamentos da Nexora e roteamento dinâmico de inquilinos.",
    metricLabel: "Tempo de Execução",
    metricValue: "24ms"
  },
  {
    id: "node-springboot",
    name: "Spring Boot (Gateway de Transações)",
    category: "category_app_layer",
    status: "ONLINE",
    tech: "Java 21 / Spring Boot 3",
    spec: "WebFlux • Circuit Breaker",
    description: "Serviço financeiro reativo e resiliente responsável pelas transações da OfficePay. Implementa mTLS e isolamento estrito contra concorrência.",
    metricLabel: "Latência Crítica",
    metricValue: "12ms"
  },
  {
    id: "node-redis",
    name: "Redis Cache Layer",
    category: "category_caching_queues",
    status: "ONLINE",
    tech: "Redis Cluster 7",
    spec: "Cache In-Memory • Rate-Limiting",
    description: "Armazenamento chave-valor de baixíssima latência. Armazena sessões, tokens de acesso revogados e gerencia filas rápidas de prioridade.",
    metricLabel: "Hit Rate",
    metricValue: "94.2%"
  },
  {
    id: "node-postgres",
    name: "PostgreSQL Database",
    category: "category_persistence_layer",
    status: "ONLINE",
    tech: "PostgreSQL 16",
    spec: "Schemas Isolados • Write-Replica",
    description: "Banco de dados relacional robusto com isolamento de esquemas físicos por cliente (SaaS Multi-tenant). Indexado para buscas otimizadas.",
    metricLabel: "Index Cache Hit",
    metricValue: "99.1%"
  },
  {
    id: "node-rabbitmq",
    name: "RabbitMQ Broker",
    category: "category_messaging",
    status: "ONLINE",
    tech: "RabbitMQ Cluster",
    spec: "AMQP • Filas Persistentes",
    description: "Mensageria assíncrona responsável por processar e enfileirar tarefas pesadas em background, como webhooks lentos e relatórios em lote.",
    metricLabel: "Mensagens em Fila",
    metricValue: "0 Ativas"
  }
];

const INITIAL_LOGS: TelemetryLog[] = [
  {
    id: "log-1",
    timestamp: "15:09:00",
    method: "GET",
    endpoint: "/api/v1/nexora-saas/billing/status",
    status: 200,
    latency: "1.2ms",
    origin: "Redis Cluster",
    detail: "CACHE HIT - Retornando configuração de inquilino [tenant_901a]"
  },
  {
    id: "log-2",
    timestamp: "15:09:12",
    method: "POST",
    endpoint: "/api/v1/payments/officepay/charge",
    status: 201,
    latency: "18.4ms",
    origin: "Spring Boot Cluster",
    detail: "IDEMPOTENCY OK - Token 'tx_883a99' validado com sucesso. Gravado no banco relacional."
  },
  {
    id: "log-3",
    timestamp: "15:09:25",
    method: "GET",
    endpoint: "/api/v1/reports/export?format=pdf",
    status: 202,
    latency: "4.1ms",
    origin: "RabbitMQ Queue",
    detail: "ENQUEUED - Tarefa de exportação enviada para a fila de baixa prioridade. ID: task_7721"
  },
  {
    id: "log-4",
    timestamp: "15:09:33",
    method: "SYSTEM",
    endpoint: "HEALTH_CHECK",
    status: "OK",
    latency: "0.5ms",
    origin: "Cloudflare Edge",
    detail: "SYS_STATUS - Todos os microsserviços estão operando sob conformidade green. Carga média: 12%"
  }
];

export function InteractiveArchitecture() {
  const { t } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<NodeDetail>(ARCHITECTURE_NODES[3]); // Laravel by default
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_LOGS);
  const [activePaths, setActivePaths] = useState<string[]>(["path-1", "path-2", "path-3"]);
  const [isSimulating, setIsSimulating] = useState(false);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the logger terminal locally without scrolling the main window
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulate ambient backend traffic
  useEffect(() => {
    const endpoints = [
      { m: "GET" as const, p: "/api/v1/nexora-saas/profile", o: "Redis Cluster", d: "CACHE HIT - Perfil retornado do cache de alta velocidade.", l: "1.1ms" },
      { m: "POST" as const, p: "/api/v1/users/login", o: "Laravel Octane", d: "AUTH - Token JWT gerado e assinado via RS256.", l: "28ms" },
      { m: "GET" as const, p: "/api/v1/officepay/transactions", o: "PostgreSQL Replica", d: "SQL QUERY - CTE otimizada retornou 15 registros indexados.", l: "12ms" },
      { m: "PUT" as const, p: "/api/v1/nexora-saas/settings", o: "Laravel Octane", d: "DB_WRITE - Configurações salvas e cache Redis invalidado.", l: "34ms" },
      { m: "POST" as const, p: "/api/v1/webhooks/stripe/receive", o: "RabbitMQ Queue", d: "EVENT - Payload enfileirado para reconciliação financeira.", l: "2.4ms" }
    ];

    const interval = setInterval(() => {
      const randomEp = endpoints[Math.floor(Math.random() * endpoints.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const newLog: TelemetryLog = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        method: randomEp.m,
        endpoint: randomEp.p,
        status: randomEp.m === "POST" || randomEp.m === "PUT" ? 201 : 200,
        latency: randomEp.l,
        origin: randomEp.o,
        detail: randomEp.d
      };
      setLogs(prev => [...prev.slice(-30), newLog]); // Keep last 30
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const triggerManualRequest = (nodeId: string) => {
    setIsSimulating(true);
    const node = ARCHITECTURE_NODES.find(n => n.id === nodeId);
    if (!node) return;

    setSelectedNode(node);

    // Trigger visual packet flow
    setActivePaths([]);
    setTimeout(() => {
      setActivePaths(["path-1", "path-2", "path-3", "path-4"]);
    }, 50);

    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];

    // Build realistic query log
    let newLog: TelemetryLog;
    if (nodeId === "node-redis") {
      newLog = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        method: "GET",
        endpoint: "/api/v1/cache/telemetry",
        status: 200,
        latency: "0.8ms",
        origin: "Redis Cache Layer",
        detail: `QUERY EXECUTED - GET 'user_sess_active' -> HIT. Cache cluster saudável com 98% de memória livre.`
      };
    } else if (nodeId === "node-postgres") {
      newLog = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        method: "POST",
        endpoint: "/api/v1/db/query-optimized",
        status: 200,
        latency: "14.2ms",
        origin: "PostgreSQL Database",
        detail: `SQL - SELECT * FROM tenants WHERE id = 'tenant_77' AND active = true LIMIT 1; [Index Scan using idx_tenants_active]`
      };
    } else if (nodeId === "node-springboot") {
      newLog = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        method: "POST",
        endpoint: "/api/v1/payments/charge-reactive",
        status: 201,
        latency: "11.2ms",
        origin: "Spring Boot WebFlux",
        detail: `BILLING - Transação financeira criada e blindada contra reentrância utilizando mTLS.`
      };
    } else {
      newLog = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        method: "GET",
        endpoint: `/api/v1/debug/diagnostic/${node.id}`,
        status: 200,
        latency: node.metricValue,
        origin: node.tech,
        detail: `DIAGNOSTIC - Autoventilação de saúde iniciada para ${node.name}. Status: ${node.status}. Spec: ${node.spec}`
      };
    }

    setLogs(prev => [...prev, newLog]);
    setTimeout(() => setIsSimulating(false), 800);
  };

  const getNodeIcon = (id: string, colorClass: string) => {
    switch (id) {
      case "node-client":
        return <Network className={`w-5 h-5 ${colorClass}`} />;
      case "node-cloudflare":
        return <ShieldCheck className={`w-5 h-5 ${colorClass}`} />;
      case "node-gateway":
        return <Layers className={`w-5 h-5 ${colorClass}`} />;
      case "node-laravel":
        return <Cpu className={`w-5 h-5 ${colorClass}`} />;
      case "node-springboot":
        return <Server className={`w-5 h-5 ${colorClass}`} />;
      case "node-redis":
        return <Zap className={`w-5 h-5 ${colorClass}`} />;
      case "node-postgres":
        return <Database className={`w-5 h-5 ${colorClass}`} />;
      case "node-rabbitmq":
        return <HardDrive className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <Server className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Visual Canvas Panel */}
      <div className="relative glass-panel rounded-2xl border border-border-dark bg-surface-dark/40 shadow-2xl overflow-hidden h-[190px] xs:h-[220px] sm:h-[280px] md:h-[380px] flex items-center justify-center">
        {/* Ambient Grid Pattern in SVG Background */}
        <div className="absolute inset-0 tech-grid-pattern opacity-30 radial-gradient-mask" />

        {/* Scaling Wrapper for absolute precision matching SVG lines to Nodes */}
        <div className="absolute w-[600px] h-[300px] flex items-center justify-center scale-[0.45] min-[360px]:scale-[0.52] min-[400px]:scale-[0.6] min-[480px]:scale-[0.72] sm:scale-[0.85] md:scale-100 origin-center shrink-0">
          {/* Laser / Signal Lines in absolute SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 300" preserveAspectRatio="none">
            {/* Signal paths definitions */}
            <g opacity="0.3">
              {/* Main trunk flow paths */}
              <path id="path-client-cf" d="M 60,150 L 140,150" stroke="#1D1D1D" strokeWidth="2" fill="none" />
              <path id="path-cf-gw" d="M 190,150 L 260,150" stroke="#1D1D1D" strokeWidth="2" fill="none" />
              <path id="path-gw-laravel" d="M 310,150 Q 340,150 370,105" stroke="#1D1D1D" strokeWidth="2" fill="none" />
              <path id="path-gw-spring" d="M 310,150 Q 340,150 370,195" stroke="#1D1D1D" strokeWidth="2" fill="none" />
              
              <path id="path-laravel-redis" d="M 430,95 L 500,60" stroke="#1D1D1D" strokeWidth="1.5" fill="none" />
              <path id="path-laravel-pg" d="M 430,105 Q 460,115 500,150" stroke="#1D1D1D" strokeWidth="1.5" fill="none" />
              
              <path id="path-spring-pg" d="M 430,195 Q 460,185 500,150" stroke="#1D1D1D" strokeWidth="1.5" fill="none" />
              <path id="path-spring-rmq" d="M 430,205 L 500,240" stroke="#1D1D1D" strokeWidth="1.5" fill="none" />
            </g>

            {/* Animated Flow Lasers / Pulses */}
            <AnimatePresence>
              {activePaths.length > 0 && (
                <g>
                  {/* Client to Cloudflare */}
                  <circle r="3" fill="#1072FB">
                    <animateMotion dur="1.8s" repeatCount="indefinite" path="M 60,150 L 140,150" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="1.8s" repeatCount="indefinite" />
                  </circle>

                  {/* Cloudflare to Gateway */}
                  <circle r="3" fill="#1072FB">
                    <animateMotion dur="2.2s" begin="0.3s" repeatCount="indefinite" path="M 190,150 L 260,150" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" />
                  </circle>

                  {/* Gateway to Laravel */}
                  <circle r="2.5" fill="#1072FB">
                    <animateMotion dur="2.5s" begin="0.6s" repeatCount="indefinite" path="M 310,150 Q 340,150 370,105" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Gateway to Spring Boot */}
                  <circle r="2.5" fill="#1072FB">
                    <animateMotion dur="2.5s" begin="0.8s" repeatCount="indefinite" path="M 310,150 Q 340,150 370,195" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Laravel to Redis */}
                  <circle r="2" fill="#1072FB">
                    <animateMotion dur="1.5s" begin="1.2s" repeatCount="indefinite" path="M 430,95 L 500,60" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Spring Boot to PostgreSQL */}
                  <circle r="2" fill="#FFFFFF">
                    <animateMotion dur="1.5s" begin="1.4s" repeatCount="indefinite" path="M 430,195 Q 460,185 500,150" />
                    <animate attributeName="opacity" values="0;1;1;0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>
              )}
            </AnimatePresence>
          </svg>

          {/* Graphical Node Overlay */}
          <div className="relative w-full h-[280px] grid grid-cols-5 items-center justify-items-center gap-1">
            {/* Col 1: Ingress */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => triggerManualRequest("node-client")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-300 w-16 h-16 ${
                  selectedNode.id === "node-client"
                    ? "bg-primary-blue/20 border-primary-blue shadow-[0_0_15px_rgba(16,114,251,0.3)]"
                    : "bg-surface-dark border-border-dark hover:border-primary-blue/40"
                }`}
                title="Clientes"
                id="arch-btn-client"
              >
                {getNodeIcon("node-client", selectedNode.id === "node-client" ? "text-primary-blue" : "text-text-secondary")}
                <span className="text-[8px] font-mono tracking-tighter text-center">CLIENT</span>
              </button>
            </div>

            {/* Col 2: Security Edge */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => triggerManualRequest("node-cloudflare")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-300 w-16 h-16 ${
                  selectedNode.id === "node-cloudflare"
                    ? "bg-primary-blue/20 border-primary-blue shadow-[0_0_15px_rgba(16,114,251,0.3)]"
                    : "bg-surface-dark border-border-dark hover:border-primary-blue/40"
                }`}
                title="Cloudflare Edge"
                id="arch-btn-cloudflare"
              >
                {getNodeIcon("node-cloudflare", selectedNode.id === "node-cloudflare" ? "text-primary-blue" : "text-text-secondary")}
                <span className="text-[8px] font-mono tracking-tighter text-center">EDGE</span>
              </button>
            </div>

            {/* Col 3: Gateway */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => triggerManualRequest("node-gateway")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-300 w-16 h-16 ${
                  selectedNode.id === "node-gateway"
                    ? "bg-primary-blue/20 border-primary-blue shadow-[0_0_15px_rgba(16,114,251,0.3)]"
                    : "bg-surface-dark border-border-dark hover:border-primary-blue/40"
                }`}
                title="API Gateway Router"
                id="arch-btn-gateway"
              >
                {getNodeIcon("node-gateway", selectedNode.id === "node-gateway" ? "text-primary-blue" : "text-text-secondary")}
                <span className="text-[8px] font-mono tracking-tighter text-center">GATEWAY</span>
              </button>
            </div>

            {/* Col 4: Clusters */}
            <div className="flex flex-col gap-10">
              {/* Laravel App */}
              <button
                onClick={() => triggerManualRequest("node-laravel")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-300 w-20 h-20 relative ${
                  selectedNode.id === "node-laravel"
                    ? "bg-primary-blue/20 border-primary-blue shadow-[0_0_15px_rgba(16,114,251,0.3)]"
                    : "bg-surface-dark border-border-dark hover:border-primary-blue/40"
                }`}
                id="arch-btn-laravel"
              >
                {getNodeIcon("node-laravel", selectedNode.id === "node-laravel" ? "text-primary-blue" : "text-text-secondary")}
                <span className="text-[9px] font-mono tracking-tight font-semibold text-center leading-tight">LARAVEL</span>
                <span className="absolute -bottom-2 px-1 text-[7px] font-mono rounded bg-[#FF2D20]/15 text-[#FF2D20] border border-[#FF2D20]/20">OCTANE</span>
              </button>

              {/* Spring Boot App */}
              <button
                onClick={() => triggerManualRequest("node-springboot")}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-300 w-20 h-20 relative ${
                  selectedNode.id === "node-springboot"
                    ? "bg-primary-blue/20 border-primary-blue shadow-[0_0_15px_rgba(16,114,251,0.3)]"
                    : "bg-surface-dark border-border-dark hover:border-primary-blue/40"
                }`}
                id="arch-btn-spring"
              >
                {getNodeIcon("node-springboot", selectedNode.id === "node-springboot" ? "text-primary-blue" : "text-text-secondary")}
                <span className="text-[9px] font-mono tracking-tight font-semibold text-center leading-tight">SPRING</span>
                <span className="absolute -bottom-2 px-1 text-[7px] font-mono rounded bg-[#6DB33F]/15 text-[#6DB33F] border border-[#6DB33F]/20">REACTIVE</span>
              </button>
            </div>

            {/* Col 5: Data & Broker Services */}
            <div className="flex flex-col gap-4">
              {/* Redis Cache */}
              <button
                onClick={() => triggerManualRequest("node-redis")}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all duration-300 w-16 h-16 ${
                  selectedNode.id === "node-redis"
                    ? "bg-primary-blue/20 border-primary-blue shadow-[0_0_15px_rgba(16,114,251,0.3)]"
                    : "bg-surface-dark border-border-dark hover:border-primary-blue/40"
                }`}
                title="Redis Cluster"
                id="arch-btn-redis"
              >
                {getNodeIcon("node-redis", selectedNode.id === "node-redis" ? "text-primary-blue" : "text-text-secondary")}
                <span className="text-[8px] font-mono tracking-tighter text-center">REDIS</span>
              </button>

              {/* PostgreSQL DB */}
              <button
                onClick={() => triggerManualRequest("node-postgres")}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all duration-300 w-16 h-16 ${
                  selectedNode.id === "node-postgres"
                    ? "bg-primary-blue/20 border-primary-blue shadow-[0_0_15px_rgba(16,114,251,0.3)]"
                    : "bg-surface-dark border-border-dark hover:border-primary-blue/40"
                }`}
                title="PostgreSQL 16"
                id="arch-btn-postgres"
              >
                {getNodeIcon("node-postgres", selectedNode.id === "node-postgres" ? "text-primary-blue" : "text-text-secondary")}
                <span className="text-[8px] font-mono tracking-tighter text-center">POSTGRES</span>
              </button>

              {/* RabbitMQ */}
              <button
                onClick={() => triggerManualRequest("node-rabbitmq")}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all duration-300 w-16 h-16 ${
                  selectedNode.id === "node-rabbitmq"
                    ? "bg-primary-blue/20 border-primary-blue shadow-[0_0_15px_rgba(16,114,251,0.3)]"
                    : "bg-surface-dark border-border-dark hover:border-primary-blue/40"
                }`}
                title="RabbitMQ Message Broker"
                id="arch-btn-rabbitmq"
              >
                {getNodeIcon("node-rabbitmq", selectedNode.id === "node-rabbitmq" ? "text-primary-blue" : "text-text-secondary")}
                <span className="text-[8px] font-mono tracking-tighter text-center">AMQP</span>
              </button>
            </div>
          </div>
        </div>

        {/* Small Floating Instruction Banner */}
        <div className="absolute bottom-2 left-4 flex items-center gap-1.5 text-[9px] font-mono text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-blue animate-ping" />
          <span>{t("interactive_nodes_banner")}</span>
        </div>
      </div>

      {/* Diagnostics Panel & Live Console Terminal */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
        {/* Diagnostics Info Screen */}
        <div className="md:col-span-5 glass-panel rounded-xl p-4 border border-border-dark flex flex-col justify-between bg-surface-dark/60 h-[180px] sm:h-[200px] md:h-[220px]">
          <div className="flex flex-col gap-1.5 overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-widest text-primary-blue font-bold uppercase">
                {t(selectedNode.category)}
              </span>
              <span className="flex items-center gap-1 text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                {selectedNode.status}
              </span>
            </div>
            <h3 className="text-sm font-serif font-bold text-text-primary leading-tight">
              {t(`${selectedNode.id.replace('-', '_')}_name`)}
            </h3>
            <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-3">
              {t(`${selectedNode.id.replace('-', '_')}_description`)}
            </p>
          </div>

          <div className="border-t border-border-dark/60 pt-2 flex flex-col gap-1 mt-auto">
            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
              <div className="flex flex-col">
                <span className="text-text-muted">{t("label_tech")}</span>
                <span className="text-text-primary font-bold truncate">{t(`${selectedNode.id.replace('-', '_')}_tech`)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-text-muted">{t("label_spec")}</span>
                <span className="text-text-primary font-bold truncate">{t(`${selectedNode.id.replace('-', '_')}_spec`)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between bg-white/5 border border-white/5 rounded px-2 py-1 mt-1">
              <span className="text-[9px] font-mono text-text-secondary">{t(`${selectedNode.id.replace('-', '_')}_metricLabel`)}:</span>
              <span className="text-xs font-mono font-bold text-primary-blue">{t(`${selectedNode.id.replace('-', '_')}_metricValue`)}</span>
            </div>
          </div>
        </div>

        {/* Real-time Logger Terminal */}
        <div className="md:col-span-7 glass-panel rounded-xl p-3 border border-border-dark bg-black/95 flex flex-col h-[180px] sm:h-[200px] md:h-[220px]">
          {/* Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-border-dark/60 text-[9px] font-mono text-text-muted">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-primary-blue" />
              <span>TELEMETER CONSOLE (RFC 5424)</span>
            </div>
            <div className="flex items-center gap-1 text-[8px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Log Lines Container */}
          <div ref={logsContainerRef} className="flex-1 overflow-y-auto font-mono text-[9px] py-1.5 flex flex-col gap-1 leading-normal [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {logs.map((log) => {
              const methodColor = 
                log.method === "GET" ? "text-[#61AFEF]" :
                log.method === "POST" ? "text-[#98C379]" :
                log.method === "PUT" ? "text-[#D19A66]" :
                log.method === "DELETE" ? "text-[#E06C75]" : "text-[#ABB2BF]";

              return (
                <div key={log.id} className="flex items-center gap-2 hover:bg-white/5 px-2 py-0.5 rounded transition-colors duration-150 border-b border-border-dark/10 text-[9px] min-w-0 w-full overflow-hidden shrink-0">
                  <span className="text-text-muted text-[8px] font-mono shrink-0">[{log.timestamp}]</span>
                  <span className={`${methodColor} font-bold text-[8px] font-mono shrink-0 w-8 text-center`}>{log.method}</span>
                  <span className="text-text-primary truncate max-w-[90px] xs:max-w-[110px] sm:max-w-[150px] font-medium shrink-0" title={log.endpoint}>{log.endpoint}</span>
                  <span className="text-text-muted text-[8px] shrink-0 font-mono">({log.latency})</span>
                  <span className="text-primary-blue font-bold text-[8px] shrink-0 truncate max-w-[50px] sm:max-w-none">[{log.origin.split(" ")[0]}]</span>
                  <span className="text-text-secondary italic text-[8px] truncate flex-1 min-w-0" title={log.detail}>— {log.detail}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
