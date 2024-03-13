const { User } = require("../models/user");
const { faker } = require("@faker-js/faker");

const createUser = async (numUsers) => {
  try {
    const usersPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.url(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempUser);
    }
    
    console.log(`${usersPromise.length} users created.`);
    await Promise.all(usersPromise);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { createUser }