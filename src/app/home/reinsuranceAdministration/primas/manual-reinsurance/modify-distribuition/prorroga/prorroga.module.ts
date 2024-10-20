import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProrrogaRoutingModule } from './prorroga-routing.module';
import { ProrrogaComponent } from './prorroga.component';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FacultativoComponent } from './facultativo/facultativo.component';
import { AutomaticosComponent } from './automaticos/automaticos.component';
import { FirstMenuModule } from 'src/app/home/reinsuranceAdministration/first-menu/first-menu.module';

@NgModule({
  declarations: [ProrrogaComponent, FacultativoComponent, AutomaticosComponent],
  imports: [
    CommonModule,
    ProrrogaRoutingModule,
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
    MatDatepickerModule,
    MatAutocompleteModule,
    FirstMenuModule
  ]
})
export class ProrrogaModule { }
