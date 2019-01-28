const PubSub = require('../helpers/pub_sub.js');
const LettersGameView = require('../views/letters_game_view.js');
const NumbersGameView = require('../views/numbers_game_view.js')
const Letters = require('./letters.js');
const Words = require('./words.js');
const Numbers = require('./numbers.js');
const Game = function(container) {
  // this.container =
}

Game.prototype.playCountdown = function(){

  let round = 0;
  //Generates a new word checker object and listens for the channel relating to when a word is submitted
  const words = new Words();
  words.loadWords();

  const numbers = new Numbers();

  const letters = new Letters();
  const rounds = ["L","L","L","L"];
  let lettersGameView;
  let numbersGameView;
  // const startButton = document.querySelector('#start-button');
  // startButton.addEventListener('click', function() {

  const button = document.querySelector('#start-button');
  button.addEventListener('click', function(event) {

      if (rounds[round] === "L") {

        const selection = letters.getRandomLetters();
        words.selection = selection.join('');
        words.round = round;

        words.bindEvents();

        //Generate the letters game view
        const wordInputForm1 = document.querySelector("#p1-word-submit");
        const wordInputForm2 = document.querySelector("#p2-word-submit");
        lettersGameView = new LettersGameView(wordInputForm1,wordInputForm2,selection, round);
        lettersGameView.setupEventListener();


      } else {

        // const selection = numbers.selection;
        // const target = numbers.target;
        //
        // numbersGameview = new NumbersGameView(selection, target, round);
        // numbersGameView.showNumbers();

      }

      round +=1;
      lettersGameView = null;

    });
  };

//Need a closing view for once a game is finished;
//At the moment the game just stops and does nothing;

module.exports = Game;
