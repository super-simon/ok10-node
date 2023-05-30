//MODULES
const { sayHello } = require("./helpers/sayHello.helper");

sayHello();

//GLOBAL VARIABLES
console.log("FROM app");
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());

//PATH
const path = require("path");

const joinedPath = path.join(__dirname, "folder", "subfolder", "text.txt");
console.log("joinedPath: ", joinedPath);

const normalizedPath = path.normalize("///folder\\subfolder/text.txt");
console.log("normalizedPath: ", normalizedPath);

const resolvedPath = path.join("folder", "subfolder", "text.txt");
console.log("resolvedPath: ", resolvedPath);

//OS
const os = require("os");
console.log("cpus: ", os.cpus());
console.log("arch: ", os.arch());
const { exec } = require("child_process");

//FS
const fs = require("fs");
const text2Path = path.join(__dirname, "folder", "subfolder", "text2.txt");
fs.writeFile(text2Path, "Hello from again!", (err) => {
  if (err) {
    throw new Error(err.message);
  }
});

fs.readFile(text2Path, { encoding: "utf-8" }, (err, data) => {
  if (!err) {
    console.log(data);
  }
});

fs.appendFile(text2Path, "asdfasfasdfsaf", (err) => {
  if (err) {
    throw new Error(err.message);
  }
});

fs.truncate(text2Path, (err) => {
  if (err) {
    throw new Error(err.message);
  }
});

fs.unlink(text2Path, (err) => {
  if (err) {
    throw new Error(err.message);
  }
});

fs.readdir(
  path.join(__dirname, "folder"),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      throw new Error(err.message);
    }
    files.forEach((file) => {
      console.log(file.name, " is a ", file.isFile() ? "file" : "directory");
    });
  }
);

fs.mkdir(
  path.join(__dirname, "folder", "folder4"),
  { recursive: true },
  (err) => {
    if (err) {
      throw new Error(err.message);
    }
  }
);

fs.rmdir(path.join(__dirname, "folder", "folder4"), (err) => {
  if (err) {
    throw new Error(err.message);
  }
});
