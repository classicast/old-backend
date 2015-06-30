'use strict';

module.exports = function(sequelize, DataTypes) {
  var Label = sequelize.define('label',
    {
      label_name: DataTypes.STRING,
      label_defunct_date: DataTypes.DATE, //sequelize automatically converts to UTC
      label_country: DataTypes.STRING
    },
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,

      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,

      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,

      // define the table's name
      tableName: 'label'
    }
  );
  return Label;
};
