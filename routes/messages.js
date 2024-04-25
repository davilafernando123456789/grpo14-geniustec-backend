const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');

router.post('/', (req, res) => {
  messagesController.crearMensaje(req, res);
});

router.get('/', (req, res) => {
  messagesController.getMessages(req, res);
});
router.get('/destinatario/:destinatario_id', (req, res) => {
  messagesController.getMensajesPorDestinatario(req, res);
});


module.exports = router;
