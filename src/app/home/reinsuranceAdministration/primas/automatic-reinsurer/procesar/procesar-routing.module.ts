import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcesarComponent } from './procesar.component';

const routes: Routes = [{path: '', component: ProcesarComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesarRoutingModule { }
