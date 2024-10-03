import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RamosEditComponent } from './ramos-edit.component';

const routes: Routes = [{path: '', component: RamosEditComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RamosEditRoutingModule { }
