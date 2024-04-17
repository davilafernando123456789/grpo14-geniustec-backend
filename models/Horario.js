// // models/horario.js
// const { DataTypes, Sequelize } = require('sequelize');
// const sequelize = require('../config/db');

// const Horario = sequelize.define('Horario', {
//   titulo: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   inicio: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   fin: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   Profesores_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW, // Puedes ajustar el valor predeterminado según tus necesidades
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//   },
// }, {
//   timestamps: true, // Esta opción activa la gestión automática de timestamps
// });

// module.exports = Horario;
// models/horario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Horario = sequelize.define('Horario', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dia_semana: {
    type: DataTypes.ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'),
    allowNull: false,
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Profesores_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Horario;
