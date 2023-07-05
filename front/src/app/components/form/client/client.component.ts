import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

@Component({ 	selector: 'app-client', 
				templateUrl: './client.component.html', 
				styleUrls: ['./client.component.scss'], })

export class ClientComponent {
	@Input() client_id;
	datos = { titulo: "", menu: false, back: true }

	tipo_identificacion_array = [
		{ id: 1, name: 'CEDULA', },
		{ id: 2, name: 'RUC', },
		{ id: 3, name: 'PASAPORTE', },
		{ id: 4, name: 'IDENTIFICACION DEL EXTERIOR', },
		{ id: 5, name: 'CONSUMIDOR FINAL', },
	];

	tipo_persona_array = [
		{ id: 1, name: 'NATURAL', },
		{ id: 2, name: 'JURIDICA', },
	];

	clientForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private modalController: ModalController,
		private toastCtrl: ToastController,
	) {
		this.createForm();
	}

	ionViewDidEnter() {
		console.log(this.client_id);
		if (this.client_id == null) {
			this.datos.titulo = 'Nuevo cliente';
		} else {
			this.datos.titulo = 'Actualizar cliente';
			this.clientForm.get('id').setValue(this.client_id);
			this.lookForClient(this.client_id);
		}
	}

	lookForClient(cliente_id) { }

	createForm() {
		this.clientForm = this.formBuilder.group({
			id: new FormControl(''),
			tipo_identificacion_id: new FormControl(1, Validators.required),
			identificacion: new FormControl("", Validators.compose([
				Validators.required,
				Validators.minLength(10),
				Validators.maxLength(13),
			])),
			razon_social: new FormControl("", Validators.required),
			email: new FormControl("", Validators.compose([
				Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
			])),
			telefono: new FormControl("", Validators.maxLength(10)),
			direccion: new FormControl(""),
			tipo_persona: new FormControl(1),
		});
	}


	customerForm(data) {
		console.log(data);
		this.modalController.dismiss();
	}

	async presentToast(message: string) {
		const toast = await this.toastCtrl.create({
			message,
			duration: 1000,
			position: 'top',
		});
		toast.present();
	}
}
