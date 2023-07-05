/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { usuario } from 'src/app/models/usuario';
@Component({ selector: 'app-login', templateUrl: './login.page.html', styleUrls: ['./login.page.scss'], })

export class LoginPage implements OnInit {
	router: any;
goBack() {
throw new Error('Method not implemented.');
}

datos: any;
avatar: any = 'assets/icon/edificios.png';
  public user: any;
  public token: any;
  public identity: any;
  public data_error: any;
  public cookieValue: any;
	constructor(

		private formBuilder: FormBuilder,
		private toastCtrl: ToastController,
		private navCtrl: NavController,
		public alertController: AlertController,
    private _userService: UsuarioService,
    private _router: Router
	) {
    // this.identity = this._userService.getIdentity();
    this.user = new usuario('', '', '', '', '', '', '',0);
		// this.crearFormulario();
	}

	ngOnInit() { }

	// crearFormulario() {
	// 	this.loginForm = this.formBuilder.group({
	// 		email: new FormControl("", Validators.compose([
	// 			Validators.required,
	// 		])),
	// 		password: new FormControl("", Validators.compose([
	// 			Validators.required,
	// 		]))
	// 	});
	// }

async loginUser(loginForm: any) {
		console.log(this.user);
    if (loginForm.valid) {
      console.log("valido");
      this._userService.login(this.user).subscribe(
        (response) => {
          this.token = response.jwt;
          localStorage.setItem('token', this.token);
          this._userService.login(this.user, true).subscribe((response) => {
            localStorage.setItem('identity', JSON.stringify(response.user));
            this._router.navigate(['menu/home']);
          });
          // this.presentToast('BIENVENIDO ' + credentials.user);
        },
        async (error) => {
          console.log(error);

          const alert = await this.alertController.create({
            header: 'Datos Erroneos',
            message: "Email o contraseño no es valida",
            buttons: ['Aceptar']
          });
          await alert.present();
          return;
        }
      );
    }else{
      console.log("invalidop");
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Faltan campos por rellenar.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
		// localStorage.setItem("perfil", credentials);
		// this.navCtrl.navigateForward('/menu/home', { replaceUrl: true });
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

	// async onClick() {
	// 	var t = this.loginForm.value;

	// 	if(this.loginForm.invalid) {
	// 			const alert = await this.alertController.create({
	// 				header: 'Datos incompletos',
	// 				message: 'Faltan campos por rellenar.',
	// 				buttons: ['Aceptar']
	// 			});
	// 			await alert.present();
	// 			return;
	// 	}

	// }
}
