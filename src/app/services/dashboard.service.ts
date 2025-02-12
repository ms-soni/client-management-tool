import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url: string = "/assets/mockData/resources.json";
  private rolesUrl: string = "/assets/mockData/roles.json";
  private projectsUrl: string = "/assets/mockData/projects.json";
  
  constructor(
    private http: HttpClient
  ) { }

  public getResources(): Observable<any> {
    return this.http.get(this.url);
  }

  public getResourceBydId(id: string | null): Observable<any> {
    return this.getResources().pipe(
      switchMap((resources: any) => {
        const singleResource = resources.data.find((r: any) => r.id === id);
        return observableOf(singleResource);
      })
    );
  }

  public getRoles(): Observable<any> {
    return this.http.get(this.rolesUrl);
  }

  public getProjects(): Observable<any> {
    return this.http.get(this.projectsUrl);
  }

}
