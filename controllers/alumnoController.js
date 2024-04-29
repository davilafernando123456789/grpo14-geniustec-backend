// // controllers/alumnosController.js
// const Alumnos = require('../models/Alumno');
// const Apoderado = require('../models/Apoderado');
const sequelize = require('../config/db');

const Alumno = require('../models/Alumno');
const Apoderado = require('../models/Apoderado');
const Direccion = require('../models/Direccion');


exports.createAlumno = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { email, usuario, password, nombre, apellido, genero, telefono, fecha_nac, Roles_id, direccion, apoderado } = req.body;

    // Crear la dirección
    const newDireccion = await Direccion.create(direccion, { transaction: t });

    // Asignar la dirección al apoderado
    apoderado.Direccion_id = newDireccion.id;

    // Crear el apoderado
    const newApoderado = await Apoderado.create(apoderado, { transaction: t });

    // Crear el alumno
    const newAlumno = await Alumno.create({
      email,
      usuario,
      password,
      nombre,
      apellido,
      genero,
      telefono,
      fecha_nac,
      Roles_id,
      Apoderado_id: newApoderado.id
    }, { transaction: t });

    // Commit la transacción
    await t.commit();

    res.json(newAlumno);
  } catch (error) {
    // Rollback si hay un error
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al crear el alumno' });
  }
};

///Método para obtener un alumno por su ID
exports.getAlumnoById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el alumno por su ID en la base de datos
    const alumno = await Alumno.findByPk(id);

    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    // Enviar el alumno encontrado como respuesta
    res.json(alumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al buscar el alumno' });
  }
};
// Método para obtener todos los alumnos con datos de apoderado y dirección
// Método para obtener todos los alumnos con datos de apoderado y dirección
exports.getAllAlumnos = async (req, res) => {
  try {
    // Buscar todos los alumnos en la base de datos con datos de apoderado y dirección
    const alumnos = await Alumno.findAll({
      include: [
        {
          model: Apoderado,
          as: 'apoderado', // Alias para la asociación con Apoderado
        }
      ]
    });

    // Enviar la lista de alumnos como respuesta
    res.json(alumnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al buscar los alumnos' });
  }
};
// Método para actualizar un alumno por su ID
exports.updateAlumnoById = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { email, usuario, password, nombre, apellido, genero, telefono, fecha_nac, Roles_id, direccion, apoderado } = req.body;

    // Buscar el alumno por su ID en la base de datos
    const alumno = await Alumno.findByPk(id, { include: [{ model: Apoderado, as: 'apoderado' }] });

    if (!alumno) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    // Actualizar los datos del alumno
    await alumno.update({
      email,
      usuario,
      password,
      nombre,
      apellido,
      genero,
      telefono,
      fecha_nac,
      Roles_id,
    }, { transaction: t });

    // Actualizar los datos de la dirección del apoderado
    await Direccion.update(direccion, { where: { id: alumno.apoderado.Direccion_id } }, { transaction: t });

    // Actualizar los datos del apoderado
    await Apoderado.update(apoderado, { where: { id: alumno.Apoderado_id } }, { transaction: t });

    // Commit la transacción
    await t.commit();

    res.json({ message: 'Alumno actualizado correctamente' });
  } catch (error) {
    // Rollback si hay un error
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al actualizar el alumno' });
  }
};


// Obtener todos los alumnos
// exports.getAllAlumnos = async (req, res) => {
//   try {
//     const alumnos = await Alumnos.findAll();
//     res.json(alumnos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener alumnos' });
//   }
// };

// // Obtener un alumno por ID
// exports.getAlumnoById = async (req, res) => {
//   const alumnoId = req.params.id;

//   try {
//     const alumno = await Alumnos.findByPk(alumnoId);
//     if (alumno) {
//       res.json(alumno);
//     } else {
//       res.status(404).json({ error: 'Alumno no encontrado' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener alumno' });
//   }
// };

// // Crear un nuevo alumno

// // Crear un nuevo alumno
// exports.createAlumno = async (req, res) => {
//   try {
//     // Obtener el ID del último apoderado creado
//     const ultimoApoderado = await Apoderado.findOne({
//       order: [['id', 'DESC']],
//       attributes: ['id'],
//     });

//     // Verificar si se encontró el último apoderado
//     if (!ultimoApoderado) {
//       return res.status(400).json({ error: 'No hay apoderados registrados' });
//     }

//     // Configurar los valores antes de crear el alumno
//     const valoresAlumno = {
//       ...req.body,
//       Roles_id: 1, // Asignar el valor 1 al campo Roles_id
//       Apoderado_id: ultimoApoderado.id, // Asignar el ID del último apoderado al campo Apoderado_id
//     };

//     // Crear el nuevo alumno
//     const nuevoAlumno = await Alumnos.create(valoresAlumno);

//     // Enviar la respuesta
//     res.status(201).json(nuevoAlumno);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al crear alumno' });
//   }
// };

// // Actualizar un alumno por ID
// exports.updateAlumnoById = async (req, res) => {
//   const alumnoId = req.params.id;

//   try {
//     const [updatedRows] = await Alumnos.update(req.body, {
//       where: { id: alumnoId },
//     });

//     if (updatedRows > 0) {
//       res.json({ message: 'Alumno actualizado exitosamente' });
//     } else {
//       res.status(404).json({ error: 'Alumno no encontrado' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al actualizar alumno' });
//   }
// };

// // Eliminar un alumno por ID
// exports.deleteAlumnoById = async (req, res) => {
//   const alumnoId = req.params.id;

//   try {
//     const deletedRowCount = await Alumnos.destroy({
//       where: { id: alumnoId },
//     });

//     if (deletedRowCount > 0) {
//       res.json({ message: 'Alumno eliminado exitosamente' });
//     } else {
//       res.status(404).json({ error: 'Alumno no encontrado' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al eliminar alumno' });
//   }
// };
