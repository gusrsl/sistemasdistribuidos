const mongoose = require('mongoose');
const moment = require('moment');
const timestamp = require('mongoose-timestamp');
const transferenciaSchema = new mongoose.Schema({
  monto: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    default:""
  },
  fecha: {
    type: String,
    default: moment().format('YYYY-MM-DD'),
    set: function (value) {
      return moment(value).format('YYYY-MM-DD');
    },
    validate: {
      validator: function (value) {
        return moment(value, 'YYYY-MM-DD', true).isValid();
      },
      message: 'Formato de fecha inválido. Utilice el formato YYYY-MM-DD.'
    }
  },
  de_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  para_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});
transferenciaSchema.plugin(timestamp)

const Transferencia = mongoose.model('Transferencia', transferenciaSchema);

module.exports = Transferencia;
