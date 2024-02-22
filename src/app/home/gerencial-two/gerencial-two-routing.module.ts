import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerencialTwoComponent } from './gerencial-two.component';

const routes: Routes = [{path: '', component: GerencialTwoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerencialTwoRoutingModule { }
