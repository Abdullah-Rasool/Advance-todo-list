#! /usr/bin/env node
import inquirer from "inquirer";
//empty array to keep & store user input
let todo: string[] = [];
let condition = true;

while (condition) {
  let options = await inquirer.prompt([
    {
      name: "Select",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add", "Update", "View", "Delete", "Exit"],
    },
  ]);
  if (options.Select === "Add") {
    let addTask = await inquirer.prompt([
      {
        name: "task",
        type: "input",
        message: "What task would you like to add to your todo list today?",
        //the validation function ensures that the user's input meets certain criteria before proceeding with further operations
        validate: function (input) {
          // Check if the input is not empty
          if (input.trim() == "") {
            // If the input is empty, log an error message
            
              return "Error: Enter a valid task title before proceeding with the operation."
          }
          return true;
        },
      },
    ]);
    // Check if the task is not an empty string or contains whitespace
    if (addTask.task.trim() !== "") {
      // If the task is not empty, add it to the todo list array
      todo.push(addTask.task);
      console.log("Task added successfully!");
    }  
  }
  if (options.Select === "Update") {
    let updateTask = await inquirer.prompt([
      {
        name: "itemToUpdate",
        type: "list",
        message: "Which item would you like to update?",
        choices: todo.map((item) => item), //map method used to generate the list of existing array
      },
    ]);
    let addTask = await inquirer.prompt([
      {
        name: "task",
        type: "input",
        message: "What task would you like to add to your todo list today?",
      },
    ]);
    // filter function checks the values in array which is not equal to updateTask , add them into new array
    let newtask = todo.filter((val) => val !== updateTask.itemToUpdate);
    //The spread operator (...) is commonly used to combine or merge multiple arrays
    todo = [...newtask, addTask.task];
    console.log("Task updated successfully!");
  }
  if (options.Select === "View") {
    console.log("¶-------------------¶");
    console.log("[   Your To-Do List   ]");
    console.log("¶-------------------¶");
    todo.forEach(todo => console.log(todo));
  }

  if (options.Select === "Delete") {
    let deleteTask = await inquirer.prompt([
      {
        name: "itemToDelete",
        type: "list",
        message: "Please specify the item you want to delete:",
        choices: todo.map((item) => item), //map method used to generate the list of existing array
      },
    ]);
    let newtask = todo.filter((val) => val !== deleteTask.itemToDelete);
    todo = [...newtask];
    console.log("Task deleted successfully!");
  }

  if (options.Select === "Exit") {
    console.log("Thank you for using the todo list program. Have a great day!");
    condition = false;
  }
}
