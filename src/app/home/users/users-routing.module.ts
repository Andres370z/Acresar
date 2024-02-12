import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', component: UsersComponent }, 
  { path: 'lista', loadChildren: () => import('./users-list/users-list.module').then(m => m.UsersListModule) },
  { path: 'registrar', loadChildren: () => import('./users-register/users-register.module').then(m => m.UsersRegisterModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
