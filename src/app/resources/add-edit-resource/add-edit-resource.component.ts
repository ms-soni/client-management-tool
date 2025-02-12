import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { ResourceType } from '../../types/api.respsonse.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-edit-resource',
  standalone: false,
  templateUrl: './add-edit-resource.component.html',
  styleUrl: './add-edit-resource.component.scss'
})
export class AddEditResourceComponent implements OnInit {
  public title: string = "Add Resource";
  public resourceForm!: FormGroup;
  public isEditPage: boolean = false;
  public resourceId: string | null = null;
  public resourceData: ResourceType | null = null;

  public rolesList: any[] = [];
  public projectsList: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response) => {
      if (response["resourceId"]) {
        this.isEditPage = true;
        this.title = "Edit Resource";
        this.resourceId = response["resourceId"];
        forkJoin([this.getResourceData(this.resourceId), this.getRoles(), this.getProjects()]).subscribe({
          next: ([singleResource, roles, projects]) => {
            this.resourceData = singleResource;
            this.rolesList = roles;
            this.projectsList = projects;
            this.buildResourceForm();
          },
          error: () => {
            console.log("ERROR :");
          }
        });
      } else {
        forkJoin([this.getRoles(), this.getProjects()]).subscribe({
          next: ([roles, projects]) => {
            this.rolesList = roles;
            this.projectsList = projects;
            this.buildResourceForm();
          },
          error: () => {
            console.log("ERROR :");
          }
        });
      }
    });
  }

  public onResourceAdd() {
    if (this.resourceForm.valid) {
      if (this.isEditPage) {
        // Update API will be implemented
      } else {
        // Add API will be implemented
      }
      this.router.navigate(["/resources"]);
    }
  }

  private buildResourceForm() {
    const role = this.rolesList.find(r => r.id === this.resourceData?.roleId);
    const project = this.projectsList.find(p => p.id === this.resourceData?.projectId);
    const formData = {
      name: this.isEditPage ? this.resourceData?.name : "",
      address: this.isEditPage ? this.resourceData?.address : "",
      role: this.isEditPage ? role : "",
      project: this.isEditPage ? project : "",
      projectDescription: this.isEditPage ? this.resourceData?.projectDescription : "",
    };
    this.resourceForm = this.formBuilder.group({
      name: [formData.name, [Validators.required]],
      address: [formData.address],
      role: [formData.role, [Validators.required]],
      project: [formData.project, [Validators.required]],
      projectDescription: [formData.projectDescription],
    });
  }

  private getResourceData(id: string | null) {
    return this.dashboardService.getResourceBydId(id);
  }

  private getRoles() {
    return this.dashboardService.getRoles()
  }

  private getProjects() {
    return this.dashboardService.getProjects();
  }

}
