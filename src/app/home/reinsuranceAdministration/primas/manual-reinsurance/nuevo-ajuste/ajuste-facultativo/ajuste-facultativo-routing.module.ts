import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjusteFacultativoComponent } from './ajuste-facultativo.component';

const routes: Routes = [{path: '', component: AjusteFacultativoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjusteFacultativoRoutingModule { }
