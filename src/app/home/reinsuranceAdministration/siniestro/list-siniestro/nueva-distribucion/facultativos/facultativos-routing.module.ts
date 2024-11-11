import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultativosComponent } from './facultativos.component';

const routes: Routes = [{path: '', component: FacultativosComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultativosRoutingModule { }
