import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarAseguradorasComponent } from '../actualizar-aseguradoras/actualizar-aseguradoras.component';
import { ActualizarIntermediarioComponent } from './actualizar-intermediario.component';

const routes: Routes = [{path: '', component: ActualizarIntermediarioComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualizarIntermediarioRoutingModule { }
