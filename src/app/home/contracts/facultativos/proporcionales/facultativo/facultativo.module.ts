import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultativoRoutingModule } from './facultativo-routing.module';
import { FacultativoComponent } from './facultativo.component';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars'
import { MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [FacultativoComponent, ModalComponent],
  imports: [
    CommonModule,
    FacultativoRoutingModule,
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
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule, 
    DateTimePickerModule,
    MatDialogModule,
    MatCardModule
  ],
  entryComponents: [ModalComponent]
})
export class FacultativoModule { }
