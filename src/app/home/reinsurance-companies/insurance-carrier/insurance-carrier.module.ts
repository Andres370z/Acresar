import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceCarrierRoutingModule } from './insurance-carrier-routing.module';
import { InsuranceCarrierComponent } from './insurance-carrier.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MenuModule } from '../menu/menu.module';


@NgModule({
  declarations: [InsuranceCarrierComponent],
  imports: [
    CommonModule,
    InsuranceCarrierRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MenuModule
  ]
})
export class InsuranceCarrierModule { }
