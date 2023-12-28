import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultativosEspecialRoutingModule } from './facultativos-especial-routing.module';
import { FacultativosEspecialComponent } from './facultativos-especial.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [FacultativosEspecialComponent],
  imports: [
    CommonModule,
    FacultativosEspecialRoutingModule,
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
    MatTableModule,
    MatAutocompleteModule
  ]
})
export class FacultativosEspecialModule { }
