const fs = require("node:fs/promises");
const path = require("node:path");

// const foo = async () => {
//   const baseFolder = path.join(process.cwd(), "baseFolder");
//   await fs.mkdir(baseFolder, { recursive: true });
//   const fileNames = ["file1", "file2", "file3", "file4", "file5"];
//   const folderNames = ["folder1", "folder2", "folder3", "folder4", "folder5"];

//   for (const fileName of fileNames) {
//     await fs.writeFile(path.join(baseFolder, fileName), fileName);
//   }

//   for (const folderName of folderNames) {
//     await fs.mkdir(path.join(baseFolder, folderName), { recursive: true });
//   }

//   const files = await fs.readdir(baseFolder);
//   for (const file of files) {
//     const stat = await fs.stat(path.join(baseFolder, file));
//     console.log(
//       path.join(baseFolder, file),
//       ": ",
//       stat.isFile() ? "is a file" : "is a directory"
//     );
//   }
// };

// foo();

const foo = async () => {
  const baseFolder = path.join(process.cwd(), "baseFolder");
  await fs.mkdir(baseFolder, { recursive: true });
  const fileNames = ["file1", "file2", "file3", "file4", "file5"];
  const folderNames = ["folder1", "folder2", "folder3", "folder4", "folder5"];

  await Promise.all(
    folderNames.map(async (folder) => {
      await fs.mkdir(path.join(baseFolder, folder), { recursive: true });
      await Promise.all(
        fileNames.map(async (file) => {
          await fs.writeFile(path.join(baseFolder, folder, file), file);
        })
      );
    })
  );

  const files = await fs.readdir(baseFolder);
  for (const file of files) {
    const stat = await fs.stat(path.join(baseFolder, file));
    console.log(
      path.join(baseFolder, file),
      ": ",
      stat.isFile() ? "is a file" : "is a directory"
    );
  }
};

foo();
