/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, PopoverController } from '@ionic/angular';
import { ClientComponent } from 'src/app/components/form/client/client.component';
import { ServiciosComponent } from 'src/app/components/form/servicios/servicios.component';
import { ViewCustomerDataComponent } from 'src/app/components/popover/view-customer-data/view-customer-data.component';
import { ViewServicioDataComponent } from 'src/app/components/popover/view-servicio-data/view-servicio-data.component';
import { retiro } from 'src/app/models/retiro';
import { DepositoService } from 'src/app/services/deposito.service';
import { RetiroService } from 'src/app/services/retiro.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.page.html',
  styleUrls: ['./sugerencias.page.scss'],
})
	export class SugerenciasPage implements OnInit {
		datos = { titulo: "Retiros", menu: true, back: true }
		  palabra_buscar = '';
		  cards: any[] = [];
		public retiro: any;
		public token: any;
		constructor(
		  private _userService: UsuarioService,
		  public actionSheetController: ActionSheetController,
			  public popoverController: PopoverController,
			  public modalController: ModalController,
			  public alertController: AlertController,
		  private _retiroService: RetiroService,
		  private _router: Router
		) {
		  this.retiro = new retiro(0, '');
		  this.token = this._userService.getToken();
		 }
		ngOnInit() {
		  this.retiro.monto=100;
      this.retiro.descripcion="";
		}
		async createRetiro(retiroForm:any){
		  if (retiroForm.valid) {
			this._retiroService.register(this.retiro,this.token).subscribe(
			  async (response) => {
				const alert = await this.alertController.create({
				  header: 'Retiro Exitoso',
				  message: "Retiro registrado correctamente",
				  buttons: ['Aceptar']
				});

				await alert.present();

				this._router.navigate(['/menu/home'])
				await alert.onDidDismiss().then(() => {
				  // window.location.reload();
				});
				return;
				// this.presentToast('BIENVENIDO ' + credentials.user);
			  },
			  async (error) => {
				console.log(error);

				const alert = await this.alertController.create({
				  header: 'Datos incompletos',
				  message: error.error.error,
				  buttons: ['Aceptar']
				});
				await alert.present();
				return;
			  }
			);
		  }else{
			const alert = await this.alertController.create({
			  header: 'Datos incompletos',
			  message: 'Faltan campos por rellenar.',
			  buttons: ['Aceptar']
			});
			await alert.present();
			return;
		  }
		}
			aumentarCantidad() {
			  this.retiro.monto += 10;
			}
			disminuirCantidad() {
			  if (this.retiro.monto >= 10) {
				this.retiro.monto -= 10;
			  }
			}
			enviarFormulario() {
			  // Aquí puedes agregar la lógica para procesar el envío del formulario
			  // Por ejemplo, puedes enviar la cantidad a través de una solicitud HTTP o realizar alguna otra acción
			  console.log("Formulario enviado. Cantidad: " + this.retiro.monto);
			}
	  }
