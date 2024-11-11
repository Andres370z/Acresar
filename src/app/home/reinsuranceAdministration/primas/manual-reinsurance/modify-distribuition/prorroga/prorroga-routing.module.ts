import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProrrogaComponent } from './prorroga.component';

const routes: Routes = [{path: '', component: ProrrogaComponent},
  {path: 'facultativos', loadChildren: ()=> import('./facultativo/facultativo.module').then((m => m.FacultativoModule))},
  {path: 'automaticos', loadChildren: ()=> import('./automaticos/automaticos.module').then((m => m.AutomaticosModule))},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProrrogaRoutingModule { }
