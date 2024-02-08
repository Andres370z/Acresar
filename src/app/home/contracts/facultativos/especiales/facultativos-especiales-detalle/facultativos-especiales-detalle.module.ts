import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultativosEspecialesDetalleRoutingModule } from './facultativos-especiales-detalle-routing.module';
import { FacultativosEspecialesDetalleComponent } from './facultativos-especiales-detalle.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ModalsOneModule } from 'src/app/home/modals/modals-one/modals-one.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [FacultativosEspecialesDetalleComponent],
  imports: [
    CommonModule,
    FacultativosEspecialesDetalleRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule, 
    DateTimePickerModule,
    MatDialogModule,
    MatCardModule,
    ModalsOneModule,
    MatDividerModule,
    MatCheckboxModule,
    MatChipsModule
  ]
})
export class FacultativosEspecialesDetalleModule { }
