'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecipeManagment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RecipeManagment.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    instructions: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RecipeManagment',
    tableName: 'recipes',
    underscored: true
  });
  return RecipeManagment;
};