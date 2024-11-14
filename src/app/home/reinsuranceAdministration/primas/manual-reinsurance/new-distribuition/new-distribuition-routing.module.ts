import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDistribuitionComponent } from './new-distribuition.component';

const routes: Routes = [{path: '', component: NewDistribuitionComponent},
{path: 'primas-facultativos', loadChildren: () => import ('./facultativos/facultativos.module').then(m => m.FacultativosModule)},
{path: 'primas-especiales', loadChildren: () => import ('./facultativos-especial/facultativos-especial.module').then(m => m.FacultativosEspecialModule)},
{path: 'primas-automaticos', loadChildren: () => import ('./automaticos/automaticos.module').then(m => m.AutomaticosModule)},
{path: 'editar-prima-automaticos', loadChildren: () => import('./automaticos/edit/edit.module').then(m => m.EditModule)}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewDistribuitionRoutingModule { }
