const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Inscripciones = sequelize.define('Inscripciones', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Alumnos_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Profesores_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Cursos_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Horario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
});

module.exports = Inscripciones;
