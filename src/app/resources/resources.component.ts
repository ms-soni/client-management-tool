import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ResourceType } from '../types/api.respsonse.types';
import { RESOURCES_COLUMNS } from './common.constants';
import { catchError, merge, startWith, switchMap, of as observableOf, map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  standalone: false,
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent implements OnInit, AfterViewInit {

  public resources: ResourceType[] = [];
  public columns = RESOURCES_COLUMNS;
  public displayedColumns = [...RESOURCES_COLUMNS.map(column => column.columnDef), "action"];
  public resultsLength = 0;
  public isLoadingResults = true;
  public pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dashboardService.getResources().pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;

          if (data === null) { return []; }

          this.resultsLength = data.data.length;
          return data.data;
        }),
      )
      .subscribe(data => (this.resources = data));
  }

  ngOnInit(): void {}

  public onAddResource() {
    this.router.navigate(["/resources/add"]);
  }

  public onEditResource(resource: ResourceType) {
    this.router.navigate(["/resources/edit/" + resource.id]);
  }

  public onResourceDetails(resource: ResourceType) {
    this.router.navigate(["/resources/details/" + resource.id]);
  }

}
