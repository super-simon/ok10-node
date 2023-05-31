const fs = require("node:fs/promises");
const path = require("node:path");
const express = require("express");

const usersFile = path.join(process.cwd(), "users.json");
const possibleGenders = ["male", "female", "mixed"];
const MIN_AGE = 0;
const MAX_AGE = 150;
const MIN_NAME_LENGTH = 3;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const readAllUsers = () => {
  return fs.readFile(usersFile, { encoding: "utf8" });
};

const writeAllUsers = (users) => {
  return fs.writeFile(path.join(usersFile), JSON.stringify(users));
};

const userExistsById = (users, userId) => {
  return !isNaN(userId) && +userId > 0 && +userId <= users.length;
};

const checkUserData = (user) => {
  return (
    !!user?.age &&
    !isNaN(user.age) &&
    user.age >= MIN_AGE &&
    user.age <= MAX_AGE &&
    !!user?.gender &&
    possibleGenders.includes(user.gender) &&
    !!user?.name &&
    user.name.length >= MIN_NAME_LENGTH
  );
};

app.get("/users", (req, res) => {
  readAllUsers().then((data) => {
    res.status(200).json(JSON.parse(data));
  });
});

app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  readAllUsers().then((data) => {
    const users = JSON.parse(data);
    if (!isNaN(userId) && +userId > 0 && +userId <= users.length) {
      res.status(200).json(users[+userId - 1]);
    } else {
      res.status(404).json({
        message: "User does not exist.",
      });
    }
  });
});

app.post("/users", (req, res) => {
  readAllUsers().then((data) => {
    if (!checkUserData(req.body)) {
      res.status(400).json({
        message: "User data is incorrect.",
      });
      return;
    }

    const users = JSON.parse(data);
    users.push(req.body);
    writeAllUsers(users).then(() => {
      res.status(201).json({ message: "User created" });
    });
  });
});

app.put("/users/:userId", (req, res) => {
  const { userId } = req.params;

  readAllUsers().then((data) => {
    const users = JSON.parse(data);
    if (userExistsById(users, userId)) {
      if (!checkUserData(req.body)) {
        res.status(400).json({
          message: "User data is incorrect.",
        });
        return;
      }
      users[+userId - 1] = req.body;
      writeAllUsers(users).then(
        res
          .status(200)
          .json({ message: "User updated", data: users[+userId - 1] })
      );
    } else {
      res.status(404).json({
        message: "User does not exist.",
      });
    }
  });
});

app.delete("/users/:userId", (req, res) => {
  const { userId } = req.params;

  readAllUsers().then((data) => {
    const users = JSON.parse(data);
    if (userExistsById(users, userId)) {
      users.splice(+userId - 1, 1);
      writeAllUsers(users).then(
        res.status(200).json({ message: "User deleted" })
      );
    } else {
      res.status(404).json({
        message: "User does not exist.",
      });
    }
  });
});

const PORT = 5100;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
