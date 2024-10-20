import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCooperativaComponent } from './create-cooperativa.component';

const routes: Routes = [{path: '', component: CreateCooperativaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCooperativaRoutingModule { }
