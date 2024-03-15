import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorderauxComponent } from './borderaux.component';

const routes: Routes = [{path: '', component: BorderauxComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorderauxRoutingModule { }
