import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company-list.component';

const routes: Routes = [{path: '', component: CompanyListComponent},
  {path: 'company-edit', loadChildren: ()=> import('./edit-companies/edit-companies.module').then(m => m.EditCompaniesModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyListRoutingModule { }
