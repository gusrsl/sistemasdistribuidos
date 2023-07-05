/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urls } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url: any;
  public usuario: any;
  public token: any;
  public identity: any;
  constructor(private _http: HttpClient)
  {
  }
  login(usuario: any,getToken=false): Observable<any>{
    const json=usuario;
    if (getToken!=false) {
      usuario.getToken=true;
    }
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(urls.login,json,{headers:headers});
  }
  register(usuario: any): Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(urls.register,usuario,{headers:headers});
  }
  getIdentity():Observable<any>{
    const identity=JSON.parse(localStorage.getItem('identity')||'[]');
    if (identity) {
      this.identity=identity
    }else{
      this.identity=null;
    }
    return this.identity;
  }
  setIdentity(id:any):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(urls.verUsu+id,{headers:headers})
  }
  getToken():Observable<any>{
    const token=localStorage.getItem('token');
    if (token) {
      this.token=token
    }else{
      this.token=null;
    }
    return this.token;
  }
  moviminetos(token:any):Observable<any>{
    const headers=new HttpHeaders({'Content-Type':'application/json','token':token});
    return this._http.get(urls.movimientos,{headers:headers})
  }
  getUsuarios():Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(urls.listarUsu,{headers:headers})
  }
}
