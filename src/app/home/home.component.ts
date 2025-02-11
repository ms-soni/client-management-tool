import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) { }

  viewProjects(): void {
    this.router.navigate(['/projects']);
  }

  viewResources(): void {
    this.router.navigate(['/resources']);
  }

}
