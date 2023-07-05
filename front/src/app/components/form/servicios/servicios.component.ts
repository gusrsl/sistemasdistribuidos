/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements OnInit {

  @Input() reserva_id;
	datos = { titulo: "Crear Servicio", menu: false, back: true }

  servicios = [
		{
			id: 1,
			razon_social: 'Juan Perez',
			identificacion: '1309152138',
			servicio: 'Electricista',
      descripcion: 'Experto en cableado electrico',
			telefono: '0123456789',
      url: 'https://www.whatsapp.com/?lang=es'
		}, {
			id: 2,
			razon_social: 'Alcivar Briones',
			identificacion: '1309152138',
			servicio: 'Fontanero',
      descripcion: 'Experto en cableado electrico',
			telefono: '0123456789',
      url: 'https://www.whatsapp.com/?lang=es'
		}, {
			id: 3,
			razon_social: 'Palacios Xavier',
			identificacion: '1309152138',
			servicio: 'Jardinero',
      descripcion: 'Experto en cableado electrico',
			telefono: '0123456789',
      url: 'https://www.whatsapp.com/?lang=es'
		},{
			id: 4,
			razon_social: 'Cristopher Briones',
			identificacion: '1309152138',
			servicio: 'Comida a domicilio',
      descripcion: 'Experto en cableado electrico',
			telefono: '0123456789',
      url: 'https://www.whatsapp.com/?lang=es'
		},
	]


	reservaForm: FormGroup;

  	constructor(
    	private formBuilder: FormBuilder,
		private modalController: ModalController,
		private toastCtrl: ToastController,
  ) {
    this.createForm();
   }

   ionViewDidEnter() {
		console.log(this.servicios);
		if (this.servicios == null) {
			this.datos.titulo = 'Nuevo servicio';
		} else {
			this.datos.titulo = 'Actualizar servicio';
			this.reservaForm.get('id').setValue(this.servicios);
			this.lookForClient(this.servicios);
		}
	}

	lookForClient(servicios) { }


   createForm() {
		this.reservaForm = this.formBuilder.group({
			telefono: new FormControl("", Validators.maxLength(10)),
			direccion: new FormControl(""),
			tipo_persona: new FormControl(1),
		});
	}

  ngOnInit() {}

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

  public pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value) => {
        window.alert(`You selected: ${value.languages.value}`);
      },
    },
  ];

}
