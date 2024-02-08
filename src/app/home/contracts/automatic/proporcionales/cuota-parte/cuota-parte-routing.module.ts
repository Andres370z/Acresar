import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuotaParteComponent } from './cuota-parte.component';

const routes: Routes = [{path: '', component: CuotaParteComponent},
  {path: 'detalle', loadChildren:() => import ('./detalle/detalle.module').then (m => m.DetalleModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuotaParteRoutingModule { }
