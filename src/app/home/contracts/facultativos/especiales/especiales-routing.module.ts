import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspecialesComponent } from './especiales.component';

const routes: Routes = [
  {path: '', component: EspecialesComponent},
  {path: 'especiles-facultativos', loadChildren: () => import ('./facultativo-especiales/facultativo-especiales.module').then (m => m.FacultativoEspecialesModule)},
{path: 'especiales-facultativos-detalles', loadChildren: () => import ('./facultativos-especiales-detalle/facultativos-especiales-detalle.module').then(m => m.FacultativosEspecialesDetalleModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecialesRoutingModule { }
