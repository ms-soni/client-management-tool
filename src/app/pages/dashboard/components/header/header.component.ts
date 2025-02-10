import { Component } from '@angular/core';
import { Menu } from '../../../../types/menu';
import { MENUS } from '../../../../constants/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'clients-management-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public menus: Menu[] = MENUS;
  constructor(
    private router: Router
  ) {}
  public onLogout() {
    this.router.navigate(["/auth"]);
  }
}
