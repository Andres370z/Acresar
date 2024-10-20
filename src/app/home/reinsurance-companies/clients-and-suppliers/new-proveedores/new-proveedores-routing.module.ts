import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProveedoresComponent } from './new-proveedores.component';

const routes: Routes = [{path: '', component: NewProveedoresComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewProveedoresRoutingModule { }
