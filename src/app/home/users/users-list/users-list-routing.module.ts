import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list.component';

const routes: Routes = [{ path: '', component: UsersListComponent },  {path: 'menu-setting', loadChildren: () => import ('./custom-menu/custom-menu.module').then(m => m.CistomMenuModule)},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersListRoutingModule { }
