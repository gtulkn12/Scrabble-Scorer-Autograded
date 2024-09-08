// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let newPointStructure = transform(oldPointStructure);

const simpleScorer = function simpleScorer(word) {
   wordString = word.toUpperCase();
   let simpScore = 0;
   for (letter of wordString) {
      simpScore += 1;
   }
   return Number(simpScore)
}

const simpleScore = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

const vowelBonusScorer = function vowelBonusScore(word) {
   let bonusScore = 0
   let wordString = word.toLowerCase();
   let vowels = ["a", "e", "i", "o", "u"]
   for (letter of wordString) {
      if (vowels.includes(letter)) {
         bonusScore += 3
      } else {
         bonusScore += 1
      }
   }
   return bonusScore
}

const vowelBonusScore = {
   name: "Bonus Score",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

const scrabbleScorer = function ScrabbleScorerFunction(word) {
   word = word.toLowerCase();
   let wordPoints = 0;

   for (letter in word) {
      wordPoints += Number(newPointStructure[word[letter]])
   }
   return Number(wordPoints);
}

const scrabbleScore = {
   description: "The traditional scoring algorithm.",
   name: "Scrabble",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function transform(oldPointStructure) {
   let pointStructure = {}
   for ([key, value] of Object.entries(oldPointStructure)) {
      for (val in value) {
         pointStructure[value[val].toLowerCase()] = Number(key)
      }
   }
   return pointStructure
};

function initialPrompt() {
   let word = input.question(
      "Let's play some scrabble!\n\n" +
      "Enter a word to score: ");
   return word
};

function validateScorePrompt(scorePrompt) {
   if (scoringAlgorithms[scorePrompt]) {
      return true
   } else {
      console.log()
      console.log(`"${scorePrompt}" is not a valid option, please select an option from the following menu`)
   }
}

function scorerPrompt() {
   let scoringAlgorithmResponse = ""
   do {
      scoringAlgorithmResponse = input.question(
         "\nWhich scoring algorithm would you like to use? \n" +
         "0 - Simple: One point per character \n" +
         "1 - Vowel Bonus: Vowels are worth 3 points \n" +
         "2 - Scrabble: Uses scrabble point system \n" +
         "Enter 0, 1, or 2: ")
   } while (!validateScorePrompt(scoringAlgorithmResponse))
   return scoringAlgorithmResponse
}

function runProgram() {
   let word = initialPrompt();
   let scorePrompt = scorerPrompt();
   console.log();
   console.log("Algorithm name: ", scoringAlgorithms[scorePrompt].name);
   console.log("Score Criteria: ", scoringAlgorithms[scorePrompt].description);
   console.log(`Score for word -> "${word}": ${scoringAlgorithms[scorePrompt].scorerFunction(word)}`)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
