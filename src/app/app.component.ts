import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, startWith } from 'rxjs';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Code2,
  Cpu,
  Filter,
  FolderKanban,
  Github,
  Home,
  Linkedin,
  LucideAngularModule,
  Mail,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from 'lucide-angular';
import { PortfolioProject, ProjectCardComponent } from './components/project-card/project-card.component';

interface ExperienceItem {
  title: string;
  type: 'Project' | 'Company';
  role: string;
  period: string;
  summary: string;
  highlights: string[];
}

interface StatItem {
  label: string;
  value: string;
  detail: string;
  icon: 'trend' | 'build' | 'infra' | 'security' | 'code' | 'ai';
}

interface LabItem {
  title: string;
  status: 'Research' | 'Building' | 'Playground';
  summary: string;
  items: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ProjectCardComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly fullName = 'PABLO VINICIUS';
  readonly subtitle =
    'Desenvolvedor Full-Stack construindo sistemas confiáveis, interfaces limpas e produtos digitais mensuráveis.';

  readonly icons = {
    home: Home,
    user: UserRound,
    experience: Briefcase,
    projects: FolderKanban,
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
    clock: Clock3,
    left: ChevronLeft,
    right: ChevronRight,
    arrowRight: ArrowRight,
    filter: Filter,
    clear: X,
    trend: BarChart3,
    build: Rocket,
    infra: Server,
    security: ShieldCheck,
    code: Code2,
    cpu: Cpu,
    ai: Sparkles,
  };

