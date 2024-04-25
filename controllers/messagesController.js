const Mensaje = require('../models/Messages');

let clients = [];

exports.setClients = (client) => {
  clients.push(client);
};

exports.crearMensaje = async (req, res) => {
  try {
    const { contenido, remite_id, destinatario_id } = req.body;
    const mensaje = await Mensaje.create({ contenido, remite_id, destinatario_id });

    // Emitir el nuevo mensaje a todos los clientes conectados a través de WebSocket
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(mensaje));
      }
    });

    res.status(201).json(mensaje);
  } catch (error) {
    console.error('Error al crear el mensaje:', error);
    res.status(500).json({ error: 'No se pudo crear el mensaje.' });
  }
};

exports.getMessages = async (ws) => {
  try {
    const mensajes = await Mensaje.findAll();
    ws.send(JSON.stringify({ event: 'messages', data: mensajes }));
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
  }
};

exports.getMensajesPorDestinatario = async (req, res) => {
  try {
    const { destinatario_id } = req.params; // Se asume que el destinatario_id está en los parámetros de la solicitud
    const mensajes = await Mensaje.findAll({ where: { destinatario_id } });
    res.status(200).json(mensajes);
  } catch (error) {
    console.error('Error al obtener los mensajes por destinatario:', error);
    res.status(500).json({ error: 'No se pudieron obtener los mensajes.' });
  }
};


