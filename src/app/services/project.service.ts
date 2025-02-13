import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectType } from '../types/api.respsonse.types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = '/assets/mockData/projects.json';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }



  getProjectById(projectId: string): Observable<ProjectType | null> {
    return this.http.get<ProjectType[]>('/assets/mockData/projects.json').pipe(
      map((projects: ProjectType[]) => projects.find((project: ProjectType) => project.id === projectId) || null)  // Return null if not found
    );
  }

  addProject(projectData: ProjectType) {
    return this.http.post(this.apiUrl, projectData);
  }

  updateProject(projectId: string, projectData: ProjectType) {
    return this.http.put(`${this.apiUrl}/${projectId}`, projectData);
  }
}

