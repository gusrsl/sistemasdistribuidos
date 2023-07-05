import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {
	constructor(private toastCtrl: ToastController, private router: Router) { }

	async canActivate() {
		const isLogin = await localStorage.getItem("perfil");
		if (isLogin) { return true; }
		else {
			this.router.navigateByUrl('/login');
			this.presentToast("Iniciar sesión para acceder");
		}
	}

	async presentToast(msg) {
		const toast = await this.toastCtrl.create({
			message: msg,
			duration: 1000,
			position: 'top'
		});
		toast.present();
	}
}
