import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomaticosComponent } from './automaticos.component';

const routes: Routes = [{path: '', component: AutomaticosComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomaticosRoutingModule { }
