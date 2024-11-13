import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from '../home/reinsurance-companies/corredor/register/register.component';
import { ResApiComponent } from '../home/res-api/res-api.component';

export const PagesRoutes: Routes = [
    { 
        path: '', 
        redirectTo: 'login',
        pathMatch: 'full'
      },  
    {
        path: 'login',
        children: [ {
            path: '',
            component: LoginComponent
        },{
            path: 'api',
            component: ResApiComponent
        }]
    }
];
