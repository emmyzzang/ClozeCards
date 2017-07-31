// // Depend on Node module to export a constructor for creating the BASIC flashcards 
// module.exports = basicCard; 

// Require NPM Packages

const fs = require("fs"); 
const inquirer = require("inquirer"); 

// Create constructor that accepts two arguments: front and back 

function BasicCardCreation (front, back) {
	this.front = front, 
	this.back = back
	this.displayCardStuffies = function() {
	console.log("Front: " + this.front + "Back: " + this.back); 
	
	}

// Add txt file to the same folder 

	this.logCard = function () {

	// Create object wherein info will be stored 
	let writeCard = "Front: " + this.front + "Back: " + this.back + "\n";

	// Append user info to the txt file so that it stores 
	fs.appendFile("basicCardText.txt", writeCard);

	}
};

function createCard() {
	// Prompt the user to enter the front and back of the flashcards 
	// and THEN since we care about their reply, accept the "Answers" callback
    inquirer.prompt([
       	   {name: "front",
            message: "Enter Text for the front of the Flashcard " },
           {name: "back",
            message: "Enter Text for Back of the Flashcard "},
           {type: "confirm",
            message: "Add more flashcards? ",
            name: "continue",
            default: true}
 // and THEN since we care about their reply, accept the "Answers" callback       
    ]).then(function(answers) {
 // Define new instance of this object that accepts two arguments from user: front and back 
 // Since it is NEW, name it something different from the OG constructor function obvs 
        var card = new CreateBasicCard(answers.front, answers.back);
        card.logCard();
        // If user wants to create more cards, 
        // call upon recursive function until meeseeks fulfills the obligations  
        // ELSE, break out of the recursive loop and console log the txt
        if(answers.continue === true)
            createCard();
        else
            console.log("cardsBasic.txt")
    });
}
// Call upon this for init 
createCard();