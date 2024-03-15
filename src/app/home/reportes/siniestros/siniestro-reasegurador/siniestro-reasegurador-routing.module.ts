import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiniestroReaseguradorComponent } from './siniestro-reasegurador.component';

const routes: Routes = [{path: '', component: SiniestroReaseguradorComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiniestroReaseguradorRoutingModule { }
