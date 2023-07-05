/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { NotificacionesPage } from 'src/app/notificaciones/notificaciones.page';

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.scss'],
})
export class SugerenciasComponent implements OnInit {
  @Input() reserva_id;
	datos = { titulo: "Crear Sugerencia", menu: false, back: true }
  avatar: any = 'https://i.ibb.co/1rBHJvp/Only-logo-House.png';
  location: any;

  constructor(
    private formBuilder: FormBuilder,
		private modalController: ModalController,
		private toastCtrl: ToastController,
  ) { }

  ngOnInit() {}

  tipo_identificacion_array = [
		{ id: 1, name: 'Fecha', },
		{ id: 2, name: 'Area', },
		{ id: 3, name: 'Hora de Inicio', },
		{ id: 4, name: 'Hora de Fin', },
		{ id: 5, name: 'Residente', },
	];

	tipo_persona_array = [
		{ id: 1, name: 'NATURAL', },
		{ id: 2, name: 'JURIDICA', },
	];

	reservaForm: FormGroup;



  //  ionViewDidEnter() {
	// 	console.log(this.reserva_id);
	// 	if (this.reserva_id == null) {
	// 		this.datos.titulo = 'Nueva Reserva';
	// 	} else {
	// 		this.datos.titulo = 'Actualizar reserva';
	// 		this.reservaForm.get('id').setValue(this.reserva_id);
	// 		this.lookForClient(this.reserva_id);
	// 	}
	// }

	lookForClient(reserva_id) { }


  //  createForm() {
	// 	this.reservaForm = this.formBuilder.group({
	// 		telefono: new FormControl('', Validators.maxLength(10)),
	// 		direccion: new FormControl(''),
	// 		tipo_persona: new FormControl(1),
	// 	});
	// }
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

	public pickerColumns = [
    {
      name: 'languages',
      options: [
        {
          text: 'JavaScript',
          value: 'javascript',
        },
        {
          text: 'TypeScript',
          value: 'typescript',
        },
        {
          text: 'Rust',
          value: 'rust',
        },
        {
          text: 'C#',
          value: 'c#',
        },
      ],
    },
  ];

  // public pickerButtons = [
  //   {
  //     text: 'Cancel',
  //     role: 'cancel',
  //   },
  //   {
  //     text: 'Confirm',
  //     handler: (value) => {
  //       window.alert(`You selected: ${value.languages.value}`);
  //     },
  //   },
  // ];

  
  goBack() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.datos.menu ? this.location.back() : this.modalController.dismiss();
  }

  async openNotifications() {
    const modal = await this.modalController.create({
      component: NotificacionesPage,
      cssClass: 'notifications-modal',
    });

    await modal.present();
  }



}
