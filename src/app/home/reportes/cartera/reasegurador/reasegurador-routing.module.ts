import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReaseguradorComponent } from './reasegurador.component';

const routes: Routes = [{path: '', component: ReaseguradorComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReaseguradorRoutingModule { }
