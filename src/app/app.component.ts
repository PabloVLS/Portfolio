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
    'Full-Stack Engineer building reliable systems, clean interfaces and measurable digital products.';

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
    this.now().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  );
  readonly currentDate = computed(() =>
    this.now().toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    }),
  );

  readonly projects: PortfolioProject[] = [
    {
      name: 'PatroServicos-SD',
      description:
        'Educational distributed architecture with a clear separation of responsibilities between services.',
      stack: ['Java Spring Boot 3.1', 'Python FastAPI', 'PostgreSQL', 'MongoDB'],
      details: [
        'Highlight: Monorepo with 3+ services (Manager + 2 Spring + FastAPI).',
        'Impact: Round-robin load balancing, fault tolerance and orchestration between services.',
        'Concepts: Multiple databases (relational + NoSQL) and inter-layer communication.',
      ],
      repoUrl: 'https://github.com/PabloVLS/PatroServicos-Sistemas-Distribuidos',
    },
    {
      name: 'FleetVision-Predict',
      description:
        'Fleet vehicle forecasting system using time series and long-term projections.',
      stack: ['Java Spring Boot 3', 'Thymeleaf', 'Linear Regression', 'Polynomial Regression'],
      details: [
        'Highlight: Predictive analysis with historical data from 2006 to 2024.',
        'Impact: Projections up to 2050 using linear and polynomial mathematical models.',
        'Use Case: Demonstrates time series in real mobility contexts.',
      ],
      repoUrl: 'https://github.com/PabloVLS/FleetVision-Predict',
    },
    {
      name: 'CreditCard Mobile',
      description:
        'Android app with an advanced UI for real-time credit card simulation.',
      stack: ['Kotlin', 'ConstraintLayout', 'CardView', 'TextWatcher'],
      details: [
        'Highlight: Dynamic Card Flipper with card brand detection (Visa/Mastercard).',
        'Challenge: Real-time UI sync and automatic input formatting.',
      ],
      repoUrl: 'https://github.com/PabloVLS/CreditCard_Mobile',
    },
    {
      name: 'Car Recommendation Service',
      description:
        'Intelligent vehicle recommendation system using K-Means clustering to suggest the ideal car based on user technical specifications.',
      stack: [
        'Java 21',
        'Spring Boot 3.2.12',
        'Thymeleaf',
        'K-Means PMML',
        'JPMML 1.7.5',
        'Bootstrap 5.3',
      ],
      details: [
        'Backend: Spring Boot Web, Thymeleaf and Actuator for API, HTML rendering and monitoring.',
        'ML/Data: Runtime execution of modelo_kmeans_carros.pmml with JPMML and Excel processing using POI-OOXML 5.2.5.',
        'Frontend: HTML5, CSS3 and JavaScript with Bootstrap 5.3.',
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
      label: 'End-to-End Delivery',
      value: '18+',
      detail: 'Projects in production and academic — from architecture to deployment.',
      icon: 'build',
    },
    {
      label: 'Distributed Architecture',
      value: '3+',
      detail: 'Systems with multiple services (PatroServicos-SD, Java/Python/FastAPI microservices).',
      icon: 'infra',
    },
    {
      label: 'Multiplatform Integration',
      value: '5+',
      detail: 'Android (Kotlin), Web (Spring Boot + Thymeleaf) and Backend (Java, Python, Node.js).',
      icon: 'code',
    },
    {
      label: 'Predictive Analytics & AI',
      value: '2+',
      detail: 'Semi-supervised regression models and historical data processing.',
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
      role: 'Full-Stack Development for academic assessment',
      period: '2025 - Present',
      summary:
        'Built a multidisciplinary system for IFTM connecting assessment, management and reporting modules with Angular frontend and Java/Spring Boot backend.',
      highlights: [
        'API design and integration across academic modules',
        'Responsive UI implementation with usability-first approach',
        'Dockerized deployments for consistent environments',
      ],
    },
    {
      title: 'Haltune',
      type: 'Company',
      role: 'Full-Stack Developer',
      period: 'Present',
      summary:
        'Contributed to full-stack development, feature architecture, external integrations, performance improvements and operational support.',
      highlights: [
        'Delivered end-to-end features and maintenance',
        'Provided technical guidance on infra and observability',
        'Automated processes and collaborated with product teams',
        'Improved operational monitoring and alerting',
      ],
    },
  ];

  readonly socialLinks = [
    {
      label: 'LinkedIn',
      href: '#',
      icon: Linkedin,
    },
    {
      label: 'GitHub',
      href: '#',
      icon: Github,
    },
    {
      label: 'Email',
      href: 'mailto:pablo.vinicius@exemplo.com',
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
