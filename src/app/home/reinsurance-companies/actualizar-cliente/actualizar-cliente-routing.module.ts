import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarClienteComponent } from './actualizar-cliente.component';

const routes: Routes = [{path: '', component: ActualizarClienteComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualizarClienteRoutingModule { }
