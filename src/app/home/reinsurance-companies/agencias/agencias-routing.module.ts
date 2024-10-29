import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgenciasComponent } from './agencias.component';

const routes: Routes = [{path: '', component: AgenciasComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgenciasRoutingModule { }
