import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

  project: any;
  projectId!: string;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';

    if (this.projectId) {
      // Fetch the project details based on the ID
      this.projectService.getProjects().subscribe(projects => {
        // Find the project by its ID
        this.project = projects.find((p: any) => p.id === this.projectId);
        console.log('Selected Project:', this.project);  // Check the project data
      });
    } else {
      console.error('Project ID is missing or invalid.');
    }
  }


}
