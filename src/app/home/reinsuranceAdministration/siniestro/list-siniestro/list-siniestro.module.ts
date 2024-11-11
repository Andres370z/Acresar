import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListSiniestroRoutingModule } from './list-siniestro-routing.module';
import { FacultativosComponent } from './nueva-distribucion/facultativos/facultativos.component';
import { FacultativosEspecialesComponent } from './nueva-distribucion/facultativos-especiales/facultativos-especiales.component';
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
import { FirstMenuModule } from '../../first-menu/first-menu.module';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ListSiniestroComponent } from './list-siniestro.component';


@NgModule({
  declarations: [
    ListSiniestroComponent,
    FacultativosComponent,
    FacultativosEspecialesComponent
  ],
  imports: [
    CommonModule,
    ListSiniestroRoutingModule,
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
    FirstMenuModule,
    FileUploadModule,

  ]
})
export class ListSiniestroModule { }
