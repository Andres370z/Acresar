import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultativoEspecialesRoutingModule } from './facultativo-especiales-routing.module';
import { FacultativoEspecialesComponent } from './facultativo-especiales.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalsOneComponent } from 'src/app/home/modals/modals-one/modals-one.component';
import { MatPaginatorModule } from '@angular/material/paginator';
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
import { MatCardModule } from '@angular/material/card';
import { ModalsOneModule } from 'src/app/home/modals/modals-one/modals-one.module';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [FacultativoEspecialesComponent],
  imports: [
    CommonModule,
    FacultativoEspecialesRoutingModule,
    MatDialogModule,
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
    ModalsOneModule
  ],
  //entryComponents: [ModalsOneComponent]
})
export class FacultativoEspecialesModule { }
