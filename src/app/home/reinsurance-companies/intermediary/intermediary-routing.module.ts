import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntermediaryComponent } from './intermediary.component';

const routes: Routes = [{path: '', component: IntermediaryComponent},
  {path: 'new-intermediary', loadChildren: ()=> import('./new-intermediary/new-intermediary.module').then(m=>m.NewIntermediaryModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntermediaryRoutingModule { }
