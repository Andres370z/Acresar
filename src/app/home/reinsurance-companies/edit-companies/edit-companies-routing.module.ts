import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCompaniesComponent } from './edit-companies.component';

const routes: Routes = [{path: '', component: EditCompaniesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCompaniesRoutingModule { }
