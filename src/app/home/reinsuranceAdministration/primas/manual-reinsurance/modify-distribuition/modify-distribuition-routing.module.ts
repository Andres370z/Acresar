import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyDistribuitionComponent } from './modify-distribuition.component';

const routes: Routes = [{path: '', component: ModifyDistribuitionComponent},
{path: 'prorroga', loadChildren: () => import ('./prorroga/prorroga.module').then(m => m.ProrrogaModule)},
{path: 'modificar-automaticos', loadChildren: () => import ('./modificar-automaticos/modificar-automaticos.module').then(m => m.ModificarAutomaticosModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModifyDistribuitionRoutingModule { }
