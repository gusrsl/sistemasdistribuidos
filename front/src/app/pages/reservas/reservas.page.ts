/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, PopoverController } from '@ionic/angular';
import { ReservasComponent } from 'src/app/components/form/reservas/reservas.component';
import { trasnferencia } from 'src/app/models/transferencia';
import { TransferenciaService } from 'src/app/services/transferencia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage{
  usuarios: any[] = [];
  public identity: any;
  id_usuario:any;
  datos = { titulo: 'Reservas', menu: true, back: true };
  nombre: string = '';
  public transferencia: any;
  public token: any;
	// eslint-disable-next-line @typescript-eslint/naming-convention
	palabra_buscar = '';

  constructor(
    public actionSheetController: ActionSheetController,
		public popoverController: PopoverController,
		public modalController: ModalController,
		public alertController: AlertController,
    private _userService: UsuarioService,
    private _transferenciaService: TransferenciaService,
    private _router: Router
  ) {
    this.identity = this._userService.getIdentity();
    this.transferencia = new trasnferencia(0, '','');
    this.token = this._userService.getToken();
  }

  ionViewDidEnter() {
    console.log(this.identity._id);
    this._userService.getUsuarios().subscribe((response) => {
      console.log(response.user);
      this.usuarios = response.user;
    });
    this.transferencia.monto=100;
    this.transferencia.descripcion="";

  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  reservas = [
		{
			id: 1,
			Nombre: 'Gutavo Rodriguez',
			Fecha: '15-05-2023',
			Area: 'Cancha de Futbol 11',
			Horaini: '16h00',
			Horafin: '19h00',
		},
    {
			id: 2,
			Nombre: 'Benji Gonzalez',
			Fecha: '16-05-2023',
			Area: 'Piscina',
			Horaini: '16h00',
			Horafin: '19h00'
		},
    {
			id: 3,
			Nombre: 'Cristopher Alcivar',
			Fecha: '18-06-2023',
			Area: 'Salon de eventos',
			Horaini: '16h00',
			Horafin: '19h00'
		},
	];

  async openOptions(reservas, position) {
		const actionSheet = await this.actionSheetController.create({
			header: 'Acciones',
			cssClass: 'my-custom-class',
			buttons: [
				{
					text: 'Actualizar',
					icon: 'create',
					handler: () => { this.modalCreateClient(reservas.id, position); }
				}, {
					text: 'Eliminar',
					role: 'destructive',
					icon: 'trash',
					handler: () => { this.removeClient(reservas, position); }
				}, {
					text: 'Cancelar',
					icon: 'close',
					role: 'cancel',
					handler: () => { }
				}]
		});
		await actionSheet.present();
	}

	async modalCreateClient(reserva_id, position) {
		const modal = await this.modalController.create({
			component: ReservasComponent,
			componentProps: {
				reserva_id,
			}
		});
		modal.onWillDismiss().then((res) => {
		});
		return await modal.present();
	}


	async removeClient(reserva, position) {
		const alert = await this.alertController.create({
			header: 'Eliminar',
			subHeader: '¿Seguro que desea eliminar a ' + reserva.Nombre + '?', mode: 'ios',
			buttons: [
				{
					text: 'Cancelar', role: 'cancel', cssClass: 'secondary',
					handler: () => { }
				}, {
					text: 'Aceptar',
					handler: () => {
					}
				}
			]
		});
		await alert.present();
	}

	updateFilter(e) {
		console.log('🚀 ~ file: login.page.ts:38 ~ LoginPage ~ updateFilter ~ e:', e);
	}

	aumentarCantidad() {
		this.transferencia.monto += 10;
	  }

	  disminuirCantidad() {
		if (this.transferencia.monto >= 10) {
		  this.transferencia.monto -= 10;
		}
	  }

	  enviarFormulario() {
		// Aquí puedes agregar la lógica para procesar el envío del formulario
		// Por ejemplo, puedes enviar el nombre y la cantidad a través de una solicitud HTTP o realizar alguna otra acción
		console.log("Formulario enviado. Nombre:" + this.id_usuario + ", Cantidad: " + this.transferencia.monto);
	  }
    async createTransferencia(trasnferenciaForm:any){
      if (trasnferenciaForm.valid) {
        this._transferenciaService.register(this.transferencia,this.token).subscribe(
          async (response) => {
            const alert = await this.alertController.create({
              header: 'Registro Exitoso',
              message: "Transferencia registrada correctamente",
              buttons: ['Aceptar']
            });

            await alert.present();

            this._router.navigate(['/menu/home']);
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
}
