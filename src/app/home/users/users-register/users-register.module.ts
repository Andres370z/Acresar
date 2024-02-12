import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRegisterRoutingModule } from './users-register-routing.module';
import { UsersRegisterComponent } from './users-register.component';


@NgModule({
  declarations: [
    UsersRegisterComponent
  ],
  imports: [
    CommonModule,
    UsersRegisterRoutingModule
  ]
})
export class UsersRegisterModule { }
