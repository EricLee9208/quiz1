/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const faker = require("faker");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return knex("cluckr")
    .del()
    .then(function () {
      const cluck = [];
      for (let i = 0; i < 3; i++) {
        cluck.push({
          username: faker.name.findName(),
          content: faker.company.catchPhrase(),
          imageUrl: faker.image.imageUrl(),
          createdAt: faker.date.past(),
        });
      }
      return knex("cluckr").insert(cluck);
    });
};
