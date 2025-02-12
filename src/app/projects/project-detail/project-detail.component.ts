import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  project: any | null = null;
  projectId: string = '';

  keyNameMap = {
    'name': 'Project Name',
    'description': 'Description',
    'contactInformation': 'Contact Information',
    'servicesProvided': 'Services Provided',
    'status': 'Status',
    'startDate': 'Start Date',
    'endDate': 'End Date',
    'billingStatus': 'Billing Status',
    'resources': 'Resources Assigned'
  };

  displayedColumns = ['key', 'value'];

  projectDetails: { key: string, value: any }[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';

    if (this.projectId) {
      this.projectService.getProjects().subscribe(data => {
        this.project = data.find((p: any) => p.id === this.projectId);
        if (this.project) {
          this.formatProjectData();
        } else {
          console.error('Project not found');
        }
      });
    } else {
      console.error('Invalid project ID');
    }
  }

  formatProjectData(): void {
    if (this.project) {
      this.projectDetails = Object.entries(this.project)
        .filter(([key, value]) => key !== 'id')
        .map(([key, value]) => {
          const displayKey = this.keyNameMap[key as keyof typeof this.keyNameMap] || key;
          return { key: displayKey, value: this.formatValue(key, value) };
        });
    }
  }

  formatValue(key: string, value: any): any {
    if (key === 'resources' && Array.isArray(value)) {
      return value.map((resource: any) => `${resource.name} (${resource.role})`).join(', ');
    }
    return value;
  }
}
