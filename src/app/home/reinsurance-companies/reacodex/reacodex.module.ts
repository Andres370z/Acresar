import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReacodexRoutingModule } from './reacodex-routing.module';
import { ReacodexComponent } from './reacodex.component';
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
import { MenuModule } from '../menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { FileUploadModule } from '@iplab/ngx-file-upload';


@NgModule({
  declarations: [ReacodexComponent, ],
  imports: [
    CommonModule,
    ReacodexRoutingModule,
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
    MenuModule,
    HttpClientModule,
    MatTableModule,
    MatTabsModule,
    FileUploadModule
  ]
})
export class ReacodexModule { }
