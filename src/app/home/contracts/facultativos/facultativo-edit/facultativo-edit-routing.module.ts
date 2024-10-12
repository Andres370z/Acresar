import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultativoEditComponent } from './facultativo-edit.component';

const routes: Routes = [
  {path: '', component: FacultativoEditComponent},
  {path: 'detalle', component: FacultativoEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultativoEditRoutingModule { }
