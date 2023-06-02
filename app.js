const express = require("express");
const app = express();
const fileService = require("./file.service");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  const users = await fileService.readDB();
  res.json(users);
});

app.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const users = await fileService.readDB();
  const user = users.find((user) => user.id === +userId);
  if (!user) {
    return res.status(422).json({ message: "User does not exists" });
  }
  res.json(user);
});

app.post("/users", async (req, res) => {
  const { name, age } = req.body;
  if (!name || name.length < 3) {
    res.status(401).json({ message: "Name is invalid" });
  }

  if (!age || age < 0 || age > 150) {
    res.status(401).json({ message: "Age is invalid" });
  }

  const users = await fileService.readDB();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    age,
  };
  users.push(newUser);
  await fileService.writeDB(users);

  res.status(201).json({
    message: "User created",
    user: newUser,
  });
});

app.patch("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, age } = req.body;
  if (!name || name.length < 3) {
    res.status(401).json({ message: "Name is invalid" });
  }

  if (!age || age < 0 || age > 150) {
    res.status(401).json({ message: "Age is invalid" });
  }

  const users = await fileService.readDB();
  const user = users.find((user) => user.id === +userId);
  if (!user) {
    return res.status(422).json({ message: "User does not exist" });
  }

  if (name) {
    user.name = name;
  }

  if (age) {
    user.age = age;
  }

  fileService.writeDB(users);
  res.status(201).json(user);
});

app.delete("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const users = await fileService.readDB();
  const index = users.findIndex((user) => user.id === +userId);
  if (index === -1) {
    return res.status(422).json({ message: "User does not exist" });
  }

  users.splice(index, 1);
  fileService.writeDB(users);
  res.sendStatus(204);
});

const PORT = 5100;

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
