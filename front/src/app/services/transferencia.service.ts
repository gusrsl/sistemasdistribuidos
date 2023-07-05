/* eslint-disable no-underscore-dangle */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  public url: any;
  public transferencia: any;
  constructor(private _http: HttpClient) { }
  register(trasnferecia: any,token:any): Observable<any>{
    const headers=new HttpHeaders({'Content-Type':'application/json','token':token});
    return this._http.post(urls.createTrasnferecia,trasnferecia,{headers:headers});
  }
}
