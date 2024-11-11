import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomaticosComponent } from './automaticos.component';

const routes: Routes = [{path: '', component: AutomaticosComponent},
  {path: 'edit', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomaticosRoutingModule { }
