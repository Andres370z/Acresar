import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimasComponent } from './primas.component';

const routes: Routes = [{path: '', component: PrimasComponent},
  {path: 'new-distribuition', loadChildren: () => import('./manual-reinsurance/new-distribuition/new-distribuition.module').then(m => m.NewDistribuitionModule)},
  {path: 'modify-distribuition', loadChildren: ()=> import('./manual-reinsurance/modify-distribuition/modify-distribuition.module').then(m => m.ModifyDistribuitionModule)},
  {path: 'ajustes', loadChildren: ()=> import('./manual-reinsurance/nuevo-ajuste/nuevo-ajuste.module').then(m => m.NuevoAjusteModule)},
  {path: 'cargar', loadChildren: ()=> import('./automatic-reinsurer/cargar/cargar.module').then(m => m.CargarModule)},
  {path: 'procesar', loadChildren: ()=> import('./automatic-reinsurer/procesar/procesar.module').then(m => m.ProcesarModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimasRoutingModule { }
