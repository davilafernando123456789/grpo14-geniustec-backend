// controllers/horarioController.js
const Horario = require('../models/Horario');
const Profesor = require('../models/Profesor'); // Asegúrate de tener el modelo Profesor importado

// Obtener todos los horarios
const getAllHorarios = async (req, res) => {
  try {
    const horarios = await Horario.findAll();
    res.json(horarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los horarios.' });
  }
};


const createHorario = async (req, res) => {
    console.log(req.body);
  
    try {
      // Obtener el ProfesorId del último profesor creado
      const ultimoProfesor = await Profesor.findOne({
        order: [['createdAt', 'DESC']],
      });
  
      if (!ultimoProfesor) {
        throw new Error('No se encontró ningún profesor.');
      }
  
      const Profesores_id = ultimoProfesor.id;
  
      // Crear nuevos horarios para cada conjunto de datos
      const nuevosHorarios = await Promise.all(req.body.map(async (data) => {
        const { titulo, inicio, fin } = data;
        const nuevoHorario = await Horario.create({ titulo, inicio, fin, Profesores_id });
        return nuevoHorario;
      }));
  
      res.status(201).json(nuevosHorarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear los horarios.' });
    }
  };
  
  

module.exports = { getAllHorarios, createHorario };
