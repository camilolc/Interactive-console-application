const inquirer = require("inquirer");

require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Create a task`,
      },
      {
        value: "2",
        name: `${"2.".green} List all task`,
      },
      {
        value: "3",
        name: `${"3.".green} List complete tasks`,
      },
      {
        value: "4",
        name: `${"4.".green} List pending tasks`,
      },
      {
        value: "5",
        name: `${"5.".green} Complete task(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Delete a task`,
      },
      {
        value: "0",
        name: `${"0.".green} Exit`,
      },
    ],
  },
];
const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".green);
  console.log("=====Select an option======".green);
  console.log("===========================\n".green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"Enter".green} To continue`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "please type a value";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};
//DELETE LIST
const deleteListTask = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + "cancel",
  });
  const questions = [
    {
      type: "list",
      name: "id",
      message: "Delete",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
  // {
  //   value: task.id,
  //   name: `${"1.".green} Create a task`,
  // }
};
const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showChecklist = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.doneEn ? true : false,
    };
  });

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(questions);
  return ids; // Return selected task
  // {
  //   value: task.id,
  //   name: `${"1.".green} Create a task`,
  // }
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  deleteListTask,
  confirm,
  showChecklist,
};
