var inquirer = require("inquirer");
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");

 
function start() {
  inquirer.prompt({
      name: "card",
      type: "rawlist",
      message: "Would you like to create a BASIC card or a CLOZE card?",
      choices: ["BASIC", "CLOZE"]
    })
    .then(function(answer) {
      if (answer.card.toLowerCase() === "basic") {
        createBasic();
      } 
      else if (answer.card.toLowerCase() === "cloze") {
        createCloze();
      }
      else {
        console.log("Try Again");
        start();
      }
    });
}

//Create a basic card
function createBasic() {
  inquirer.prompt([{
      type: "input",
      message: "Please input a question.",
      name: "question"
    },
    {
      type: "input",
      message: "What is the answer to your question?",
      name: "answer"
    },
  ]).then(function(answers) {
    var newCard = new BasicCard(answers.question, answers.answer);
    console.log(newCard.front);
    console.log(newCard.back);
    another();
  });
}




//Start the flashcard generation program
start();