const mongoose = require("mongoose");
require("dotenv").config({ path: '.env' });

//CONFIGURAMOS LA CONEXION A LA BASE DE DATOS
const conexionDB = async() => {

    try {

        //UTILIZAMOS MONGOOSE PARA PODER CONECTARNOS A LA BD A TRAVES DE LA VARIABLE DE ENTORNO
        await mongoose.connect(process.env.DB_MONGO)
        console.log("\nBase de datos conectada correctamente!");
        console.log("*******************************************");

    } catch (error) {
        console.log(error);
        process.exit(1); //SI HAY UN ERROR SE DETIENE LA APP
    }

}

module.exports = conexionDB;