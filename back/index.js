const express = require('express'); //TRAEMOS EXPRESS
const cors = require('cors');
const conexionDB = require('./config/db'); // IMPORTAMOS LA CONFIGURACION DE LA BD
const bodyParser = require('body-parser');

//INICIALIZACION DE EXPRESS
const app = express();

//ROUTES
const user_routes = require('./routes/user');
const depostio_routes = require('./routes/deposito');
const transferencia_routes = require('./routes/transferencia');
const retiro_routes = require('./routes/retiro');
//CONEXION A BD
conexionDB();

//UTILIZAMOS CORS PARA ACCEDER A LOS RECURSOS DEL SERVIDOR 
app.use(cors());

// MIDDLEWARE COKIEE
const cookie = require('cookie-parser');
app.use(cookie());

//CONFIG SERVER
app.use(bodyParser.json()); //ASI USAMOS ARCHIVOS JSON
app.use(bodyParser.urlencoded({ extended: true })); //NOS SERVIRA EN LOS FORMULARIO
app.use((req, res, next) => {
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

//USO DE RUTAS DEFINIENDO LA RUTA PADRE
app.use('/user', user_routes);
app.use('/deposito',depostio_routes)
app.use('/transferencia',transferencia_routes)
app.use('/retiro',retiro_routes)

//INDICAMOS QUE PUERTO USAREMOS
const port = process.env.PORT || 3000;

//CONFIGURAMOS POR DONDE SE ESCUCHARA EL SERVIDOR
app.listen(port, function() {
    console.clear();
    console.log("\nServidor corriendo en el puerto: " + port);
    console.log("\nCONEXION CORRECTA");
    console.log("*******************************************");
});