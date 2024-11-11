import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultativosEspecialesComponent } from './facultativos-especiales.component';

const routes: Routes = [{path: '', component: FacultativosEspecialesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultativosEspecialesRoutingModule { }
