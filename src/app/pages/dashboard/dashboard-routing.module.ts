import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsManagementComponent } from './pages/clients-management/clients-management.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
        children: [
            {
                path: "",
                component: ClientsManagementComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
