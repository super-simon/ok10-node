function sayHello() {
  console.log("Hello to DEC-2022 FROM helper");
  console.log(__dirname);
  console.log(__filename);
  console.log(process.cwd());
}

module.exports = {
  sayHello,
};
