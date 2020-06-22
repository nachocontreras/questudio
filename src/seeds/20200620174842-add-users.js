'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const usersData = [
      {
        name: "Ignacio",
        lastname: "Contreras",
        userType: 1,
        password: "$2a$10$TX3n8rgFy5T3T0YPwAcgguCAdIw1NhbT9YB89zbmT.pT0AQXgudc.",
        email: "icontreras1@uc.cl",
        imageUrl: "http://res.cloudinary.com/dbs6fwbbs/image/upload/v1589145530/users-images/1/1icontreras1_YIHDSPRLLPHJECZ",
        universityId: 1,
        admin: true,
        verificated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nicolas",
        lastname: "Maturana",
        userType: 1,
        password: "$2a$10$hNlivo7vFlWLVa4quHDPgOQn0A/tYDfwiX6mtzG.pqRm6pdtIM9OK",
        email: "nmaturana97@gmail.com",
        universityId: 1,
        admin: false,
        verificated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fernanda",
        lastname: "Duran",
        userType: 1,
        password: "$2a$10$hNlivo7vFlWLVa4quHDPgOQn0A/tYDfwiX6mtzG.pqRm6pdtIM9OK",
        email: "frduran@uc.cl",
        universityId: 1,
        admin: false,
        verificated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Luciano",
        lastname: "Davico",
        userType: 1,
        password: "$2a$10$hNlivo7vFlWLVa4quHDPgOQn0A/tYDfwiX6mtzG.pqRm6pdtIM9OK",
        email: "lldavico@uc.cl",
        universityId: 1,
        admin: false,
        verificated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    return queryInterface.bulkInsert('users', usersData);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkDelete('users', null, {});
  }
};
