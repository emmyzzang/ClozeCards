// // Depend on Node module to export a constructor for creating the CLOZE-DELETION flashcards
module.exports = ClozeCardCreation;

// //Require NPM Packages

const fs = require("fs");
const inquirer = require("inquirer");

// Create constructor that accepts two arguments: Text and Cloze-Deletion

function ClozeCardCreation (text, cloze) {
	// Accept the argument cloze for Cloze-Deletion and declare it as cardCloze
	this.cardCloze = cloze,
	// Accept the argument text for text and declare it as .cardText
	this.cardText = text,
	// Stage the whole text for deletion
	this.whole = "{{c::" + this.cardCloze + "}}" + " " + this.cardText;
	// Log the deleted text and
	this.clozeLogger = function() {
		console.log("Cloze " + this.cardCloze + " " + "Text: " + this.cardText);
	}
	// Write the card and access the file system to write to a txt file
	this.cardWriter = function() {
		var writeCard = this.whole + "\r\n";

		fs.appendFile("cardsCloze.txt", writeCard);
	}
	// Declare cloze as the part of the text that has been deleted
	this.displayClozeDeleted = function() {
		let cloze = this.whole.replace(this.cardCloze,"...");
		return cloze;
	}
};

ClozeCardCreation.prototype.makeFlashcard = function (partial) {
	this.partial = this.cardText.split(this.cardCloze).join('...');
	let partialWord = this.cardText.indexOf(this.cardCloze);
	if (partialWord == -1) {
		console.log("This does not work");
	}
	else {
		console.log(this.cloze);
		console.log(this.partial);
		console.log(this.cardText);
	}
}

let firstPresidentCloze = new ClozeCardCreation(
	"This person George Washington was the first president of the United States.", "George Washington");
	firstPresidentCloze.makeFlashcard();

	// Prompt the user with the questions regarding the Cloze-Deletion part of the text
	// and THEN since we care about their reply, accept the "Answers" callback
	function createCard() {
		inquirer.prompt([
			{name: "cloze",
			message: "Enter text for cloze side: "},
			{name: "text",
			message: "Enter text for whole flashcard "},
			{type: "confirm",
			message: "Display cloze deleted flashcard?",
			name: "display",
			default: true},
			{type: "confirm",
			message: "Do you want to add another card?",
			name: "continue",
			default: true
		}
		// and THEN since we care about their reply, accept the "Answers" callback
		// also declare a variable that produces NEW card and write
	]).then(function(answers) {
		//create NEW
		var card = new ClozeCardCreation(answers.text, answers.cloze);
		card.cardWriter();
		// if user is finished making cards then log it if not then allow them to create another
		// card that the
		if(answers.display === true)
		console.log(card.displayClozeDeleted());

		if(answers.continue === true)
		createCard();
		else
		console.log("cardsCloze.txt")
	});
}
//call the original constructor function
createCard();
