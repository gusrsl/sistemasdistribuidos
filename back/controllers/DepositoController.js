const User = require('../models/User');
const Deposito = require('../models/deposito');
const moment = require('moment');
// Crear un nuevo ingreso asociado al usuario actual
const createDeposito = async (req, res) => {
    try {
        const { monto, descripcion} = req.body;
        const userId = req.user.sub; // Obtener el ID del usuario autenticado
        const date=moment().format('YYYY-MM-DD');
        // Crear el nuevo ingreso
        const deposito = await Deposito.create({
            monto,
            descripcion,
            fecha:date,
            usuario: userId
        });
        // Actualizar el balance del usuario
        const user = await User.findByIdAndUpdate(userId, { $inc: { saldo: monto } }, { new: true });
        res.status(201).send({ success: true, data: { deposito, saldo: user.saldo } });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};
// TODO: Obtener todos los ingresos del usuario actual
const getDepositos = async (req, res) => {
    try {
        const userId = req.user.sub; // TODO: Obtener el ID del usuario autenticado
        // TODO: Obtener todos los ingresos del usuario
        const depositos = await Deposito.find({ usuario: userId });
        res.status(200).send({ success: true, data: depositos });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};
// TODO: Actualizar un ingreso específico por ID
// const updateIncome = async (req, res) => {
//     try {
//         const incomeId = req.params.id;
//         const userId = req.user.sub; // TODO: Obtener el ID del usuario autenticado

//         //? Verificar si el ingreso pertenece al usuario actual
//         const existingIncome = await Income.findOne({ _id: incomeId, user: userId });

//         if (!existingIncome) {
//             return res.status(404).send({ success: false, error: 'Ingreso no encontrado' });
//         }

//         const previousAmount = existingIncome.amount; //* Monto anterior del ingreso

//         // TODO: Actualizar solo los campos proporcionados por el usuario
//         if (req.body.amount) {
//             existingIncome.amount = req.body.amount;

//             //* Actualizar el balance del usuario
//             const user = await User.findByIdAndUpdate(userId, { $inc: { balance: req.body.amount - previousAmount } }, { new: true });
//             //* user.balance ahora contiene el balance actualizado del usuario
//         }

//         if (req.body.description) {
//             existingIncome.description = req.body.description;
//         }
//         if (req.body.date) {
//             //  TODO: Validar el formato de la fecha
//             if (!moment(req.body.date, 'YYYY-MM-DD', true).isValid()) {
//                 return res.status(400).send({ error: 'Formato de fecha inválido. Utilice el formato YYYY-MM-DD.' });
//             }
//             existingIncome.date = req.body.date;
//         }

//         //* Guardar el ingreso actualizado
//         const updatedIncome = await existingIncome.save();

//         res.status(200).send({ success: true, data: updatedIncome });
//     } catch (error) {
//         res.status(500).send({ success: false, error: error.message });
//     }
// };

// TODO: Eliminar un ingreso específico
const deleteDeposito = async (req, res) => {
    try {
        const depositoId = req.params.id;
        const userId = req.user.sub; // TODO: Obtener el ID del usuario autenticado
        const _user = await User.findById(userId);
        const _deposito=await Deposito.findById(depositoId);
        if (_user.saldo>=_deposito.monto) {
             //? Verificar si el ingreso pertenece al usuario actual y eliminarlo
            const deposito = await Deposito.findOneAndDelete({ _id: depositoId, usuario: userId });
            if (!deposito) {
                return res.status(404).json({ success: false, error: 'Deposito no encontrado' });
            }
            // TODO: Actualizar el balance del usuario
            const user = await User.findByIdAndUpdate(userId, { $inc: { saldo: -deposito.monto } }, { new: true });
            res.status(200).json({ success: true, data: { deposito, saldo: user.saldo } });
        }else{
            return res.status(404).json({ success: false, error: 'El monto del deposito debe ser menor o igual al saldo de la cuenta' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = {
    createDeposito,
    getDepositos,
    deleteDeposito
};