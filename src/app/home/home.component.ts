import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor() { }

  viewProjects(): void {
    //this.router.navigate(['/projects']);
  }

  viewResources(): void {
    //this.router.navigate(['/resources']);
  }

}
