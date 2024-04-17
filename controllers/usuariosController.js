const { Usuario } = require('../models/Usuario');
const Profesores = require('../models/Profesor');
const Alumnos = require('../models/Alumno');

const jwt = require('jsonwebtoken');

// Importar tus modelos y otras dependencias

exports.autenticarUsuario = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    // Buscar en la tabla Alumnos
    const alumno = await Alumnos.findOne({
      where: { usuario, password },
      attributes: { exclude: ['password'] }, // Excluir el campo de contraseña
    });

    if (alumno) {
      const token = jwt.sign({ id: alumno.id, rol: 1 }, 'secreto', { expiresIn: '1h' }); // Crear token para alumnos
      return res.status(200).json({ mensaje: 'OK', rol: 1, usuario: alumno, token });
    }

    // Buscar en la tabla Profesores
    const profesor = await Profesores.findOne({
      where: { usuario, password },
      attributes: { exclude: ['password'] }, // Excluir el campo de contraseña
    });

    if (profesor) {
      const token = jwt.sign({ id: profesor.id, rol: 2 }, 'secreto', { expiresIn: '1h' }); // Crear token para profesores
      return res.status(200).json({ mensaje: 'OK', rol: 2, usuario: profesor, token });
    }

    return res.status(401).json({ mensaje: 'Credenciales incorrectas' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al autenticar usuario' });
  }
};


// exports.autenticarUsuario = async (req, res) => {
//   const { usuario, password } = req.body;

//   try {
//     // Buscar en la tabla Alumnos
//     const alumno = await Alumnos.findOne({
//       where: { usuario, password },
//       attributes: { exclude: ['password'] }, // Excluir el campo de contraseña
//     });

//     if (alumno) {
//       return res.status(200).json({ mensaje: 'OK', rol: 1, usuario: alumno }); // Rol 1 para alumnos
//     }

//     // Buscar en la tabla Profesores
//     const profesor = await Profesores.findOne({
//       where: { usuario, password },
//       attributes: { exclude: ['password'] }, // Excluir el campo de contraseña
//     });

//     if (profesor) {
//       return res.status(200).json({ mensaje: 'OK', rol: 2, usuario: profesor }); // Rol 2 para profesores
//     }

//     return res.status(401).json({ mensaje: 'Credenciales incorrectas' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ mensaje: 'Error al autenticar usuario' });
//   }
// };

