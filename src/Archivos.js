const fs = require("fs");
class Archivo {
  constructor(path) {
    this.filePath = path;
  }
  save = async (Object) => {
    const messages = await this.getAll();
    messages.push({ ...Object });
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(messages, null, 1)
      );
    } catch (err) {
      console.log(err);
    }
  };
  getAll = async () => {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  };
}

module.exports = Archivo;
