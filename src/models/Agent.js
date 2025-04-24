// File: src/models/Agent.js
module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define(
    "Agent",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  Agent.associate = (models) => {
    // Associa l'agente alle simulazioni
    Agent.belongsToMany(models.Simulation, { through: "SimulationAgent" });
  };

  return Agent;
};
