import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersRegisterComponent } from './users-register.component';

const routes: Routes = [{ path: '', component: UsersRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRegisterRoutingModule { }
