import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ProjectType } from '../../types/api.respsonse.types';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-project',
  standalone: false,
  templateUrl: './add-edit-project.component.html',
  styleUrl: './add-edit-project.component.scss'
})
export class AddEditProjectComponent implements OnInit {
  public title: string = "Add Project";
  public projectForm!: FormGroup;
  public isEditPage: boolean = false;
  public projectId: string | null = null;
  public projectData: ProjectType | null = null;
  public resourceNames: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response) => {
      if (response["projectId"]) {
        this.isEditPage = true;
        this.title = "Edit Project";
        this.projectId = response["projectId"];
        if (this.projectId) {
          this.projectService.getProjectById(this.projectId).subscribe({
            next: (projectData) => {
              console.log("Project Data Retrieved: ", projectData);
              this.projectData = projectData;
              this.resourceNames = this.getResourceNames();
              this.buildProjectForm();
            },
            error: (err) => {
              console.error("Error fetching project data: ", err);
            }
          });
        }
      } else {
        this.buildProjectForm();
      }
    });
  }

  public onProjectAdd() {
    if (this.projectForm.valid) {
      if (this.isEditPage) {
        // Update API will be implemented here
      } else {
        // Add API will be implemented here
      }
      this.router.navigate(["/projects"]);
    }
  }

  public onBackToLists() {
    this.router.navigate(["/projects"]);
  }

  private buildProjectForm() {
    const formData = {
      name: this.isEditPage ? this.projectData?.name : '',
      description: this.isEditPage ? this.projectData?.description : '',
      contactInformation: this.isEditPage ? this.projectData?.contactInformation : '',
      servicesProvided: this.isEditPage ? this.projectData?.servicesProvided : '',
      status: this.isEditPage ? this.projectData?.status : '',
      startDate: this.isEditPage && this.projectData?.startDate ? new Date(this.projectData.startDate) : null,
      endDate: this.isEditPage && this.projectData?.endDate ? new Date(this.projectData.endDate) : null,
      billingStatus: this.isEditPage ? this.projectData?.billingStatus : '',
      resources: this.isEditPage && this.projectData?.resources ? this.projectData.resources : []
    };

    this.projectForm = this.formBuilder.group({
      name: [formData.name, [Validators.required]],
      description: [formData.description],
      contactInformation: [formData.contactInformation],
      servicesProvided: [formData.servicesProvided],
      status: [formData.status, [Validators.required]],
      startDate: [formData.startDate],
      endDate: [formData.endDate],
      billingStatus: [formData.billingStatus, [Validators.required]],
      resources: formData.resources
    });
  }

  private getResourceNames(): string {
    return this.projectData?.resources.map(resource => resource.name).join(', ') || '';
  }
}
