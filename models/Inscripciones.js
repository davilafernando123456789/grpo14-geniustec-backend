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
    allowNull: true,
  },
  Profesores_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Horario_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
});

module.exports = Inscripciones;
