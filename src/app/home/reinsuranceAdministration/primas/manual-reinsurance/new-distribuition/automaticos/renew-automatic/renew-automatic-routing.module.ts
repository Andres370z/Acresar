import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenewAutomaticComponent } from './renew-automatic.component';

const routes: Routes = [{ path: '', component: RenewAutomaticComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenewAutomaticRoutingModule { }
