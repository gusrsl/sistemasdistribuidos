const User = require('../models/User');
const Retiro = require('../models/retiro');
const moment = require('moment');
// Crear un nuevo ingreso asociado al usuario actual
const createRetiro = async (req, res) => {
    try {
        const { monto, descripcion} = req.body;
        const userId = req.user.sub; // Obtener el ID del usuario autenticado
        const date=moment().format('YYYY-MM-DD');
        const _user = await User.findById(userId);
        if (_user.saldo>=monto) {
            // Crear el nuevo ingreso
            const retiro = await Retiro.create({
                monto,
                descripcion,
                fecha:date,
                usuario: userId
            });
            // Actualizar el balance del usuario restando
            const user = await User.findByIdAndUpdate(userId, { $inc: { saldo: -monto } }, { new: true });
            res.status(201).send({ success: true, data: { retiro, saldo: user.saldo } });
        }else{
            return res.status(404).json({ success: false, error: 'El monto del retiro debe ser menor o igual al saldo de la cuenta' });
        }
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};
// TODO: Obtener todos los ingresos del usuario actual
const getRetiros = async (req, res) => {
    try {
        const userId = req.user.sub; // TODO: Obtener el ID del usuario autenticado
        // TODO: Obtener todos los ingresos del usuario
        const retiros = await Retiro.find({ usuario: userId });
        res.status(200).send({ success: true, data: retiros });
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
const deleteRetiro = async (req, res) => {
    try {
        const retiroId = req.params.id;
        const userId = req.user.sub; // TODO: Obtener el ID del usuario autenticado

        //? Verificar si el ingreso pertenece al usuario actual y eliminarlo
        const retiro = await Retiro.findOneAndDelete({ _id: retiroId, usuario: userId });
        if (!retiro) {
            return res.status(404).json({ success: false, error: 'Retiro no encontrado' });
        }
        // TODO: Actualizar el balance del usuario
        const user = await User.findByIdAndUpdate(userId, { $inc: { saldo: retiro.monto } }, { new: true });
        res.status(200).json({ success: true, data: { retiro, saldo: user.saldo } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = {
    createRetiro,
    getRetiros,
    deleteRetiro
};