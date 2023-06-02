const express = require("express");
const fileService = require("./file.service");

const possibleGenders = ["male", "female", "mixed"];
const MIN_AGE = 0;
const MAX_AGE = 150;
const MIN_NAME_LENGTH = 3;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/users", async (req, res) => {
  const users = await fileService.readAllUsers();
  res.json(users);
});

app.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const users = await fileService.readAllUsers();
  if (!isNaN(userId) && +userId > 0 && +userId <= users.length) {
    res.status(200).json(users[+userId - 1]);
  } else {
    res.status(404).json({
      message: "User does not exist.",
    });
  }
});

app.post("/users", async (req, res) => {
  if (!checkUserData(req.body)) {
    res.status(400).json({
      message: "User data is incorrect.",
    });
    return;
  }
  const users = await fileService.readAllUsers();
  users.push(req.body);
  await fileService.writeAllUsers(users);
  res.status(201).json({ message: "User created" });
});

app.put("/users/:userId", async (req, res) => {
  if (!checkUserData(req.body)) {
    res.status(400).json({
      message: "User data is incorrect.",
    });
    return;
  }

  const { userId } = req.params;
  const users = await fileService.readAllUsers();

  if (userExistsById(users, userId)) {
    users[+userId - 1] = req.body;
    await fileService.writeAllUsers(users);
    res.status(200).json({ message: "User updated", data: users[+userId - 1] });
  } else {
    res.status(404).json({
      message: "User does not exist.",
    });
  }
});

app.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const users = await fileService.readAllUsers();
  if (userExistsById(users, userId)) {
    users.splice(+userId - 1, 1);
    await fileService.writeAllUsers(users);
    res.status(200).json({ message: "User deleted" });
  } else {
    res.status(404).json({
      message: "User does not exist.",
    });
  }
});

const PORT = 5100;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
