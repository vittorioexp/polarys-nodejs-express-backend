// File: src/models/Simulation.js
module.exports = (sequelize, DataTypes) => {
  const Simulation = sequelize.define(
    "Simulation",
    {
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      proposals: {
        type: DataTypes.JSONB, // Array di proposte
        allowNull: false,
      },
      constraints: {
        type: DataTypes.JSONB, // Array di vincoli
        allowNull: false,
      },
      result: {
        type: DataTypes.JSONB, // Risultato della simulazione
        allowNull: true,
      },
    },
    {}
  );

  Simulation.associate = (models) => {
    // Associa la simulazione agli agenti
    Simulation.belongsToMany(models.Agent, { through: "SimulationAgent" });
  };

  return Simulation;
};
