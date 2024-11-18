import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {path: "dashboard", component: DashboardComponent,
    children: [
    {path: "notes", component: NotesContainerComponent},
    {path: "archive", component: ArchiveContainerComponent },
    {path: "trash", component: TrashContainerComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
