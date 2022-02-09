/**
 *  _listado
 * {'uuid-123123: {id:12, des:asd, doneEn:1234}'}
 */

const Task = require("./task");

class Tasks {
  _list = {};
  //Getting info of the list into an array
  get arrayList() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }
  //Deleting an existing task
  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTaskFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }
  //Creating a new task
  createTask(desc = "") {
    const task = new Task(desc);

    this._list[task.id] = task;
  }
  //Display completed task
  CompleteList() {
    console.log();
    this.arrayList.forEach((task, index) => {
      const idx = `${index + 1}`.green;
      const { desc, doneEn } = task;
      const state = doneEn ? "Done".green : "Pending".red;
      console.log(`${idx} ${desc} :: ${state}`);
    });
  }
  //List complete and pending tasks
  ListPendingComplete(completed = true) {
    console.log();
    let counter = 0;
    this.arrayList.forEach((task, index) => {
      const idx = `${index + 1}`;
      const { desc, doneEn } = task;
      const state = doneEn ? "Done".green : "Pending".red;

      if (completed) {
        if (doneEn) {
          counter += 1;
          console.log(`${idx}`.green, `${desc} :: ${doneEn.green}`);
        }
      } else {
        if (!doneEn) {
          counter += 1;
          console.log(`${idx}`.red, `${desc} :: ${state} `);
        }
      }
    });

    console.log(
      completed ? `TOTAL DONE:: ${counter}` : `TOTAL PENDING:: ${counter}`
    );
  }
  //toggle if a task is done and set a date for that task
  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.doneEn) {
        task.doneEn = new Date().toISOString();
      }
    });
    this.arrayList.forEach((task) => {
      //let's compare if the task is not included in the id array vs the complete list, if so
      //set it null

      if (!ids.includes(task.id)) {
        this._list[task.id].doneEn = null;
      }
    });
  }
}

module.exports = Tasks;
