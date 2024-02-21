import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GerencialComponent } from './gerencial.component';

const routes: Routes = [{ path: '', component: GerencialComponent },
  {path: 'asignacion', loadChildren: ()=> import ('./asignacion-proveedores/asignacion-proveedores.module').then(m =>m.AsignacionProveedoresModule)},
  {path: 'admonProveedor', loadChildren: ()=> import ('./admon-proveedores/admon-proveedores.module').then(m =>m.AdmonProveedoresModule)},
  {path: 'negocio', loadChildren: ()=> import ('./negocio/negocio.module').then(m =>m.NegocioModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerencialRoutingModule { }
