import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListContractsComponent } from './list-contracts.component';

const routes: Routes = [{path: '', component: ListContractsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListContractsRoutingModule { }
