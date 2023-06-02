const fs = require("node:fs/promises");
const path = require("node:path");

const usersFile = path.join(process.cwd(), "users.json");

const readAllUsers = async () => {
  const fileData = await fs.readFile(usersFile, { encoding: "utf8" });
  return await JSON.parse(fileData);
};

const writeAllUsers = async (users) => {
  return await fs.writeFile(path.join(usersFile), JSON.stringify(users));
};

module.exports = { readAllUsers, writeAllUsers };
