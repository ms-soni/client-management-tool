import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
