import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, PopoverController } from '@ionic/angular';
import { ViewCustomerDataComponent } from './../../components/popover/view-customer-data/view-customer-data.component';
import { ServiciosPage } from '../servicios/servicios.page';
import { ClientComponent } from 'src/app/components/form/client/client.component';

@Component({ selector: 'app-clientes', templateUrl: './clientes.page.html', styleUrls: ['./clientes.page.scss'], })

export class ClientesPage implements OnInit {
	datos = { titulo: "Clientes", menu: true, back: true }
	palabra_buscar = '';

	constructor(
		public actionSheetController: ActionSheetController,
		public popoverController: PopoverController,
		public modalController: ModalController,
		public alertController: AlertController,
	) { }

	ngOnInit() { }

	handleRefresh(event) {
		setTimeout(() => {
		  // Any calls to load data go here
		  event.target.complete();
		}, 2000);
	  }

	clients = [
		{
			id: 1,
			razon_social: 'ALBERTO LUCAS',
			identificacion: '1309152138',
			email: 'email@alberto.com',
			telefono: '0123456789',
			direccion: 'calle ejemplo, av 11'
		}, {
			id: 1,
			razon_social: 'ALBERTO LUCAS',
			identificacion: '1309152138',
			email: 'email@alberto.com',
			telefono: '0123456789',
			direccion: 'calle ejemplo, av 11'
		}, {
			id: 1,
			razon_social: 'ALBERTO LUCAS',
			identificacion: '1309152138',
			email: 'email@alberto.com',
			telefono: '0123456789',
			direccion: 'calle ejemplo, av 11'
		}, {
			id: 1,
			razon_social: 'ALBERTO LUCAS',
			identificacion: '1309152138',
			email: 'email@alberto.com',
			telefono: '0123456789',
			direccion: 'calle ejemplo, av 11'
		},
	]

	async openOptions(client, position) {
		const actionSheet = await this.actionSheetController.create({
			header: 'Acciones',
			cssClass: 'my-custom-class',
			buttons: [
				{
					text: 'Ver detalles del cliente',
					icon: 'eye',
					handler: () => { this.viewCustomerData(client); }
				}, {
					text: 'Actualizar',
					icon: 'create',
					handler: () => { this.modalCreateClient(client.id, position); }
				}, {
					text: 'Eliminar',
					role: 'destructive',
					icon: 'trash',
					handler: () => { this.removeClient(client, position); }
				}, {
					text: 'Cancelar',
					icon: 'close',
					role: 'cancel',
					handler: () => { }
				}]
		});
		await actionSheet.present();
	}

	async modalCreateClient(client_id, position) {
		const modal = await this.modalController.create({
			component: ClientComponent,
			componentProps: {
				client_id,
			}
		});
		modal.onWillDismiss().then((res) => {
		});
		return await modal.present();
	}

	async viewCustomerData(client) {
		const popover = await this.popoverController.create({
			component: ViewCustomerDataComponent,
			mode: "ios",
			cssClass: "custom-popover",
			componentProps: { client }
		});
		await popover.present();
	}

	async removeClient(client, position) {
		const alert = await this.alertController.create({
			header: 'Eliminar',
			subHeader: '¿Seguro que desea eliminar a ' + client.razon_social + '?', mode: "ios",
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
		console.log("🚀 ~ file: login.page.ts:38 ~ LoginPage ~ updateFilter ~ e:", e)
	}

}
