/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class DepositoService {
  public url: any;
  public deposito: any;

  public identity: any;
  constructor(private _http: HttpClient) {

  }
  register(deposito: any,token:any): Observable<any>{
    const headers=new HttpHeaders({'Content-Type':'application/json','token':token});
    return this._http.post(urls.createDeposito,deposito,{headers:headers});
  }
}
