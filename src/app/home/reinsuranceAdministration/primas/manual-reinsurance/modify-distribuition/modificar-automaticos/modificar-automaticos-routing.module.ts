import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificarAutomaticosComponent } from './modificar-automaticos.component';

const routes: Routes = [{path: '', component: ModificarAutomaticosComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificarAutomaticosRoutingModule { }
