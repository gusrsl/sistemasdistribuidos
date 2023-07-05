import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

@Injectable({
  providedIn: 'root'
})

export class FooterComponent implements OnInit {
  @Input() datos: any = '';
  avatar: any = 'https://i.ibb.co/sPVsZDj/Only-Logo-Urb.png';

  constructor(
    ) {

   }



  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit() {}

}
