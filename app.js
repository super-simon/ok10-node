const path = require("path");
const fs = require("node:fs/promises");

const folders = ["folder01", "folder02", "folder03", "folder04", "folder05"];
const files = ["file01", "file02", "file03", "file04", "file05"];
const workPath = path.join(__dirname, "work_folder");

fs.mkdir(workPath, { recursive: true }).then(() => {
  const foldersPromises = folders.map(async (folder) => {
    await fs.mkdir(path.join(workPath, folder), { recursive: true });
  });

  const filesPromises = files.map(async (file) => {
    await fs.writeFile(path.join(workPath, file), file);
  });

  Promise.all([...foldersPromises, ...filesPromises])
    .then(() => {
      fs.readdir(workPath, { withFileTypes: true }).then((list) => {
        list.map((item) => {
          console.log(
            item.name,
            " is a ",
            item.isFile() ? "file" : "directory"
          );
        });
      });

      // fs.rm(workPath, { recursive: true });
    })
    .catch((err) => [console.log(err.message)]);
});
