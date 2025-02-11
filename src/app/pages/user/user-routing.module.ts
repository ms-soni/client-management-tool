import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: "auth",
        component: UserComponent,
        children: [
            {
                path: "",
                component: LoginComponent
            },
            {
                path: "user-registration",
                component: RegistrationComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
