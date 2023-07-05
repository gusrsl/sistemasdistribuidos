import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NotificacionesPage } from 'src/app/notificaciones/notificaciones.page';


@Component({ selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.scss'], })

export class HeaderComponent implements OnInit {
  @Input() datos: any = '';
  avatar: any = 'https://i.postimg.cc/Hn64KF7W/Logofinan.png';

  constructor(
    private navCtrl: NavController,
    private location: Location,
    public modalController: ModalController,
  ) { }

  home() {
    this.navCtrl.navigateForward('/menu/home');
  }

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


  ngOnInit() { }

}
