// File: src/models/LlmLog.js
module.exports = (sequelize, DataTypes) => {
  const LlmLog = sequelize.define(
    "LlmLog",
    {
      prompt: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      response: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {}
  );

  return LlmLog;
};
