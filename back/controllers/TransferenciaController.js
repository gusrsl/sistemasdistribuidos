const User = require('../models/User');
const Transferencia = require('../models/transferencia');
const moment = require('moment');
// Crear un nuevo ingreso asociado al usuario actual
const createTransferencia = async (req, res) => {
    try {
        const { monto, descripcion, id_usuario} = req.body;
        const userId = req.user.sub; // Obtener el ID del usuario autenticado
        const date=moment().format('YYYY-MM-DD');
        //se consulta el usuario
        const user = await User.findById(userId);
        if (user.saldo>=monto) {
             // Crear el nuevo ingreso
            const transferencia = await Transferencia.create({
                monto,
                descripcion,
                fecha:date,
                de_usuario: userId,
                para_usuario:id_usuario
            });
            // Actualizar el balance del usuario restandole
            const user_to = await User.findByIdAndUpdate(userId, { $inc: { saldo: -monto } }, { new: true });
            // Actualizar el balance del otro usuario aumentandole
            const user_from = await User.findByIdAndUpdate(id_usuario, { $inc: { saldo: monto } }, { new: true });
            res.status(201).send({ success: true, data: { transferencia, saldo: user_to.saldo } });
        }else{
            return res.status(404).json({ success: false, error: 'El monto de la transferencia debe ser menor o igual al saldo de la cuenta' });
        }
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};
// TODO: Obtener todos los ingresos del usuario actual
const getTransferenciasRealizadas = async (req, res) => {
    try {
        const userId = req.user.sub;
        const transferencias = await Transferencia.find({ de_usuario: userId });
        res.status(200).send({ success: true, data: transferencias });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};
const getTransferenciasRecibidas = async (req, res) => {
    try {
        const userId = req.user.sub; // TODO: Obtener el ID del usuario autenticado
        // TODO: Obtener todos los ingresos del usuario
        const transferencias = await Transferencia.find({ para_usuario: userId });
        res.status(200).send({ success: true, data: transferencias });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
};
const getTransferencias = async (req, res) => {
    try {
        const userId = req.user.sub;
        const transferencias = await Transferencia.find({
            $or: [{ de_usuario: userId }, { para_usuario: userId }]
        });
        res.status(200).send({ success: true, data: transferencias });
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
const deleteTransferencia = async (req, res) => {//quizas no se use.
    try {
        const transferenciaId = req.params.id;
        const userId = req.user.sub; // TODO: Obtener el ID del usuario autenticado

        const _transferencia = await Transferencia.findById(transferenciaId);
        const _user = await User.findById(_transferencia.para_usuario);

        if (_user.saldo>=_transferencia.monto) {
        //? Verificar si el ingreso pertenece al usuario actual y eliminarlo
            const transferencia = await Transferencia.findOneAndDelete({ _id: transferenciaId, de_usuario: userId });
            if (!transferencia) {
                return res.status(404).json({ success: false, error: 'Transferencia no encontrada' });
            }
            // TODO: Actualizar el balance del usuario
            const user = await User.findByIdAndUpdate(userId, { $inc: { saldo: transferencia.monto } }, { new: true });
            const user2 = await User.findByIdAndUpdate(transferencia.para_usuario, { $inc: { saldo: -transferencia.monto } }, { new: true });
            res.status(200).json({ success: true, data: { transferencia, saldo: user.saldo } });
        }else{
            return res.status(404).json({ success: false, error: 'El monto de la transferencia debe ser menor o igual al saldo de la cuenta a la cual se le realizo la transferencia' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createTransferencia,
    getTransferenciasRealizadas,
    getTransferenciasRecibidas,
    getTransferencias,
    deleteTransferencia
};