import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimasRoutingModule } from './primas-routing.module';
import { PrimasComponent } from './primas.component';
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
import { FirstMenuModule } from '../first-menu/first-menu.module';
import { NuevoAjusteComponent } from './manual-reinsurance/nuevo-ajuste/nuevo-ajuste.component';
import { AjusteFacultativoComponent } from './manual-reinsurance/nuevo-ajuste/ajuste-facultativo/ajuste-facultativo.component';
import { AjusteAutomaticoComponent } from './manual-reinsurance/nuevo-ajuste/ajuste-automatico/ajuste-automatico.component';
import { CargarComponent } from './automatic-reinsurer/cargar/cargar.component';
import { ProcesarComponent } from './automatic-reinsurer/procesar/procesar.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@NgModule({
  declarations: [PrimasComponent, NuevoAjusteComponent, AjusteFacultativoComponent,
    AjusteAutomaticoComponent,
    CargarComponent,
    ProcesarComponent],
  imports: [
    CommonModule,
    PrimasRoutingModule,
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
  ], schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PrimasModule { }
