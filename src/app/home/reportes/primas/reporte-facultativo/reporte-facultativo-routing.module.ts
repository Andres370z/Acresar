import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteFacultativoComponent } from './reporte-facultativo.component';

const routes: Routes = [{path: '', component: ReporteFacultativoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteFacultativoRoutingModule { }
