var inquirer = require("inquirer");
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");

//Start flash card generator
function start() {
  inquirer.prompt({
      name: "card",
      type: "input",
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
    console.log("Question: " + newCard.front);
    console.log("Answer: " + newCard.back);
    createANewFlashCard();
  });
}

//Create a cloze card
function createCloze() {
  inquirer.prompt([{
      name: "questionStatement",
      type: "input",
      message: "Please input a question statement."
    },
    {
      name: "cloze",
      type: "input",
      message: "Which part of this statement is the answer?"
    },
  ]).then(function(answers) {
    var newCard = new ClozeCard(answers.questionStatement, answers.cloze);
      if (answers.questionStatement === answers.cloze) {
        console.log("Try again, partial answer can't be the full question statement"); 
    } else {
        console.log("Question Statement: " + newCard.partial);
        console.log("Answer: " + newCard.cloze);
    }
    createANewFlashCard();
  });
}


function createANewFlashCard() {
  inquirer.prompt({
      name: "newCard",
      type: "input",
      message: "Would you like to create a new flash card?"
    })
    .then(function(answer) {
      if (answer.newCard.toLowerCase() === "yes" || answer.newCard.toLowerCase() === "y") {
        start();
      } else {
        console.log("Thank you for creating flash cards with me.")
      }
    });
}



//Start the flashcard generation program
start();