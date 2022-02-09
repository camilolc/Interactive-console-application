const { v4: uuidv4 } = require("uuid");

class Task {
  id = "";
  desc = "";
  doneEn = null;

  constructor(desc) {
    this.id = uuidv4();
    this.desc = desc;
    this.doneEn = null;
  }
}

module.exports = Task;
