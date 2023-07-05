const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');
const Transferencia = require('../models/transferencia');
const Retiro = require('../models/retiro');
const Deposito = require('../models/deposito');
//REGISTRO DE USUARIOS
async function registrar(req, res) {
    const params = req.body; //Me manda el body del request
    const user = new User(); //Se instancia el modelo
    try {
        if (params.password) {
            //* Generar el hash de la contraseña
            const hash = await new Promise((resolve, reject) => {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            });

            if (hash) {
                // TODO: Asignar los valores al objeto de usuario
                user.password = hash;
                user.nombres = params.nombres;
                user.apellidos = params.apellidos;
                user.telefono = params.telefono;
                user.email = params.email;
                user.direccion = params.direccion;
                //? Verificar si el email ya está registrado
                const existingUser = await User.findOne({ email: params.email });
                if (existingUser) {
                    // Si el email ya está registrado, devolver un error
                    res.status(409).send({ error: 'El email ya está registrado' });
                } else {
                    // Guardar el nuevo usuario en la base de datos
                    const newUser = await user.save();
                    res.status(200).send({ user: newUser });
                }
            }
        } else {
            //? Si no se ingresó una contraseña, devolver un error
            res.status(403).send({ error: 'No se ingresó una contraseña' });
        }
    } catch (error) {
        res.status(500).send({ error: error })
    }
    
}
//LOGIN DE USUARIOS
async function login(req, res) {
    const data = req.body;
    //Buscamos el usuario por cedula
    const user=await User.findOne({ email: data.email })
    try {
        if (user) {
            bcrypt.compare(data.password,user.password, function(err, check) {
                // console.log(data.password, user_data.password);
                if (check) {
                    if (data.gettoken) {
                        const token = jwt.createToken(user);                            
                        res.status(200).send({
                            jwt: token,
                            user: user,
                        });
                        console.log(jwt);
                    } else {
                        res.status(200).send({
                            user: user,
                            message: 'no token',
                            jwt: jwt.createToken(user),
                        });
                    }

                } else {
                    res.status(403).send({ message: 'Las credenciales de ingreso no coinciden' })
                }
            });
        }else {
                res.status(403).send({ message: 'El email no existe' })
        }
    } catch (error) {
        res.status(500).send({ message: error })
    }
        
}
// ELIMINAR COOKIE
function deleteCookiee(req, res){
    const cookie = req.cookies
    res.clearCookie('id');
    res.clearCookie('jwt');
    res.send('Las Cookies fueron eliminadas')
}
//OBTENER USUARIOS
async function listarUsers(req, res) {
    try {
        const usuario=await User.find()
        if (usuario) {
            res.status(200).send({ user: usuario })
        } else {
            res.status(403).send({ message: 'No existe un usuario' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error });
    }
}
//OBTENER USUARIO
async function obtenerUser(req, res) {
    try {
        const id = req.params['id']
        const usuario=await User.findById({ _id:id})
        if (usuario) {
            res.status(200).send({ user: usuario })
        } else {
            res.status(403).send({ message: 'No existe un usuario' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error });
    }
}
//ACTUALIZAR USUARIO
async function actualizarUser(req, res) {
    const data = req.body;
    const id = req.params['id'];
    const existingUser = await User.findById(id);
    if (!existingUser) {
        return res.status(404).send({ message: 'No existe el usuario' });
    }else{
        if (data.password) {
        bcrypt.hash(data.password, null, null, async function(err, hash) {
            if (hash) {
                const updatedUser = await User.findByIdAndUpdate(id, {
                    nombres: data.nombres,
                    apellidos:data.apellidos,
                    password: hash,
                    email: data.email,
                    telefono: data.telefono,
                    direccion:data.direccion,
                    saldo: data.saldo
                }, { new: true })
                res.status(200).send({ user: updatedUser }); 
            }
        });
        } else {
            const updatedUser = await User.findByIdAndUpdate(id, {
                nombres: data.nombres,
                apellidos:data.apellidos,
                email: data.email,
                telefono: data.telefono,
                direccion:data.direccion,
                saldo: data.saldo
            }, { new: true });
            res.status(200).send({ user: updatedUser }); 
        }
    }
    

}
//ELIMINAR USUARIO
async function eliminarUser(req, res) {

    const id = req.params['id'];
    const existingUser = await User.findById(id);
    if (!existingUser) {
        return res.status(404).send({ message: 'No existe el usuario' });
    }else{
        const deleteUser = await User.findByIdAndRemove(id)
        res.status(200).send({ user: deleteUser });
    }
}
async function movimientos(req, res) {
    try {
      const userId = req.user.sub;
  
      const transferenciasPromise = Transferencia.find({
        $or: [{ de_usuario: userId }, { para_usuario: userId }],
      })
        .populate('de_usuario', 'nombres apellidos')
        .populate('para_usuario', 'nombres apellidos')
        .exec()
        .then((transferencias) => {
          return transferencias.map((transferencia) => {
            return {
              ...transferencia._doc,
              type: 'transferencia',
            };
          });
        });
  
      const depositosPromise = Deposito.find({ usuario: userId })
        .populate('usuario', 'nombres apellidos')
        .exec()
        .then((depositos) => {
          return depositos.map((deposito) => {
            return {
              ...deposito._doc,
              type: 'deposito',
            };
          });
        });
  
      const retirosPromise = Retiro.find({ usuario: userId })
        .populate('usuario', 'nombres apellidos')
        .exec()
        .then((retiros) => {
          return retiros.map((retiro) => {
            return {
              ...retiro._doc,
              type: 'retiro',
            };
          });
        });
  
      const [transferencias, depositos, retiros] = await Promise.all([
        transferenciasPromise,
        depositosPromise,
        retirosPromise,
      ]);
  
      // Combina los resultados en un solo array
      const data = [...transferencias, ...depositos, ...retiros];
  
      // Ordena el array por createdAt de forma descendente
      data.sort((a, b) => b.createdAt - a.createdAt);
  
      res.status(200).send({
        success: true,
        data: data,
      });
    } catch (error) {
      res.status(500).send({ success: false, error: error.message });
    }
  }
  
  
  
module.exports = {
    registrar,
    login,
    listarUsers,
    obtenerUser,
    obtenerUser,
    actualizarUser,
    eliminarUser,
    deleteCookiee,
    movimientos
}