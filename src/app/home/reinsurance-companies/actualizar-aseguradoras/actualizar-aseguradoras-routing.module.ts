import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarAseguradorasComponent } from './actualizar-aseguradoras.component';

const routes: Routes = [{path: '', component: ActualizarAseguradorasComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualizarAseguradorasRoutingModule { }
