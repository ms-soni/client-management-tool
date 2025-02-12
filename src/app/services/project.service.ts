import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = '/assets/mockData/projects.json';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get project by ID
  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Update project
  updateProject(id: string, project: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, project);
  }

  // Create project
  createProject(project: any): Observable<any> {
    return this.http.post(this.apiUrl, project);
  }
}

