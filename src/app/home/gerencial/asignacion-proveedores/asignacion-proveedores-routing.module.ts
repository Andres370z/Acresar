import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionProveedoresComponent } from './asignacion-proveedores.component';

const routes: Routes = [{path: '', component: AsignacionProveedoresComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionProveedoresRoutingModule { }
