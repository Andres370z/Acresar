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
  {path: 'companias', loadChildren: ()=> import ('./reinsurance-companies/company-list/company-list.module').then(m => m.CompanyListModule)},
  /*ANDRES */
  {path: 'companias/upload', loadChildren: ()=>import ('./reinsurance-companies/reinsurance-upload/reinsurance-upload.module').then(m => m.ReinsuranceUploadModule)},
  {path: 'contracts', loadChildren: () => import('./contracts/list-contracts/list-contracts.module').then(m=>m.ListContractsModule)},
  {path: 'companias/reinsurer', loadChildren: ()=> import('./reinsurance-companies/reinsurer/reinsurer.module').then(m => m.ReinsurerModule)},
  {path: 'companias/corredor', loadChildren: ()=> import('./reinsurance-companies/corredor/corredor.module').then(m=> m.CorredorModule)},
  {path: 'companias/insurance-carrier', loadChildren:() => import('./reinsurance-companies/insurance-carrier/insurance-carrier.module').then(m=>m.InsuranceCarrierModule)},
  {path: 'companias/intermediary', loadChildren:() => import('./reinsurance-companies/intermediary/intermediary.module').then(m=>m.IntermediaryModule)},
  {path: 'companias/info/directorio', loadChildren:()=>import('./reinsurance-companies/info/directory/directory.module').then(m => m.DirectoryModule)},
  {path: 'companias/clients', loadChildren:() => import('./reinsurance-companies/clients-and-suppliers/clients/clients.module').then(m => m.ClientsModule)},
  {path: 'companias/reacoex', loadChildren:() => import ('./reinsurance-companies/reacodex/reacodex.module').then(m => m.ReacodexModule)}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
