import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { ResourceType } from '../../types/api.respsonse.types';

@Component({
  selector: 'app-resource-details',
  standalone: false,
  templateUrl: './resource-details.component.html',
  styleUrl: './resource-details.component.scss'
})
export class ResourceDetailsComponent implements OnInit {
  public title: string = "Resource Details";
  public resourceId: string | null = null;
  public resourceData: ResourceType | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response: any) => {
      if (response.id) {
        this.resourceId = response.id;
        this.getResourceData(this.resourceId);
      }
    });
  }

  public onBackToLists() {
    this.router.navigate(["/resources"]);
  }

  private getResourceData(id: string | null) {
    this.dashboardService.getResourceBydId(id).subscribe((res) => {
      this.resourceData = res;
    });
  }

}
