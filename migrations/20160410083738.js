'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('cd', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      },
      cd_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cd_release_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      cd_country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cd_total_discs: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cd_total_tracks: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cd_cover_image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cd_booklet_scan: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cd_booklet_text: {
        type: Sequelize.STRING,
        allowNull: true
      },
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('cd');
  }
};
