import { IonicModule } from '@ionic/angular';
import { ClientComponent } from './form/client/client.component';
import { ViewCustomerDataComponent } from './popover/view-customer-data/view-customer-data.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewServicioDataComponent } from './popover/view-servicio-data/view-servicio-data.component';
import { FooterComponent } from './footer/footer.component';
import { ReservasComponent } from './form/reservas/reservas.component';
import { NotificacionesPage } from '../notificaciones/notificaciones.page';
import { PublicacionesComponent } from './form/publicaciones/publicaciones.component';
import { ServiciosComponent } from './form/servicios/servicios.component';
import { SugerenciasComponent } from './form/sugerencias/sugerencias.component';




@NgModule({

    entryComponents: [
        NotificacionesPage,
    ],

    providers: [
        FooterComponent,
    ],

    declarations: [
        HeaderComponent,
        ViewCustomerDataComponent,
        ClientComponent,
        ViewServicioDataComponent,
        FooterComponent,
        ReservasComponent,
        NotificacionesPage,
        PublicacionesComponent,
        ServiciosComponent,
        SugerenciasComponent
    ],
    exports: [
        HeaderComponent,
        ViewCustomerDataComponent,
        ClientComponent,
        ViewServicioDataComponent,
        FooterComponent,
        ReservasComponent,
        ServiciosComponent,
        SugerenciasComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
    ]
})
export class ComponentsModule { }
