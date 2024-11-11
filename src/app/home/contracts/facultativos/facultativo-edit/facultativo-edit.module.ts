import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultativoEditRoutingModule } from './facultativo-edit-routing.module';
import { FacultativoEditComponent } from './facultativo-edit.component';
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
import { FacultativoDetalleEditComponent } from '../facultativo-detalle-edit/facultativo-detalle-edit.component';

@NgModule({
  declarations: [FacultativoEditComponent, FacultativoDetalleEditComponent],
  imports: [
    CommonModule,
    FacultativoEditRoutingModule,
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
  ]
})
export class FacultativoEditModule { }
