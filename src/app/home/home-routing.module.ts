import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    redirectTo: 'content',
    pathMatch: 'full'
  }, 
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  { path: 'createEvents', loadChildren: () => import('./create-events/create-events.module').then(m => m.CreateEventsModule) },
  { path: 'createGuest', loadChildren: () => import('./create-guest/create-guest.module').then(m => m.CreateGuestModule) },
  { path: 'assistantList', loadChildren: () => import('./assistant-list/assistant-list.module').then(m => m.AssistantListModule) },
  { path: 'asignEvent', loadChildren: () => import('./asign-event/asign-event.module').then(m => m.AsignEventModule) },
  { path: 'createAgents', loadChildren: () => import('./create-agents/create-agents.module').then(m => m.CreateAgentsModule) },
  { path: 'bulkLoad', loadChildren: () => import('./bulk-load/bulk-load.module').then(m => m.BulkLoadModule) },
  { path: 'content', loadChildren: () => import('./content/content.module').then(m => m.ContentModule) },
  { path: 'uploadImages', loadChildren: () => import('./upload-images/upload-images.module').then(m => m.UploadImagesModule) },
  { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
  
  /*ANDRES */
  {path: 'companias', loadChildren: ()=> import ('./reinsurance-companies/company-list/company-list.module').then(m => m.CompanyListModule)},
  {path: 'companias/upload', loadChildren: ()=>import ('./reinsurance-companies/reinsurance-upload/reinsurance-upload.module').then(m => m.ReinsuranceUploadModule)},
  {path: 'contracts', loadChildren: () => import('./contracts/list-contracts/list-contracts.module').then(m=>m.ListContractsModule)},
  {path: 'companias/reinsurer', loadChildren: ()=> import('./reinsurance-companies/reinsurer/reinsurer.module').then(m => m.ReinsurerModule)},
  {path: 'companias/corredor', loadChildren: ()=> import('./reinsurance-companies/corredor/corredor.module').then(m=> m.CorredorModule)},
  {path: 'companias/insurance-carrier', loadChildren:() => import('./reinsurance-companies/insurance-carrier/insurance-carrier.module').then(m=>m.InsuranceCarrierModule)},
  {path: 'companias/intermediary', loadChildren:() => import('./reinsurance-companies/intermediary/intermediary.module').then(m=>m.IntermediaryModule)},
  {path: 'companias/info/directorio', loadChildren:()=>import('./reinsurance-companies/info/directory/directory.module').then(m => m.DirectoryModule)},
  {path: 'companias/clients', loadChildren:() => import('./reinsurance-companies/clients-and-suppliers/clients/clients.module').then(m => m.ClientsModule)},
  {path: 'companias/reacoex', loadChildren:() => import ('./reinsurance-companies/reacodex/reacodex.module').then(m => m.ReacodexModule)},

  /*CONTRATOS*/
  {path: 'contracts/Facultativos', loadChildren:() => import ('./contracts/facultativos/facultativos.module').then(m => m.FacultativosModule)},
  {path: 'contracts/Automaticos', loadChildren: () => import ('./contracts/automatic/automatic.module').then(m => m.AutomaticModule)},

  /**Asociacion de colombia */
  {path: 'asociacion/contratos', loadChildren:() => import ('./contract-association/contracs/contracs.module').then(m => m.ContracsModule)},
  {path: 'asociacion/ramos', loadChildren:() => import ('./contract-association/ramos/ramos.module').then(m => m.RamosModule)},
  {path: 'asociacion/asociacion-contratos', loadChildren: () => import ('./contract-association/contract-association-contract-form/contract-association-contract-form.module').then(m => m.ContractAssociationContractFormModule)},
  {path: 'reinsuranceAdministration/primas', loadChildren: () => import ('./reinsuranceAdministration/primas/primas.module').then(m => m.PrimasModule)},
  /* Menu */
  { path: 'usuarios', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  /* Gerencial */
  {path: 'gerencial', loadChildren: () => import('./gerencial/gerencial.module').then(m => m.GerencialModule)},
  { path: 'gerencialTwo', loadChildren: () => import('./gerencial-two/gerencial-two.module').then(m => m.GerencialTwoModule) },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
