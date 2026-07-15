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
    hero_description: "Eu construo sistemas de backend modernos, APIs RESTful de alta performance e microsserviços integrados focados em código limpo, SOLID e segurança.",
    btn_view_projects: "VER PROJETOS",
    btn_talk_to_me: "FALE COMIGO",
    rolar_para_sobre: "Rolar para Sobre Mim",

    // About Me
    about_title: "SOBRE MIM",
    about_subtitle: "Arquitetura voltada para resolver problemas complexos.",
    about_p1: "Olá! Sou Adriel Barbosa, Engenheiro de Software Backend especialista no desenho e implementação de ecossistemas robustos de alta performance, soluções de mensageria concorrente e estruturas SaaS multi-tenant complexas.",
    about_p2: "Minha abordagem prática de engenharia é fortemente pautada em Clean Code, SOLID, DDD (Domain-Driven Design) e Clean Architecture. Isso garante que as regras de negócio de sua corporação permaneçam completamente isoladas de dependências de infraestrutura ou acoplamentos técnicos desnecessários, gerando bases de código modulares e preparadas para escalabilidade horizontal.",
    about_p3: "No dia a dia de produção, opero com conteinerização estrita usando Docker, estruturo caches de dados de altíssima velocidade via Redis, e configuro pipelines de integração e entrega contínua (CI/CD) com ganchos automatizados de auditoria estática e testes unitários/integração.",
    metric_exp: "EXP. PROFISSIONAL",
    metric_exp_val: "3+ ANOS",
    metric_apis: "APIs INTEGRADAS",
    metric_apis_val: "100+ RES",
    metric_latency: "MÉDIA LATÊNCIA",
    metric_latency_val: "< 50ms",

    // Experience Section Title
    exp_title: "TRAJETÓRIA PROFISSIONAL",
    exp_subtitle: "Minha jornada no desenvolvimento de soluções escaláveis de backend.",
    results_critical: "Resultados e Entregas Críticas",
    btn_full_trajectory: "VER TRAJETÓRIA COMPLETA",
    btn_collapse_trajectory: "RECOLHER TRAJETÓRIA",

    // Projects Section Title
    projects_title: "SISTEMAS DESENVOLVIDOS",
    projects_subtitle: "Sistemas em produção, arquiteturas empresariais e templates reutilizáveis de alta performance.",
    other_backend_projects: "Outros Projetos Backend",
    other_backend_desc: "Explore todo o meu portfólio de sistemas, APIs RESTful e automações de alta performance diretamente no GitHub.",
    btn_view_more: "VER MAIS",
    btn_source_code: "CÓDIGO FONTE",
    btn_demo: "PREVIEW ONLINE",
    status_dev: "Em Desenvolvimento",

    // Skills Section Title
    skills_title: "CONHECIMENTO TÉCNICO",
    skills_subtitle: "Meu arsenal técnico avaliado por proficiência e tempo de aplicação em cenários de produção real.",
    btn_more_skills: "VER MAIS CONHECIMENTOS",
    btn_less_skills: "RECOLHER CONHECIMENTOS",

    // Principles Section Title
    principles_title: "FILOSOFIA DE ENGENHARIA",
    principles_subtitle: "Princípios práticos de desenvolvimento de software que guiam cada decisão arquitetural que tomo.",
    metric_focus: "MÉTRICA DE FOCO:",
    btn_more_principles: "VER MAIS PRINCÍPIOS",
    btn_less_principles: "RECOLHER PRINCÍPIOS",

    // Contact Section Title
    contact_title: "CONTATO E OPORTUNIDADES",
    contact_subtitle: "Traga Alta Performance para o seu Time.",
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
    btn_preview: "PREVIEW"
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
    hero_description: "I build modern backend systems, high-performance RESTful APIs, and integrated microservices focused on clean code, SOLID, and security.",
    btn_view_projects: "VIEW PROJECTS",
    btn_talk_to_me: "TALK TO ME",
    rolar_para_sobre: "Scroll to About Me",

    // About Me
    about_title: "ABOUT ME",
    about_subtitle: "Architecture designed to solve complex problems.",
    about_p1: "Hello! I'm Adriel Barbosa, a Backend Software Engineer specialized in designing and implementing high-performance robust ecosystems, concurrent messaging solutions, and complex multi-tenant SaaS architectures.",
    about_p2: "My practical engineering approach is strongly based on Clean Code, SOLID, DDD (Domain-Driven Design), and Clean Architecture. This ensures that your company's business rules remain completely isolated from infrastructure dependencies or unnecessary technical coupling, generating modular codebases prepared for horizontal scalability.",
    about_p3: "In daily production, I operate with strict containerization using Docker, structure high-speed data caching via Redis, and configure continuous integration and delivery (CI/CD) pipelines with automated static audit hooks and unit/integration testing.",
    metric_exp: "PROFESSIONAL EXP.",
    metric_exp_val: "3+ YEARS",
    metric_apis: "INTEGRATED APIs",
    metric_apis_val: "100+ REQs",
    metric_latency: "AVG. LATENCY",
    metric_latency_val: "< 50ms",

    // Experience Section Title
    exp_title: "PROFESSIONAL EXPERIENCE",
    exp_subtitle: "My journey in developing scalable backend solutions.",
    results_critical: "Critical Results & Deliveries",
    btn_full_trajectory: "VIEW FULL TRAJECTORY",
    btn_collapse_trajectory: "COLLAPSE TRAJECTORY",

    // Projects Section Title
    projects_title: "DEVELOPED SYSTEMS",
    projects_subtitle: "Production systems, enterprise architectures, and high-performance reusable templates.",
    other_backend_projects: "Other Backend Projects",
    other_backend_desc: "Explore my entire portfolio of systems, RESTful APIs, and high-performance automations directly on GitHub.",
    btn_view_more: "VIEW MORE",
    btn_source_code: "SOURCE CODE",
    btn_demo: "ONLINE PREVIEW",
    status_dev: "In Development",

    // Skills Section Title
    skills_title: "TECHNICAL KNOWLEDGE",
    skills_subtitle: "My technical stack evaluated by proficiency and application time in real production scenarios.",
    btn_more_skills: "VIEW MORE SKILLS",
    btn_less_skills: "COLLAPSE SKILLS",

    // Principles Section Title
    principles_title: "ENGINEERING PHILOSOPHY",
    principles_subtitle: "Practical software development principles that guide every architectural decision I make.",
    metric_focus: "FOCUS METRIC:",
    btn_more_principles: "VIEW MORE PRINCIPLES",
    btn_less_principles: "COLLAPSE PRINCIPLES",

    // Contact Section Title
    contact_title: "CONTACT & OPPORTUNITIES",
    contact_subtitle: "Bring High Performance to Your Team.",
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
    btn_preview: "PREVIEW"
  }
};

