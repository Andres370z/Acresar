import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultativosEspecialesDetalleComponent } from './facultativos-especiales-detalle.component';

const routes: Routes = [{path: '', component: FacultativosEspecialesDetalleComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultativosEspecialesDetalleRoutingModule { }
