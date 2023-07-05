/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urls } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetiroService {

  constructor(private _http: HttpClient) { }
  register(retiro: any,token:any): Observable<any>{
    const headers=new HttpHeaders({'Content-Type':'application/json','token':token});
    return this._http.post(urls.createRetiro,retiro,{headers:headers});
  }
}
