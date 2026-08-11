import React, { createContext, useContext, useState, useEffect } from "react";
import { Experience, SkillCategory, Project, EngineeringPrinciple } from "../types.ts";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  experiences: Experience[];
  skillCategories: SkillCategory[];
  projects: Project[];
  principles: EngineeringPrinciple[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  pt: {
    // Header & Navigation
    nav_hero: "Início",
    nav_about: "Sobre",
    nav_experience: "Experiência",
    nav_projects: "Projetos",
    nav_skills: "Habilidades",
    nav_principles: "Filosofia",
    nav_contact: "Contato",
    download_resume: "Download Currículo",
    
    // Hero
    software_engineer: "Software Engineer",
    ssh_cluster: "adriel@production_cluster:~$ ssh saas_gateway",
    hero_description: "Construo soluções backend com Laravel, desenvolvendo APIs, integrações e aplicações web que priorizam organização, simplicidade e facilidade de manutenção.",
    btn_view_projects: "VER PROJETOS",
    btn_talk_to_me: "FALE COMIGO",
    rolar_para_sobre: "Rolar para Sobre Mim",

    // About Me
    about_title: "SOBRE MIM",
    about_subtitle: "Arquitetura e resolução de problemas complexos.",
    about_p1: "Desenvolvedor back-end especializado em PHP, Laravel e APIs REST, com mais de 3 anos de experiência construindo e mantendo sistemas web em produção. Tenho atenção especial às partes de um sistema que evitam problemas antes que eles apareçam: controle de acesso bem definido, consistência de dados e automação de processos repetitivos.",
    about_p2: "Trabalhos recentes incluem o fortalecimento do controle de acesso em recursos sensíveis da aplicação, utilizando RBAC, escopos de tokens de API e validações de propriedade, além da criação de ferramentas que reduziram processos manuais recorrentes de horas para segundos.",
    about_p3: "No início da minha carreira, atuei como o único desenvolvedor interno de uma empresa, assumindo responsabilidades por sistemas legados, infraestrutura, automação e desenvolvimento de aplicações, desde o levantamento de requisitos até a entrada em produção.",
    metric_exp: "EXP. PROFISSIONAL",
    metric_exp_val: "3+ ANOS",
    metric_apis: "APIs INTEGRADAS",
    metric_apis_val: "100+ RES",
    metric_latency: "MÉDIA LATÊNCIA",
    metric_latency_val: "< 50ms",

    // Experience Section Title
    exp_title: "TRAJETÓRIA PROFISSIONAL",
    exp_subtitle: "Minha jornada no desenvolvimento.",
    results_critical: "Resultados e Entregas Críticas",
    btn_full_trajectory: "VER TRAJETÓRIA COMPLETA",
    btn_collapse_trajectory: "RECOLHER TRAJETÓRIA",

    // Projects Section Title
    projects_title: "SISTEMAS DESENVOLVIDOS",
    projects_subtitle: "Sistemas e arquiteturas de alta performance.",
    other_backend_projects: "Outros Projetos Backend",
    other_backend_desc: "Explore todo o meu portfólio de sistemas, APIs RESTful e automações de alta performance diretamente no GitHub.",
    btn_view_more: "VER MAIS",
    btn_source_code: "CÓDIGO FONTE",
    btn_demo: "PREVIEW ONLINE",
    status_dev: "Em Desenvolvimento",

    // Skills Section Title
    skills_title: "CONHECIMENTO TÉCNICO",
    skills_subtitle: "Meu arsenal técnico em cenários reais de produção.",
    btn_more_skills: "VER MAIS CONHECIMENTOS",
    btn_less_skills: "RECOLHER CONHECIMENTOS",

    // Principles Section Title
    principles_title: "FILOSOFIA DE ENGENHARIA",
    principles_subtitle: "Princípios que guiam minhas decisões técnicas.",
    metric_focus: "MÉTRICA DE FOCO:",
    btn_more_principles: "VER MAIS PRINCÍPIOS",
    btn_less_principles: "RECOLHER PRINCÍPIOS",

    // Contact Section Title
    contact_title: "CONTATO E OPORTUNIDADES",
    contact_subtitle: "Traga alta performance para o seu time.",
    contact_direct: "CONTATO DIRETO",
    contact_form_title: "Inicie uma conversa profissional de engenharia.",
    contact_form_desc: "Se você está buscando um Engenheiro de Software Backend focado em resolver problemas complexos com Laravel, PHP de alta performance, arquiteturas resilientes e Clean Architecture para integrar seu time, entre em contato.",
    label_name: "Nome Completo",
    placeholder_name: "Nome Completo",
    label_email: "E-MAIL",
    placeholder_email: "Digite seu email",
    label_message: "Mensagem",
    placeholder_message: "Olá Adriel, gostaria de discutir sobre...",
    btn_sending: "ENVIANDO...",
    btn_send: "ENVIAR MENSAGEM",
    toast_success: "Sua mensagem foi enviada com sucesso! Entrarei em contato em breve.",
    toast_error: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",

    // Footer
    footer_text: "Projetado sob medida com Next.js, React, Tailwind CSS e Framer Motion. Direitos reservados.",
    footer_tag: "CÓDIGO LIMPO • ESCALABILIDADE • ALTA DISPONIBILIDADE",

    // Additional Project Spec Keys
    real_product: "PRODUTO REAL",
    hide_details: "Ocultar Detalhes",
    explore_architecture: "Explorar Arquitetura",
    infra_specs: "ESPECIFICAÇÕES DA INFRAESTRUTURA",
    btn_code: "CÓDIGO",
    btn_preview: "PREVIEW",
    interactive_nodes_banner: "Interativo: Toque nos nós para propagar pacotes",
    category_gateway_ingress: "Gateway de Entrada",
    category_edge_routing: "Roteamento de Borda",
    category_orquestracao: "Orquestração",
    category_app_layer: "Camada de Aplicação",
    category_caching_queues: "Cache e Filas",
    category_persistence_layer: "Camada de Persistência",
    category_messaging: "Mensageria",

    // Interactive Architecture Node Translations
    label_tech: "TECNOLOGIA:",
    label_spec: "CARGA / SPEC:",
    
    node_client_name: "Clientes (SPA / Mobile)",
    node_client_tech: "HTTP/2 / WebSockets",
    node_client_spec: "TLS 1.3 • CORS Protegido",
    node_client_description: "Clientes externos realizando chamadas de API concorrentes com compressão Gzip/Brotli e cabeçalhos de segurança estritos.",
    node_client_metricLabel: "Requests / seg",
    node_client_metricValue: "420 req/s",

    node_cloudflare_name: "Cloudflare & WAF",
    node_cloudflare_tech: "Edge Engine",
    node_cloudflare_spec: "WAF Ativo • DDoS Mitigation",
    node_cloudflare_description: "Camada de segurança inteligente de borda. Bloqueia ameaças do OWASP Top 10, gerencia certificado SSL e atua como rate-limiter inicial.",
    node_cloudflare_metricLabel: "Spam Bloqueado",
    node_cloudflare_metricValue: "99.8%",

    node_gateway_name: "API Gateway",
    node_gateway_tech: "Custom Gateway",
    node_gateway_spec: "Idempotency Token Validator",
    node_gateway_description: "Porta de entrada interna do ecossistema. Roteia requisições, valida tokens JWT, injeta cabeçalhos de tenant e gerencia assinaturas de webhook.",
    node_gateway_metricLabel: "Tempo de Roteamento",
    node_gateway_metricValue: "0.8ms",

    node_laravel_name: "Laravel Cluster (SaaS Engine)",
    node_laravel_tech: "PHP 8.3 / Octane",
    node_laravel_spec: "Multi-Tenant Schema Router",
    node_laravel_description: "Servidor de aplicação responsável pela lógica de negócios robusta, orquestração de faturamentos da Nexora e roteamento dinâmico de inquilinos.",
    node_laravel_metricLabel: "Tempo de Execução",
    node_laravel_metricValue: "24ms",

    node_springboot_name: "Spring Boot (Gateway de Transações)",
    node_springboot_tech: "Java 21 / Spring Boot 3",
    node_springboot_spec: "WebFlux • Circuit Breaker",
    node_springboot_description: "Serviço financeiro reativo e resiliente responsável pelas transações da OfficePay. Implementa mTLS e isolamento estrito contra concorrência.",
    node_springboot_metricLabel: "Latência Crítica",
    node_springboot_metricValue: "12ms",

    node_redis_name: "Redis Cache Layer",
    node_redis_tech: "Redis Cluster 7",
    node_redis_spec: "Cache In-Memory • Rate-Limiting",
    node_redis_description: "Armazenamento chave-valor de baixíssima latência. Armazena sessões, tokens de acesso revogados e gerencia filas rápidas de prioridade.",
    node_redis_metricLabel: "Hit Rate",
    node_redis_metricValue: "94.2%",

    node_postgres_name: "PostgreSQL Database",
    node_postgres_tech: "PostgreSQL 16",
    node_postgres_spec: "Schemas Isolados • Write-Replica",
    node_postgres_description: "Banco de dados relacional robusto com isolamento de esquemas físicos por cliente (SaaS Multi-tenant). Indexado para buscas otimizadas.",
    node_postgres_metricLabel: "Index Cache Hit",
    node_postgres_metricValue: "99.1%",

    node_rabbitmq_name: "RabbitMQ Broker",
    node_rabbitmq_tech: "RabbitMQ Cluster",
    node_rabbitmq_spec: "AMQP • Filas Persistentes",
    node_rabbitmq_description: "Mensageria assíncrona responsável por processar e enfileirar tarefas pesadas em background, como webhooks lentos e relatórios em lote.",
    node_rabbitmq_metricLabel: "Mensagens em Fila",
    node_rabbitmq_metricValue: "0 Ativas"
  },
  en: {
    // Header & Navigation
    nav_hero: "Home",
    nav_about: "About",
    nav_experience: "Experience",
    nav_projects: "Projects",
    nav_skills: "Skills",
    nav_principles: "Philosophy",
    nav_contact: "Contact",
    download_resume: "Download Resume",

    // Hero
    software_engineer: "Software Engineer",
    ssh_cluster: "adriel@production_cluster:~$ ssh saas_gateway",
    hero_description: "I build backend solutions using Laravel, developing APIs, integrations, and web applications that prioritize organization, simplicity, and maintainability.",
    btn_view_projects: "VIEW PROJECTS",
    btn_talk_to_me: "TALK TO ME",
    rolar_para_sobre: "Scroll to About Me",

    // About Me
    about_title: "ABOUT ME",
    about_subtitle: "Architecture and complex problem solving.",
    about_p1: "Backend developer specializing in PHP, Laravel, and REST APIs, with over 3 years of experience building and maintaining web systems in production. I pay special attention to the parts of a system that prevent problems before they arise: well-defined access control, data consistency, and automation of repetitive processes.",
    about_p2: "Recent work includes strengthening access control on sensitive application resources using RBAC, API token scopes, and ownership validations, as well as creating tools that reduced recurring manual processes from hours to seconds.",
    about_p3: "Early in my career, I served as the sole in-house developer at a company, taking responsibility for legacy systems, infrastructure, automation, and application development, from requirements gathering to production deployment.",
    metric_exp: "PROFESSIONAL EXP.",
    metric_exp_val: "3+ YEARS",
    metric_apis: "INTEGRATED APIs",
    metric_apis_val: "100+ REQs",
    metric_latency: "AVG. LATENCY",
    metric_latency_val: "< 50ms",

    // Experience Section Title
    exp_title: "PROFESSIONAL EXPERIENCE",
    exp_subtitle: "My development journey",
    results_critical: "Critical Results & Deliveries",
    btn_full_trajectory: "VIEW FULL TRAJECTORY",
    btn_collapse_trajectory: "COLLAPSE TRAJECTORY",

    // Projects Section Title
    projects_title: "DEVELOPED SYSTEMS",
    projects_subtitle: "High-performance systems and architectures.",
    other_backend_projects: "Other Backend Projects",
    other_backend_desc: "Explore my entire portfolio of systems, RESTful APIs, and high-performance automations directly on GitHub.",
    btn_view_more: "VIEW MORE",
    btn_source_code: "SOURCE CODE",
    btn_demo: "ONLINE PREVIEW",
    status_dev: "In Development",

    // Skills Section Title
    skills_title: "TECHNICAL KNOWLEDGE",
    skills_subtitle: "My technical stack in real production scenarios.",
    btn_more_skills: "VIEW MORE SKILLS",
    btn_less_skills: "COLLAPSE SKILLS",

    // Principles Section Title
    principles_title: "ENGINEERING PHILOSOPHY",
    principles_subtitle: "Principles guiding my technical decisions.",
    metric_focus: "FOCUS METRIC:",
    btn_more_principles: "VIEW MORE PRINCIPLES",
    btn_less_principles: "COLLAPSE PRINCIPLES",

    // Contact Section Title
    contact_title: "CONTACT & OPPORTUNITIES",
    contact_subtitle: "Bring high performance to your team.",
    contact_direct: "DIRECT CONTACT",
    contact_form_title: "Start a professional engineering conversation.",
    contact_form_desc: "If you are looking for a Backend Software Engineer focused on solving complex problems with Laravel, PHP of high performance, resilient architectures, and Clean Architecture to join your team, please reach out.",
    label_name: "Full Name",
    placeholder_name: "Full Name",
    label_email: "EMAIL",
    placeholder_email: "Enter your email",
    label_message: "Message",
    placeholder_message: "Hi Adriel, I'd like to talk about...",
    btn_sending: "SENDING...",
    btn_send: "SEND MESSAGE",
    toast_success: "Your message was sent successfully! I will reach out soon.",
    toast_error: "An error occurred while sending your message. Please try again.",

    // Footer
    footer_text: "Custom built with Next.js, React, Tailwind CSS, and Framer Motion. All rights reserved.",
    footer_tag: "CLEAN CODE • SCALABILITY • HIGH AVAILABILITY",

    // Additional Project Spec Keys
    real_product: "REAL PRODUCT",
    hide_details: "Hide Details",
    explore_architecture: "Explore Architecture",
    infra_specs: "INFRASTRUCTURE SPECIFICATIONS",
    btn_code: "CODE",
    btn_preview: "PREVIEW",
    interactive_nodes_banner: "Interactive: Tap on nodes to propagate packets",
    category_gateway_ingress: "Gateway Ingress",
    category_edge_routing: "Edge Routing",
    category_orquestracao: "Orchestration",
    category_app_layer: "Application Layer",
    category_caching_queues: "Caching & Queues",
    category_persistence_layer: "Persistence Layer",
    category_messaging: "Messaging",

    // Interactive Architecture Node Translations
    label_tech: "TECHNOLOGY:",
    label_spec: "LOAD / SPEC:",
    
    node_client_name: "Clients (SPA / Mobile)",
    node_client_tech: "HTTP/2 / WebSockets",
    node_client_spec: "TLS 1.3 • CORS Protected",
    node_client_description: "External clients making concurrent API calls with Gzip/Brotli compression and strict security headers.",
    node_client_metricLabel: "Requests / sec",
    node_client_metricValue: "420 req/s",

    node_cloudflare_name: "Cloudflare & WAF",
    node_cloudflare_tech: "Edge Engine",
    node_cloudflare_spec: "Active WAF • DDoS Mitigation",
    node_cloudflare_description: "Intelligent edge security layer. Blocks OWASP Top 10 threats, manages SSL certificates, and acts as the initial rate-limiter.",
    node_cloudflare_metricLabel: "Spam Blocked",
    node_cloudflare_metricValue: "99.8%",

    node_gateway_name: "API Gateway",
    node_gateway_tech: "Custom Gateway",
    node_gateway_spec: "Idempotency Token Validator",
    node_gateway_description: "Internal entry point of the ecosystem. Routes requests, validates JWT tokens, injects tenant headers, and manages webhook subscriptions.",
    node_gateway_metricLabel: "Routing Time",
    node_gateway_metricValue: "0.8ms",

    node_laravel_name: "Laravel Cluster (SaaS Engine)",
    node_laravel_tech: "PHP 8.3 / Octane",
    node_laravel_spec: "Multi-Tenant Schema Router",
    node_laravel_description: "Application server responsible for robust business logic, Nexora billing orchestration, and dynamic tenant routing.",
    node_laravel_metricLabel: "Execution Time",
    node_laravel_metricValue: "24ms",

    node_springboot_name: "Spring Boot (Transaction Gateway)",
    node_springboot_tech: "Java 21 / Spring Boot 3",
    node_springboot_spec: "WebFlux • Circuit Breaker",
    node_springboot_description: "Reactive and resilient financial service responsible for OfficePay transactions. Implements mTLS and strict concurrency isolation.",
    node_springboot_metricLabel: "Critical Latency",
    node_springboot_metricValue: "12ms",

    node_redis_name: "Redis Cache Layer",
    node_redis_tech: "Redis Cluster 7",
    node_redis_spec: "In-Memory Cache • Rate-Limiting",
    node_redis_description: "Ultra-low latency key-value storage. Stores sessions, revoked access tokens, and manages fast priority queues.",
    node_redis_metricLabel: "Hit Rate",
    node_redis_metricValue: "94.2%",

    node_postgres_name: "PostgreSQL Database",
    node_postgres_tech: "PostgreSQL 16",
    node_postgres_spec: "Isolated Schemas • Write-Replica",
    node_postgres_description: "Robust relational database with physical schema isolation per client (SaaS Multi-tenant). Indexed for optimized searches.",
    node_postgres_metricLabel: "Index Cache Hit",
    node_postgres_metricValue: "99.1%",

    node_rabbitmq_name: "RabbitMQ Broker",
    node_rabbitmq_tech: "RabbitMQ Cluster",
    node_rabbitmq_spec: "AMQP • Persistent Queues",
    node_rabbitmq_description: "Asynchronous messaging responsible for processing and queueing heavy background tasks, such as slow webhooks and batch reports.",
    node_rabbitmq_metricLabel: "Queued Messages",
    node_rabbitmq_metricValue: "0 Active"
  }
};

