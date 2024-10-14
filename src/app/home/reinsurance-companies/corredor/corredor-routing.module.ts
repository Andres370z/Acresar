import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorredorComponent } from './corredor.component';

const routes: Routes = [{path: '', component: CorredorComponent},{
  path: 'registrar', loadChildren: ()=> import('./register/register.module').then(m => m.RegisterModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorredorRoutingModule { }
