import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoAjusteComponent } from './nuevo-ajuste.component';

const routes: Routes = [{path: '', component: NuevoAjusteComponent},
  {path: 'ajuste-automatico', loadChildren: ()=> import('./ajuste-automatico/ajuste-automatico.module').then(m=>m.AjusteAutomaticoModule)},
  {path: 'ajuste-facultativo', loadChildren: ()=> import('./ajuste-facultativo/ajuste-facultativo.module').then(m=>m.AjusteFacultativoModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevoAjusteRoutingModule { }
