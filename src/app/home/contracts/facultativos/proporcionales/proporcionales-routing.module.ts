import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProporcionalesComponent } from './proporcionales.component';
import { FacultativoComponent } from './facultativo/facultativo.component';

const routes: Routes = [{path: '', component: ProporcionalesComponent},
{path: 'facultativos', loadChildren: () => import ('./facultativo/facultativo.module').then (m => m.FacultativoModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProporcionalesRoutingModule { }
