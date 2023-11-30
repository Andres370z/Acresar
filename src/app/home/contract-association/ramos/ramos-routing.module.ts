import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RamosComponent } from './ramos.component';

const routes: Routes = [{path: '',component: RamosComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RamosRoutingModule { }