const EXPERIENCES_LOCALIZED: Record<Language, Experience[]> = {
  pt: [
    {
      id: "exp-officecom",
      period: "Fev/2025 — Atual",
      role: "Backend Developer | PHP & Laravel",
      company: "OfficeCom Brasil",
      description: "Desenvolvo e mantenho funcionalidades de backend e APIs REST para sistemas em produção utilizando PHP e Laravel.",
      results: [
        "Reestruturei o controle de acesso de recursos sensíveis da aplicação, fortalecendo a autorização em mais de cinco fluxos e mitigando riscos de Broken Access Control por meio de RBAC, escopos de API e validações de propriedade.",
        "Ampliei as verificações de propriedade para mais de cinco tipos de recursos sensíveis — incluindo pedidos, saques, desvios, cartões e saldos de conta —, abrangendo cenários que não eram protegidos apenas pela ordem em nível de middleware."
      ],
      technologies: ["PHP", "Laravel", "APIs REST", "RBAC", "MySQL", "Git"]
    },
    {
      id: "exp-stoledo-jr2",
      period: "Jan/2024 — Fev/2025",
      role: "Desenvolvedor Web Júnior II",
      company: "S. Toledo Agência Integrada",
      description: "Atuei como único desenvolvedor interno responsável pela evolução e sustentação dos sistemas web da empresa, trabalhando principalmente com PHP, Laravel e MySQL, além de demandas relacionadas à infraestrutura e integrações.",
      results: [
        "Refatorei de ponta a ponta um sistema legado utilizado por uma das empresas do grupo, reorganizando sua base de código e sua arquitetura para tornar a aplicação mais sustentável, previsível e fácil de evoluir.",
        "Desenvolvi automações para eliminar atividades operacionais repetitivas e participei diretamente do levantamento de requisitos, desenvolvimento, implantação e manutenção dos sistemas em produção."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "Infraestrutura", "Automação", "Git"]
    },
    {
      id: "exp-stoledo-jr",
      period: "Abr/2023 — Dez/2023",
      role: "Desenvolvedor Web Júnior",
      company: "S. Toledo Agência Integrada",
      description: "Atuei no desenvolvimento e manutenção de sistemas web utilizando PHP, Laravel, MySQL e JavaScript, assumindo progressivamente maior responsabilidade sobre as aplicações internas da empresa.",
      results: [
        "Trabalhei desde o entendimento das necessidades das áreas internas até a implementação e disponibilização das funcionalidades, além de atuar na manutenção de sistemas legados, correção de problemas e evolução das aplicações existentes.",
        "Como único desenvolvedor interno, também passei a lidar com demandas técnicas relacionadas ao ambiente e à infraestrutura necessários para manter os sistemas em funcionamento."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "Infraestrutura", "Git"]
    },
    {
      id: "exp-stoledo-intern",
      period: "Out/2022 — Mar/2023",
      role: "Estagiário de Desenvolvimento Web",
      company: "S. Toledo Agência Integrada",
      description: "Iniciei minha atuação profissional trabalhando na manutenção e evolução de sistemas web existentes com PHP, Laravel, MySQL e JavaScript.",
      results: [
        "Atuei na correção de bugs, implementação de melhorias e suporte aos sistemas em produção, além de começar a assumir demandas relacionadas à infraestrutura e ao funcionamento das aplicações da empresa.",
        "Essa experiência me deu contato direto com sistemas legados e com a responsabilidade de manter aplicações utilizadas no dia a dia da operação."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "Git"]
    }
  ],
  en: [
    {
      id: "exp-officecom",
      period: "Feb/2025 — Present",
      role: "Backend Developer | PHP & Laravel",
      company: "OfficeCom Brasil",
      description: "Develop and maintain backend features and REST APIs for production systems using PHP and Laravel.",
      results: [
        "Restructured access control for sensitive application resources, strengthening authorization across 5+ flows and mitigating Broken Access Control risks using RBAC, API scopes, and ownership validations.",
        "Expanded ownership checks for 5+ sensitive resource types — including orders, withdrawals, transfers, cards, and account balances —, covering scenarios not protected solely by middleware-level checks."
      ],
      technologies: ["PHP", "Laravel", "REST APIs", "RBAC", "MySQL", "Git"]
    },
    {
      id: "exp-stoledo-jr2",
      period: "Jan/2024 — Feb/2025",
      role: "Junior II Web Developer",
      company: "S. Toledo Agência Integrada",
      description: "Served as the sole in-house developer responsible for evolving and maintaining company web systems, working primarily with PHP, Laravel, and MySQL, alongside infrastructure and integration demands.",
      results: [
        "Refactored a legacy system used by a group company end-to-end, reorganizing its codebase and architecture to make the application more sustainable, predictable, and maintainable.",
        "Developed automations to eliminate repetitive operational tasks and directly participated in requirements gathering, development, deployment, and maintenance of production systems."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "Infrastructure", "Automation", "Git"]
    },
    {
      id: "exp-stoledo-jr",
      period: "Apr/2023 — Dec/2023",
      role: "Junior Web Developer",
      company: "S. Toledo Agência Integrada",
      description: "Worked on developing and maintaining web systems using PHP, Laravel, MySQL, and JavaScript, progressively taking on greater responsibility for internal applications.",
      results: [
        "Worked from understanding internal department needs to implementing and releasing features, as well as maintaining legacy systems, bug fixing, and evolving existing applications.",
        "As the sole in-house developer, also managed technical demands regarding the environment and infrastructure required to keep systems operational."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "Infrastructure", "Git"]
    },
    {
      id: "exp-stoledo-intern",
      period: "Oct/2022 — Mar/2023",
      role: "Web Development Intern",
      company: "S. Toledo Agência Integrada",
      description: "Started my professional career working on maintaining and evolving existing web systems with PHP, Laravel, MySQL, and JavaScript.",
      results: [
        "Worked on bug fixing, feature enhancements, and production support, while beginning to handle infrastructure and application maintenance tasks.",
        "Direct contact with legacy systems and the responsibility of maintaining applications used in daily operations."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "Git"]
    }
  ]
};

const SKILLS_LOCALIZED: Record<Language, SkillCategory[]> = {
  pt: [
    {
      title: "Backend",
      skills: [
        { name: "Laravel", level: 95, description: "Framework robusto, filas, queues, gates e multi-tenancy avançado" },
        { name: "PHP", level: 95, description: "Orientação a objetos avançada, gerenciamento de memória e PHP 8.x+" },
        { name: "Node.js", level: 75, description: "Desenvolvimento de APIs RESTful assíncronas de alta performance com Express e TypeScript" },
        { name: "REST APIs", level: 98, description: "Projetos sob os níveis de maturidade de Richardson, idempotência" },
        { name: "OAuth", level: 80, description: "Integração self-service com provedores OAuth2 de terceiros — fluxo authorization code e credenciais de plataforma" }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", level: 40, description: "Exposição em estudo/teste — experiência de produção real foi majoritariamente em MySQL" },
        { name: "MySQL", level: 92, description: "Replicação master-slave, pools de conexão, transações ACID estruturadas" },
        { name: "Redis", level: 95, description: "Caches em memória, estruturas de dados complexas, filas pub-sub e rate-limiting" }
      ]
    },
    {
      title: "DevOps & Cloud",
      skills: [
        { name: "Docker", level: 90, description: "Conteinerização multinível, otimização de imagens, Docker Compose" },
        { name: "Linux", level: 55, description: "Operação de VPS via SSH — deploy, debug de permissões e ambiente Docker em produção, não administração completa de servidor" },
        { name: "Git / GitHub", level: 95, description: "Fluxos de GitFlow, trunk-based, ganchos automáticos (hooks)" },
        { name: "Azure DevOps", level: 60, description: "Pipelines avançados, entrega contínua, gerenciamento de artefatos" },
        { name: "Cloudflare", level: 65, description: "DNS, proxy e emissão de certificado via desafio DNS — sem configuração de WAF ou regras de firewall customizadas" },
        { name: "CI / CD", level: 65, description: "Pipelines de build e deploy contínuo — sem análise de vulnerabilidade integrada ao pipeline" }
      ]
    },
    {
      title: "Architecture & Practices",
      skills: [
        { name: "Clean Architecture", level: 75, description: "Separação pragmática de responsabilidades (controller fino → service → resposta padronizada) — não a Clean Architecture formal com portas/adaptadores e independência total de framework" },
        { name: "SOLID", level: 98, description: "Garantia de extensibilidade, facilidade de manutenção e modularidade do código" },
        { name: "Design Patterns", level: 90, description: "Uso consciente de padrões como Factory, Strategy, Observer, Facade, Singleton" },
        { name: "Scalability & Perf", level: 75, description: "Identificação de gargalos de query/cache e uso de filas para desacoplar carga — sem stack de APM/observabilidade em produção" },
        { name: "Testing (TDD)", level: 55, description: "Testes unitários/integrados quando o projeto exige — não é prática consistente em todo código que escrevo" }
      ]
    }
  ],
  en: [
    {
      title: "Backend",
      skills: [
        { name: "Laravel", level: 95, description: "Robust framework, queues, gates, and advanced multi-tenancy" },
        { name: "PHP", level: 95, description: "Advanced OOP, memory management, and PHP 8.x+" },
        { name: "Node.js", level: 75, description: "Development of high-performance asynchronous RESTful APIs with Express and TypeScript" },
        { name: "REST APIs", level: 98, description: "Projects built under Richardson maturity levels, idempotency" },
        { name: "OAuth", level: 80, description: "Self-service integration with third-party OAuth2 providers — authorization code flow and platform credentials" }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", level: 40, description: "Study/testing exposure — real production experience was mostly in MySQL" },
        { name: "MySQL", level: 92, description: "Master-slave replication, connection pools, structured ACID transactions" },
        { name: "Redis", level: 95, description: "In-memory caching, complex data structures, pub-sub queues, and rate-limiting" }
      ]
    },
    {
      title: "DevOps & Cloud",
      skills: [
        { name: "Docker", level: 90, description: "Multi-stage containerization, image optimization, Docker Compose" },
        { name: "Linux", level: 55, description: "VPS operation via SSH — deployment, permissions debugging, and production Docker environment, not full server administration" },
        { name: "Git / GitHub", level: 95, description: "GitFlow, trunk-based workflows, automated hooks" },
        { name: "Azure DevOps", level: 60, description: "Advanced pipelines, continuous delivery, artifact management" },
        { name: "Cloudflare", level: 65, description: "DNS, proxy, and certificate issuance via DNS challenge — no WAF configuration or custom firewall rules" },
        { name: "CI / CD", level: 65, description: "Build and continuous deployment pipelines — no integrated vulnerability scanning in the pipeline" }
      ]
    },
    {
      title: "Architecture & Practices",
      skills: [
        { name: "Clean Architecture", level: 75, description: "Pragmatic separation of concerns (thin controller → service → standardized response) — not formal Clean Architecture with ports/adapters and total framework independence" },
        { name: "SOLID", level: 98, description: "Guarantees code extensibility, maintainability, and modularity" },
        { name: "Design Patterns", level: 90, description: "Conscious use of patterns like Factory, Strategy, Observer, Facade, Singleton" },
        { name: "Scalability & Perf", level: 75, description: "Identification of query/cache bottlenecks and use of queues to decouple load — no APM/observability stack in production" },
        { name: "Testing (TDD)", level: 55, description: "Unit/integration tests when required by the project — not a consistent practice in all code I write" }
      ]
    }
  ]
};

const PROJECTS_LOCALIZED: Record<Language, Project[]> = {
  pt: [
    {
      id: "trayvon-saas",
      title: "Trayvon",
      description: "Plataforma SaaS multi-tenant empresarial focada em alta performance de processamento financeiro e faturamento.",
      longDescription: "O Trayvon é uma infraestrutura corporativa robusta desenvolvida com Laravel e MySQL, operando sob uma arquitetura de múltiplos inquilinos com isolamento estrito de esquemas de banco de dados. Conta com filas de alta prioridade estruturadas no Redis, garantindo processamento em lote assíncrono em segundos.",
      image: "finance_dashboard",
      technologies: ["Laravel", "MySQL", "Redis", "Docker", "RabbitMQ"],
      githubUrl: "",
      demoUrl: "https://trayvon.com.br/",
      metrics: [
        { label: "Tempo de Resposta", value: "42ms" },
        { label: "Taxa de Uptime", value: "99.99%" },
        { label: "Banco de Dados", value: "Multi-tenant" }
      ]
    },
    {
      id: "giracadeira",
      title: "GiraCadeira",
      description: "Sistema completo para gestão de barbearias e salões, finanças e agendamentos inteligentes em tempo real.",
      longDescription: "O GiraCadeira é uma plataforma desenvolvida sob medida para barbearias e salões de beleza, permitindo agendamento automatizado, controle de fluxo de caixa e gestão de profissionais. Construído com Laravel no back-end e React no front-end, o sistema utiliza MySQL para persistência de alta confiabilidade e Redis para cache de agendamentos concorrentes.",
      image: "payment_analytics",
      technologies: ["Laravel", "React", "MySQL", "Redis", "REST APIs"],
      githubUrl: "",
      demoUrl: "https://giracadeira.vercel.app/",
      metrics: [
        { label: "Status", value: "Em Produção" },
        { label: "Plataforma", value: "SaaS Web" },
        { label: "Agendamentos", value: "Tempo Real" }
      ]
    },
    {
      id: "multi-tenant-saas",
      title: "Multi-Tenant Core Engine",
      description: "Template arquitetural avançado para sistemas SaaS com suporte a tenant isolado por schema dinâmico de banco de dados.",
      longDescription: "Um núcleo arquitetural completo projetado sob as melhores práticas de Clean Architecture. Ele gerencia o roteamento de inquilinos automaticamente de acordo com subdomínios ou cabeçalhos personalizados, estendendo migrações e isolamento de banco de dados dinâmico sem sobrecarga.",
      image: "database_schemas",
      technologies: ["Laravel", "PostgreSQL", "SOLID", "Clean Architecture"],
      githubUrl: "https://github.com",
      demoUrl: "https://multitenant-core.com",
      metrics: [
        { label: "Segurança de Dados", value: "Total" },
        { label: "Tempo de Provisionamento", value: "< 2s" },
        { label: "Isolamento", value: "Físico & Lógico" }
      ]
    }
  ],
  en: [
    {
      id: "trayvon-saas",
      title: "Trayvon",
      description: "Enterprise multi-tenant SaaS platform focused on high-performance financial processing and billing.",
      longDescription: "Trayvon is a robust corporate infrastructure built with Laravel and MySQL, operating under a multi-tenant architecture with strict database schema isolation. It features high-priority Redis queues, ensuring asynchronous batch processing in seconds.",
      image: "finance_dashboard",
      technologies: ["Laravel", "MySQL", "Redis", "Docker", "RabbitMQ"],
      githubUrl: "",
      demoUrl: "https://trayvon.com.br/",
      metrics: [
        { label: "Response Time", value: "42ms" },
        { label: "Uptime Rate", value: "99.99%" },
        { label: "Database", value: "Multi-tenant" }
      ]
    },
    {
      id: "giracadeira",
      title: "GiraCadeira",
      description: "Complete system for barbershop and salon management, finance, and smart real-time scheduling.",
      longDescription: "GiraCadeira is a platform custom-built for barbershops and beauty salons, enabling automated scheduling, cash flow control, and professional management. Built with Laravel on the back-end and React on the front-end, the system utilizes MySQL for high-reliability persistence and Redis for concurrent scheduling cache.",
      image: "payment_analytics",
      technologies: ["Laravel", "React", "MySQL", "Redis", "REST APIs"],
      githubUrl: "",
      demoUrl: "https://giracadeira.vercel.app/",
      metrics: [
        { label: "Status", value: "In Production" },
        { label: "Platform", value: "SaaS Web" },
        { label: "Scheduling", value: "Real-Time" }
      ]
    },
    {
      id: "multi-tenant-saas",
      title: "Multi-Tenant Core Engine",
      description: "Advanced architectural template for SaaS systems with dynamic database schema-based tenant isolation.",
      longDescription: "A complete architectural core designed under Clean Architecture best practices. It automatically handles tenant routing based on subdomains or custom headers, extending dynamic database migrations and isolation without overhead.",
      image: "database_schemas",
      technologies: ["Laravel", "PostgreSQL", "SOLID", "Clean Architecture"],
      githubUrl: "https://github.com",
      demoUrl: "https://multitenant-core.com",
      metrics: [
        { label: "Data Security", value: "Total" },
        { label: "Provision Time", value: "< 2s" },
        { label: "Isolation", value: "Physical & Logical" }
      ]
    }
  ]
};

