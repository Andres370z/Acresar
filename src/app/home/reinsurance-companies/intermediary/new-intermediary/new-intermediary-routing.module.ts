import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewIntermediaryComponent } from './new-intermediary.component';

const routes: Routes = [{path: '', component: NewIntermediaryComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewIntermediaryRoutingModule { }
