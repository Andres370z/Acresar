import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjusteAutomaticoComponent } from './ajuste-automatico.component';

const routes: Routes = [{path: '', component: AjusteAutomaticoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjusteAutomaticoRoutingModule { }
