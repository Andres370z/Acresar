import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CistomMenuComponent } from './custom-menu.component';

const routes: Routes = [{path: '', component: CistomMenuComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CistomMenuRoutingModule { }
