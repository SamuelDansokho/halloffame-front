import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    HttpModule
  ],
  declarations: []
})
export class UserModule { }
