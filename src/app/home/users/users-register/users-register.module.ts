import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRegisterRoutingModule } from './users-register-routing.module';
import { UsersRegisterComponent } from './users-register.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    UsersRegisterComponent
  ],
  imports: [
    CommonModule,
    UsersRegisterRoutingModule,
    QRCodeModule,
    FormsModule, 
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
  ]
})
export class UsersRegisterModule { }
