const Paciente = require("../models/pacienteModel");

const getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

const createPaciente = async (req, res) => {
  try {
    const { nombre, documento, telefono, email } = req.body;
    
    const paciente = new Paciente({ nombre, documento, telefono, email });
    await paciente.save();

    res.status(201).json({
      estado: true,
      mensaje: "Paciente creado correctamente",
      datosPaciente: paciente
    });

  } catch (error) {
    res.status(500).json({ error: "Error al crear paciente", detalle: error.message });
  }
};

const updatePaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, documento, telefono, email } = req.body;

    const pacienteActualizado = await Paciente.findByIdAndUpdate(
      id,
      { nombre, documento, telefono, email },
      { new: true }
    );

    if (!pacienteActualizado) {
      return res.status(404).json({ 
        estado: false,
        mensaje: "Paciente no encontrado" 
      });
    }

    res.json({
      estado: true,
      mensaje: "Paciente actualizado correctamente",
      datosPaciente: pacienteActualizado
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar paciente", detalle: error.message });
  }
};

const getPacientesNombres = async (req, res) => {
  try {
    const pacientes = await Paciente.find().select('_id nombre');
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener lista de pacientes" });
  }
};

module.exports = { 
  getPacientes, 
  createPaciente, 
  updatePaciente, 
  getPacientesNombres 
};
