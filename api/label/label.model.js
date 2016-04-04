export default function model(sequelize, DataTypes) {
  const Label = sequelize.define('Label',
    {
      label_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      label_defunct_date: {
        type: DataTypes.DATEONLY, // sequelize automatically converts to UTC
        allowNull: true,
      },
      label_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
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
      tableName: 'label',
    }
  );
  return Label;
}
