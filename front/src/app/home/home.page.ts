/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-underscore-dangle */
import { NavController, AlertController } from '@ionic/angular';
import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { usuario } from '../models/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public identity: any;
	datos = { titulo: 'Home', menu: true };
  transacciones: any[] = []; // Array de transacciones
  public informacion:any;
  public token: any;
	constructor(
    private _userService: UsuarioService,
    private navCtrl: NavController,
		private alertController: AlertController,
    ) {
      this.token = this._userService.getToken();
      this.identity = this._userService.getIdentity();
      this.transacciones = [];
     }
     ionViewDidEnter(){
      this._userService.setIdentity(this.identity._id).subscribe((response):any=>{
        this.informacion=response.user;
        console.log(this.informacion);});
      this._userService.moviminetos(this.token).subscribe((response):any=>{
        this.transacciones=response.data;
        console.log(this.informacion);});
    }
	emissionPoint() {
		this.presentAlert();
	}
	operator() {
		this.presentAlert();
	}
	clients() {
		this.navCtrl.navigateForward('/menu/clientes');
	}
	servicios() {
		this.navCtrl.navigateForward('/menu/servicios');
	}
	reservas() {
		this.navCtrl.navigateForward('/menu/reservas');
	}
	publicaciones() {
		this.navCtrl.navigateForward('/menu/publicaciones');
	}
	sugerencias() {
		this.navCtrl.navigateForward('/menu/sugerencias');
	}
	perfil() {
		this.navCtrl.navigateForward('/menu/perfil');
	}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Informacion',
      subHeader: 'Solo cliente direcciona',
      mode: 'ios',
      buttons: ['OK'],
    });
    await alert.present();
  }

	agregarTransaccion(tipo: string, monto: number) {
		// Lógica para agregar una nueva transacción
		const nuevaTransaccion = { tipo, monto };
		this.transacciones.push(nuevaTransaccion);
	  }


}
