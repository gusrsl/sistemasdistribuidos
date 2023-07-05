/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
export class usuario{
    static getToken: boolean;
    constructor(
            public _id:string,
            public nombres:string,
            public apellidos:string,
            public email:string,
            public password:string,
            public telefono:string,
            public direccion:string,
            public saldo:number
        ){


    }
}
