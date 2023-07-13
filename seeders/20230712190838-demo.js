'use strict';

const { Sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize)  => {
    await queryInterface.bulkInsert(
      "recipes", 
      [{
      title: "Pasta",
      description: "Salty",
      ingredients: "pasta, pasta sauce, garlic",
      instructions: "Boil water and cook pasta for 7 minutes",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: "Fudge Brownie ice cream",
      description: "Sweet ",
      ingredients: "Fudge Brownie ice cream, oreo",
      instructions: "Combine the ice cream with oreo and let it chill for a few minutes",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      title: "Chicken cutlet",
      description: "Yummy",
      ingredients: "Chicken, eggs, flour, herbs and spices",
      instructions: "Combine eggs with flour and with herbs and spices and cover the chicken with it",
      created_at: new Date(),
      updated_at: new Date(),
    }
    ], 
    {}
  );
  
  },

 down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('recipes' , null, {})
 }
};
