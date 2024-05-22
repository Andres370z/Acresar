import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProrrogaComponent } from './prorroga.component';

const routes: Routes = [{path: '', component: ProrrogaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProrrogaRoutingModule { }
