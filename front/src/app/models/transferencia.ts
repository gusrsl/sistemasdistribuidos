/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
export class trasnferencia{
  static getToken: boolean;
  constructor(
          public monto:number,
          public descripcion:string,
          public id_usuario:string
      ){
  }
}
