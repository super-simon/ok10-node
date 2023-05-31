const fs = require("node:fs/promises");
const path = require("path");

const users = [
  {
    name: "Іван Франко",
    age: 57,
    gender: "male",
  },
  {
    name: "Леся Українка",
    age: 42,
    gender: "female",
  },
  {
    name: "Тарас Шевченко",
    age: 47,
    gender: "male",
  },
  {
    name: "Михайло Коцюбинський",
    age: 55,
    gender: "male",
  },
  {
    name: "Василь Стефаник",
    age: 56,
    gender: "male",
  },
  {
    name: "Марко Вовчок",
    age: 63,
    gender: "female",
  },
  {
    name: "Олесь Гончар",
    age: 85,
    gender: "male",
  },
  {
    name: "Іван Нечуй-Левицький",
    age: 52,
    gender: "male",
  },
  {
    name: "Олена Пчілка",
    age: 66,
    gender: "fe male",
  },
  {
    name: "Максим Рильський",
    age: 84,
    gender: "male",
  },
];

fs.writeFile(
  path.join(process.cwd(), "users.json"),
  JSON.stringify(users)
).then(console.log("Fixtures are filled."));
