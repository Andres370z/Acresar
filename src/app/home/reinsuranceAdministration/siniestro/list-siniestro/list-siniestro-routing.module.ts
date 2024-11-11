import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSiniestroComponent } from './list-siniestro.component';

const routes: Routes = [{path: '', component: ListSiniestroComponent},
  {path: 'siniestros-facultativos',loadChildren: ()=> import('./nueva-distribucion/facultativos/facultativos.module').then(m=> m.FacultativosModule) },
  {path: 'siniestros-automaticos',loadChildren: ()=> import('./nueva-distribucion/facultativos-especiales/facultativos-especiales.module').then(m=> m.FacultativosEspecialesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListSiniestroRoutingModule { }
