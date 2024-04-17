// routes/horarioRoutes.js
const express = require('express');
const router = express.Router();
const horarioController = require('../controllers/horarioController');

// Rutas para los horarios
router.get('/', horarioController.getAllHorarios);
router.post('/', horarioController.createHorario);

module.exports = router;
