import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultativoComponent } from '../../proporcionales/facultativo/facultativo.component';
import { FacultativoEspecialesComponent } from './facultativo-especiales.component';

const routes: Routes = [{path: '', component: FacultativoEspecialesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultativoEspecialesRoutingModule { }
