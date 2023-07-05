/* eslint-disable no-underscore-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.page.html',
  styleUrls: ['./singin.page.scss'],
})
export class SinginPage implements OnInit {
  router: any;
  datos = { titulo: "Register", menu: false, back: false }

goBack() {
throw new Error('Method not implemented.');
}
  public user: any;
	loginForm: FormGroup;
  avatar: any = 'assets/icon/edificios.png';

  constructor(
    private formBuilder: FormBuilder,
		private toastCtrl: ToastController,
		private navCtrl: NavController,
		public alertController: AlertController,
    private _userService: UsuarioService,
    private _router: Router
  ) {
    this.user = new usuario('', '', '', '', '', '', '',0);
  }

  ngOnInit() {
  }

  async registerUser(registerForm: any){
    console.log(this.user);

    if (registerForm.valid) {
      this._userService.register(this.user).subscribe(
        async (response) => {
          const alert = await this.alertController.create({
            header: 'Registro Exitoso',
            message: "Ahora puede logearse",
            buttons: ['Aceptar']
          });
          await alert.present();
          this._router.navigate(['/login']);
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
	async presentToast(text) {
		const toast = await this.toastCtrl.create({
			message: text,
			duration: 1000,
			position: 'top',
		});
		toast.present();
	}

	goToNextPage() {
		this.navCtrl.navigateForward('/menu/singin');
	  }

	async onClick() {
		var t = this.loginForm.value;

		if(this.loginForm.invalid) {
				const alert = await this.alertController.create({
					header: 'Datos incompletos',
					message: 'Faltan campos por rellenar.',
					buttons: ['Aceptar']
				});

				await alert.present();
				return;
		}

	}

  goToNextPage2() {
		this.navCtrl.navigateForward('/login');
	  }

}