  readonly now = signal(new Date());
  readonly currentTime = computed(() =>
    this.now().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  );
  readonly currentDate = computed(() =>
    this.now().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
    }),
  );

  readonly projects: PortfolioProject[] = [
    {
      name: 'PatroServicos-SD',
      description:
        'Arquitetura distribuída para fins educacionais com separação clara de responsabilidades entre serviços.',
      stack: ['Java Spring Boot 3.1', 'Python FastAPI', 'PostgreSQL', 'MongoDB'],
      details: [
        'Destaque: Monorepo com 3+ serviços (Manager + 2 Spring + FastAPI).',
        'Impacto: Balanceamento round-robin, tolerância a falhas e orquestração entre serviços.',
        'Conceitos: Múltiplos bancos (relacional + NoSQL) e comunicação entre camadas.',
      ],
      repoUrl: 'https://github.com/PabloVLS/PatroServicos-Sistemas-Distribuidos',
    },
    {
      name: 'FleetVision-Predict',
      description:
        'Sistema de previsão para frotas usando séries temporais e projeções de longo prazo.',
      stack: ['Java Spring Boot 3', 'Thymeleaf', 'Linear Regression', 'Polynomial Regression'],
      details: [
        'Destaque: Análise preditiva com dados históricos de 2006 a 2024.',
        'Impacto: Projeções até 2050 usando modelos matemáticos lineares e polinomiais.',
        'Caso de uso: Demonstra séries temporais em contextos reais de mobilidade.',
      ],
      repoUrl: 'https://github.com/PabloVLS/FleetVision-Predict',
    },
    {
      name: 'CreditCard Mobile',
      description:
        'Aplicativo Android com UI avançada para simulação de cartões de crédito em tempo real.',
      stack: ['Kotlin', 'ConstraintLayout', 'CardView', 'TextWatcher'],
      details: [
        'Destaque: Card Flipper dinâmico com detecção de bandeira (Visa/Mastercard).',
        'Desafio: Sincronização da UI em tempo real e formatação automática de entradas.',
      ],
      repoUrl: 'https://github.com/PabloVLS/CreditCard_Mobile',
    },
    {
      name: 'Car Recommendation Service',
      description:
        'Sistema inteligente de recomendação de veículos usando K-Means para sugerir o carro ideal com base em especificações técnicas do usuário.',
      stack: [
        'Java 21',
        'Spring Boot 3.2.12',
        'Thymeleaf',
        'K-Means PMML',
        'JPMML 1.7.5',
        'Bootstrap 5.3',
      ],
      details: [
        'Backend: Spring Boot Web, Thymeleaf e Actuator para API, renderização HTML e monitoramento.',
        'ML/Dados: Execução em runtime do modelo_kmeans_carros.pmml com JPMML e processamento Excel usando POI-OOXML 5.2.5.',
        'Frontend: HTML5, CSS3 e JavaScript com Bootstrap 5.3.',
      ],
      repoUrl: 'https://github.com/PabloVLS/Car-Recomendation-Service',
    },
  ];

  readonly selectedTech = signal<string | null>(null);
  readonly activeProjectIndex = signal(0);

  readonly projectFilters = computed(() =>
    [...new Set(this.projects.flatMap((project) => project.stack))].sort((left, right) =>
      left.localeCompare(right),
    ),
  );

  readonly visibleProjects = computed(() => {
    const filter = this.selectedTech();

    if (!filter) {
      return this.projects;
    }

    return this.projects.filter((project) => project.stack.includes(filter));
  });

  readonly highlights: StatItem[] = [
    {
      label: 'Entrega de ponta a ponta',
      value: '18+',
      detail: 'Projetos em produção e acadêmicos — da arquitetura ao deploy.',
      icon: 'build',
    },
    {
      label: 'Arquitetura distribuída',
      value: '3+',
      detail: 'Sistemas com múltiplos serviços (PatroServicos-SD, microserviços Java/Python/FastAPI).',
      icon: 'infra',
    },
    {
      label: 'Integração multiplataforma',
      value: '5+',
      detail: 'Android (Kotlin), Web (Spring Boot + Thymeleaf) e Backend (Java, Python, Node.js).',
      icon: 'code',
    },
    {
      label: 'Análise preditiva & IA',
      value: '2+',
      detail: 'Modelos de regressão semissupervisionados e processamento de dados históricos.',
      icon: 'ai',
    },
  ];

  readonly labTracks: LabItem[] = [
    {
      title: 'Pesquisa (Research)',
      status: 'Research',
      summary: 'Linhas de investigacao aplicadas em previsao de dados e sistemas distribuidos.',
      items: [
        'Modelos de regressao polinomial (graus 2-5) para series temporais.',
        'Padroes de orquestracao entre micro-servicos heterogeneos.',
        'Deteccao automatica de padroes em dados historicos.',
      ],
    },
    {
      title: 'Em Construcao (Building)',
      status: 'Building',
      summary: 'Implementacoes ativas com foco em produto e observabilidade.',
      items: [
        'Sistema de previsao avancada com multiplos datasets.',
        'Mobile UI components reutilizaveis em Kotlin.',
        'Integracao Grafana + Prometheus para observabilidade.',
      ],
    },
    {
      title: 'Prototipos (Playground)',
      status: 'Playground',
      summary: 'Experimentacoes rapidas para UI, interacao e comunicacao em tempo real.',
      items: [
        'Card UI Flipper com animacoes.',
        'Design System com validacoes em tempo real.',
        'Chat em tempo real com WebSockets (Servico 3).',
      ],
    },
  ];

  readonly experienceTimeline: ExperienceItem[] = [
    {
      title: 'Pluri',
      type: 'Project',
      role: 'Desenvolvimento Full-Stack para avaliação acadêmica',
      period: '2025 - Presente',
      summary:
        'Construiu um sistema multidisciplinar para o IFTM conectando módulos de avaliação, gestão e relatórios com frontend Angular e backend Java/Spring Boot.',
      highlights: [
        'Desenho e integração de APIs entre módulos acadêmicos',
        'Implementação de UI responsiva com abordagem focada em usabilidade',
        'Deploys dockerizados para ambientes consistentes',
      ],
    },
    {
      title: 'Haltune',
      type: 'Company',
      role: 'Desenvolvedor Full-Stack',
      period: 'Atualmente',
      summary:
        'Contribuiu para desenvolvimento Full-Stack, arquitetura de funcionalidades, integrações externas, melhorias de performance e suporte operacional.',
      highlights: [
        'Entrega de funcionalidades ponta a ponta e manutenção',
        'Orientação técnica em infraestrutura e observabilidade',
        'Automatização de processos e colaboração com times de produto',
        'Aprimoramento de monitoramento operacional e alertas',
      ],
    },
  ];

  readonly socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/pablo-vinicius-a1002124a/',
      icon: Linkedin,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/PabloVLS',
      icon: Github,
    },
    {
      label: 'Email',
      href: 'mailto:viniciuspablo801@gmail.com',
      icon: Mail,
    },
  ];

  readonly marqueeItems = [
    'Angular',
    'TypeScript',
    'Java',
    'Spring Boot',
    'Docker',
    'Nginx',
    'Linux',
    'PostgreSQL',
    'Git',
    'Tailwind CSS',
    'CI/CD',
  ];
  readonly marqueeLoop = [...this.marqueeItems, ...this.marqueeItems];

  constructor() {
    interval(1000)
      .pipe(startWith(0), takeUntilDestroyed())
      .subscribe(() => this.now.set(new Date()));
  }

  trackByString(index: number, item: string): string {
    return `${item}-${index}`;
  }

  trackByProject(index: number, project: PortfolioProject): string {
    return `${project.name}-${index}`;
  }

  trackBySocial(index: number, link: { label: string }): string {
    return `${link.label}-${index}`;
  }

  trackByExperience(index: number, item: ExperienceItem): string {
    return `${item.title}-${index}`;
  }

  trackByStat(index: number, item: StatItem): string {
    return `${item.label}-${index}`;
  }

  trackByLab(index: number, item: LabItem): string {
    return `${item.title}-${index}`;
  }

  isFilterActive(filter: string | null): boolean {
    return this.selectedTech() === filter;
  }

  setProjectFilter(filter: string | null): void {
    this.selectedTech.set(filter);
    this.activeProjectIndex.set(0);
  }

  scrollToSection(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  previousProject(): void {
    const total = this.visibleProjects().length;

    if (total <= 1) {
      return;
    }

    this.activeProjectIndex.update((current) => (current === 0 ? total - 1 : current - 1));
  }

  nextProject(): void {
    const total = this.visibleProjects().length;

    if (total <= 1) {
      return;
    }

    this.activeProjectIndex.update((current) => (current === total - 1 ? 0 : current + 1));
  }

  setActiveProject(index: number): void {
    const total = this.visibleProjects().length;

    if (total === 0) {
      this.activeProjectIndex.set(0);
      return;
    }

    const safeIndex = Math.max(0, Math.min(index, total - 1));
    this.activeProjectIndex.set(safeIndex);
  }

  hasMultipleProjects(): boolean {
    return this.visibleProjects().length > 1;
  }

  getProjectVisualClass(index: number): string {
    const position = this.getRelativePosition(index);

    if (position === 0) {
      return 'carousel-center';
    }

    if (position === -1) {
      return 'carousel-left';
    }

    if (position === 1) {
      return 'carousel-right';
    }

    return 'carousel-hidden';
  }

  isActiveProject(index: number): boolean {
    return this.activeProjectIndex() === index;
  }

  private getRelativePosition(index: number): number {
    const total = this.visibleProjects().length;

    if (total === 0) {
      return 99;
    }

    if (total === 1) {
      return index === 0 ? 0 : 99;
    }

    const active = this.activeProjectIndex();
    let diff = index - active;

    if (diff > total / 2) {
      diff -= total;
    }

    if (diff < -total / 2) {
      diff += total;
    }

    return diff;
  }
}
