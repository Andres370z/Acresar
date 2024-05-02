import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './reportes.component';

const routes: Routes = [{path: '', component: ReportesComponent},
  {path: 'boderaux', loadChildren: ()=> import('./primas/borderaux/borderaux.module').then(m => m.BorderauxModule)},
  {path: 'contratos-automaticos', loadChildren: ()=> import('./primas/reporte-automatico/reporte-automatico.module').then(m => m.ReporteAutomaticoModule)},
  {path: 'contratos-facultativos', loadChildren: ()=> import('./primas/reporte-facultativo/reporte-facultativo.module').then(m => m.ReporteFacultativoModule)},
  //SINIESTROS
  {path: 'reporte-siniestro', loadChildren: ()=> import('./siniestros/bordereaux/bordereaux.module').then(m => m.BordereauxModule)},
  {path: 'siniestro-rea', loadChildren: ()=> import('./siniestros/siniestro-reasegurador/siniestro-reasegurador.module').then(m => m.SiniestroReaseguradorModule)},
  //CARTERA
  {path: 'reasegurador', loadChildren: ()=> import('./cartera/reasegurador/reasegurador.module').then(m => m.ReaseguradorModule)},
  {path: 'compania', loadChildren: ()=> import('./cartera/compania/compania.module').then(m => m.CompaniaModule)},
  {path: 'proveedor', loadChildren: ()=> import('./cartera/proveedor/proveedor.module').then(m => m.ProveedorModule)},
  {path: 'pagos', loadChildren: ()=> import('./cartera/pagos/pagos.module').then(m => m.PagosModule)},
  //INFORMES
  {path: 'informes', loadChildren: ()=> import('./informes/informes.module').then(m => m.InformesModule)},
  //VENCIMIENTOS
  {path: 'vencimientos/compania', loadChildren: ()=> import('./vencimientos/compania/compania.module').then(m => m.CompaniaModule)},
  {path: 'vencimientos/proveedor', loadChildren: ()=> import('./vencimientos/proveedor/proveedor.module').then(m => m.ProveedorModule)},
  {path: 'vencimientos/reasegurador', loadChildren: ()=> import('./vencimientos/reasegurador/reasegurador.module').then(m => m.ReaseguradorModule)},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
