import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, PopoverController } from '@ionic/angular';
import { PublicacionesComponent } from 'src/app/components/form/publicaciones/publicaciones.component';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {
  datos = { titulo: "Publicaciones", menu: true, back: true }
	palabra_buscar = '';
  constructor(
    public actionSheetController: ActionSheetController,
		public popoverController: PopoverController,
		public modalController: ModalController,
		public alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  handleRefresh(event) {
		setTimeout(() => {
		  // Any calls to load data go here
		  event.target.complete();
		}, 2000);
	}

  async modalCreateClient(publicacion_id, position) {
		const modal = await this.modalController.create({
			component: PublicacionesComponent,
			componentProps: {
				publicacion_id,
			}
		});
		modal.onWillDismiss().then((res) => {
		});
		return await modal.present();
	}

}
