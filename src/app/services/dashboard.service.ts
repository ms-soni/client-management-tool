import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url: string = "/assets/mockData/resources.json";
  
  constructor(
    private http: HttpClient
  ) { }

  public getResources(): Observable<any> {
    return this.http.get(this.url);
  }
}
