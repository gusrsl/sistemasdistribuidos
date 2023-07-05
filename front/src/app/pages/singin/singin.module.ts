import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinginPageRoutingModule } from './singin-routing.module';

import { SinginPage } from './singin.page';
import { LoginPageModule } from 'src/app/login/login.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinginPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SinginPage]
})
export class SinginPageModule {}
