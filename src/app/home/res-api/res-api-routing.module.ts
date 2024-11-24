import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResApiComponent } from './res-api.component';

const routes: Routes = [{path: '', component: ResApiComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResApiRoutingModule { }
