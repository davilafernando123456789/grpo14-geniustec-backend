// routes/horarioRoutes.js
const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');

// Rutas para los horarios
router.get('/', horarioController.getAllHorarios);
router.post('/', horarioController.createHorario);
router.get('/profesor/:idProfesor', horarioController.getHorariosByProfesorId); 
router.get('/alumno/:idAlumno', horarioController.getHorariosByAlumnoId);
router.get('/:horarioId', horarioController.getHorarioById);

router.get('/filtrar/ids', horarioController.getHorariosByIds);

module.exports = router;
