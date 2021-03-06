'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('tag', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v1mc()'),
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'tag',
    underscored: true,
    timestamps: false,
    schema: process.env.DATABASE_SCHEMA,
  });

  return Model;
};
