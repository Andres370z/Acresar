import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModifyDistribuitionRoutingModule } from './modify-distribuition-routing.module';
import { ModifyDistribuitionComponent } from './modify-distribuition.component';
import { ModificarFacultativosComponent } from './modificar-facultativos/modificar-facultativos.component';
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

@NgModule({
  declarations: [
    ModifyDistribuitionComponent,
    ModificarFacultativosComponent
  ],
  imports: [
    CommonModule,
    ModifyDistribuitionRoutingModule,
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
    MatAutocompleteModule
  ]
})
export class ModifyDistribuitionModule { }
