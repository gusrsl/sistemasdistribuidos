import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-customer-data',
  templateUrl: './view-customer-data.component.html',
  styleUrls: ['./view-customer-data.component.scss'],
})
export class ViewCustomerDataComponent implements OnInit {
  @Input() client;
  
  constructor() { }

  ngOnInit() {}

}
