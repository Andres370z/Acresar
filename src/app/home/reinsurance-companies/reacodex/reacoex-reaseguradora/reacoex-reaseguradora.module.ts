import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReacoexReaseguradoraRoutingModule } from './reacoex-reaseguradora-routing.module';
import { ReacoexReaseguradoraComponent } from './reacoex-reaseguradora.component';
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


@NgModule({
  declarations: [ReacoexReaseguradoraComponent],
  imports: [
    CommonModule,
    ReacoexReaseguradoraRoutingModule,
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
    MatButtonModule
  ]
})
export class ReacoexReaseguradoraModule { }
