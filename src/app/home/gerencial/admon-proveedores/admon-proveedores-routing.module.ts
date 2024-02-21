import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmonProveedoresComponent } from './admon-proveedores.component';

const routes: Routes = [{path: '', component: AdmonProveedoresComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmonProveedoresRoutingModule { }
