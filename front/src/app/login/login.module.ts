/* eslint-disable @typescript-eslint/quotes */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ComponentsModule } from "../components/components.module";
import { PublicacionesPageRoutingModule } from '../pages/publicaciones/publicaciones-routing.module';
import { PublicacionesPageModule } from '../pages/publicaciones/publicaciones.module';
import { SinginPageModule } from '../pages/singin/singin.module';
import { MenuPageModule } from '../menu/menu.module';

@NgModule({
    declarations: [LoginPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        ReactiveFormsModule,
        ComponentsModule,
        SinginPageModule,
        MenuPageModule,
    ]
})
export class LoginPageModule {}
