import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificarFacultativosComponent } from './modificar-facultativos.component';

const routes: Routes = [{path: '', component: ModificarFacultativosComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificarFacultativosRoutingModule { }
