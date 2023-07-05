import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss'],
})
export class ReservasComponent implements OnInit {

  modes = [ 'date', 'date-time', 'month',
   'month-year', 'time', 'time-date', 'year'];
   selectedMode =  'date';
   showPicker =  false;
   showPickerTime = false;
   showPickerTime2 = false;
  //  ---------------------------
   dateValue = format(new Date(), 'yyyy-MM-dd' );
   formattedSString = '';
  //  ------------------
   hourValue = format(new Date(), 'HH:mm' );
   formatedHour = '';
  //  --------------------------------
   hourValue2 = format(new Date(), 'HH:mm' );
   formatedHour2 = '';

  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/member-ordering
  @Input() reserva_id: any;
	datos = { titulo: 'Crear Reserva', menu: false, back: true };

  setToday() {
    this.formattedSString = format(parseISO(format(new Date(), 'yyyy-MM-dd'  ) + 'T09:00:00.00Z'), ' MMM d, yyyy');
  }

  dateChanged(value) {
    console.log(value);
    this.formattedSString = format(parseISO(value), ' MMM d, yyyy'  );
  }

  // --------------

  setHour() {
    this.formatedHour = format(parseISO(format(new Date(), 'yyyy-MM-dd'  ) + 'T09:00:00.00Z'), 'HH:mm');
  }

  hourChanged(value) {
    console.log(value);
    this.formatedHour = format(parseISO(value), 'HH:mm'  );
  }

  // -----------------------

  setHour2() {
    this.formatedHour2 = format(parseISO(format(new Date(), 'yyyy-MM-dd'  ) + 'T09:00:00.00Z'), 'HH:mm');
  }

  hourChanged2(value) {
    console.log(value);
    this.formatedHour2 = format(parseISO(value), 'HH:mm'  );
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  publicacion = {
    titulo: '',
    descripcion: '',
    imagen: ''
  };

	// eslint-disable-next-line @typescript-eslint/member-ordering
	reservaForm: FormGroup;

  	// eslint-disable-next-line @typescript-eslint/member-ordering
  	constructor(
    	private formBuilder: FormBuilder,
		private modalController: ModalController,
		private toastCtrl: ToastController,
  ) {
    this.createForm();
    this.setToday();
    this.setHour();
    this.setHour2();
   }

   ionViewDidEnter() {
		console.log(this.reserva_id);
		if (this.reserva_id == null) {
			this.datos.titulo = 'Nueva Reserva';
		} else {
			this.datos.titulo = 'Actualizar reserva';
			this.reservaForm.get('id').setValue(this.reserva_id);
			this.lookForClient(this.reserva_id);
		}
	}

	// eslint-disable-next-line @typescript-eslint/naming-convention
	lookForClient(_reserva_id: any) { }


   createForm() {
		this.reservaForm = this.formBuilder.group({
			telefono: new FormControl('', Validators.maxLength(10)),
			direccion: new FormControl(''),
			// eslint-disable-next-line @typescript-eslint/naming-convention
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

	// eslint-disable-next-line @typescript-eslint/member-ordering
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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value: { languages: { value: any } }) => {
        window.alert(`You selected: ${value.languages.value}`);
      },
    },
  ];

  async openDateTimeModal() {
    const modal = await this.modalController.create({
      component: 'date-time-modal'
    });

  }
}