const EXPERIENCES_LOCALIZED: Record<Language, Experience[]> = {
  pt: [
    {
      id: "exp-officecom",
      period: "Fev/2025 — Atual",
      role: "Desenvolvedor Back-end Jr II",
      company: "OfficeCom Brasil",
      description: "Desenvolvimento e manutenção de sistemas back-end com PHP e Laravel, garantindo alta performance e confiabilidade em sistemas em produção.",
      results: [
        "Integração de APIs REST robustas e gerenciamento eficiente de dados com MySQL, assegurando consistência de informações corporativas.",
        "Participação ativa em todo o ciclo de desenvolvimento: levantamento de requisitos, implementação de novas features, revisão de código e entrega.",
        "Escrita de código limpo e escalável, aplicando boas práticas de arquitetura, SOLID e padrões de projeto essenciais."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "REST APIs", "Clean Code", "Git"]
    },
    {
      id: "exp-stoledo-jr2",
      period: "Jan/2024 — Fev/2025",
      role: "Desenvolvedor Web Júnior II",
      company: "S. Toledo Agência Integrada",
      description: "Desenvolvimento de soluções web completas com Laravel e PHP, sendo referência da equipe técnica em integrações de APIs e automações.",
      results: [
        "Criação e implementação de scripts customizados em Python que automatizaram processos manuais e repetitivos do time, reduzindo o tempo de execução em 30%.",
        "Coordenação técnica da manutenção contínua e sustentação de sistemas e sites críticos, assegurando alta disponibilidade e performance constante.",
        "Análise aprofundada de requisitos técnicos e proposição de soluções robustas, eficientes e de fácil manutenção."
      ],
      technologies: ["PHP", "Laravel", "Python", "MySQL", "APIs", "Automation", "Git"]
    },
    {
      id: "exp-stoledo-jr",
      period: "Abr/2023 — Dez/2023",
      role: "Desenvolvedor Web Júnior",
      company: "S. Toledo Agência Integrada",
      description: "Desenvolvimento de ponta a ponta (full-cycle) de soluções web integradas utilizando stacks modernas baseadas em PHP e Laravel.",
      results: [
        "Desenvolvimento de requisitos funcionais de ponta a ponta em projetos web utilizando PHP, Laravel, MySQL e JavaScript.",
        "Otimização de performance e resolução de gargalos de banco de dados em sistemas legados, melhorando o tempo de resposta e estabilidade global.",
        "Criação autônoma de sistemas e portais funcionais, modernos e escaláveis para atender projetos corporativos de menor e médio porte."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "HTML/CSS", "Git"]
    },
    {
      id: "exp-stoledo-intern",
      period: "Out/2022 — Mar/2023",
      role: "Estagiário de Desenvolvimento Web",
      company: "S. Toledo Agência Integrada",
      description: "Início da trajetória profissional prestando suporte no desenvolvimento e manutenção evolutiva de plataformas digitais.",
      results: [
        "Manutenção contínua e correção de bugs em sistemas existentes construídos com PHP, Laravel, MySQL e JavaScript.",
        "Identificação e resolução assistida de problemas de performance em plataformas e portais web.",
        "Atuação integrada com metodologias ágeis (Scrum), participando de reuniões diárias (scrum meetings) e entregas em sprints semanais."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "Scrum", "Git"]
    }
  ],
  en: [
    {
      id: "exp-officecom",
      period: "Feb/2025 — Present",
      role: "Junior II Backend Developer",
      company: "OfficeCom Brasil",
      description: "Backend development and maintenance using PHP and Laravel, ensuring high performance and reliability for production systems.",
      results: [
        "Integration of robust REST APIs and efficient database management with MySQL, ensuring corporate data consistency.",
        "Active participation in the entire development lifecycle: requirements gathering, new feature implementation, code review, and delivery.",
        "Writing clean and scalable code, applying architecture best practices, SOLID, and essential design patterns."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "REST APIs", "Clean Code", "Git"]
    },
    {
      id: "exp-stoledo-jr2",
      period: "Jan/2024 — Feb/2025",
      role: "Junior II Web Developer",
      company: "S. Toledo Agência Integrada",
      description: "Development of end-to-end web solutions with Laravel and PHP, acting as a technical reference in API integrations and automations.",
      results: [
        "Creation and implementation of custom Python scripts that automated manual, repetitive tasks, reducing team execution time by 30%.",
        "Technical coordination of continuous maintenance and support for critical websites and systems, ensuring high availability.",
        "Deep analysis of technical requirements to propose robust, efficient, and easily maintainable solutions."
      ],
      technologies: ["PHP", "Laravel", "Python", "MySQL", "APIs", "Automation", "Git"]
    },
    {
      id: "exp-stoledo-jr",
      period: "Apr/2023 — Dec/2023",
      role: "Junior Web Developer",
      company: "S. Toledo Agência Integrada",
      description: "Full-cycle development of integrated web solutions using modern PHP and Laravel stacks.",
      results: [
        "Development of end-to-end functional requirements using PHP, Laravel, MySQL, and JavaScript.",
        "Performance optimization and database bottleneck resolution in legacy systems, improving global response time and stability.",
        "Independent creation of functional, modern, and scalable systems and portals to meet small-to-medium business project needs."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "HTML/CSS", "Git"]
    },
    {
      id: "exp-stoledo-intern",
      period: "Oct/2022 — Mar/2023",
      role: "Web Development Intern",
      company: "S. Toledo Agência Integrada",
      description: "Beginning of professional journey, providing support in development and evolutive maintenance of digital platforms.",
      results: [
        "Continuous maintenance and bug fixing in existing systems built with PHP, Laravel, MySQL, and JavaScript.",
        "Identified and assisted in resolving performance issues on web portals and platforms.",
        "Integrated action with agile methodologies (Scrum), participating in daily scrum meetings and weekly sprint deliveries."
      ],
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "Scrum", "Git"]
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
        { name: "Node.js", level: 85, description: "Desenvolvimento de APIs RESTful assíncronas de alta performance com Express e TypeScript" },
        { name: "REST APIs", level: 98, description: "Projetos sob os níveis de maturidade de Richardson, idempotência" },
        { name: "JWT", level: 95, description: "Autenticação segura e descentralizada com criptografia assimétrica" },
        { name: "OAuth", level: 90, description: "Implementação de servidores de autorização e fluxos complexos de autenticação" }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", level: 90, description: "Indexação avançada, particionamento, CTEs, otimização de queries" },
        { name: "MySQL", level: 92, description: "Replicação master-slave, pools de conexão, transações ACID estruturadas" },
        { name: "Redis", level: 95, description: "Caches em memória, estruturas de dados complexas, filas pub-sub e rate-limiting" }
      ]
    },
    {
      title: "DevOps & Cloud",
      skills: [
        { name: "Docker", level: 90, description: "Conteinerização multinível, otimização de imagens, Docker Compose" },
        { name: "Linux", level: 85, description: "Administração de servidores, scripts bash, hardening de segurança" },
        { name: "Git / GitHub", level: 95, description: "Fluxos de GitFlow, trunk-based, ganchos automáticos (hooks)" },
        { name: "Azure DevOps", level: 88, description: "Pipelines avançados, entrega contínua, gerenciamento de artefatos" },
        { name: "Cloudflare", level: 85, description: "WAF, CDN, caching de borda, regras de firewall customizadas" },
        { name: "CI / CD", level: 90, description: "Automação completa do ciclo de vida, build, análise de vulnerabilidade" }
      ]
    },
    {
      title: "Architecture & Practices",
      skills: [
        { name: "Clean Architecture", level: 95, description: "Divisão de responsabilidades com independência de frameworks e banco de dados" },
        { name: "SOLID", level: 98, description: "Garantia de extensibilidade, facilidade de manutenção e modularidade do código" },
        { name: "Design Patterns", level: 90, description: "Uso consciente de padrões como Factory, Strategy, Observer, Facade, Singleton" },
        { name: "DDD (Domain-Driven Design)", level: 88, description: "Mapeamento tático, bounded contexts, aggregates e ubiquous language" },
        { name: "Microservices", level: 85, description: "Comunicação síncrona (REST, gRPC) e assíncrona (RabbitMQ) entre serviços" },
        { name: "Scalability & Perf", level: 92, description: "Análise de gargalos em CPU/IO, balanceamento de carga, monitoramento APM" },
        { name: "Testing (TDD)", level: 90, description: "Criação de testes unitários, testes integrados, mocks, testes de stress" }
      ]
    }
  ],
  en: [
    {
      title: "Backend",
      skills: [
        { name: "Laravel", level: 95, description: "Robust framework, queues, gates, and advanced multi-tenancy" },
        { name: "PHP", level: 95, description: "Advanced OOP, memory management, and PHP 8.x+" },
        { name: "Node.js", level: 85, description: "Development of high-performance asynchronous RESTful APIs with Express and TypeScript" },
        { name: "REST APIs", level: 98, description: "Projects built under Richardson maturity levels, idempotency" },
        { name: "JWT", level: 95, description: "Secure and decentralized authentication with asymmetric cryptography" },
        { name: "OAuth", level: 90, description: "Authorization server implementation and complex authentication flows" }
      ]
    },
    {
      title: "Databases",
      skills: [
        { name: "PostgreSQL", level: 90, description: "Advanced indexing, partitioning, CTEs, query optimization" },
        { name: "MySQL", level: 92, description: "Master-slave replication, connection pools, structured ACID transactions" },
        { name: "Redis", level: 95, description: "In-memory caching, complex data structures, pub-sub queues, and rate-limiting" }
      ]
    },
    {
      title: "DevOps & Cloud",
      skills: [
        { name: "Docker", level: 90, description: "Multi-stage containerization, image optimization, Docker Compose" },
        { name: "Linux", level: 85, description: "Server administration, bash scripts, security hardening" },
        { name: "Git / GitHub", level: 95, description: "GitFlow, trunk-based workflows, automated hooks" },
        { name: "Azure DevOps", level: 88, description: "Advanced pipelines, continuous delivery, artifact management" },
        { name: "Cloudflare", level: 85, description: "WAF, CDN, edge caching, custom firewall rules" },
        { name: "CI / CD", level: 90, description: "Full lifecycle automation: builds, vulnerability scanning, and testing" }
      ]
    },
    {
      title: "Architecture & Practices",
      skills: [
        { name: "Clean Architecture", level: 95, description: "Separation of concerns with database and framework independence" },
        { name: "SOLID", level: 98, description: "Guarantees code extensibility, maintainability, and modularity" },
        { name: "Design Patterns", level: 90, description: "Conscious use of patterns like Factory, Strategy, Observer, Facade, Singleton" },
        { name: "DDD (Domain-Driven Design)", level: 88, description: "Tactical mapping, bounded contexts, aggregates, and ubiquitous language" },
        { name: "Microservices", level: 85, description: "Synchronous (REST, gRPC) and asynchronous (RabbitMQ) communication between services" },
        { name: "Scalability & Perf", level: 92, description: "CPU/IO bottleneck analysis, load balancing, APM monitoring" },
        { name: "Testing (TDD)", level: 90, description: "Unit tests, integrated tests, mocks, stress testing" }
      ]
    }
  ]
};

