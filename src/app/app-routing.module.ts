import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResourcesComponent } from './resources/resources.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { AddEditProjectComponent } from './projects/add-edit-project/add-edit-project.component';
import { AddEditResourceComponent } from './resources/add-edit-resource/add-edit-resource.component';
import { ResourceDetailsComponent } from './resources/resource-details/resource-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'project/add', component: AddEditProjectComponent },
  { path: 'project/edit/:projectId', component: AddEditProjectComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'resources/add', component: AddEditResourceComponent },
  { path: 'resources/edit/:resourceId', component: AddEditResourceComponent },
  { path: 'resources/details/:id', component: ResourceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
