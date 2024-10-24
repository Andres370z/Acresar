import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleEditComponent } from './detalle-edit.component';

const routes: Routes = [{path: '', component: DetalleEditComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalleEditRoutingModule { }
