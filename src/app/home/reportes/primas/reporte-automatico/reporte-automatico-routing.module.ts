import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteAutomaticoComponent } from './reporte-automatico.component';

const routes: Routes = [{path: '', component: ReporteAutomaticoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteAutomaticoRoutingModule { }
