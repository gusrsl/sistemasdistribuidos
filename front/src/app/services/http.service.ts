/* eslint-disable eqeqeq */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController, LoadingController } from '@ionic/angular';
import { map, timeout, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpService {

	constructor(public loadingController: LoadingController, private http: HttpClient,) { }

	async post(url, load, postdata, mensaje) {
		// let msj;
		// postdata.mesaje ? msj = postdata.mesaje : msj = 'Cargando...';
		const loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: mensaje,
			mode: 'ios'
		});
		return new Promise(async (resolve, reject) => {
			navigator.onLine === true ? null : reject({ message: 'Error Algo salio Mal.\nSin Conexión', '': '' });
			load == false ? null : await loading.present();
			this.http.post(url, postdata, {
				headers: { enctype: 'multipart/form-data', Accept: 'plain/text', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS,PATCH', 'Access-Control-Allow-Headers': '*' }
			})
				.pipe(timeout(20000))
				.subscribe((res: any) => {
					load == false ? null : loading.dismiss();
					resolve(res);
				}, async (error) => {
					load == false ? null : loading.dismiss();
					reject({ message: typeof (error.error) == 'string' ? this.mesajew(error.error) : this.mesaje(error.error), error });
				});
		});
	}

	//FIXME: OBTENER DATOS
	async get(url, load) {
		const loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: '¡Cargando datos!',
			mode: 'ios',
		});
		return new Promise(async (resolve, reject) => {
			navigator.onLine === true ? null : reject({ message: 'Error Algo salio Mal.\nSin Conexión', '': '' });
			load == false ? null : await loading.present();
			this.http.get(url, {
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS,PATCH', 'Access-Control-Allow-Headers': '*' }
			})
				.pipe(timeout(20000))
				.subscribe((res: any) => {
					resolve(res);
					load == false ? null : loading.dismiss();
				}, async (error) => {
					load == false ? null : loading.dismiss();
					reject({ message: typeof (error.error) == 'string' ? this.mesajew(error.error) : this.mesaje(error.error), error });
				});
		});
	}

	async deleteId(url, load) {
		const loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Eliminando...',
			mode: 'ios',
		});
		return new Promise(async (resolve, reject) => {
			navigator.onLine === true ? null : reject({ message: 'Error Algo salio Mal.\nSin Conexión', '': '' });
			load == false ? null : await loading.present();
			this.http.delete(url, {
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true', 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS,PATCH', 'Access-Control-Allow-Headers': '*' }
			})
				.pipe(timeout(20000))
				.subscribe((res: any) => {
					resolve(res);
					load == false ? null : loading.dismiss();
				}, async (error) => {
					load == false ? null : loading.dismiss();
					reject({ message: typeof (error.error) == 'string' ? this.mesajew(error.error) : this.mesaje(error.error), error });
				});
		});
	}

	mesaje(data) {
		let resp = 'Error';
		Object.keys(data).forEach(k => { typeof (data[k]) == 'string' ? resp = data[k] : resp = data[k][0]; });
		return resp;
	}

	mesajew(data) {
		if (data.charAt(0) == '<') {
			const htmlObject = document.createElement('div');
			htmlObject.innerHTML = data;
			const mesaje = htmlObject.getElementsByClassName('break-long-words exception-message');
			if (mesaje[0]) { var envio = mesaje[0].innerHTML; }
			else { var envio = 'Error'; }
			return envio;
		} else { return data; }
	}


}
