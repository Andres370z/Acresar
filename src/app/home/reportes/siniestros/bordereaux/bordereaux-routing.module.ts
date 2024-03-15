import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BordereauxComponent } from './bordereaux.component';

const routes: Routes = [{path: '', component: BordereauxComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BordereauxRoutingModule { }
