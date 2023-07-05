import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-servicio-data',
  templateUrl: './view-servicio-data.component.html',
  styleUrls: ['./view-servicio-data.component.scss'],
})
export class ViewServicioDataComponent implements OnInit {
  @Input() servicios: any;

  constructor() { }

  ngOnInit() {}

}
