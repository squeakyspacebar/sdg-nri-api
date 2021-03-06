'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('resource', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v1mc()'),
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
    },
    organization: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
    },
    date_published: {
      type: DataTypes.DATE,
    },
    image_url: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    assigned_tags: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      field: 'tags',
    },
    publish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    notes: {
      type: DataTypes.TEXT,
    }
  }, {
    tableName: 'resource',
    underscored: true,
    timestamps: true,
    schema: process.env.DATABASE_SCHEMA,
    indexes: [
      {
        fields: ['tsv'],
        using: 'gin',
      },
    ],
  });

  Model.associate = (models) => {
    Model.belongsToMany(models.topic, {
      through: {
        model: 'resource_topics',
        unique: true,
      },
      foreignKey: 'resource_id',
      otherKey: 'topic_id',
      constraints: true,
      cascade: true,
    });
    Model.belongsToMany(models.content_type, {
      through: {
        model: 'resource_content_types',
        unique: true,
      },
      foreignKey: 'resource_id',
      otherKey: 'content_type_id',
      constraints: true,
      cascade: true,
    });
    Model.belongsToMany(models.language, {
      through: {
        model: 'resource_languages',
        unique: true,
      },
      foreignKey: 'resource_id',
      otherKey: 'language_id',
      constraints: true,
      cascade: true,
    });
    Model.belongsToMany(models.country, {
      through: {
        model: 'resource_countries',
        unique: true,
      },
      foreignKey: 'resource_id',
      otherKey: 'country_id',
      constraints: true,
      cascade: true,
    });
    Model.belongsToMany(models.tag, {
      through: {
        model: 'resource_tags',
        unique: true,
      },
      foreignKey: 'resource_id',
      otherKey: 'tag_id',
      constraints: true,
      cascade: true,
    });
  };

  return Model;
};
