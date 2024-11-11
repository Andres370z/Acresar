import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListContractsRoutingModule } from './list-contracts-routing.module';
import { ListContractsComponent } from './list-contracts.component';
import { CompanyListRoutingModule } from '../../reinsurance-companies/company-list/company-list-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MenuModule } from '../menu/menu.module';
import { MatSort, MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [ListContractsComponent],
  imports: [
    CommonModule,
    ListContractsRoutingModule,
    CompanyListRoutingModule,
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
    MenuModule,
    MatSortModule
  ]
})
export class ListContractsModule { }
