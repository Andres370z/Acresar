import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateInsurerRoutingModule } from './create-insurer-routing.module';
import { UpdateInsurerComponent } from '../update-insurer/update-insurer.component';
import { CreateInsurerComponent } from './create-insurer.component';
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
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [CreateInsurerComponent],
  imports: [
    CommonModule,
    CreateInsurerRoutingModule,
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
    MatListModule
  ]
})
export class CreateInsurerModule { }
