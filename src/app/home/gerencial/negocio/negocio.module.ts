import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NegocioRoutingModule } from './negocio-routing.module';
import { NegocioComponent } from './negocio.component';
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
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [NegocioComponent],
  imports: [
    CommonModule,
    NegocioRoutingModule,
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
    MatAutocompleteModule,
  ]
})
export class NegocioModule { }
