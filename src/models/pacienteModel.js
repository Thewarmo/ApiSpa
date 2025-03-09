const mongoose = require("mongoose");

const PacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  documento: {type:String, required: true, unique: true},
  telefono: {type:String, required: true},
  email: { type: String, required: true, unique: true },
  patologias : {type:String, required: false}
});

module.exports = mongoose.model("Paciente", PacienteSchema);