import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({ selector: 'app-menu', templateUrl: './menu.page.html', styleUrls: ['./menu.page.scss'], })

export class MenuPage implements OnInit {


	paginas = [
		{
			id: 1,
            titulo: 'Inicio',
            icon: 'home',
            url: '/menu/home'
		},
		{
			id: 2,
            titulo: 'Ingreso de Efectivo',
            icon: 'accessibility',
            url: '/menu/servicios'
		},
		{
			id: 3,
            titulo: 'Transferencias',
            icon: 'book',
            url: '/menu/reservas'
		},
		{
			id: 4,
            titulo: 'Retiro de efectivo',
            icon: 'ear',
            url: '/menu/sugerencias'
		},
	];
	indiceSeleccionado: any = 0;

	constructor(private menu: MenuController, private navCtrl: NavController) { }

	ngOnInit() {
	}

	cambiarIndiceSeleccionado(i){
		this.indiceSeleccionado = i;
	  }


	closeMenu() {
		this.menu.close();
	}



	logout() {
		localStorage.removeItem('token');
    localStorage.removeItem('identity');
		this.navCtrl.navigateRoot('/login');
	}
}