const PROJECTS_LOCALIZED: Record<Language, Project[]> = {
  pt: [
    {
      id: "nexora-saas",
      title: "Nexora SaaS",
      description: "Plataforma SaaS multi-tenant empresarial focada em alta performance de processamento financeiro e faturamento.",
      longDescription: "O Nexora SaaS é uma infraestrutura corporativa robusta desenvolvida com Laravel e MySQL, operando sob uma arquitetura de múltiplos inquilinos com isolamento estrito de esquemas de banco de dados. Conta com filas de alta prioridade estruturadas no Redis, garantindo processamento em lote assíncrono de folhas de pagamento em segundos.",
      image: "finance_dashboard",
      technologies: ["Laravel", "MySQL", "Redis", "Docker", "RabbitMQ"],
      githubUrl: "https://github.com",
      demoUrl: "https://nexora-app-livid.vercel.app/",
      metrics: [
        { label: "Tempo de Resposta", value: "42ms" },
        { label: "Taxa de Uptime", value: "99.99%" },
        { label: "Banco de Dados", value: "Multi-tenant" }
      ]
    },
    {
      id: "barberos",
      title: "BarberOS",
      description: "Sistema white-label completo para gestão de barbearias, finanças e agendamentos inteligentes em tempo real.",
      longDescription: "O BarberOS é uma plataforma white-label desenvolvida sob medida para barbearias, permitindo agendamento automatizado, controle de fluxo de caixa e gestão de profissionais. Construído com Laravel no back-end e React no front-end, o sistema utiliza MySQL para persistência de alta confiabilidade e Redis para cache de agendamentos concorrentes.",
      image: "payment_analytics",
      technologies: ["Laravel", "React", "MySQL", "Redis", "REST APIs"],
      githubUrl: "https://github.com",
      demoUrl: "",
      metrics: [
        { label: "Status", value: "Em Dev" },
        { label: "Arquitetura", value: "White-Label" },
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
      id: "nexora-saas",
      title: "Nexora SaaS",
      description: "Enterprise multi-tenant SaaS platform focused on high-performance financial processing and billing.",
      longDescription: "Nexora SaaS is a robust corporate infrastructure built with Laravel and MySQL, operating under a multi-tenant architecture with strict database schema isolation. It features high-priority Redis queues, ensuring asynchronous batch processing of payrolls in seconds.",
      image: "finance_dashboard",
      technologies: ["Laravel", "MySQL", "Redis", "Docker", "RabbitMQ"],
      githubUrl: "https://github.com",
      demoUrl: "https://nexora-app-livid.vercel.app/",
      metrics: [
        { label: "Response Time", value: "42ms" },
        { label: "Uptime Rate", value: "99.99%" },
        { label: "Database", value: "Multi-tenant" }
      ]
    },
    {
      id: "barberos",
      title: "BarberOS",
      description: "Complete white-label system for barbershop management, finance, and smart real-time scheduling.",
      longDescription: "BarberOS is a white-label platform custom-built for barbershops, allowing automated scheduling, cash flow control, and barber management. Built with Laravel on the back-end and React on the front-end, the system utilizes MySQL for high-reliability persistence and Redis for concurrent scheduling cache.",
      image: "payment_analytics",
      technologies: ["Laravel", "React", "MySQL", "Redis", "REST APIs"],
      githubUrl: "https://github.com",
      demoUrl: "",
      metrics: [
        { label: "Status", value: "In Dev" },
        { label: "Architecture", value: "White-Label" },
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
