require("colors");

const {
  inquirerMenu,
  pause,
  readInput,
  deleteListTask,
  confirm,
  showChecklist,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/safeFile");
const Tasks = require("./models/tasks");

console.clear();
const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const dbTask = readDB();

  if (dbTask) {
    //Establish taks
    tasks.loadTaskFromArray(dbTask);
  }

  do {
    //Print the menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await readInput("Description:");
        tasks.createTask(desc);
        break;

      case "2":
        tasks.CompleteList();
        break;
      case "3":
        tasks.ListPendingComplete(true);
        break;
      case "4":
        tasks.ListPendingComplete(false);
        break;
      case "5":
        const ids = await showChecklist(tasks.arrayList);
        tasks.toggleCompleted(ids);
        break;
      case "6":
        const id = await deleteListTask(tasks.arrayList);
        if (id !== "0") {
          const ok = await confirm("Are you sure?");
          if (ok) {
            tasks.deleteTask(id);
            console.log("Task deleted");
          }
        }
        break;

      default:
    }
    saveDB(tasks.arrayList);
    await pause();
  } while (opt !== "0");
};

main();
