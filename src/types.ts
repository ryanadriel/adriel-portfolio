export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  results: string[];
  technologies: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; description?: string }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  metrics: { label: string; value: string }[];
}

export interface EngineeringPrinciple {
  title: string;
  description: string;
  iconName: string;
  metric: string;
}

export const EXPERIENCES: Experience[] = [
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
];

export const SKILL_CATEGORIES: SkillCategory[] = [
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
];

export const PROJECTS: Project[] = [
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
      { label: "Processamentos / seg", value: "12k+" }
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
    id: "erp-integration",
    title: "ERP Integration Hub",
    description: "Serviço de alta taxa de transferência para sincronização e reconciliação em tempo real entre ERPs corporativos legados.",
    longDescription: "Barramento desenvolvido em PHP/Laravel para unificar e processar cargas de dados massivas de ERPs tradicionais para bancos de dados em nuvem. Utiliza queues robustas, indexação dinâmica de logs transacionais e estratégias de throttling inteligente.",
    image: "integration_flow",
    technologies: ["Laravel", "PHP", "MySQL", "Redis", "Docker"],
    githubUrl: "https://github.com",
    demoUrl: "https://erp-hub.com",
    metrics: [
      { label: "Sincronizações / dia", value: "50M+" },
      { label: "Processamento", value: "Em Filas" },
      { label: "Downtime Histórico", value: "0h" }
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
  },
  {
    id: "laravel-rest-api",
    title: "Laravel REST Enterprise Starter",
    description: "Boilerplate de API empresarial com paginação dinâmica avançada, logs telemétricos integrados e OAuth2 integrado.",
    longDescription: "Kit inicial completo de alto nível para corporações desenvolverem APIs RESTful em PHP 8. Comporta roteamento otimizado, logs estruturados em JSON para Kibana/Elastic, auditoria interna de dados e autenticação flexível com controle de escopo.",
    image: "api_telemetry",
    technologies: ["Laravel", "PHP", "OAuth", "JWT", "PHPUnit"],
    githubUrl: "https://github.com",
    demoUrl: "https://api-enterprise.com",
    metrics: [
      { label: "Configuração", value: "Instantânea" },
      { label: "Cobertura de Testes", value: "98.5%" },
      { label: "Formato Logs", value: "RFC 5424" }
    ]
  },
  {
    id: "adx-technology-platform",
    title: "ADX Microservices Engine",
    description: "Ecossistema de microsserviços integrados de alta performance operando sob contêineres Docker e mensageria distribuída.",
    longDescription: "A plataforma de backend principal da ADX Technology, integrando múltiplos microsserviços Spring Boot e Laravel que cooperam via gRPC e RabbitMQ. Inclui canais seguros de WebSocket para telemetria em tempo real e orquestração de logs centralizada.",
    image: "cloud_architecture",
    technologies: ["Spring Boot", "Laravel", "RabbitMQ", "Docker", "Azure DevOps"],
    githubUrl: "https://github.com",
    demoUrl: "https://adx-platform.com",
    metrics: [
      { label: "Microsserviços", value: "12 Ativos" },
      { label: "Mensagens / min", value: "450k+" },
      { label: "Latência gRPC", value: "< 3ms" }
    ]
  }
];

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
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
];
