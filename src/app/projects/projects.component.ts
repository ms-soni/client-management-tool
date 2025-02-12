import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  projects: any[] = [];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      console.log('Projects:', this.projects);
    });
  }

  viewProjectDetails(projectId: string): void {
    this.router.navigate(['/project', projectId]);
  }

  viewProjectStatus(projectId: string): void {
    this.router.navigate(['/project', projectId]);
  }

  public addProject() {
    this.router.navigate(["/project/add"]);
  }

  public editProject(projectId: string): void {
    this.router.navigate(["/project/edit/" + projectId]);
  }
}
