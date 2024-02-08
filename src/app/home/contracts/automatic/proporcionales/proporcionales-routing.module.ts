import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProporcionalesComponent } from './proporcionales.component';

const routes: Routes = [{path: '', component: ProporcionalesComponent},
  {path: 'cuota-parte', loadChildren:() => import ('./cuota-parte/cuota-parte.module').then (m => m.CuotaParteModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProporcionalesRoutingModule { }
