// File: src/models/Module.js
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    "Module",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  Module.associate = (models) => {
    // Associa il modulo alle simulazioni
    Module.belongsToMany(models.Simulation, { through: "SimulationModule" });
  };

  return Module;
};
