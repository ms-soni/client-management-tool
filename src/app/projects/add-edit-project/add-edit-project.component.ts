import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-add-edit-project',
  standalone: false,
  templateUrl: './add-edit-project.component.html',
  styleUrls: ['./add-edit-project.component.scss']
})
export class AddEditProjectComponent implements OnInit {
  projectForm: FormGroup;
  projectId: string = '';
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      contactInformation: ['', [Validators.required, Validators.email]],
      servicesProvided: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      billingStatus: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    console.log('projectid:::', this.projectId);
    debugger;
    if (this.projectId) {
      this.isEditMode = true;
      this.loadProjectData();
    }
  }

  loadProjectData(): void {
    this.projectService.getProjectById(this.projectId!).subscribe(project => {
      if (project) {
        this.projectForm.patchValue({
          name: project.name,
          description: project.description,
          contactInformation: project.contactInformation,
          servicesProvided: project.servicesProvided,
          status: project.status,
          startDate: project.startDate,
          endDate: project.endDate,
          billingStatus: project.billingStatus
        });
      }
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.projectService.updateProject(this.projectId!, this.projectForm.value).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    } else {
      this.projectService.createProject(this.projectForm.value).subscribe(() => {
        this.router.navigate(['/projects']);
      });
    }
  }
}
