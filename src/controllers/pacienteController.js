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

module.exports = { getPacientes, createPaciente };
