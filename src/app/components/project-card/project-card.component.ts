import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowUpRight, Boxes, Github, LucideAngularModule } from 'lucide-angular';

export interface PortfolioProject {
  name: string;
  description: string;
  stack: string[];
  details?: string[];
  liveUrl?: string;
  repoUrl?: string;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './project-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: PortfolioProject;
  @Input() active = false;

  readonly icons = {
    external: ArrowUpRight,
    repo: Github,
    stack: Boxes,
  };

  trackByTech(index: number, tech: string): string {
    return `${tech}-${index}`;
  }
}
