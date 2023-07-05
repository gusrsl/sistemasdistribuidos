import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {


  notificaciones = [
		{
			id: 1,
            titulo: 'Publicacion urgente',
            type: 'Piscina deshabilitada hasta el 10 de julio',
            url: '/menu/home'
		},
		{
			id: 2,
            titulo: 'Reserva realizada',
            type: 'La cancha de futbol esta reservada para el 3 de junio a la 11h00',
            url: '/menu/publicaciones'
		},
		{
			id: 3,
            titulo: 'Servicios agregado',
            type: 'Servicio de delivery de alimentos e ha agregado a la seccion de servicios!',
            url: '/menu/servicios'
		}
	]


  // Typically referenced to your ion-router-outlet
  presentingElement = null;
  constructor(private noty: ModalController, private navCtrl: NavController) { }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  indiceSeleccionado: any = 0;

  cambiarIndiceSeleccionado(i){
		this.indiceSeleccionado = i;
	  }
	

  closeModal() {
    this.noty.dismiss();
  }

	

	logout() {
		localStorage.removeItem("perfil");
		this.navCtrl.navigateRoot("/login");
	}

}
