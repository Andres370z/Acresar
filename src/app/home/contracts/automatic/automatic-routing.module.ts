import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomaticComponent } from './automatic.component';

const routes: Routes = [{ path: '', component: AutomaticComponent },
{ path: 'proporcionales', loadChildren: () => import('./proporcionales/proporcionales.module').then(m => m.ProporcionalesModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomaticRoutingModule { }
