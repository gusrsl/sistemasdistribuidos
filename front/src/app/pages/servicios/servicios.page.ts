/* eslint-disable @angular-eslint/use-lifecycle-interface */
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
import { deposito } from 'src/app/models/deposito';
import { DepositoService } from 'src/app/services/deposito.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage{
  datos = { titulo: "Eefectivo +", menu: true, back: true }
	palabra_buscar = '';
	cards: any[] = [];
  public deposito: any;
  public token: any;
  constructor(
    private _userService: UsuarioService,
    public actionSheetController: ActionSheetController,
		public popoverController: PopoverController,
		public modalController: ModalController,
		public alertController: AlertController,
    private _depositoService: DepositoService,
    private _router: Router
  ) {
    this.deposito = new deposito(0, '');
    this.token = this._userService.getToken();
   }
   ionViewDidEnter() {
    this.deposito.monto=100;
    this.deposito.descripcion="";
  }
  async createDeposito(depositoForm:any){
    if (depositoForm.valid) {
      this._depositoService.register(this.deposito,this.token).subscribe(
        async (response) => {
          const alert = await this.alertController.create({
            header: 'Registro Exitoso',
            message: "Deposito registrado correctamente",
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
		this.deposito.monto += 10;
	  }
	  disminuirCantidad() {
		if (this.deposito.monto >= 10) {
		  this.deposito.monto -= 10;
		}
	  }
	  enviarFormulario() {
		// Aquí puedes agregar la lógica para procesar el envío del formulario
		// Por ejemplo, puedes enviar la cantidad a través de una solicitud HTTP o realizar alguna otra acción
		console.log("Formulario enviado. Cantidad: " + this.deposito.monto);
	  }
}