const PRINCIPLES_LOCALIZED: Record<Language, EngineeringPrinciple[]> = {
  pt: [
    {
      title: "Clean Code & SOLID",
      description: "Código escrito para ser lido por humanos e mantido por gerações de engenheiros. Separação rígida de responsabilidades e acoplamento zero em frameworks.",
      iconName: "Code",
      metric: "Manutenibilidade Estrita"
    },
    {
      title: "Performance Extrema",
      description: "Cada milissegundo conta. Otimização implacável de consultas SQL, modelagem estratégica de cache em memória e tratamento assíncrono de operações lentas.",
      iconName: "Zap",
      metric: "Latência Sub-50ms"
    },
    {
      title: "Segurança First",
      description: "Auditoria ativa, sanitização rigorosa de inputs, escopo granular de acessos via JWT/OAuth2 e defesa em camadas contra OWASP Top 10.",
      iconName: "Shield",
      metric: "Zero Vazamentos"
    },
    {
      title: "Escalabilidade Horizontal",
      description: "Desenvolvimento sem estado (stateless). Prontidão total para escalar horizontalmente adicionando containers conforme a demanda oscilar.",
      iconName: "Layers",
      metric: "Pronto p/ Milhões"
    },
    {
      title: "Automação Completa",
      description: "Sem intervenção manual. Builds, testes unitários, validações estáticas, análises de vulnerabilidade e deploys operados 100% por pipelines automatizados.",
      iconName: "Cpu",
      metric: "CI/CD em Tudo"
    },
    {
      title: "Manutenibilidade e Testabilidade",
      description: "Foco total na escrita de testes robustos que evitam regressões. Suítes de testes unitários e de integração são as verdadeiras especificações vivas do sistema.",
      iconName: "CheckSquare",
      metric: "Cobertura > 90%"
    },
    {
      title: "Architecture First (DDD & Clean)",
      description: "A modelagem do domínio do negócio dita o design do software. Padrões claros garantem que regras complexas permaneçam isoladas e perfeitamente legíveis.",
      iconName: "FolderGit",
      metric: "Domínios Puros"
    },
    {
      title: "Developer Experience (DX)",
      description: "Facilidade de onboarding e desenvolvimento local ágil. Ambientes Docker 100% reprodutíveis com um único comando e documentações de API impecáveis (Swagger).",
      iconName: "Terminal",
      metric: "Onboarding em < 1h"
    },
    {
      title: "Foco Pragmático em Resolução",
      description: "Arquitetura sofisticada serve para resolver problemas reais de negócios, e não para inflar o ego técnico. Simplicidade é o último grau da sofisticação.",
      iconName: "Award",
      metric: "Valor de Negócio"
    }
  ],
  en: [
    {
      title: "Clean Code & SOLID",
      description: "Code written to be read by humans and maintained by generations of engineers. Strict separation of concerns and zero framework coupling.",
      iconName: "Code",
      metric: "Strict Maintainability"
    },
    {
      title: "Extreme Performance",
      description: "Every millisecond counts. Relentless SQL query optimization, strategic in-memory cache design, and asynchronous handling of slow tasks.",
      iconName: "Zap",
      metric: "Sub-50ms Latency"
    },
    {
      title: "Security First",
      description: "Active auditing, rigorous input sanitization, granular access scope via JWT/OAuth2, and layered defense against OWASP Top 10.",
      iconName: "Shield",
      metric: "Zero Data Leaks"
    },
    {
      title: "Horizontal Scalability",
      description: "Stateless development. Complete readiness to scale horizontally by adding containers as demand fluctuates.",
      iconName: "Layers",
      metric: "Ready for Millions"
    },
    {
      title: "Full Automation",
      description: "No manual intervention. Builds, unit tests, static validation, vulnerability analysis, and deploys operated 100% by automated pipelines.",
      iconName: "Cpu",
      metric: "CI/CD in Everything"
    },
    {
      title: "Maintainability & Testability",
      description: "Full focus on writing robust tests to prevent regressions. Unit and integration test suites act as living system specifications.",
      iconName: "CheckSquare",
      metric: "Coverage > 90%"
    },
    {
      title: "Architecture First (DDD & Clean)",
      description: "Business domain modeling dictates software design. Clear patterns ensure complex rules remain isolated and readable.",
      iconName: "FolderGit",
      metric: "Pure Domains"
    },
    {
      title: "Developer Experience (DX)",
      description: "Effortless onboarding and agile local development. 100% reproducible Docker environments with a single command and spotless API docs (Swagger).",
      iconName: "Terminal",
      metric: "Onboarding in < 1h"
    },
    {
      title: "Pragmatic Resolution Focus",
      description: "Sophisticated architecture serves to solve real business problems, not to inflate technical egos. Simplicity is the ultimate sophistication.",
      iconName: "Award",
      metric: "Business Value"
    }
  ]
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("portfolio-language");
    return (saved === "pt" || saved === "en") ? saved : "pt";
  });

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  const t = (key: string): string => {
    return UI_TRANSLATIONS[language][key] || key;
  };

  const experiences = EXPERIENCES_LOCALIZED[language];
  const skillCategories = SKILLS_LOCALIZED[language];
  const projects = PROJECTS_LOCALIZED[language];
  const principles = PRINCIPLES_LOCALIZED[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        experiences,
        skillCategories,
        projects,
        principles
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
