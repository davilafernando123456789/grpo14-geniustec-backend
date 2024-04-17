// controllers/profesoresController.js
const Profesores = require('../models/Profesor');

const sequelize = require('../config/db');
const Sequelize = sequelize.Sequelize;

const Alumno = require('../models/Alumno');
const Apoderado = require('../models/Apoderado');
const Direccion = require('../models/Direccion');
const Educativos = require('../models/AntecedentesEducativo');


exports.createProfesor= async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { email, usuario, password, nombre, apellido, dni, genero, telefono, fecha_nac, especialidad, descripcion,  foto,  Roles_id, direccion, educativos } = req.body;

    // Crear la dirección
    const newDireccion = await Direccion.create(direccion, { transaction: t });

    // Crear el apoderado
    const newAntecedenteEducativo = await Educativos.create(educativos, { transaction: t });

    // Crear el profesor
    const newProfesor = await Profesores.create({
      email,
      usuario,
      password,
      nombre,
      apellido,
      genero,
      dni,
      especialidad,
      descripcion,
      foto,
      telefono,
      fecha_nac,
      Roles_id,
      Direccion_id: newDireccion.id,
      Antecedentes_educativos_id: newAntecedenteEducativo.id
    }, { transaction: t });

    // Commit la transacción
    await t.commit();

    res.json(newProfesor);
  } catch (error) {
    // Rollback si hay un error
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al crear el profesor' });
  }
};

///Método para obtener un profesor por su ID
exports.getProfesorById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el profesor por su ID en la base de datos
    const profesor = await Profesores.findByPk(id);

    if (!profesor) {
      return res.status(404).json({ message: 'profesor no encontrado' });
    }

    // Enviar el profesor encontrado como respuesta
    res.json(profesor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al buscar el profesor' });
  }
};
exports.getAllProfesores = async (req, res) => {
  try {
    // Buscar todos los profesores en la base de datos con datos de antecedentes educativos
    const profesores = await Profesores.findAll({
      include: [
        {
          model: Educativos,
          as: 'Educativos', // Corregir el alias aquí para que coincida con el definido en el modelo Profesores
        }
      ]
    });

    // Enviar la lista de profesores como respuesta
    res.json(profesores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al buscar los profesores' });
  }
};
exports.getAllProfesoresName = async (req, res) => {
  try {
    const { especialidad } = req.query;
    let whereCondition = {};

    if (especialidad) {
      whereCondition = {
        especialidad: {
          [Sequelize.Op.like]: `%${especialidad}%`
        }
      };
    }

    const profesores = await Profesores.findAll({
      where: whereCondition,
      include: [
        {
          model: Educativos,
          as: 'Educativos'
        }
      ]
    });

    res.json(profesores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al buscar los profesores' });
  }
};




// // controllers/profesoresController.js
// const Profesores = require('../models/Profesor');

// const sequelize = require('../config/db');

// const Alumno = require('../models/Alumno');
// const Apoderado = require('../models/Apoderado');
// const Direccion = require('../models/Direccion');
// const Educativos = require('../models/AntecedentesEducativo');


// exports.createProfesor= async (req, res) => {
//   const t = await sequelize.transaction();
//   try {
//     const { email, usuario, password, nombre, apellido, dni, genero, telefono, fecha_nac, especialidad, descripcion,  foto,  Roles_id, direccion, educativos } = req.body;

//     // Crear la dirección
//     const newDireccion = await Direccion.create(direccion, { transaction: t });

//     // Crear el apoderado
//     const newAntecedenteEducativo = await Educativos.create(educativos, { transaction: t });

//     // Crear el profesor
//     const newProfesor = await Profesores.create({
//       email,
//       usuario,
//       password,
//       nombre,
//       apellido,
//       genero,
//       dni,
//       especialidad,
//       descripcion,
//       foto,
//       telefono,
//       fecha_nac,
//       Roles_id,
//       Direccion_id: newDireccion.id,
//       Antecedentes_educativos_id: newAntecedenteEducativo.id
//     }, { transaction: t });

//     // Commit la transacción
//     await t.commit();

//     res.json(newProfesor);
//   } catch (error) {
//     // Rollback si hay un error
//     await t.rollback();
//     console.error(error);
//     res.status(500).json({ message: 'Hubo un error al crear el profesor' });
//   }
// };

// ///Método para obtener un profesor por su ID
// exports.getProfesorById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Buscar el profesor por su ID en la base de datos
//     const profesor = await Alumno.findByPk(id);

//     if (!profesor) {
//       return res.status(404).json({ message: 'profesor no encontrado' });
//     }

//     // Enviar el profesor encontrado como respuesta
//     res.json(profesor);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Hubo un error al buscar el profesor' });
//   }
// };
// exports.getAllProfesores = async (req, res) => {
//   try {
//     // Buscar todos los profesores en la base de datos con datos de antecedentes educativos
//     const profesores = await Profesores.findAll({
//       include: [
//         {
//           model: Educativos,
//           as: 'Educativos', // Corregir el alias aquí para que coincida con el definido en el modelo Profesores
//         }
//       ]
//     });

//     // Enviar la lista de profesores como respuesta
//     res.json(profesores);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Hubo un error al buscar los profesores' });
//   }
// };













// // Obtener todos los profesores
// exports.getAllProfesores = async (req, res) => {
//   try {
//     const profesores = await Profesores.findAll();
//     res.json(profesores);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener profesores' });
//   }
// };

// // Obtener un profesor por ID
// exports.getProfesorById = async (req, res) => {
//   const profesorId = req.params.id;

//   try {
//     const profesor = await Profesores.findByPk(profesorId);
//     if (profesor) {
//       res.json(profesor);
//     } else {
//       res.status(404).json({ error: 'Profesor no encontrado' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener profesor' });
//   }
// };

// // Supongamos que el modelo del profesor tiene un campo Roles_id

// // Crear un nuevo profesor
// exports.createProfesor = async (req, res) => {
//   try {
//     // Agrega el valor 2 al campo Roles_id antes de crear el profesor
//     req.body.Roles_id = 2;

//     const nuevoProfesor = await Profesores.create(req.body);
//     res.status(201).json(nuevoProfesor);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al crear profesor' });
//   }
// };

// // Resto del código...


// // Actualizar un profesor por ID
// exports.updateProfesorById = async (req, res) => {
//   const profesorId = req.params.id;

//   try {
//     const [updatedRows] = await Profesores.update(req.body, {
//       where: { id: profesorId },
//     });

//     if (updatedRows > 0) {
//       res.json({ message: 'Profesor actualizado exitosamente' });
//     } else {
//       res.status(404).json({ error: 'Profesor no encontrado' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al actualizar profesor' });
//   }
// };

// // Eliminar un profesor por ID
// exports.deleteProfesorById = async (req, res) => {
//   const profesorId = req.params.id;

//   try {
//     const deletedRowCount = await Profesores.destroy({
//       where: { id: profesorId },
//     });

//     if (deletedRowCount > 0) {
//       res.json({ message: 'Profesor eliminado exitosamente' });
//     } else {
//       res.status(404).json({ error: 'Profesor no encontrado' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al eliminar profesor' });
//   }
// };
